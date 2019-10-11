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
let allowSuper = false;
let inTemplate = false;
const indentifierReg = /[A-Za-z_$]/;
const identifierG = /[A-Za-z_$0-9]+/g;
const keywords = /^(?:var|const|let|class|constructor|extends|static|super|function|return|throw|if|else|switch|case|default|for|in|while|do|break|continue|try|catch|finally|debugger|new|this|null|true|false|delete|void|typeof|instanceof|export|as|from|import|of)$/;
const strictReservedWords = /^(?:implements|interface|let|package|private|protected|public|yield)$/;
const operatorChar = /[+\-\*%=>\|&\!\~<>]/;
const newline = /[\n\r\u2028\u2029]/;
const lineBreak = /[\n\r\u2028\u2029]/g;
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
const _export = {type: 'export'};
const _as = {type: 'as'};
const _from = {type: 'from'};
const _import = {type: 'import'};
const _var = {type: 'var'};
const _let = {type: 'let'};
const _const = {type: 'const'};
const _class = {type: 'class'};
const _extends = {type: 'extend'};
const _static = {type: 'static'};
const _constructor = {type: 'constructor'};
const _super = {type: 'super'};
const _colon = {type: ':', beforeExpr: true};
const _func = {type: 'function'};
const _eq = {type: 'isAssign', beforeExpr: true};
const _assign = {type: 'isAssign', beforeExpr: true};
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
const _of = {type: 'of'};
const _question = {type: '?', beforeExpr: true};
const _new = {type: 'new'};
const _slash = {binop: 10, beforeExpr: true};
const _star = {binop: 10,};
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
const _ellipsis = {type: '...'};
const _quote = {type: '`'};
const _dollarBrace = {type: '${'};
const _modulo = {binop: 10};
const _plus = {binop: 9, prefix: true,};
const _min = {binop: 9, prefix: true,};
const _incDes = {postfix: true, prefix: true, isUpdate: true};
const _prefix = {prefix: true,};
const _equality = {binop: 6};
const _bitWiseOR = {binop: 3};
const _bitWiseAND = {binop: 5};
const _logicalOR = {binop: 1};
const _logicalAND = {binop: 2};
const _relational = {binop: 7};
const _bitShift = {binop: 8};
const strictBadWords = /^(?:eval|arguments)$/;

const defaultOption = {
    loc: true
};
let options = {};

const keywordTypes = {
    'export': _export,
    'as': _as,
    'from': _from,
    'import': _import,
    'var': _var,
    'const': _const,
    'let': _let,
    'class': _class,
    'extends': _extends,
    'static': _static,
    'constructor': _constructor,
    'super': _super,
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
    'of': _of,
};

function parse(inpt, option = {}) {
    initTokenState(option);
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
        case _let:
        case _const:
            return parseVarStatement(node);
        case _func:
            next();
            return parseFunction(node, true);
        case _class:
            return parseClassDeclaration(node, true);
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
                if (tokType === _var || tokType === _let || tokType === _const) {
                    const temp = startNode();
                    const v = parseVar(temp);
                    finishNode(v, 'VariableDeclaration');
                    if (tokType === _in) {
                        return parseForIn(n, v);
                    } else if (tokType === _of) {
                        return parseForOf(n, v);
                    } else {
                        return parseFor(n, v);
                    }
                }
                const p = parseExpression();
                if (tokType === _in) {
                    checkLVal(p);
                    return parseForIn(n, p);
                } else if (tokType === _of) {
                    return parseForOf(n, p);
                } else {
                    return parseFor(n, p);
                }
            }
        case
        _while:
            return parseWhile();
        case
        _do:
            return parseDoWhile();
        case
        _debugger:
            return parseDebugger();
        case
        _try:
            return parseTry();
        case
        _export:
            return parseExportDeclaration();
        case
        _import:
            return parseImportDeclaration();
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
            const oldTokType = tokType;
            node.expression.push(parseMaybeAssign());
            if (oldTokType === _ellipsis && tokType === _comma) {
                raise(tokStart, 'Comma is not permitted after the rest element');
            }
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
            const n = parseIdent();
            if (tokType === _arrow) {
                return parseArrowFunction(n, [n]);
            }
            return n;
        case _super:
            if (!allowSuper) {
                unexpected();
            }
            next()
            return finishNode(node, 'Super');
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
            let oldLastPos = tokStart;
            expected(_parenR);
            if (tokType === _arrow) {
                return parseArrowFunction(node, exprList);
            } else {
                if (!val) {
                    unexpected(oldLastPos);
                }
                if (Array.isArray(val.expression) && val.expression.some(({type}) => type === 'RestElement')) {
                    unexpected(oldLastPos);
                }
            }
            return val;
        case _braceL:
            return parseObj();
        case _bracketL:
            return parseArray();
        case _func:
            next();
            return parseFunction(node, false);
        case _class:
            return parseClassDeclaration(node, false);
        case _new:
            return parseNew();
        case _this:
            next();
            return finishNode(node, 'ThisExpression');
        case _ellipsis:
            return parseRestElement();
        case _quote:
            return parseTemplateLiteral();
        default:
            unexpected();
    }
}

