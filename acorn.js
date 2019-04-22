let input;
let inputLen = 0;
let tokenPos = 0;
let tokStart = 0;
let tokEnd = 0;
let tokType = '';
let tokVal = '';
let lastStart = 0;
let lastEnd = 0;
let strict = false;
const puncChars = /[\.:,;\{\}\(\)]/;
const indentifierReg = /[A-Za-z_$]/;
const identifierG = /[A-Za-z_$0-9]+/g;
const keywords = /^(?:var|const|let|function)$/;
const strictReservedWords = /^(?:implements|interface|let|package|private|protected|public|static|yield)$/;
const operatorChar = /[+\-\*%\/=>\|&\!\~]/;
const digest = /\d/;
const newline = /[\n\r\u2028\u2029]/;
const logicReg = /&&|\|\|/;
const _eof = {type: "eof"};

const _name = {type: 'name'};
const _num = {type: 'number'};
const _string = {type: 'string'};
const _semi = {type: ';'};
const _comma = {type: ','};
const _dot = {type: '.'};
const _braceL = {type: '{'};
const _braceR = {type: '}'};
const _bracketL = {type: '['};
const _bracketR = {type: ']'};
const _parenL = {type: '('};
const _parenR = {type: ')'};
const _var = {type: 'var'};
const _colon = {type: ':'};
const _func = {type: 'function'};
const _eq = {type: 'isAssign'};
const _slash = {binop: 10};
const strictBadWords = /^(?:eval|arguments)$/;

const opTypes = {
    '/': _slash,
    '=': _eq,
    '+': {binop: 9, prefix: true,},
    '-': {binop: 9, prefix: true,},
    '++': {prefix: true, isUpdate: true},
    '--': {prefix: true, isUpdate: true},
    '!': {prefix: true,},
    '~': {prefix: true,},
    '===': {binop: 6},
    '==': {binop: 6},
    '!==': {binop: 6},
    '!=': {binop: 6},
    '>': {binop: 6},
    '>=': {binop: 6},
    '>>': {binop: 6},
    '>>>': {binop: 6},
    '<': {binop: 6},
    '<=': {binop: 6},
    '<<': {binop: 6},
    '<<<': {binop: 6},
    '||': {binop: 2},
    '&&': {binop: 3},
    '|': {binop: 4},
    '&': {binop: 6},
    '*': {binop: 10},
    '%': {binop: 10},
};

const keywordTypes = {
    'var': _var,
    'const': _var,
    'let': _var,
    'function': _func
};
const puncTypes = {
    ';': _semi,
    ',': _comma,
    '.': _dot,
    '{': _braceL,
    '}': _braceR,
    '[': _bracketL,
    ']': _bracketR,
    '(': _parenL,
    ')': _parenR,
    ':': _colon,
};

function parse(inpt) {
    input = String(inpt);
    inputLen = input.length;
    const node = startNode();
    node.body = [];
    skipSpace();
    readToken();
    lastStart = tokStart;
    lastEnd = tokEnd;
    let first = true;
    while (tokType !== _eof) {
        const statement = parseStatement();
        if (first) {
            first = false;
            if (isUseStrict(statement)) {
                setStrict(true);
            }
        }
        node.body.push(statement);
    }
    return finishNode(node, 'Program');
}

function parseStatement() {
    const node = startNode();
    const lastTokType = tokType;
    switch (tokType) {
        case _var:
            next();
            parseVar(node);
            semicolon();
            return finishNode(node, "VariableDeclaration");
        case _func:
            next();
            return parseFunction(node, true);
        case _slash:
            next();
            return node;
        case _braceL:
            return parseBlock();
        default:
            const expr = parseExpression();
            if (lastTokType === _name && expr.type === 'Identifier' && eat(tokType)) {
                node.label = expr;
                node.body = parseStatement();
                return finishNode(node, 'LabeledStatement');
            }
            node.expression = expr;
            semicolon();
            return finishNode(node, 'expressionStatement');
    }
}

function parseExpression(noComma) {
    const expr = parseMaybeAssign();
    if (!noComma && tokType === _comma) {
        const node = copyNodeStart(expr);
        node.expression = [expr];
        while (eat(_comma)) {
            node.expression.push(parseMaybeAssign());
        }
        return finishNode(node, 'SequenceExpression');
    }
    return expr
}

