const {replace, hasType} = require('../traverse');
const {template} = require('../template');
exports.ForOfStatement = function (node, parent, generateUUid) {
    const {left, right} = node;
    const key = left.declarations[0].id;
    const n = template('for-of', {
        OBJECT: right,
        ITERATOR_KEY: {
            type: 'Identifier',
            name: generateUUid('key'),
        },
        STEP_KEY: {
            type: 'Identifier',
            name: generateUUid('step'),
        },
        KEY:key
    });
    n.body.body = n.body.body.concat(node.body.body);
    return n;
}