function parseIdent() {
    const node = startNode();
    if (tokType !== _name) {
        if (keywords.test(tokType.type)) {
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

function parseFunction(node, isStatement, limitName) {
    if (tokType === _name) {
        node.id = parseIdent();
    } else if (!isStatement || limitName) {
        node.id = null;
    } else {
        unexpected();
    }
    expected(_parenL);
    node.params = [];
    node.expression = false;
    node.generator = false;
    let first = true;
    while (!eat(_parenR)) {
        if (first) {
            first = false
        } else {
            expected(_comma);
        }
        let n;
        if (tokType === _ellipsis) {
            n = parseRestElement();
            if (tokType === _comma) {
                raise(tokStart, 'Comma is not permitted after the rest element');
            }
        } else {
            const iden = parseIdent();
            if (tokType === _eq) {
                n = copyNodeStart(iden);
                n.left = iden;
                next();
                n.right = parseExpression(true);
                debugger
                finishNode(n, 'AssignmentPattern');
            } else {
                n = iden;
            }
        }
        node.params.push(n);
    }
    var oldInFunc = inFunction;
    inFunction = true;
    node.body = parseBlock(true);
    inFunction = oldInFunc;
    const type = isStatement ? 'FunctionDeclaration' : 'FunctionExpression';
    return finishNode(node, type);
}

function parseExportDeclaration() {
    const node = startNode();
    next();
    let first = true;
    let type = 'ExportNamedDeclaration';
    if (tokType === _braceL) {
        node.specifiers = [];
        node.declaration = null;
        next();
        while (!eat(_braceR)) {
            if (first) {
                first = false
            } else {
                expected(_comma);
                if (eat(_braceR)) {
                    break;
                }
            }
            const n = startNode();
            n.local = parseIdent();
            if (tokType === _as) {
                next();
                n.exported = parseIdent()
            } else {
                n.exported = n.local;
            }
            node.specifiers.push(finishNode(n, 'ExportSpecifier'));
        }
        if (tokType === _from) {
            next();
            node.source = tokType === _string ? parseBasicExpression() : unexpected();
        } else {
            node.source = null;
        }
        semicolon();
    } else if (tokType === _default) {
        next();
        if (tokType === _func) {
            const _n = startNode()
            next();
            node.declaration = parseFunction(_n, true, true);
        } else if (tokType === _class) {
            const _n = startNode()
            node.declaration = parseClassDeclaration(_n, true, true);
        } else {
            node.declaration = parseExpression(true);
        }
        type = 'ExportDefaultDeclaration';
        semicolon();
    } else if (tokType === _var || tokType === _const || tokType === _let || tokType === _func || tokType === _class) {
        node.specifiers = [];
        node.source = null;
        node.declaration = parseStatement();
    } else if (tokType === _star) {
        type = 'ExportAllDeclaration';
        next();
        expected(_from)
        node.source = tokType === _string ? parseBasicExpression() : unexpected();
        semicolon();
    } else {
        unexpected()
    }
    return finishNode(node, type)
}

function parseImportDeclaration() {
    const node = startNode();
    next();
    node.specifiers = [];
    if (tokType === _name) {
        const n = startNode();
        n.local = parseIdent();
        node.specifiers.push(finishNode(n, 'ImportDefaultSpecifier'));
        if (tokType === _comma) {
            next();
            parseImportSpecifier(node)
        }
    }
    else if (tokType === _star) {
        const n = startNode();
        next();
        expected(_as);
        n.local = parseIdent();
        node.specifiers.push(finishNode(n, 'ImportNamespaceSpecifier'))
    } else {
        parseImportSpecifier(node);
    }
    expected(_from);
    node.source = tokType === _string ? parseBasicExpression() : unexpected();

    semicolon();
    return finishNode(node, 'ImportDeclaration');
}

function parseImportSpecifier(node) {
    eat(_braceL);
    let first = true;
    while (!eat(_braceR)) {
        if (first) {
            first = false
        } else {
            expected(_comma);
            if (eat(_braceR)) {
                break;
            }
        }
        const n = startNode();
        n.imported = parseIdent();
        if (tokType === _as) {
            next();
            n.local = parseIdent()
        } else {
            n.local = n.imported;
        }
        node.specifiers.push(finishNode(n, 'ImportSpecifier'));
    }
}

function parseRestElement() {
    const node = startNode();
    next();
    node.argument = tokType === _name ? parseIdent() : unexpected();
    return finishNode(node, 'RestElement');
}

function parseSpreadEelement() {
    const node = startNode();
    next();
    node.argument = parseExpression(true);
    return finishNode(node, 'SpreadElement');
}

function parseTemplateLiteral() {
    const node = startNode();
    node.expressions = [];
    node.quasis = [];
    node.value = '';
    inTemplate = true;
    next();
    for (; ;) {
        const n = startNode();
        n.value = {
            raw: input.slice(tokStart, tokEnd),
            cooked: tokVal,
        };
        n.tail = false;
        next();
        inTemplate = false;
        finishNode(n, 'TemplateElement');
        node.quasis.push(n);
        next();
        if (tokType === _quote) {
            n.tail = true;
            next();
            break;
        }
        node.expressions.push(parseExpression());
        inTemplate = true;
        tokenPos = tokEnd;
        expected(_braceR);
    }
    inTemplate = false;
    return finishNode(node, 'TemplateLiteral')
}

function parseVarStatement(node) {
    const n = parseVar(node);
    semicolon();
    return finishNode(n, 'VariableDeclaration');
}

function parseClassDeclaration(node, isStatement, limitName) {
    next();
    if (tokType === _name) {
        node.id = parseIdent();
    } else if (!isStatement || limitName) {
        node.id = null;
    } else {
        unexpected();
    }
    node.superClass = eat(_extends) ? parseExprSubscripts() : null;
    const bodyNode = startNode();
    expected(_braceL);
    bodyNode.body = [];
    while (!eat(_braceR)) {
        if (parseClassElement()) {
            const methodNode = startNode();
            methodNode.static = false;
            if (tokType === _static) {
                methodNode.static = true;
                methodNode.kind = 'method';
                next();
            } else if (tokType === _constructor) {
                methodNode.kind = 'constructor'
            } else if (tokType === _name) {
                if (tokVal === 'set' || tokVal === 'get') {
                    methodNode.kind = tokVal;
                    next()
                } else {
                    methodNode.kind = 'method';
                }
            }
            methodNode.key = parseIdent();
            methodNode.computed = false;
            allowSuper = node.superClass !== null;
            methodNode.value = parseFunction(startNode(), false);
            allowSuper = false;
            bodyNode.body.push(finishNode(methodNode, 'MethodDefinition'));
        } else {
            next()
        }
    }
    node.body = finishNode(bodyNode, 'ClassBody');
    return finishNode(node, isStatement ? 'ClassDeclaration' : 'ClassExpression')
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

        let n;
        if (tokType === _ellipsis) {
            n = parseSpreadEelement()
        } else {
            n = startNode();
            n.computed = false;
            parsePropertyName(n);
            if ((n.key.name === 'set' || n.key.name === 'get') && tokType === _name) {
                n.kind = n.key.name;
                parsePropertyName(n);
            } else {
                n.kind = 'init';
            }
            if (tokType === _colon) {
                n.shorthand = false;
                n.method = false;
                next();
                n.value = parseExpression(true);
            } else if (tokType === _comma || tokType === _braceR) {
                n.shorthand = true;
                n.method = false;
                n.value = n.key;
            } else {
                n.shorthand = false;
                n.method = true;
                n.value = parseFunction(startNode(), false);
            }

            if (n.kind === 'set' && n.value.params.length !== 1) {
                raise(n.value.start, 'setter should have exactly one param');
            } else if (n.kind === 'get' && n.value.params.length !== 0) {
                raise(n.value.start, 'getter should have no params');
            }
            finishNode(n, 'Property')
        }

        node.properties.push(n);
    }
    return finishNode(node, 'ObjectExpression');
}

function parsePropertyName(node) {
    if (eat(_bracketL)) {
        node.key = parseExpression(true);
        node.computed = true;
        expected(_bracketR);
    } else {
        node.computed = false;
        if (tokType === _num || tokType === _name) {
            node.key = parseBasicExpression();
        } else {
            node.key = parseIdent();
        }
    }
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
        let elt;
        if (tokType === _comma) {
            elt = null;
        } else if (tokType === _ellipsis) {
            elt = parseSpreadEelement();
        } else {
            elt = parseExpression(true);
        }
        node.elements.push(elt)
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
        node.argument = null;
    } else {
        node.argument = parseExpression();
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

function parseForOf(node, left) {
    node.left = left;
    next();
    node.right = parseExpression();
    expected(_parenR);
    node.body = parseBlock();
    return finishNode(node, 'ForOfStatement')
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
    if (tokType.type === 'isAssign') {
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
        return parseSubscript(finishNode(node, 'CallExpression'));
    } else if (eat(_bracketL)) {
        const node = copyNodeStart(base);
        node.object = base;
        node.property = parseExpression(true);
        eat(_bracketR);
        node.computed = true;
        return parseSubscript(finishNode(node, 'MemberExpression'));
    }
    return base
}

function parseExprList() {
    const extr = [];
    let first = true;
    while (!eat(_parenR)) {
        if (first) {
            first = false;
        } else {
            expected(_comma);
        }
        let exp;
        if (tokType === _ellipsis) {
            exp = parseSpreadEelement();
        } else {
            exp = parseExprSubscripts();
        }
        extr.push(exp);
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
    node.kind = tokVal;
    const oldToken = tokType;
    next();
    node.declarations = [];
    for (; ;) {
        const n = startNode();
        n.id = parseIdent();
        n.init = eat(_eq) ? parseExpression(true) : oldToken === _const ? unexpected() : null;
        node.declarations.push(finishNode(n, 'VariableDeclarator'));
        if (!eat(_comma)) break;
    }
    return node;
}

function copyNodeStart(node) {
    const obj = {
        type: null,
    };
    if (options.loc) {
        obj.start = node.start;
    }
    obj.loc = node.loc;
    return obj
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
    const obj = {
        type: null,
    };
    if (options.loc) {
        obj.start = tokStart;
    }
    const {line, column} = getLineInfo(input, tokStart);
    obj.loc = {
        start: {
            line,
            column
        }
    }
    return obj
}

function finishNode(node, type) {
    node.type = type;
    if (options.loc) {
        node.end = lastEnd;
    }
    const {line, column} = getLineInfo(input, lastEnd);
    node.loc.end = {
        line,
        column
    };
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
        const code = input.charCodeAt(tokenPos);
        if (tokenPos >= inputLen) {
            raise(tokStart, 'Unterminated string constant')
        }
        if (code === 92) {
            str += readEscapedChar();
        } else if (code === quote) {
            tokenPos++;
            finishToken(tokType, str);
            break;
        } else {
            ++tokenPos;
            str += String.fromCharCode(code);
        }
    }
}

function readEscapedChar() {
    tokenPos++;
    const code = input.charCodeAt(tokenPos);
    tokenPos++;
    switch (code) {
        case 110:
            return '\n';
        case 114:
            return '\r';
        case 116:
            return '\f';
        default:
            return String.fromCharCode(code);
    }
}

function getTokenTemplate() {
    const code = input.charCodeAt(tokenPos);
    // ${ 必须在字符串后面解析
    if (tokType === _string) {
        if (code === 36 && input.charCodeAt(tokenPos + 1) === 123) {
            tokenPos += 2;
            return finishToken(_dollarBrace);
        }
    } else if (code === 125) {
        tokenPos++;
        return finishToken(_braceR, undefined, true);
    }
    readTemplateString();
}

function parseClassElement() {
    if (tokType === _semi) {
        return null
    }
    return true
}

function readTemplateString() {
    tokType = _string;
    let str = '';

    for (; ;) {
        const code = input.charCodeAt(tokenPos);
        if (tokenPos >= inputLen) {
            raise(tokStart, 'Unterminated template')
        }
        if (code === 92) {
            str += readEscapedChar();
        }
        else if (code === 96 || code === 36 && input.charCodeAt(tokenPos + 1) === 123) {
            finishToken(_string, str);
            break;
        }
        else {
            ++tokenPos;
            str += String.fromCharCode(code);
        }
    }
    return str
}

function readNumber(isStartWithDot) {
    let isFloat = false;
    let val;
    tokType = _num;
    readInt(10);
    if (input.charCodeAt(tokenPos) === 46) {
        tokenPos++;
        isFloat = true;
        readInt(10);
    }
    const str = input.slice(tokStart, tokenPos);
    if (isFloat) {
        val = parseFloat(str);
    } else {
        val = parseInt(str, 10);
    }

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

function readToken_dot() {
    const next = input.charCodeAt(tokenPos + 1);
    if (next >= 48 && next < 57) {
        return readNumber(true)
    }
    const next1 = input.charCodeAt(tokenPos + 2);
    if (next === 46 && next1 === 46) {
        tokenPos += 3;
        return finishToken(_ellipsis)
    } else {
        tokenPos++;
        return finishToken(_dot);
    }
}

function readToken_slash() {
    if (allowRegexp) {
        return readRegex();
    }
    const next = input.charCodeAt(tokenPos + 1);
    if (next === 61) {
        tokenPos += 2;
        return finishToken(_assign, '/=');
    }
    tokenPos++;
    return finishToken(_slash, '/');
}

function readToken_eq_excl(code) {
    const next = input.charCodeAt(tokenPos + 1);
    if (next === 61) {
        return finishOp(_equality, input.charCodeAt(tokenPos + 2) === 61 ? 3 : 2);
    }
    if (code === 61 && next === 62) {
        return finishOp(_arrow, 2);
    }

    return finishOp(code === 61 ? _eq : _prefix, 1);
}

function readToken_modulo() {
    const next = input.charCodeAt(tokenPos + 1);
    if (next === 61) {
        tokenPos += 2;
        return finishToken(_assign, '%=');
    }
    tokenPos++;
    return finishToken(_modulo, '%');
}

function readToken_mult() {
    const next = input.charCodeAt(tokenPos + 1);
    if (next === 61) {
        tokenPos += 2;
        return finishToken(_assign, '*=');
    }
    tokenPos++;
    return finishToken(_star, '*');
}

function readToken_plus() {
    const next = input.charCodeAt(tokenPos + 1);
    if (next === 61) {
        tokenPos += 2;
        return finishToken(_assign, '+=');
    } else if (next === 43) {
        tokenPos += 2;
        return finishToken(_incDes, '++');
    }

    tokenPos++;
    return finishToken(_plus, '+');
}

function readToken_min() {
    const next = input.charCodeAt(tokenPos + 1);
    if (next === 61) {
        tokenPos += 2;
        return finishToken(_assign, '-=');
    } else if (next === 45) {
        tokenPos += 2;
        return finishToken(_incDes, '--');
    }
    tokenPos++;
    return finishToken(_min, '-');
}

function readToken_pipe_amp(code) {
    const next = input.charCodeAt(tokenPos + 1);
    if (next === code) {
        return finishOp(code === 124 ? _logicalOR : _logicalAND, 2)
    } else if (next === 61) {
        return finishOp(_assign, 2)
    }
    return finishOp(code === 124 ? _bitWiseOR : _bitWiseAND, 1);
}

function readToken_relation_bit(code) {
    const next = input.charCodeAt(tokenPos + 1);
    var size = 1;
    if (next === code) {
        size = code === 62 && input.charCodeAt(tokenPos + 2) === 62 ? 3 : 2;
        if (input.charCodeAt(tokenPos + size) === 61) {
            return finishOp(_assign, size + 1)
        }
        return finishOp(_bitShift, size);
    }
    size = next === 61 ? 2 : 1;
    return finishOp(_relational, size)
}

function readToken() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    tokStart = tokenPos;
    const ch = input.charAt(tokenPos);
    const code = input.charCodeAt(tokenPos);
    if (tokenPos >= inputLen) {
        return finishToken(_eof);
    }

    if (inTemplate) {
        return getTokenTemplate();
    }
    const token = getTokenFromCode(code);
    if (!token) {
        if (indentifierReg.test(ch) || code === 92) {
            readWord();
        }
    }
    return token
}

function getTokenFromCode(code) {
    switch (code) {
        case 34:
        case 39:
            return readString(code);
        case 46:
            return readToken_dot();

        // cal operator
        case 33:
        case 61: //!=
            return readToken_eq_excl(code);
        case 126: //~
            return finishOp(_prefix, 1);
        case 60:
        case 62:
            return readToken_relation_bit(code);
        // assign operator
        case 37:
            return readToken_modulo();
        case 38:
        case 124:
            return readToken_pipe_amp(code);
        case 42:
            return readToken_mult();
        case 43:
            return readToken_plus();
        case 45:
            return readToken_min();
        case 47:
            return readToken_slash();
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            return readNumber(false);

        //punctuation
        case 44:
            tokenPos++;
            return finishToken(_comma);
        case 58:
            tokenPos++;
            return finishToken(_colon);
        case 59:
            tokenPos++;
            return finishToken(_semi);
        case 96:
            tokenPos++;
            return finishToken(_quote, undefined, true);
        case 123:
            tokenPos++;
            return finishToken(_braceL);
        case 125:
            tokenPos++;
            return finishToken(_braceR);
        case 40:
            tokenPos++;
            return finishToken(_parenL);
        case 41:
            tokenPos++;
            return finishToken(_parenR);
        case 91:
            tokenPos++;
            return finishToken(_bracketL);
        case 93:
            tokenPos++;
            return finishToken(_bracketR);
        case 63:
            tokenPos++;
            return finishToken(_question);
    }
}

function finishToken(type, str, isSkip) {
    tokEnd = tokenPos;
    tokType = type;
    tokVal = str;
    allowRegexp = type.beforeExpr;
    if (!isSkip) {
        skipSpace();
    }
    return type
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

function initTokenState(option) {
    tokenPos = 0;
    lastStart = 0;
    lastEnd = 0;
    tokVal = '';
    tokType = '';
    tokStart = 0;
    tokEnd = 0;
    strict = false;
    inFunction = false;
    inTemplate = false;
    allowRegexp = true;
    options = {...defaultOption, ...option};
}

function finishOp(type, size) {
    const val = input.slice(tokenPos, tokenPos + size);
    tokenPos += size;
    return finishToken(type, val)
}

function getLineInfo(input, offset) {
    let line = 1;
    let column = 0;
    lineBreak.lastIndex = 0;
    for (let cur = 0; ;) {
        const match = lineBreak.exec(input);
        if (match && match.index < offset) {
            line++;
            cur = lineBreak.lastIndex;
        } else {
            column = offset - cur;
            break
        }
    }

    return {
        line,
        column
    }
}

function expected(type) {
    if (tokType === type) {
        next()
    } else {
        unexpected()
    }
}

function unexpected(pos) {
    const p = pos ? pos : tokStart;
    raise(p, 'Unexpected token')
}

function raise(pos, message) {
    const {line, column} = getLineInfo(input, pos);
    message = `${message}(${line}:${column})`;
    throw new SyntaxError(message);
}

exports.parse = parse;