function parseInExpression() {
    const node = startNode();
    switch (tokType) {
        case _string:
        case _num:
            node.value = tokVal;
            next();
            return finishNode(node, 'Literal');
        case _name:
            if (tokVal === 'this') {
                next();
                return finishNode(node, 'thisExpression');
            }
            node.value = tokVal;
            next();
            return finishNode(node, 'Identifier');
        case _parenL:
            next();
            const val = parseExpression();
            expected(_parenR);
            return val;
        case _braceL:
            return parseBlock();
        case _func:
            next();
            return parseFunction(node, false);
        default:
            unexpected();
    }
}

function parseIdent() {
    const node = startNode();
    if (tokType !== _name) {
        unexpected();
    }
    node.name = tokVal;
    next();
    return finishNode(node, 'Identifier');
}

function parseFunction(node, isStatement) {
    node.id = tokType === _name ? parseIdent() : null;
    expected(_parenL);
    node.params = [];
    let first = true;
    while (!eat(_parenR)) {
        if (first) {
            first = false
        } else {
            expected(_comma);
        }
        node.params.push(parseIdent());
    }
    node.body = parseBlock(true);
    const type = isStatement ? 'FunctionDeclaration' : 'FunctionExpression';
    return finishNode(node, type);
}

function parseBlock(allowStrict) {
    const node = startNode();
    node.body = [];
    expected(_braceL);
    let first = true;
    let oldStrict;
    while (!eat(_braceR)) {
        const stms = parseStatement();
        if (first) {
            if (allowStrict && isUseStrict(stms)) {
                oldStrict = strict;
                setStrict(strict = true);
            }
            first = false;
        }
        node.body.push(stms);
    }
    if (strict && !oldStrict) {
        setStrict(false);
    }
    return finishNode(node, 'BlockStatement');
}

function parseParen() {
    expected(_parenL);
    const value = parseExpression();
    expected(_parenR);
    return value;
}

function parseExprSubscripts() {
    return parseSubscript(parseMaybeUnary());
}

function parseMaybeAssign() {
    const left = parseExprOp(parseExprSubscripts(), -1);
    if (tokType === _eq) {
        const node = copyNodeStart(left);
        node.left = left;
        node.operator = tokVal;
        next();
        node.right = parseMaybeAssign();
        return finishNode(node, 'AssignmentExpression');
    }
    return left;
}

function parseMaybeUnary() {
    if (tokType.prefix) {
        const node = startNode();
        const update = tokType.isUpdate;
        node.prefix = true;
        node.operator = tokVal;
        next();
        node.argument = parseExprSubscripts();
        if (update) checkLVal(node.argument);
        const type = update ? 'UpdateExpression' : 'UnaryExpression';
        return finishNode(node, type);
    }
    const left = parseInExpression();
    return left
}

function parseSubscript(base) {
    if (eat(_dot)) {
        const node = copyNodeStart(base);
        node.object = base;
        node.property = parseIdent();
        node.computed = false;
        return parseSubscript(finishNode(node, 'MemberExpression'));
    } else if (eat(_parenL)) {
        const node = copyNodeStart(base);
        node.arguments = parseExprList();
        node.callee = base;
        return finishNode(node, 'CallExpression');
    }
    return base
}

function parseExprList() {
    const extr = [];
    let first = true;
    while (!eat(_parenR)) {
        if (first) {
            first = false;
        }
        extr.push(parseExpression());
    }
    return extr
}

function parseUnary() {
    const left = parseInExpression();
    if (tokType.prefix) {
        const node = copyNodeStart(left);
        node.prefix = true;
        node.operator = tokVal;
        node.argument = parseExprSubscripts();
        checkLVal(node.argument);
        const type = node.isUpdate ? 'UpdateExpression' : 'UnaryExpression';
        return finishNode(node, type);
    }
    return left
}

function parseExprOp(left, low) {
    const proc = tokType.binop;
    if (proc !== null && proc > low) {
        const node = copyNodeStart(left);
        node.left = left;
        node.operator = tokVal;
        const type = logicReg.test(tokVal) ? 'LogicalExpression' : 'BinaryExpression';
        next();
        node.right = parseExprSubscripts();
        semicolon();
        return finishNode(node, type);
    }
    return left;
}

function parseVar(node) {
    node.declarations = [];
    for (; ;) {
        const n = startNode();
        n.id = parseIdent();
        n.init = eat(_eq) ? parseExpression(true) : null;
        node.declarations.push(finishNode(n, 'VariableDeclarator'));
        if (!eat(_comma)) break;
    }
    return node;
}

