const fs = require('fs');
const path = require('path');
const acorn = require('./acorn');
const {replace} = require('./traverse');
const dir = path.resolve(__dirname + '/templates');
const files = fs.readdirSync(dir);
var {Map} = require('immutable');

const container = {};
files.forEach(file => {
    const data = fs.readFileSync(dir + '/' + file, 'utf-8')
    const f = file.split('.')[0];
    exports[f] = container[f] = acorn.parse(data, {loc: false});
});

exports.template = function (name, obj = {}, keepExpression) {
    const tree = Map(container[name]).toJS();
    const n = replace(tree, (node) => {
        let value;
        Object.keys(obj).some(key => {
            if (node.name === key) {
                value = obj[key];
                return true
            }
        });
        return value
    });
    const body = n.body;
    const normalise = function (node) {
        if (!keepExpression && node.type === 'ExpressionStatement') {
            return node.expression;
        }
        return node
    };

    return normalise(body[0])
};