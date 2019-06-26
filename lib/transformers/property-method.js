const {replace, hasType} = require('../traverse');
const {template} = require('../template');
const {transformMap} = require('../utils');

exports.ObjectExpression = function (node) {
    const {properties} = node;
    const propertyNodes = {};
    const original = properties.filter(property => {
        const {kind, key, value, type} = property;
        if (type === 'Property') {
            const {name} = key;
            if (kind === 'set' || kind === 'get') {
                propertyNodes[name] = propertyNodes[name] || {};
                propertyNodes[name][kind] = value;
                return false;
            } else {
                property.method = false;
            }
        }
        return true
    });
    node.properties = original;
    if (Object.keys(propertyNodes).length > 0) {
        const x = transformMap({
            type: 'Identifier',
            name: 'obj',
        }, propertyNodes);


        const n = template('property-method-closure', {
            CONTENT: x,
            ORIGINAL: node
        });
        return n
    }
    return node
}

