function execute(node) {
    node.type = 'FunctionExpression';
    node.expression = true;
    return node;
}

module.exports = execute;