const vistor = require('./visitor-keys.json');

function traverse(parent, callback) {
    const nodes = vistor[parent.type];
    if (Array.isArray(nodes)) {
        nodes.forEach(key => {
            const node = parent[key];
            if (Array.isArray(node)) {
                node.forEach(n => {
                    callback(n, parent);
                    traverse(n, callback)
                })
            } else {
                callback(node, parent, key);
                traverse(node, callback);
            }
        })
    }
}

traverse.Delete = {};

function hasType(parent, type) {
    let has = false;
    const handler = function (node) {
        if (node.type === type) {
            has = true;
        }
    };
    if (Array.isArray(parent)) {
        return parent.forEach(child => traverse(child, handler))
    } else {
        traverse(parent, handler)
    }
    return has
}

function replace(parent, callback) {
    const handle = function (node, parent, key) {
        const result = callback(node, parent,key);
        if (result) {
            parent[key] = result;
        }
    };
    if (Array.isArray(parent)) {
         parent.forEach(child => traverse(child, handle))
    } else {
        traverse(parent, handle)
    }
    return parent
}

module.exports = {
    traverse,
    hasType,
    replace
};