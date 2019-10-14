const {replace, hasType} = require('../traverse');
const {template} = require('../template');
const {parse} = require('../acorn');
const {transformMap} = require('../utils');

function replaceSuper(n, superClass) {
    return replace(n, (node, parent,) => {
        if (node.type === 'MemberExpression') {
            if (node.object && node.object.type === 'Super') {
                node.object = superClass;
                if (parent.type === 'CallExpression') {
                    node.property = {
                        name: 'prototype.' + node.property.name + '.call',
                        type: 'Identifier',
                    }
                    parent.arguments.unshift({
                        type: 'ThisExpression'
                    })
                }
            }
        }

        if (node.type === 'CallExpression' && node.callee.type === 'Super') {
            node.callee = {
                type: 'MemberExpression',
                object: superClass,
                property: {
                    type: 'Identifier',
                    name: 'call',
                },
                computed: false,
            };
            node.arguments.push({
                type: 'ThisExpression'
            })
        }
    })
}

exports.ClassDeclaration = function (node) {
    const {id, superClass} = node;
    const n = template('classes', {
        CLASSNAME: id
    });
    const classBody = node.body.body;
    const body = n.declarations[0].init.callee.body.body;
    const returnStatement = body.pop();
    if (superClass) {
        n.declarations[0].init.arguments.push(superClass);
        n.declarations[0].init.callee.params.push(superClass);
        body.push(template('inherits', {
            CLASSNAME: id,
            PARENT: superClass,
        }, true))
    }

    const map = {};
    classBody.forEach(b => {
            const {kind, type, static: _static, key, value} = b;
            if (type !== 'MethodDefinition') return;
            b.value = replaceSuper(value, superClass);
            if (kind === 'constructor') {
                body[0].body = b.value.body;
            } else if (kind === 'method') {
                const templateName = _static ? 'function-method' : 'function-prototype-method';
                const functionMethod = template(templateName, {
                    PARENT: node.id,
                    METHOD: key,
                    FUNCTION: b.value,
                }, true);
                body.push(functionMethod)
            } else if (kind === 'set' || kind === 'get') {
                map[key.name] = map[key.name] || {};
                map[key.name][kind] = value;
            }
        }
    );

    const nodePrototype = template('prototype-identifier', {
        CLASSNAME: id,
    });
    if (Object.keys(map).length > 0) {
        const mapNode = transformMap(nodePrototype, map)
        body.push(mapNode);
    }
    body.push(returnStatement);
    return n
}