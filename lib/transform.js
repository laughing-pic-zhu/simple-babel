const {replace} = require('./traverse');
const arrowFunction = require('./transformers/arrow-function');
const blockBind = require('./transformers/block-bind');
const classes = require('./transformers/class');
const defaultParameters = require('./transformers/default-parameters');
const modules = require('./transformers/modules');
const propertyMethod = require('./transformers/property-method');
const spread = require('./transformers/spread');
const template = require('./transformers/template');
const forOf = require('./transformers/forOf');
const constants = require('./transformers/constants');
const acorn = require('./acorn');
const utils = require('./utils');
const escodegen = require('escodegen');

function transform(code) {
    const tree = acorn.parse(code);
    var generateUUid = utils.buildUuid();
    Object.keys(types).forEach(type => {
        replace(tree, (node, parent) => {
            const fn = types[type][node.type];
            if (fn) {
                return fn(node, parent, generateUUid);
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
    propertyMethod,
    spread,
    template,
    forOf,
    constants,
};

module.exports = transform;