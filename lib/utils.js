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

function buildUuid() {
    const obj = {};
    return function (name) {
        var i = obj[name] = obj[name] || 1;
        var id = '_' + name;
        if (i > 1) {
            id = name + i;
        }
        obj[name] += i;
        return id;
    }
}

function errorWithNode(msg, loc) {
    throw new Error(`Line ${loc.line}: ${msg}`)
}


module.exports = {
    transformMap,
    buildUuid,
    errorWithNode,
}