const {replace, hasType} = require('../traverse');
const {template} = require('../template');
const {transformMap} = require('../utils');

exports.ObjectExpression = function (node) {
    const {properties} = node;
    const {totalArray, first} = generateList(properties, 'Property', 'key');

    if (!first) {
        const n = template('object-spread');
        totalArray.forEach(property => {
            const {type, array} = property;
            if (type === 'Property') {
                n.arguments.push({
                    type: 'ObjectExpression',
                    properties: array,
                });
            } else {
                n.arguments = n.arguments.concat(array);
            }
        });
        return n
    }
    return node
}

exports.ArrayExpression = function (node) {
    const {elements} = node;
    const {totalArray, first} = generateList(elements, 'Identifier');
    if (!first) {
        return generateConcat(totalArray);
    }
    return node
}

exports.CallExpression = function (node) {
    const {callee} = node;
    const {totalArray, first} = generateList(node.arguments, 'Identifier');
    if (!first) {
        const obj = {
            FUNCTION: callee,
        };
        if (callee.type === 'MemberExpression') {
            obj.CONTEXT = callee.object;
        } else {
            obj.CONTEXT = {
                type: 'Literal',
                value: null,
                raw: 'null',
            }
        }
        const functionNode = template('function-apply', obj);
        if (totalArray.length === 2 && totalArray[0].array.length === 0 && totalArray[1].array.length === 1) {
            functionNode.arguments.push(totalArray.pop().array[0])
        } else {
            const n = generateConcat(totalArray);
            functionNode.arguments.push(n)
        }
        return functionNode
    }
    return node
}

function generateConcat(totalArray) {
    const origin = {
        type: 'ArrayExpression',
        elements: totalArray.shift().array,
    };
    const n = template('array-concat', {
        ORIGIN: origin,
    });
    totalArray.forEach(property => {
        const {type, array} = property;
        if (type === 'Identifier') {
            n.arguments.push({
                type: 'ArrayExpression',
                elements: array,
            });
        } else {
            n.arguments = n.arguments.concat(array);
        }
    });
    return n
}

function generateList(array, initProperty, key) {
    const totalArray = [];
    let first = true;
    let current = '';
    let tempArray = [];
    array.forEach(property => {
        const {type, argument} = property;
        if (current !== type) {
            tempArray = [];
            if (first && type === 'SpreadElement' && current !== initProperty) {
                totalArray.push({
                    type: initProperty,
                    array: [],
                })
            }
            totalArray.push({
                type,
                array: tempArray,
            })
        }
        tempArray.push(argument || property[key] || property);
        current = type;
        if (type === 'SpreadElement' && first) {
            first = false;
        }
    });
    return {totalArray, first};
}