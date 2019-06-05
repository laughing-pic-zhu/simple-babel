const {replace, hasType} = require('../traverse');
const {template} = require('../template');

exports.BlockStatement = function (node, parent) {
    if (parent.type === 'FunctionDeclaration' || parent.type === 'FunctionDeclaration' || parent.type === 'ArrowFunctionExpression') {
        return
    }
    let hasLet = false;
    node.body.forEach(n => {
        if (n.type === 'VariableDeclaration' && n.kind === 'let') {
            hasLet = true;
            n.kind = 'var';
        }
    });

    if (hasLet) {
        const n = buildNode(node.body);
        if (hasType(node, 'ThisExpression')) {
            const newNode = template('function-call-this', {
                FUNCTION: n.expression.callee,
            });
            n.expression = newNode;
        }
        node.body = [n];
    }


    return node;
}


function buildNode(array) {
    return {
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'FunctionExpression',
                id: null,
                expression: false,
                generator: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: array,
                },
            },
            arguments: [],
        }
    }
}

exports.VariableDeclaration = function (node, parent) {
    if (node.type === 'VariableDeclaration' && node.kind === 'let') {
        node.kind = 'var';
    }
    return node
}

exports.ForStatement = function (node, parent) {
    const init = node.init;
    if (init && init.type === 'VariableDeclaration' && init.kind === 'let') {
        init.kind = 'var';
        return buildNode([node]);
    }
    return node
}

exports.ForInStatement = function (node, parent) {
    const left = node.left;
    if (left && left.type === 'VariableDeclaration' && left.kind === 'let') {
        left.kind = 'var';
        return buildNode([node]);
    }
    return node
}
