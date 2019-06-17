const {replace} = require('./traverse');
const arrowFunction = require('./transformers/arrow-function');
const blockBind = require('./transformers/block-bind');
const classes = require('./transformers/class');
const defaultParameters = require('./transformers/default-parameters');
const modules = require('./transformers/modules');
const acorn = require('./acorn');
const escodegen = require('escodegen');

function transform(code) {
    const tree = acorn.parse(code);
    Object.keys(types).forEach(type => {
        replace(tree, (node, parent) => {
            const fn = types[type][node.type];
            if (fn) {
                return fn(node, parent);
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
    modules,
};

module.exports = transform;