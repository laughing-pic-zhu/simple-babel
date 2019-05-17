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
let allowRegexp = true;
const puncChars = /[\.:,;\{\}\(\)\[\]\?]/;
const indentifierReg = /[A-Za-z_$]/;
const identifierG = /[A-Za-z_$0-9]+/g;
const keywords = /^(?:var|const|let|function|return|throw|if|else|switch|case|default|for|in|while|do|break|continue|try|catch|finally|debugger|new|this|null|true|false|delete|void|typeof|instanceof)$/;
const strictReservedWords = /^(?:implements|interface|let|package|private|protected|public|static|yield)$/;
const operatorChar = /[+\-\*%\/=>\|&\!\~<>]/;
const digest = /\d/;
const newline = /[\n\r\u2028\u2029]/;
const logicReg = /&&|\|\|/;
const reFlags = /^[gimuy]*$/;

const _eof = {type: "eof"};
const _name = {type: 'name'};
const _num = {type: 'number'};
const _string = {type: 'string'};
const _semi = {type: ';', beforeExpr: true};
const _comma = {type: ',', beforeExpr: true};
const _dot = {type: '.'};
const _braceL = {type: '{', beforeExpr: true};
const _braceR = {type: '}'};
const _bracketL = {type: '[', beforeExpr: true};
const _bracketR = {type: ']'};
const _parenL = {type: '(', beforeExpr: true};
const _parenR = {type: ')'};
const _var = {type: 'var'};
const _colon = {type: ':', beforeExpr: true};
const _func = {type: 'function'};
const _eq = {type: 'isAssign'};
const _return = {type: 'return'};
const _throw = {type: 'throw'};
const _if = {type: 'if'};
const _else = {type: 'else', beforeExpr: true};
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
const _question = {type: '?', beforeExpr: true};
const _new = {type: 'new'};
const _slash = {binop: 10, beforeExpr: true};
const _regexp = {type: 'regexp'};
const _this = {type: 'this'};
const _null = {type: 'null', atomValue: null};
const _true = {type: 'true', atomValue: true};
const _false = {type: 'false', atomValue: false};
const _void = {type: 'void', prefix: true, beforeExpr: true};
const _typeof = {type: 'typeof', prefix: true, beforeExpr: true};
const _delete = {type: 'delete', prefix: true, beforeExpr: true};
const _instanceof = {type: 'instanceof', binop: 7, beforeExpr: true};
const _arrow = {type: '=>', beforeExpr: true};
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
    '>': {binop: 7},
    '>=': {binop: 7},
    '>>': {binop: 8},
    '>>>': {binop: 8},
    '<': {binop: 7},
    '<=': {binop: 7},
    '<<': {binop: 8},
    '<<<': {binop: 8},
    '||': {binop: 1},
    '&&': {binop: 2},
    '|': {binop: 3},
    '&': {binop: 5},
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
    'this': _this,
    'null': _null,
    'true': _true,
    'false': _false,
    'void': _void,
    'typeof': _typeof,
    'delete': _delete,
    'instanceof': _instanceof,
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
    initTokenState();
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
    lastStart = tokStart;
    lastEnd = tokEnd;
    return finishNode(node, 'Program');
}

