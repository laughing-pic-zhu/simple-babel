const {errorWithNode} = require('../utils');
exports.Program =
    exports.BlockStatement =
        exports.ForStatement =
            exports.ForInStatement =
                exports.ForOfStatement = function (node, parent, duplicate, name) {
                    const constants = {};

                    function check(node) {
                        // if (node.type === 'VariableDeclaration' && node.kind === 'const') {
                        if (constants.hasOwnProperty(node.id.name)) {
                            errorWithNode(`Line${node.loc.start.line}:  ${node.id}is read-only`)
                        }
                        // }
                    }


                    return node;
                };
