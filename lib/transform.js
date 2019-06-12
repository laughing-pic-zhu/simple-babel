const {replace} = require('./traverse');
const arrowFunction = require('./transformers/arrow-function');
const blockBind = require('./transformers/block-bind');
const classes = require('./transformers/class');
const defaultParameters = require('./transformers/default-parameters');
const acorn = require('./acorn');
const escodegen = require('escodegen');

function transform(code) {
    const tree = acorn.parse(code);
    Object.keys(types).forEach(type => {
        replace(tree, (node, parent, key) => {
            const fn = types[type][node.type];
            if (fn) {
                const result = fn(node, parent);
                if (result) {
                    parent[key] = result;
                }
            }
        });
    });

    const result = escodegen.generate(tree);
    return result + '\n';
}

const types = transform.types = {
    arrowFunction,
    blockBind,
    classes,
    defaultParameters,
};

module.exports = transform;
