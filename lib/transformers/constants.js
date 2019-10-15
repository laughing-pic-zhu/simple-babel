const {errorWithNode, isDeclaration, isAssignmentExpression, getIds} = require('../utils');
const {traverse,} = require('../traverse');
exports.Program =
    exports.BlockStatement =
        exports.ForStatement =
            exports.ForInStatement =
                exports.ForOfStatement = function (nodes) {
                    const constants = {};

                    function check(node, name) {
                        if (constants.hasOwnProperty(name)) {
                            errorWithNode(node, `${name} is read-only`)
                        }
                    }

                    nodes.body.forEach(node => {
                        if (node.type === 'VariableDeclaration' && node.kind === 'const') {
                            node._ignoreConst = true;
                            node.declarations.forEach(declaration => {
                                declaration._ignoreConst = true;
                                check(node, declaration.id.name);
                                constants[declaration.id.name] = true;
                                node.kind = 'let';
                            })
                        }
                    });
                    traverse(nodes, (node) => {
                        if (node._ignoreConst) {
                            return true
                        }
                        if (node.type === 'VariableDeclarator' || isDeclaration(node) || isAssignmentExpression(node)) {
                            check(node, getIds(node));
                        }
                    });
                    return nodes;
                };
