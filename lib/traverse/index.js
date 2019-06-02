const vistor = require('./visitor-keys.json');

function traverse(parent, callback) {
    vistor[parent.type].forEach(key => {
        const node = parent[key];
        if (Array.isArray(node)) {
            node.forEach(n => {
                traverse(n, callback)
            })
        } else {
            callback(node, parent);
        }
    })
}

traverse.Delete = {};

function hasType(parent, type) {
    let has = false;
    const handler = function () {
        has = true;
    };
    if (Array.isArray(parent)) {
        return parent.forEach(child => traverse(child, type, handler))
    } else {
        traverse(parent, type, handler)
    }
    return has
}

function replace(parent, callback) {
    if (Array.isArray(parent)) {
        return parent.forEach(child => traverse(child, callback))
    } else {
        traverse(parent, callback)
    }
}

module.exports = {
    traverse,
    hasType,
    replace
};