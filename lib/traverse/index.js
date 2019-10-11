const vistor = require('./visitor-keys.json');
const _ = require('lodash');

function traverse(node, callback) {
    if (Array.isArray(node)) {
        node.forEach(n => {
            traverse(n, callback)
        })
    } else if (node) {
        const array = vistor[node.type];
        if (Array.isArray(array)) {
            array.forEach(k => {
                const property = node[k];
                if (Array.isArray(property)) {
                    property.forEach((child, i) => {
                        if (child) {
                            callback(child, node, property, i)
                            traverse(child, callback);
                        }
                    });
                    node[k] = _.flatten(property);
                } else if (property) {
                    callback(property, node, node, k);
                    traverse(property, callback);
                }
            })
        }
    }
}

traverse.Delete = {};

function hasType(node, type) {
    let has = false;
    const handler = function (node) {
        if (node.type === type) {
            has = true;
        }
    };
    traverse(node, handler);
    return has
}

function replace(node, callback) {
    const handle = function (node, parent, obj, key) {
        const result = callback(node, parent, obj, key);
        if (result) {
            obj[key] = result;
        }
    };
    traverse(node, handle);
    return node
}

module.exports = {
    traverse,
    hasType,
    replace
};
