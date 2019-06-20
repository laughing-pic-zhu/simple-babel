const {replace, hasType} = require('../traverse');
const {template} = require('../template');

exports.FunctionExpression = function (node) {
    return restElement(defaultParameters(node));
}

exports.FunctionDeclaration = function (node) {
    return restElement(defaultParameters(node));
}

function defaultParameters(node) {
    const maps = [];
    const newParams = node.params.map(param => {
        if (param.type === 'AssignmentPattern') {
            maps.push({
                left: param.left,
                right: param.right,
            });
            return param.left;
        }
        return param
    });


    maps.forEach(map => {
        const {left, right} = map;
        node.body.body.unshift(template('if-undefined', {
            KEY: left,
            DEFAULTPARAM: right
        }))
    });
    node.params = newParams;
    return node
}


function restElement(node) {
    const newParams = node.params.filter((param, i) => {
        if (param.type === 'RestElement') {
            const templateName = i === 0 ? 'array-slice' : 'array-slice-args';
            node.body.body.unshift(template(templateName, {
                ARRAY: {
                    type: 'Identifier',
                    name: 'arguments',
                },
                INDEX: {
                    type: 'Literal',
                    value: i,
                },
                REST: param.argument,
            }));
            return false
        }
        return true
    });
    node.params = newParams;
    return node
}


