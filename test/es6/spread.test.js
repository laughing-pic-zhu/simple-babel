const acorn = require('../../acorn');

test('test spread identifier', () => {
    expect(acorn.parse('[...a]')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'ArrayExpression',
                            start: 0,
                            elements:
                                [{
                                    type: 'SpreadElement',
                                    start: 1,
                                    argument: {type: 'Identifier', start: 4, name: 'a', end: 5},
                                    end: 5
                                }],
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    )

    expect(acorn.parse('const a={b,...c,d}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            id: {type: 'Identifier', start: 6, name: 'a', end: 7},
                            init:
                                {
                                    type: 'ObjectExpression',
                                    start: 8,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 9,
                                            computed: false,
                                            key: {type: 'Identifier', start: 9, name: 'b', end: 10},
                                            kind: 'init',
                                            shorthand: true,
                                            method: false,
                                            value: {type: 'Identifier', start: 9, name: 'b', end: 10},
                                            end: 10
                                        },
                                            {
                                                type: 'SpreadElement',
                                                start: 11,
                                                argument: {type: 'Identifier', start: 14, name: 'c', end: 15},
                                                end: 15
                                            },
                                            {
                                                type: 'Property',
                                                start: 16,
                                                computed: false,
                                                key: {type: 'Identifier', start: 16, name: 'd', end: 17},
                                                kind: 'init',
                                                shorthand: true,
                                                method: false,
                                                value: {type: 'Identifier', start: 16, name: 'd', end: 17},
                                                end: 17
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

    expect(acorn.parse('a(b,...c,d)')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            start: 0,
                            type: 'CallExpression',
                            arguments:
                                [{type: 'Identifier', start: 2, name: 'b', end: 3},
                                    {
                                        type: 'SpreadElement',
                                        start: 4,
                                        argument: {type: 'Identifier', start: 7, name: 'c', end: 8},
                                        end: 8
                                    },
                                    {type: 'Identifier', start: 9, name: 'd', end: 10}],
                            callee: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            end: 11
                        },
                    end: 11
                }],
            end: 11
        }
    )

    expect(acorn.parse('a.b(c,...d,e)')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            start: 0,
                            type: 'CallExpression',
                            arguments:
                                [{type: 'Identifier', start: 4, name: 'c', end: 5},
                                    {
                                        type: 'SpreadElement',
                                        start: 6,
                                        argument: {type: 'Identifier', start: 9, name: 'd', end: 10},
                                        end: 10
                                    },
                                    {type: 'Identifier', start: 11, name: 'e', end: 12}],
                            callee:
                                {
                                    start: 0,
                                    type: 'MemberExpression',
                                    object: {type: 'Identifier', start: 0, name: 'a', end: 1},
                                    property: {type: 'Identifier', start: 2, name: 'b', end: 3},
                                    computed: false,
                                    end: 3
                                },
                            end: 13
                        },
                    end: 13
                }],
            end: 13
        }
    )

    expect(acorn.parse('a(...b)')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            start: 0,
                            type: 'CallExpression',
                            arguments:
                                [{
                                    type: 'SpreadElement',
                                    start: 2,
                                    argument: {type: 'Identifier', start: 5, name: 'b', end: 6},
                                    end: 6
                                }],
                            callee: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            end: 7
                        },
                    end: 7
                }],
            end: 7
        }
    )

})
