const {replace, hasType} = require('../traverse');
const {template} = require('../template');

exports.ExportDefaultDeclaration = function (node) {
    const n = template('export-default', {
        DEFAULT: node.declaration,
    }, true);
    return n
}

exports.ExportNamedDeclaration = function (node) {
    const declaration = node.declaration;
    const nodes = [];
    if (declaration.type === 'FunctionDeclaration') {
        const n = template('export-assign', {
            KEY: declaration.id,
            VALUE: declaration,
        }, true);
        return n
    } else if (declaration.type === 'VariableDeclaration') {
        nodes.push(declaration);
        nodes.push(template('export-assign', {
            KEY: declaration.declarations[0].id,
            VALUE: declaration.declarations[0].id,
        }, true));
        return nodes
    }
    return node
}


