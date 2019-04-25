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
let inFunction = false;
const puncChars = /[\.:,;\{\}\(\)\[\]\?]/;
const indentifierReg = /[A-Za-z_$]/;
const identifierG = /[A-Za-z_$0-9]+/g;
const keywords = /^(?:var|const|let|function|return|throw|if|else|switch|case|default|for|in|while|do|break|continue|try|catch|finally|debugger|new)$/;
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
const _return = {type: 'return'};
const _throw = {type: 'throw'};
const _if = {type: 'if'};
const _else = {type: 'else'};
const _switch = {type: 'switch'};
const _case = {type: 'case'};
const _for = {type: 'for'};
const _in = {type: 'in'};
const _do = {type: 'do'};
const _while = {type: 'while'};
const _break = {type: 'break'};
const _continue = {type: 'continue'};
const _try = {type: 'try'};
const _catch = {type: 'catch'};
const _finally = {type: 'finally'};
const _default = {type: 'default'};
const _debugger = {type: 'debugger'};
const _question = {type: '?'};
const _new = {type: 'new'};
const _slash = {binop: 10};
const strictBadWords = /^(?:eval|arguments)$/;

const opTypes = {
    '/': _slash,
    '=': _eq,
    '+': {binop: 9, prefix: true,},
    '-': {binop: 9, prefix: true,},
    '++': {postfix: true, prefix: true, isUpdate: true},
    '--': {postfix: true, prefix: true, isUpdate: true},
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
    'function': _func,
    'return': _return,
    'throw': _throw,
    'if': _if,
    'else': _else,
    'switch': _switch,
    'case': _case,
    'default': _default,
    'for': _for,
    'in': _in,
    'while': _while,
    'do': _do,
    'break': _break,
    'continue': _continue,
    'try': _try,
    'catch': _catch,
    'finally': _finally,
    'debugger': _debugger,
    '?': _question,
    'new': _new,
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
    '?': _question,
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
            parseVar(node);
            semicolon();
            return node;
        case _func:
            next();
            return parseFunction(node, true);
        case _slash:
            next();
            return node;
        case _braceL:
            return parseBlock();
        case _return:
            return parseReturn();
        case _throw:
            return parseThrow();
            semicolon();
        case _if:
            return parseIf();
        case _switch:
            return parseSwitch();
        case _break:
        case _continue:
            return parseBreak();
        case _semi:
            return parseEmpty();
        case _for:
            const n = startNode();
            next();
            expected(_parenL);
            if (tokType === _semi) {
                return parseFor(n, null);
            } else {
                if (tokType === _var) {
                    const temp = startNode();
                    const v = parseVar(temp);
                    if (tokType === _in) {
                        return parseForIn(n, v);
                    } else {
                        return parseFor(n, v);
                    }
                }
                const p = parseExpression();
                if (tokType === _in) {
                    checkLVal(p);
                    return parseForIn(n, p);
                } else {
                    return parseFor(n, p);
                }
            }
        case _while:
            return parseWhile();
        case _do:
            return parseDoWhile();
        case _debugger:
            return parseDebugger();
        case _try:
            return parseTry();
        default:
            const expr = parseExpression();
            if (lastTokType === _name && expr.type === 'Identifier' && eat(_colon)) {
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
    const expr = parseMayBeCondition();
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
            return parseObj();
        case _bracketL:
            return parseArray();
        case _func:
            next();
            return parseFunction(node, false);
        case _new:
            return parseNew()
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
    var oldInFunc = inFunction;
    inFunction = true;
    node.body = parseBlock(true);
    inFunction = oldInFunc;
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

function parseParenExpression() {
    expected(_parenL);
    const value = parseExpression();
    expected(_parenR);
    return value;
}

function parseObj() {
    const node = startNode();
    expected(_braceL);
    node.properties = [];
    let first = true;
    while (!eat(_braceR)) {
        if (first) {
            first = false;
        } else {
            expected(_comma);
            if (eat(_braceR)) {
                break;
            }
        }
        const n = startNode();
        n.method = false;
        n.shorthand = false;
        n.computed = false;
        n.key = parseExpression();
        expected(_colon);
        n.value = parseExpression(true);
        node.properties.push(finishNode(n, 'Property'));
    }
    return finishNode(node, 'ObjectExpression');
}

function parseArray() {
    const node = startNode();
    node.elements = [];
    expected(_bracketL);
    let first = true;
    while (!eat(_bracketR)) {
        if (first) {
            first = false
        } else {
            expected(_comma);
            if (eat(_bracketR)) {
                break;
            }
        }
        node.elements.push(parseExpression(true))
    }
    return finishNode(node, 'ArrayExpression');

}

function parseBreak() {
    const type = tokType === _break ? 'BreakStatement' : 'ContinueStatement';
    const node = startNode();
    next();
    node.label = null;
    semicolon();
    return finishNode(node, type);
}

function parseReturn() {
    if (!inFunction) {
        raise(tokStart, '"return" outside in function');
    }
    const node = startNode();
    next();
    if (semicolon()) {
        node.arguments = null;
    } else {
        node.arguments = parseExpression();
        semicolon();
    }
    return finishNode(node, 'ReturnStatement');
}

function parseThrow() {
    const node = startNode();
    next();
    node.argument = parseExpression();
    return finishNode(node, 'ThrowStatement');
}

function parseIf() {
    const node = startNode();
    next();
    node.test = parseParenExpression()
    node.consequent = parseStatement();
    if (eat(_else)) {
        node.alternate = parseStatement();
    }
    return finishNode(node, 'IfStatement');
}

function parseSwitch() {
    const node = startNode();
    next();
    node.discriminant = parseParenExpression();
    node.cases = [];
    expected(_braceL);
    for (let cur, sawDefault, oldToken; !eat(_braceR);) {
        if (tokType === _case || tokType === _default) {
            if (cur) {
                node.cases.push(finishNode(cur, 'SwitchCase'));
            }
            oldToken = tokType;
            cur = startNode();
            next();
            if (oldToken === _case) {
                cur.test = parseExpression();
            } else {
                if (sawDefault) {
                    raise(tokStart, 'multiple default clauses');
                }
                sawDefault = cur;
                cur.test = null;
            }
            cur.consequent = [];
            expected(_colon);
        } else {
            if (cur) {
                cur.consequent.push(parseStatement());
            } else {
                unexpected();
            }
        }
    }
    return finishNode(node, 'SwitchStatement');
}

function parseWhile() {
    const node = startNode();
    next();
    node.test = parseParenExpression();
    node.body = parseBlock();
    return finishNode(node, 'WhileStatement');
}

function parseDoWhile() {
    const node = startNode();
    next();
    node.body = parseBlock();
    expected(_while);
    node.test = parseParenExpression();
    return finishNode(node, 'DoWhileStatement');
}

function parseDebugger() {
    const node = startNode();
    next();
    semicolon();
    return finishNode(node, 'DebuggerStatement');
}

function parseTry() {
    const node = startNode();
    next();
    node.block = parseBlock();
    node.handler = null;
    node.finalizer = null;
    if (tokType === _catch) {
        const catchNode = startNode();
        next();
        expected(_parenL);
        const param = parseIdent();
        catchNode.param = param;
        if (strict && strictBadWords.test(param.name)) {
            raise(tokStart, `The keyword ${param.name} is reserved`)
        }
        expected(_parenR);
        catchNode.body = parseBlock();
        node.handler = finishNode(catchNode, 'CatchClause')
    }
    if (tokType === _finally) {
        const finalNode = startNode();
        next();
        finalNode.body = parseBlock();
    }
    if (!node.handler && !node.finalizer) {
        raise(node.start, 'Missing catch or finally clause');
    }
    return finishNode(node, 'TryStatement')
}

function parseEmpty() {
    const node = startNode();
    next();
    return finishNode(node, 'EmptyStatement');
}

function parseFor(node, init) {
    node.init = init;
    expected(_semi);
    if (tokType === _semi) {
        node.test = null
    } else {
        node.test = parseExpression();
    }
    expected(_semi);
    if (tokType === _parenR) {
        node.update = null
    } else {
        node.update = parseExpression();
    }
    expected(_parenR);
    node.body = parseBlock();
    return finishNode(node, 'ForStatement')
}

function parseForIn(node, left) {
    node.left = left;
    next();
    node.right = parseExpression();
    expected(_parenR);
    node.body = parseBlock();
    return finishNode(node, 'ForInStatement')
}

function parseNew() {
    const node = startNode();
    next();
    node.callee = parseExpression();
    node.arguments = tokType === _parenL ? parseParenExpression() : [];
    return finishNode(node, 'NewExpression');
}

function parseExprSubscripts() {
    return parseSubscript(parseInExpression());
}

function parseMaybeAssign() {
    const left = parseExprOp(parseMaybeUnary(), -1);
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

function parseMayBeCondition() {
    const expr = parseMaybeAssign();
    if (tokType === _question) {
        const node = copyNodeStart(expr);
        node.test = expr;
        next();
        node.consequent = parseExpression();
        expected(_colon);
        node.alternate = parseExpression();
        return finishNode(node, 'ConditionalExpression');
    }
    return expr
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
    const left = parseExprSubscripts();
    if (tokType.postfix) {
        const node = copyNodeStart(left);
        node.argument = left;
        node.operator = tokVal;
        node.prefix = false;
        next();
        return finishNode(node, 'UpdateExpression')
    }
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

function parseExprOp(left, low) {
    const proc = tokType.binop;
    if (proc !== null && proc > low) {
        const node = copyNodeStart(left);
        node.left = left;
        node.operator = tokVal;
        const type = logicReg.test(tokVal) ? 'LogicalExpression' : 'BinaryExpression';
        next();
        node.right = parseExpression();
        return finishNode(node, type);
    }
    return left;
}

function parseVar(node) {
    next();
    node.declarations = [];
    for (; ;) {
        const n = startNode();
        n.id = parseIdent();
        n.init = eat(_eq) ? parseExpression(true) : null;
        node.declarations.push(finishNode(n, 'VariableDeclarator'));
        if (!eat(_comma)) break;
    }
    return finishNode(node, "VariableDeclaration");
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
    if (tokenPos >= inputLen) {
        return finishToken(_eof);
    }
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
