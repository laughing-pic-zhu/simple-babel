const acorn = require('../../lib/acorn');

test('test logical operator', () => {
    expect(acorn.parse('+a')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 2}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 2}},
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 2}},
                            prefix: true,
                            operator: '+',
                            argument:
                                {
                                    type: 'Identifier',
                                    start: 1,
                                    loc:
                                        {start: {line: 1, column: 1}, end: {line: 1, column: 2}},
                                    name: 'a',
                                    end: 2
                                },
                            end: 2
                        },
                    end: 2
                }],
            end: 2
        }
    );

    expect(acorn.parse('++a')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                    expression:
                        {
                            type: 'UpdateExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                            prefix: true,
                            operator: '++',
                            argument:
                                {
                                    type: 'Identifier',
                                    start: 2,
                                    loc:
                                        {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                    name: 'a',
                                    end: 3
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                            left:
                                {
                                    type: 'Literal',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                                    value: 1,
                                    raw: '1',
                                    end: 1
                                },
                            operator: '*',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 2,
                                    loc:
                                        {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                    name: 'a',
                                    end: 3
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'MemberExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            object:
                                {
                                    type: 'MemberExpression',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                    object:
                                        {
                                            type: 'Identifier',
                                            start: 0,
                                            loc:
                                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                            name: 'a',
                                            end: 1
                                        },
                                    property:
                                        {
                                            type: 'Identifier',
                                            start: 2,
                                            loc:
                                                {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                            name: 'b',
                                            end: 3
                                        },
                                    computed: false,
                                    end: 3
                                },
                            property:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'c',
                                    end: 5
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                    expression:
                        {
                            type: 'CallExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                            arguments: [],
                            callee:
                                {
                                    type: 'MemberExpression',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                                    object:
                                        {
                                            type: 'MemberExpression',
                                            start: 0,
                                            loc:
                                                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                                            object:
                                                {
                                                    type: 'Identifier',
                                                    start: 0,
                                                    loc:
                                                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                                                    name: 'a',
                                                    end: 1
                                                },
                                            property:
                                                {
                                                    type: 'Identifier',
                                                    start: 2,
                                                    loc:
                                                        {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                                    name: 'b',
                                                    end: 3
                                                },
                                            computed: false,
                                            end: 3
                                        },
                                    property:
                                        {
                                            type: 'Identifier',
                                            start: 4,
                                            loc:
                                                {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                            name: 'c',
                                            end: 5
                                        },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            prefix: true,
                            operator: '!',
                            argument:
                                {
                                    type: 'UpdateExpression',
                                    start: 1,
                                    loc:
                                        {start: {line: 1, column: 1}, end: {line: 1, column: 4}},
                                    prefix: true,
                                    operator: '++',
                                    argument:
                                        {
                                            type: 'Identifier',
                                            start: 3,
                                            loc:
                                                {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                            name: 'a',
                                            end: 4
                                        },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                            prefix: true,
                            operator: '!',
                            argument:
                                {
                                    type: 'UnaryExpression',
                                    start: 1,
                                    loc:
                                        {start: {line: 1, column: 1}, end: {line: 1, column: 6}},
                                    prefix: true,
                                    operator: '!',
                                    argument:
                                        {
                                            type: 'UnaryExpression',
                                            start: 2,
                                            loc:
                                                {start: {line: 1, column: 2}, end: {line: 1, column: 6}},
                                            prefix: true,
                                            operator: '!',
                                            argument:
                                                {
                                                    type: 'UpdateExpression',
                                                    start: 3,
                                                    loc:
                                                        {start: {line: 1, column: 3}, end: {line: 1, column: 6}},
                                                    argument:
                                                        {
                                                            type: 'Identifier',
                                                            start: 3,
                                                            loc:
                                                                {
                                                                    start: {line: 1, column: 3},
                                                                    end: {line: 1, column: 6}
                                                                },
                                                            name: 'a',
                                                            end: 4
                                                        },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '<',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'b',
                                    end: 5
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                            left:
                                {
                                    type: 'BinaryExpression',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                                    left:
                                        {
                                            type: 'Identifier',
                                            start: 0,
                                            loc:
                                                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                                            name: 'a',
                                            end: 1
                                        },
                                    operator: '+',
                                    right:
                                        {
                                            type: 'BinaryExpression',
                                            start: 2,
                                            loc:
                                                {start: {line: 1, column: 2}, end: {line: 1, column: 5}},
                                            left:
                                                {
                                                    type: 'Identifier',
                                                    start: 2,
                                                    loc:
                                                        {start: {line: 1, column: 2}, end: {line: 1, column: 5}},
                                                    name: 'b',
                                                    end: 3
                                                },
                                            operator: '*',
                                            right:
                                                {
                                                    type: 'Identifier',
                                                    start: 4,
                                                    loc:
                                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                                    name: 'c',
                                                    end: 5
                                                },
                                            end: 5
                                        },
                                    end: 5
                                },
                            operator: '-',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                    name: 'd',
                                    end: 7
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            left:
                                {
                                    type: 'BinaryExpression',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                    left:
                                        {
                                            type: 'Identifier',
                                            start: 0,
                                            loc:
                                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                            name: 'b',
                                            end: 1
                                        },
                                    operator: '*',
                                    right:
                                        {
                                            type: 'Identifier',
                                            start: 2,
                                            loc:
                                                {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                            name: 'c',
                                            end: 3
                                        },
                                    end: 3
                                },
                            operator: '+',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 5
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '+',
                            right:
                                {
                                    type: 'BinaryExpression',
                                    start: 2,
                                    loc:
                                        {start: {line: 1, column: 2}, end: {line: 1, column: 5}},
                                    left:
                                        {
                                            type: 'Identifier',
                                            start: 2,
                                            loc:
                                                {start: {line: 1, column: 2}, end: {line: 1, column: 5}},
                                            name: 'b',
                                            end: 3
                                        },
                                    operator: '*',
                                    right:
                                        {
                                            type: 'Identifier',
                                            start: 4,
                                            loc:
                                                {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                            name: 'c',
                                            end: 5
                                        },
                                    end: 5
                                },
                            end: 5
                        },
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('a=3')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 2,
                                    loc:
                                        {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                    value: 3,
                                    raw: '3',
                                    end: 3
                                },
                            end: 3
                        },
                    end: 3
                }],
            end: 3
        }
    )
});


test('test assignment operator', () => {
    expect(acorn.parse('a+=3')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '+=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                    value: 3,
                                    raw: '3',
                                    end: 4
                                },
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    )

    expect(acorn.parse('a-=3')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '-=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                    value: 3,
                                    raw: '3',
                                    end: 4
                                },
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    )

    expect(acorn.parse('a*=3')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '*=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                    value: 3,
                                    raw: '3',
                                    end: 4
                                },
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    )

    expect(acorn.parse('a/=3')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '/=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                    value: 3,
                                    raw: '3',
                                    end: 4
                                },
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    )

    expect(acorn.parse('a%=3')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '%=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                    value: 3,
                                    raw: '3',
                                    end: 4
                                },
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    )

    expect(acorn.parse('a>>>=y')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '>>>=',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 5,
                                    loc:
                                        {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                    name: 'y',
                                    end: 6
                                },
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    )

    expect(acorn.parse('a>>=y')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '>>=',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'y',
                                    end: 5
                                },
                            end: 5
                        },
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('a<<=y')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '<<=',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'y',
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


test('test relational operator', () => {
    expect(acorn.parse('a<b')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '<',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 2,
                                    loc:
                                        {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                    name: 'b',
                                    end: 3
                                },
                            end: 3
                        },
                    end: 3
                }],
            end: 3
        }
    )

    expect(acorn.parse('a>=3')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                    expression:
                        { type: 'BinaryExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                            left:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                                    name: 'a',
                                    end: 1 },
                            operator: '>=',
                            right:
                                { type: 'Literal',
                                    start: 3,
                                    loc:
                                        { start: { line: 1, column: 3 }, end: { line: 1, column: 4 } },
                                    value: 3,
                                    raw: '3',
                                    end: 4 },
                            end: 4 },
                    end: 4 } ],
            end: 4 }
    )
});


