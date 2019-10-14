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

function errorWithNode(msg) {
    throw new Error(msg)
}

function isDeclaration(node) {
    const declarations = ['FunctionDeclaration', 'VariableDeclaration', 'ClassDeclaration', 'ImportDeclaration', 'ExportNamedDeclaration'];
    return declarations.indexOf(node.type) >= 0
}

function isAssignmentExpression(node) {
    return node.type === 'AssignmentExpression';
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

function getIds(node) {
    const ids = [node];
    for (; ids.length > 0;) {
        const n = ids.pop();
        const idType = idTypes[n.type];
        const arrayType = arrayTypes[n.type];
        if (idType) {
            return n[idType].name;
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
    getIds,
}