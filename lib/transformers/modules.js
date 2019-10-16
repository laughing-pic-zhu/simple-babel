const {template} = require('../template');

exports.ExportDefaultDeclaration = function (node) {
    const n = template('export-default', {
        DEFAULT: node.declaration,
    }, true);
    return n
}

exports.ExportNamedDeclaration = function (node) {
    const {declaration, specifiers, source} = node;
    const nodes = [];
    if (declaration) {
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
    } else if (specifiers) {
        specifiers.forEach(specifier => {
            const {local, exported} = specifier;
            const x = template('export-assign', {
                KEY: exported,
                VALUE: local,
            }, true);
            if (source) {
                x.expression.right = template('export-require', {
                    PATH: source,
                    KEY: x.expression.right
                }, true);
            }
            nodes.push(x);
        });
        return nodes
    }
    return node
}

exports.ExportAllDeclaration = function (node) {
    const {source} = node;
    const n = template('export-all', {
        PATH: source,
    }, true);
    return n
}

exports.ImportDeclaration = function (node) {
    const {source, specifiers} = node;
    const nodes = [];
    specifiers.forEach(specify => {
        const {local, imported, type,} = specify;
        if (type === 'ImportSpecifier') {
            nodes.push(template('import-alias', {
                SOURCE: source,
                NAME: local,
                KEY: imported,
            }, true));
        } else if (type === 'ImportDefaultSpecifier') {
            nodes.push(template('import-default', {
                SOURCE: source,
                NAME: local,
            }, true));
        } else if (type === 'ImportNamespaceSpecifier') {
            nodes.push(template('import-default', {
                SOURCE: source,
                NAME: local,
            }, true));
        }
    });

    return nodes
}