test('test bit operator', () => {
    expect(acorn.parse('a&b')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
                    expression:
                        { type: 'BinaryExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
                            left:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
                                    name: 'a',
                                    end: 1 },
                            operator: '&',
                            right:
                                { type: 'Identifier',
                                    start: 2,
                                    loc:
                                        { start: { line: 1, column: 2 }, end: { line: 1, column: 3 } },
                                    name: 'b',
                                    end: 3 },
                            end: 3 },
                    end: 3 } ],
            end: 3 }
    )

    expect(acorn.parse('a|3')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
                    expression:
                        { type: 'BinaryExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
                            left:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 3 } },
                                    name: 'a',
                                    end: 1 },
                            operator: '|',
                            right:
                                { type: 'Literal',
                                    start: 2,
                                    loc:
                                        { start: { line: 1, column: 2 }, end: { line: 1, column: 3 } },
                                    value: 3,
                                    raw: '3',
                                    end: 3 },
                            end: 3 },
                    end: 3 } ],
            end: 3 }
    )
    expect(acorn.parse('a>>>3')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
                    expression:
                        { type: 'BinaryExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
                            left:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
                                    name: 'a',
                                    end: 1 },
                            operator: '>>>',
                            right:
                                { type: 'Literal',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                    value: 3,
                                    raw: '3',
                                    end: 5 },
                            end: 5 },
                    end: 5 } ],
            end: 5 }
    )

    expect(acorn.parse('a>>3')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                    expression:
                        { type: 'BinaryExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                            left:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                                    name: 'a',
                                    end: 1 },
                            operator: '>>',
                            right:
                                { type: 'Literal',
                                    start: 3,
                                    loc:
                                        { start: { line: 1, column: 3 }, end: { line: 1, column: 4 } },
                                    value: 3,
                                    raw: '3',
                                    end: 4 },
                            end: 4 },
                    end: 4 } ],
            end: 4 }
    )
    expect(acorn.parse('a<<3')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                    expression:
                        { type: 'BinaryExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                            left:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                                    name: 'a',
                                    end: 1 },
                            operator: '<<',
                            right:
                                { type: 'Literal',
                                    start: 3,
                                    loc:
                                        { start: { line: 1, column: 3 }, end: { line: 1, column: 4 } },
                                    value: 3,
                                    raw: '3',
                                    end: 4 },
                            end: 4 },
                    end: 4 } ],
            end: 4 }
    )

})

