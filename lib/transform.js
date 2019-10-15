const {replace, traverse, Delete} = require('./traverse');
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
    clearEmptyNode(tree);
    const generateUUid = utils.buildUuid();
    Object.keys(types).forEach(type => {
        if (tree.type === 'Program') {
            const fn = types[type].Program;
            if (fn) {
                fn(tree)
            }
        }
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

function clearEmptyNode(nodes) {
    replace(nodes, (node) => {
        if (node.type === 'EmptyStatement') {
            return Delete;
        }
    })
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