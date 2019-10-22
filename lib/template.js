const fs = require('fs');
const path = require('path');
const acorn = require('./acorn');
const traverse = require('./traverse');
const dir = path.resolve(__dirname + '/templates');
const files = fs.readdirSync(dir);
const {fromJS} = require('immutable');


const container = {};
files.forEach(file => {
    const data = fs.readFileSync(dir + '/' + file, 'utf-8')
    const f = file.split('.')[0];
    exports[f] = container[f] = acorn.parse(data, {loc: false});
});

exports.template = function (name, obj = {}, keepExpression) {
    const nodes = fromJS(container[name]).toJS();
    traverse(nodes, {
        enter: node => {
            let value;
            Object.keys(obj).some(key => {
                if (node.name === key) {
                    value = obj[key];
                    return true
                }
            });
            return value
        }
    });
    const body = nodes.body;
    const normalise = function (node) {
        if (!keepExpression && node.type === 'ExpressionStatement') {
            return node.expression;
        }
        return node
    };
    return normalise(body[0])
};