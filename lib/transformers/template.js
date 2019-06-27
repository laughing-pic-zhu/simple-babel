const {replace, hasType} = require('../traverse');
const {template} = require('../template');
const {transformMap} = require('../utils');

exports.TemplateLiteral = function (node) {
    const {expressions, quasis} = node;
    const nodes = [];
    quasis.forEach(({value}) => {
        const {raw, cooked} = value;
        nodes.push({
            type: 'Literal',
            value: cooked,
            raw,
        });
        if (expressions.length > 0) {
            nodes.push(expressions.shift())
        }
    });
    if (nodes.length > 1) {
        const lastNode = nodes.pop();
        let n = buildBinaryExpression(nodes.shift(), nodes.shift());
        while (nodes.length > 0) {
            n = buildBinaryExpression(n, nodes.shift())
        }
        if (lastNode.value) {
            return buildBinaryExpression(n, lastNode);
        }
        return n
    } else {
        return nodes[0]
    }
}

function buildBinaryExpression(left, right) {
    return {
        type: 'BinaryExpression',
        operator: '+',
        left,
        right,
    }
}