function copyNodeStart(node) {
    const {start} = node;
    return {
        start,
        type: null,
    }
}

function checkLVal(node) {
    if (!/^(?:Identifier|Member)/.test(node.type)) {
        raise(node.start, 'Assigning to uValue');
    } else if (strict && 'Identifier' === node.type && strictBadWords.test(node.name)) {
        raise(node.start, `Assigning to ${node.name} in strict mode`);
    }
}

function isUseStrict(stmt) {
    return stmt.type === 'expressionStatement' && stmt.expression.type === 'Literal' && stmt.expression.value === 'use strict'
}

function semicolon() {
    return eat(_semi) || canInsertSemicolon()
}

function canInsertSemicolon() {
    return newline.test(input.slice(lastEnd, tokenPos));
}

function next() {
    skipSpace();
    readToken();
}

function setStrict(strct) {
    strict = strct;
    skipSpace();
    readToken();
}

function eat(type) {
    if (tokType === type) {
        next();
        return true;
    }
}

function startNode() {
    return {
        type: null,
        start: tokStart,
    }
}

function finishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    return node
}

function readWord() {
    tokType = _name;
    identifierG.lastIndex = tokenPos;
    const word = identifierG.exec(input)[0];
    tokenPos = tokenPos + word.length;

    if (keywords.test(word)) {
        tokType = keywordTypes[word];
    } else if (strict && strictReservedWords.test(word)) {
        raise(tokStart, `The keyword "${word}" is reserved`);
    }
    finishToken(tokType, word);
}

function readString(quote) {
    tokType = _string;
    let str = '';
    tokenPos++;
    for (; ;) {
        const ch = input.charAt(tokenPos);
        if (ch === quote) {
            tokenPos++;
            finishToken(tokType, str);
            break;
        } else {
            ++tokenPos;
            str += ch;
        }
    }
}

function readNumber() {
    tokType = _num;
    readInt(10);
    const str = input.slice(tokStart, tokenPos);
    const val = parseInt(str, 10);
    return finishToken(tokType, val);
}

function readInt(type) {
    let total = 0;
    for (; ;) {
        const code = input.charCodeAt(tokenPos);
        if (code <= 57 && code >= 48) {
            tokenPos++;
            const value = code - 48;
            if (value >= type) break;
            total = total * type + value;
        } else {
            break;
        }
    }
    return total
}

function readOperator(op) {
    for (; ;) {
        const ch = input.charAt(++tokenPos);
        if (!operatorChar.test(ch) || !opTypes[op + ch]) {
            break;
        } else {
            op = op + ch;
        }
    }
    return finishToken(opTypes[op], op);
}

function readToken() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    tokStart = tokenPos;
    const ch = input.charAt(tokenPos);
    if (tokenPos >= inputLen) return finishToken(_eof);
    if (ch === '\'' || ch === '"') {
        readString(ch);
    } else if (indentifierReg.test(ch)) {
        readWord();
    } else if (digest.test(ch)) {
        readNumber();
    } else if (puncChars.test(ch)) {
        tokenPos++;
        finishToken(puncTypes[ch]);
    } else if (operatorChar.test(ch)) {
        readOperator(ch)
    }
}

function finishToken(type, str) {
    tokEnd = tokenPos;
    tokType = type;
    tokVal = str;
    skipSpace();
}

// 去除注释
function skipSpace() {
    while (tokenPos < inputLen) {
        const ch = input.charAt(tokenPos);
        if (ch === '/') {
            if (input.charAt(tokenPos + 1) === '/') {
                tokenPos += 2;
                while (tokenPos < inputLen && !newline.test(input.charAt(tokenPos))) {
                    tokenPos++;
                }
            } else if (input.charAt(tokenPos + 1) === '*') {
                const i = input.indexOf('*/', tokenPos + 2);
                if (i < 0) {
                    raise(tokenPos - 2, 'Unterminated comment');
                }
                tokenPos = i + 2;
            } else {
                ++tokenPos;
            }
        } else if (ch === '\n' || ch === '\t' || ch === " ") {
            ++tokenPos;
        } else {
            break;
        }
    }
}

function expected(type) {
    if (tokType === type) {
        next()
    } else {
        unexpected()
    }
}

function unexpected() {
    raise(tokStart, 'Unexpected token')
}

function raise(pos, message) {
    message = `(${pos})${message}`;
    throw new SyntaxError(message);
}

exports.parse = parse;
