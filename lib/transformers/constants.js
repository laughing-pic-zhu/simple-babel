const {errorWithNode, isDeclaration, isAssignmentExpression, getId, isVar} = require('../utils');
const traverse = require('../traverse');
const _ = require('lodash');
exports.Program =
    exports.BlockStatement =
        exports.ForStatement =
            exports.ForInStatement =
                exports.ForOfStatement = function (nodes,) {
                    const constants = {};

                    function check(node, names, scope) {
                        Object.keys(names).forEach(name => {
                            if (scope) {
                                if (scope.get(name) === names[name]) {
                                    return
                                }
                            }

                            if (constants.hasOwnProperty(name)) {
                                errorWithNode(node, `${name} is read-only`)
                            }
                        })

                    }

                    _.each(nodes.body, node => {
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

                    traverse(nodes, {
                        enter: (node, parent, scope) => {
                            if (node._ignoreConst) {
                                return false
                            }
                            if (isVar(node)) {
                                return
                            }
                            if (node.type === 'VariableDeclarator' || isDeclaration(node) || isAssignmentExpression(node)) {
                                check(node, getId(node), scope);
                            }
                        }
                    });
                    return nodes;
                };
