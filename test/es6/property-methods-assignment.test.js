const acorn = require('../../acorn');

test('test default params', () => {
    expect(acorn.parse('var a={get x(){},}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init:
                                {
                                    type: 'ObjectExpression',
                                    start: 6,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 7,
                                            shorthand: false,
                                            computed: false,
                                            key: {type: 'Identifier', start: 11, name: 'x', end: 12},
                                            kind: 'get',
                                            method: true,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 12,
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body: {type: 'BlockStatement', start: 14, body: [], end: 16},
                                                    end: 16
                                                },
                                            end: 16
                                        }],
                                    end: 18
                                },
                            end: 18
                        }],
                    end: 18
                }],
            end: 18
        }
    )

    expect(acorn.parse('var a={set x(d){},}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init:
                                {
                                    type: 'ObjectExpression',
                                    start: 6,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 7,
                                            shorthand: false,
                                            computed: false,
                                            key: {type: 'Identifier', start: 11, name: 'x', end: 12},
                                            kind: 'set',
                                            method: true,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 12,
                                                    id: null,
                                                    params: [{type: 'Identifier', start: 13, name: 'd', end: 14}],
                                                    expression: false,
                                                    generator: false,
                                                    body: {type: 'BlockStatement', start: 15, body: [], end: 17},
                                                    end: 17
                                                },
                                            end: 17
                                        }],
                                    end: 19
                                },
                            end: 19
                        }],
                    end: 19
                }],
            end: 19
        }
    )

    expect(acorn.parse('var a={set x(d){},get x(){}}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init:
                                {
                                    type: 'ObjectExpression',
                                    start: 6,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 7,
                                            shorthand: false,
                                            computed: false,
                                            key: {type: 'Identifier', start: 11, name: 'x', end: 12},
                                            kind: 'set',
                                            method: true,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 12,
                                                    id: null,
                                                    params: [{type: 'Identifier', start: 13, name: 'd', end: 14}],
                                                    expression: false,
                                                    generator: false,
                                                    body: {type: 'BlockStatement', start: 15, body: [], end: 17},
                                                    end: 17
                                                },
                                            end: 17
                                        },
                                            {
                                                type: 'Property',
                                                start: 18,
                                                shorthand: false,
                                                computed: false,
                                                key: {type: 'Identifier', start: 22, name: 'x', end: 23},
                                                kind: 'get',
                                                method: true,
                                                value:
                                                    {
                                                        type: 'FunctionExpression',
                                                        start: 23,
                                                        id: null,
                                                        params: [],
                                                        expression: false,
                                                        generator: false,
                                                        body: {type: 'BlockStatement', start: 25, body: [], end: 27},
                                                        end: 27
                                                    },
                                                end: 27
                                            }],
                                    end: 28
                                },
                            end: 28
                        }],
                    end: 28
                }],
            end: 28
        }
    )

    expect(acorn.parse('var a={set (){}}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init:
                                {
                                    type: 'ObjectExpression',
                                    start: 6,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 7,
                                            shorthand: false,
                                            computed: false,
                                            key: {type: 'Identifier', start: 7, name: 'set', end: 10},
                                            kind: 'init',
                                            method: true,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 11,
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body: {type: 'BlockStatement', start: 13, body: [], end: 15},
                                                    end: 15
                                                },
                                            end: 15
                                        }],
                                    end: 16
                                },
                            end: 16
                        }],
                    end: 16
                }],
            end: 16
        }
    )
})