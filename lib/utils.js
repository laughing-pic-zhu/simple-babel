const {template} = require('./template');

function transformMap(nodePrototype, map) {
    const properties = Object.keys(map).map(k => {
        const property = map[k];
        const mapProperties = Object.keys(property).map(_k => {
            return {
                type: 'Property',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                    type: 'Identifier',
                    name: _k,
                },
                value: property[_k],
                kind: '',
            }
        });
        return {
            type: 'Property',
            method: false,
            shorthand: false,
            computed: false,
            key: {
                type: 'Identifier',
                name: k,
            },
            value: {
                type: 'ObjectExpression',
                properties: mapProperties,
            },
            kind: '',
        }
    });
    const objectExpression = {
        type: 'ObjectExpression',
        properties,
    }

    return template('object-defined', {
        OBJECT: nodePrototype,
        MAP: objectExpression,
    }, true);
}


module.exports = {
    transformMap
}