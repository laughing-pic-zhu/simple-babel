module.exports = traverse;
const vistor = require('./visitor-keys.json');
const _ = require('lodash');
const {isScope} = require('../utils');
const Scope = require('./scope');

function traverse(node, ops, scope) {
    if (!node) return;

    function handle(n, parent, obj, index) {
        let newScope = scope;
        if (isScope(n)) {
            newScope = new Scope(n, scope);
        }
        if (ops.enter) {
            const result = ops.enter(n, parent, newScope);
            if (result) {
                obj[index] = result;
            }
            // 返回false，停止遍历
            if (result === false) {
                return;
            }
        }
        traverse(n, ops, newScope);
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
