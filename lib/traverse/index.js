const vistor = require('./visitor-keys.json');
const _ = require('lodash');

function traverse(node, ops,) {
    if (!node) return;

    function handle(n, parent, obj, index) {
        if (ops.enter) {
            const result = ops.enter(n, parent, obj, index)
            if (result) {
                obj[index] = result;
            }
        }
        traverse(n, ops);
    }

    const array = vistor[node.type];
    if (!Array.isArray(array)) return;
    array.forEach(k => {
        const n = node[k];
        if (Array.isArray(n)) {
            n.forEach((child, i) => {
                if (child) {
                    handle(child, node, n, i);
                }
            });
            node[k] = _.flatten(n).filter(child => child !== Delete);
        } else if (n) {
            handle(n, node, node, k);
        }
    })
}

const Delete = traverse.Delete = {};

traverse.hasType = function (node, type) {
    let has = false;
    const handler = function (node) {
        if (node.type === type) {
            has = true;
        }
    };
    traverse(node, {
        enter: handler
    });
    return has
}

module.exports = traverse;
