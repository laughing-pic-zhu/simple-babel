const {replace, hasType} = require('../traverse');

function execute(node) {
    node.type = 'FunctionExpression';
    node.expression = false;
    if (node.body.type !== 'BlockStatement') {
        node.body = {
            type: 'BlockStatement',
            body: [
                {
                    type: 'ReturnStatement',
                    argument: node.body,
                }
            ]
        }
    }

    if (hasType(node, 'ThisExpression')) {

    }
    return node;
}

module.exports = execute;
