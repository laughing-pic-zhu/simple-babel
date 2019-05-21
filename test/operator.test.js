const acorn = require('../acorn');

test('test atom type', () => {
    expect(acorn.parse('+a')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            prefix: true,
                            operator: '+',
                            argument: {type: 'Identifier', start: 1, name: 'a', end: 2},
                            end: 2
                        },
                    end: 2
                }],
            end: 2
        }
    )

    expect(acorn.parse('++a')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'UpdateExpression',
                            start: 0,
                            prefix: true,
                            operator: '++',
                            argument: {type: 'Identifier', start: 2, name: 'a', end: 3},
                            end: 3
                        },
                    end: 3
                }],
            end: 3
        }
    )

    expect(acorn.parse('1*a')).toEqual(
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
                            type: 'BinaryExpression',
                            left: {type: 'Literal', start: 0, value: 1, raw: '1', end: 1},
                            operator: '*',
                            right: {type: 'Identifier', start: 2, name: 'a', end: 3},
                            end: 3
                        },
                    end: 3
                }],
            end: 3
        }
    )

    expect(acorn.parse('a.b.c')).toEqual(
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
                            type: 'MemberExpression',
                            object:
                                {
                                    start: 0,
                                    type: 'MemberExpression',
                                    object: {type: 'Identifier', start: 0, name: 'a', end: 1},
                                    property: {type: 'Identifier', start: 2, name: 'b', end: 3},
                                    computed: false,
                                    end: 3
                                },
                            property: {type: 'Identifier', start: 4, name: 'c', end: 5},
                            computed: false,
                            end: 5
                        },
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('a.b.c()')).toEqual(
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
                            arguments: [],
                            callee:
                                {
                                    start: 0,
                                    type: 'MemberExpression',
                                    object:
                                        {
                                            start: 0,
                                            type: 'MemberExpression',
                                            object: {type: 'Identifier', start: 0, name: 'a', end: 1},
                                            property: {type: 'Identifier', start: 2, name: 'b', end: 3},
                                            computed: false,
                                            end: 3
                                        },
                                    property: {type: 'Identifier', start: 4, name: 'c', end: 5},
                                    computed: false,
                                    end: 5
                                },
                            end: 7
                        },
                    end: 7
                }],
            end: 7
        }
    )

    expect(acorn.parse('!++a')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            prefix: true,
                            operator: '!',
                            argument:
                                {
                                    type: 'UpdateExpression',
                                    start: 1,
                                    prefix: true,
                                    operator: '++',
                                    argument: {type: 'Identifier', start: 3, name: 'a', end: 4},
                                    end: 4
                                },
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    )

    expect(acorn.parse('!!!a--')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            prefix: true,
                            operator: '!',
                            argument:
                                {
                                    type: 'UnaryExpression',
                                    start: 1,
                                    prefix: true,
                                    operator: '!',
                                    argument:
                                        {
                                            type: 'UnaryExpression',
                                            start: 2,
                                            prefix: true,
                                            operator: '!',
                                            argument:
                                                {
                                                    start: 3,
                                                    type: 'UpdateExpression',
                                                    argument: {type: 'Identifier', start: 3, name: 'a', end: 4},
                                                    operator: '--',
                                                    prefix: false,
                                                    end: 6
                                                },
                                            end: 6
                                        },
                                    end: 6
                                },
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    )

    expect(acorn.parse('a < b')).toEqual(
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
                            type: 'BinaryExpression',
                            left: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            operator: '<',
                            right: {type: 'Identifier', start: 4, name: 'b', end: 5},
                            end: 5
                        },
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('a+b*c-d')).toEqual(
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
                            type: 'BinaryExpression',
                            left:
                                {
                                    start: 0,
                                    type: 'BinaryExpression',
                                    left: {type: 'Identifier', start: 0, name: 'a', end: 1},
                                    operator: '+',
                                    right:
                                        {
                                            start: 2,
                                            type: 'BinaryExpression',
                                            left: {type: 'Identifier', start: 2, name: 'b', end: 3},
                                            operator: '*',
                                            right: {type: 'Identifier', start: 4, name: 'c', end: 5},
                                            end: 5
                                        },
                                    end: 5
                                },
                            operator: '-',
                            right: {type: 'Identifier', start: 6, name: 'd', end: 7},
                            end: 7
                        },
                    end: 7
                }],
            end: 7
        }
    )

    expect(acorn.parse('b*c+a')).toEqual(
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
                            type: 'BinaryExpression',
                            left:
                                {
                                    start: 0,
                                    type: 'BinaryExpression',
                                    left: {type: 'Identifier', start: 0, name: 'b', end: 1},
                                    operator: '*',
                                    right: {type: 'Identifier', start: 2, name: 'c', end: 3},
                                    end: 3
                                },
                            operator: '+',
                            right: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            end: 5
                        },
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('a+b*c')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [
                    {
                        type: 'ExpressionStatement',
                        start: 0,
                        expression:
                            {
                                start: 0,
                                type: 'BinaryExpression',
                                left: {type: 'Identifier', start: 0, name: 'a', end: 1},
                                operator: '+',
                                right:
                                    {
                                        start: 2,
                                        type: 'BinaryExpression',
                                        left: {type: 'Identifier', start: 2, name: 'b', end: 3},
                                        operator: '*',
                                        right: {type: 'Identifier', start: 4, name: 'c', end: 5},
                                        end: 5
                                    },
                                end: 5
                            },
                        end: 5
                    }],
            end: 5
        }
    )

});


