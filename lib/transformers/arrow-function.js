const {hasType} = require('../traverse');
const {template} = require('../template');

exports.ArrowFunctionExpression = function (node) {
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
        return template('function-bind-this', {
            FUNCTION: node
        })
    }
    return node;
}