function parseStatement() {
    const node = startNode();
    const lastTokType = tokType;
    switch (tokType) {
        case _var:
            return parseVarStatement(node);
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
                    finishNode(v, 'VariableDeclaration');
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
            return finishNode(node, 'ExpressionStatement');
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

function parseBasicExpression() {
    const node = startNode();
    switch (tokType) {
        case _string:
        case _num:
        case _regexp:
            node.value = tokVal;
            node.raw = input.slice(tokStart, tokEnd);
            next();
            return finishNode(node, 'Literal');
        case _null:
        case _true:
        case _false:
            node.value = tokType.atomValue;
            node.raw = tokVal;
            next();
            return finishNode(node, 'Literal');
        case _name:
            node.value = tokVal;
            next();
            finishNode(node, 'Identifier')
            if (tokType === _arrow) {
                return parseArrowFunction(node, [node]);
            }
            return node;
        case _parenL:
            next();
            let val;
            let exprList;
            if (tokType !== _parenR) {
                val = parseExpression();
                exprList = val.type === 'SequenceExpression' ? val.expression : [val];
            } else {
                exprList = [];
            }
            expected(_parenR);
            if (tokType === _arrow) {
                return parseArrowFunction(node, exprList);
            } else if (!val) {
                unexpected();
            }
            return val;
        case _braceL:
            return parseObj();
        case _bracketL:
            return parseArray();
        case _func:
            next();
            return parseFunction(node, false);
        case _new:
            return parseNew();
        case _this:
            next();
            return finishNode(node, 'thisExpression');
        default:
            unexpected();
    }
}

function parseIdent(flag) {
    const node = startNode();
    if (tokType !== _name) {
        if (flag) {
            node.name = tokType.type;
        } else {
            unexpected();
        }
    } else {
        node.name = tokVal;
    }
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

function parseVarStatement(node) {
    const n = parseVar(node);
    semicolon();
    return finishNode(n, 'VariableDeclaration');
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
        n.kind = 'init';
        n.key = parsePropertyName();
        expected(_colon);
        n.value = parseExpression(true);
        node.properties.push(finishNode(n, 'Property'));
    }
    return finishNode(node, 'ObjectExpression');
}

function parsePropertyName() {
    if (tokType === _num || tokType === _name) {
        return parseBasicExpression();
    }
    return parseIdent(true);
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
        if (tokType === _comma) {
            node.elements.push(null)
        } else {
            node.elements.push(parseExpression(true))
        }

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
    node.computed = false;
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
    for (let cur, sawDefault, oldToken; ;) {
        // !eat(_braceR)
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
        } else if (tokType === _braceR) {
            node.cases.push(finishNode(cur, 'SwitchCase'));
            next();
            break;
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
    if (eat(_finally)) {
        const finalNode = startNode();
        finalNode.body = parseBlock();
        node.finalizer = finishNode(finalNode, 'BlockStatement');
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

function parseArrowFunction(n, list) {
    const node = copyNodeStart(n);
    node.id = null;
    node.generator = false;
    node.params = list;
    next();
    if (tokType === _braceL) {
        node.expression = false;
        node.body = parseBlock();
    } else {
        node.expression = true;
        node.body = parseExpression();
    }
    return finishNode(node, 'ArrowFunctionExpression')
}

function parseExprSubscripts() {
    return parseSubscript(parseBasicExpression());
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
        node.argument = parseExpression();
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
        node.right = parseExprOp(parseExprSubscripts(), proc);
        const exprNode = finishNode(node, type);
        return parseExprOp(exprNode, low)
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
    return stmt.type === 'ExpressionStatement' && stmt.expression.type === 'Literal' && stmt.expression.value === 'use strict'
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

function readWord1(startSpecial) {
    identifierG.lastIndex = tokenPos;
    const array = identifierG.exec(input);
    const word = array && array[0] || '';
    if (word) {
        tokenPos = tokenPos + word.length;
        if (keywords.test(word)) {
            tokType = keywordTypes[word];
        } else if (strict && strictReservedWords.test(word)) {
            raise(tokStart, `The keyword "${word}" is reserved`);
        }
        return word;
    }
    return word;
}

function readWord() {
    tokType = _name;
    const word = readWord1();
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
    let type = opTypes[op];
    if (op === '=' && input.charAt(tokenPos) === '>') {
        tokenPos++;
        type = _arrow;
    }
    return finishToken(type, op);
}

function readRegex() {
    tokenPos++;
    let content = '', escaped = false, inClass = false, start = tokenPos;
    for (; ;) {
        if (tokenPos > inputLen) {
            raise(start, 'Unterminated regular expression')
        }
        const ch = input.charAt(tokenPos);
        if (newline.test(ch)) {
            raise(tokenPos, 'Invalid regular expression:missing /')
        }
        if (!escaped) {
            if (ch === '/' && !inClass) {
                break
            }
            if (ch === '[') {
                inClass = true;
            } else if (ch === ']' && inClass) {
                inClass = false;
            }
            escaped = ch === '\\';
        } else {
            escaped = false;
        }
        tokenPos++;
    }
    content = input.slice(start, tokenPos);
    tokenPos++;
    const word = readWord1();
    return finishToken(_regexp, new RegExp(content, word))
}

function readToken() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    tokStart = tokenPos;
    const ch = input.charAt(tokenPos);
    if (tokenPos >= inputLen) {
        return finishToken(_eof);
    }
    if (allowRegexp && ch === '/') {
        readRegex();
    } else if (ch === '\'' || ch === '"') {
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
    allowRegexp = type.beforeExpr;
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
                break;
            }
        } else if (ch === '\n' || ch === '\t' || ch === " " || ch === "\r" || ch === "\f") {
            ++tokenPos;
        } else {
            break;
        }
    }
}

function initTokenState() {
    tokenPos = 0;
    lastStart = 0;
    lastEnd = 0;
    tokVal = '';
    tokType = '';
    tokStart = 0;
    tokEnd = 0;
    strict = false;
    inFunction = false;
    allowRegexp = true;
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
