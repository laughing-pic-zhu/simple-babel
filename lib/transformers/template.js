const {replace, hasType} = require('../traverse');
const {template} = require('../template');
const {transformMap} = require('../utils');

exports.TemplateLiteral = function (node) {
    const {expressions, quasis} = node;
    if (expressions.length === 0) {

    }
    const newNode = quasis.filter(({tail}) => {
        return !(tail && expressions.length !== 0)
    }).map(({value}) => {
        const {raw, cooked} = value;
        return {
            type: 'Literal',
            value: cooked,
            raw,
        }
    });
    console.log(newNode)

    return node
}