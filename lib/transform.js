const {replace} = require('./traverse');
const arrowFunctionExpression = require('./transformers/arrow-function');
const acorn = require('./acorn');
const escodegen = require('escodegen');

function transform(code) {
    const tree = acorn.parse(code);
    const {body} = tree;
    replace(body, (node, parent) => {
        const fn = types[node.type];
        if (fn) {
            fn(node, parent);
        }
    });
    const result = escodegen.generate(tree);
    return result + '\n';
}

const types = transform.types = {
    'ArrowFunctionExpression': arrowFunctionExpression,
};

module.exports = transform;