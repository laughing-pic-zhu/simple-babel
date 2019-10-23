const {template} = require('./template');

function transformMap(nodePrototype, map) {
    const properties = Object.keys(map).map(k => {
        const property = map[k];
        const mapProperties = Object.keys(property).map(_k => {
            return {
                type: 'Property',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                    type: 'Identifier',
                    name: _k,
                },
                value: property[_k],
                kind: '',
            }
        });
        return {
            type: 'Property',
            method: false,
            shorthand: false,
            computed: false,
            key: {
                type: 'Identifier',
                name: k,
            },
            value: {
                type: 'ObjectExpression',
                properties: mapProperties,
            },
            kind: '',
        }
    });
    const objectExpression = {
        type: 'ObjectExpression',
        properties,
    }

    return template('object-defined', {
        OBJECT: nodePrototype,
        MAP: objectExpression,
    }, true);
}

function buildUuid() {
    const obj = {};
    return function (name) {
        var i = obj[name] = obj[name] || 1;
        var id = '_' + name;
        if (i > 1) {
            id = name + i;
        }
        obj[name] += i;
        return id;
    }
}

function errorWithNode(node, msg) {
    const error = new Error(`Line ${node.loc.start.line}: ${msg}`);
    throw error;
}

function isDeclaration(node) {
    const declarations = ['FunctionDeclaration', 'VariableDeclaration', 'ClassDeclaration', 'ImportDeclaration', 'ExportNamedDeclaration'];
    return declarations.indexOf(node.type) >= 0
}

function isAssignmentExpression(node) {
    return node.type === 'AssignmentExpression';
}

function isFor(node) {
    const forStatement = ['ForStatement', 'ForInStatement', 'ForOfStatement'];
    return forStatement.indexOf(node.type) >= 0
}

function isProgram(node) {
    return node.type === 'Program';
}

function isBlockStatement(node) {
    return node.type === 'BlockStatement';
}

function isLet(node) {
    return node.type === 'VariableDeclaration' && node.kind === 'let'
}

function isVar(node) {
    return (node.type === 'VariableDeclaration' && node.kind !== 'let')
}

function isScope(node) {
    const scopes = ['BlockStatement', 'ArrowFunctionExpression', 'FunctionExpression', 'FunctionDeclaration', 'CatchClause', 'ForInStatement', 'ForOfStatement', 'ForStatement', 'Program'];
    return scopes.indexOf(node.type) >= 0
}

function isFunction(node) {
    const functions = ['FunctionDeclaration', 'FunctionExpression'];
    return functions.indexOf(node.type) >= 0
}

function isReference(node, parent) {
    // object的非computed的key
    if (parent.type === 'Property' && parent.computed === false) {
        return false
    }
    // 申明变量
    if (parent.type === 'VariableDeclarator' && parent.id === node) {
        return false
    }
    const isMemberExpression = parent.type === 'MemberExpression';
    const isObject = isMemberExpression && parent.object === node;
    const isComputed = parent.type === 'Property' && parent.computed === true;
    if (!isMemberExpression || isObject || isComputed) {
        return true
    }
    return false;
}

function isCatchClause(node) {
    return node.type === 'CatchClause';
}

const idTypes = {
    'FunctionDeclaration': 'id',
    'VariableDeclarator': 'id',
    'ClassDeclaration': 'id',
    'AssignmentExpression': 'left',
    'ExportSpecifier': 'local',
};

const arrayTypes = {
    'ImportDeclaration': 'specifiers',
    'ExportNamedDeclaration': 'specifiers',
    'VariableDeclaration': 'declarations',
};

function getId(node) {
    const ids = [node];
    for (; ids.length > 0;) {
        const n = ids.pop();
        const idType = idTypes[n.type];
        const arrayType = arrayTypes[n.type];
        if (n.type === 'Identifier') {
            return {
                [n.name]:n
            }
        } else if (idType) {
            return {
                [n[idType].name]: n,
            };
        } else if (arrayType) {
            n[arrayType].forEach(n => {
                ids.push(n);
            });
        }
    }
}

module.exports = {
    transformMap,
    buildUuid,
    errorWithNode,
    isDeclaration,
    isAssignmentExpression,
    isFor,
    isVar,
    isProgram,
    isBlockStatement,
    isLet,
    isScope,
    isFunction,
    isReference,
    isCatchClause,
    getId,
}