const {replace, hasType} = require('../traverse');
const {template} = require('../template');

exports.ClassDeclaration = function (node) {
    const n = template('classes', {
        CLASSNAME: node.id
    });
    const classBody = node.body.body;
    const returnStatement = n.declarations[0].init.callee.body.body.pop();
    classBody.forEach(b => {
            const {kind, type, static: _static, key, value} = b;
            if (type !== 'MethodDefinition') return;
            if (kind === 'constructor') {
                n.declarations[0].init.callee.body.body[0].body = value.body;
            } else if (kind === 'method') {
                const functionMethod = template('function-prototype', {
                    PARENT: node.id,
                    METHOD: key,
                    FUNCTION: value,
                },true);
                n.declarations[0].init.callee.body.body.push(functionMethod)
            }
        }
    )
    n.declarations[0].init.callee.body.body.push(returnStatement);
    return n
}