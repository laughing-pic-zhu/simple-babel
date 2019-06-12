const {replace, hasType} = require('../traverse');
const {template} = require('../template');

exports.FunctionExpression = function (node) {
    return defaultParameters(node);
}

exports.FunctionDeclaration = function (node) {
    return defaultParameters(node);
}

function defaultParameters(node) {
    const maps = [];
    debugger
    const newParams = node.params.map(param => {
        debugger
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


