const acorn = require('../../lib/acorn');

test('test expression', () => {
    expect(acorn.parse('var a=1;')).toEqual(
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
                            init: {type: 'Literal', start: 6, value: 1, raw: '1', end: 7},
                            end: 7
                        }],
                    end: 8
                }],
            end: 8
        }
    );

    expect(acorn.parse('this\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'ThisExpression', start: 0, end: 4},
                    end: 4
                }],
            end: 5
        }
    );

    expect(acorn.parse('x = []')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right: {type: 'ArrayExpression', start: 4, elements: [], end: 6},
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    );

    expect(acorn.parse('x = [ 42, ]')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    elements: [{type: 'Literal', start: 6, value: 42, raw: '42', end: 8}],
                                    end: 11
                                },
                            end: 11
                        },
                    end: 11
                }],
            end: 11
        }
    );

    expect(acorn.parse('x = [ 1, 2, 3, ]')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    elements:
                                        [{type: 'Literal', start: 6, value: 1, raw: '1', end: 7},
                                            {type: 'Literal', start: 9, value: 2, raw: '2', end: 10},
                                            {type: 'Literal', start: 12, value: 3, raw: '3', end: 13}],
                                    end: 16
                                },
                            end: 16
                        },
                    end: 16
                }],
            end: 16
        }
    );

    expect(acorn.parse('x = [ ,, 42 ]')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    elements:
                                        [null,
                                            null,
                                            {type: 'Literal', start: 9, value: 42, raw: '42', end: 11}],
                                    end: 13
                                },
                            end: 13
                        },
                    end: 13
                }],
            end: 13
        }
    );


    expect(acorn.parse('x = {}')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right: {type: 'ObjectExpression', start: 4, properties: [], end: 6},
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    );

    expect(acorn.parse('x = { }')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right: {type: 'ObjectExpression', start: 4, properties: [], end: 7},
                            end: 7
                        },
                    end: 7
                }],
            end: 7
        }
    );

    expect(acorn.parse('a= { if: 42 }')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 3,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 5,
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            kind: 'init',
                                            key: {type: 'Identifier', start: 5, name: 'if', end: 7},
                                            value: {type: 'Literal', start: 9, value: 42, raw: '42', end: 11},
                                            end: 11
                                        }],
                                    end: 13
                                },
                            end: 13
                        },
                    end: 13
                }],
            end: 13
        }
    );

    expect(acorn.parse('a= { true: 42 }')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 3,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 5,
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            kind: 'init',
                                            key: {type: 'Identifier', start: 5, name: 'true', end: 9},
                                            value: {type: 'Literal', start: 11, value: 42, raw: '42', end: 13},
                                            end: 13
                                        }],
                                    end: 15
                                },
                            end: 15
                        },
                    end: 15
                }],
            end: 15
        }
    );

    expect(acorn.parse('x = { x: 1, x: 2 }')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 4,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 6,
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            kind: 'init',
                                            key: {type: 'Identifier', start: 6, name: 'x', end: 7},
                                            value: {type: 'Literal', start: 9, value: 1, raw: '1', end: 10},
                                            end: 10
                                        },
                                            {
                                                type: 'Property',
                                                start: 12,
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                kind: 'init',
                                                key: {type: 'Identifier', start: 12, name: 'x', end: 13},
                                                value: {type: 'Literal', start: 15, value: 2, raw: '2', end: 16},
                                                end: 16
                                            }],
                                    end: 18
                                },
                            end: 18
                        },
                    end: 18
                }],
            end: 18
        }
    );

    expect(acorn.parse('x = {a,b,c:1}')).toEqual(
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
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 0, name: 'x', end: 1},
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 4,
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 5,
                                            computed: false,
                                            key: {type: 'Identifier', start: 5, name: 'a', end: 6},
                                            kind: 'init',
                                            shorthand: true,
                                            method: false,
                                            value: {type: 'Identifier', start: 5, name: 'a', end: 6},
                                            end: 6
                                        },
                                            {
                                                type: 'Property',
                                                start: 7,
                                                computed: false,
                                                key: {type: 'Identifier', start: 7, name: 'b', end: 8},
                                                kind: 'init',
                                                shorthand: true,
                                                method: false,
                                                value: {type: 'Identifier', start: 7, name: 'b', end: 8},
                                                end: 8
                                            },
                                            {
                                                type: 'Property',
                                                start: 9,
                                                computed: false,
                                                key: {type: 'Identifier', start: 9, name: 'c', end: 10},
                                                kind: 'init',
                                                shorthand: false,
                                                method: false,
                                                value: {type: 'Literal', start: 11, value: 1, raw: '1', end: 12},
                                                end: 12
                                            }],
                                    end: 13
                                },
                            end: 13
                        },
                    end: 13
                }],
            end: 13
        }
    );

    expect(acorn.parse('delete a.b')).toEqual(
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
                            operator: 'delete',
                            argument:
                                {
                                    start: 7,
                                    type: 'MemberExpression',
                                    object: {type: 'Identifier', start: 7, name: 'a', end: 8},
                                    property: {type: 'Identifier', start: 9, name: 'b', end: 10},
                                    computed: false,
                                    end: 10
                                },
                            end: 10
                        },
                    end: 10
                }],
            end: 10
        }
    );

    expect(acorn.parse('typeof a.b()')).toEqual(
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
                            operator: 'typeof',
                            argument:
                                {
                                    start: 7,
                                    type: 'CallExpression',
                                    arguments: [],
                                    callee:
                                        {
                                            start: 7,
                                            type: 'MemberExpression',
                                            object: {type: 'Identifier', start: 7, name: 'a', end: 8},
                                            property: {type: 'Identifier', start: 9, name: 'b', end: 10},
                                            computed: false,
                                            end: 10
                                        },
                                    end: 12
                                },
                            end: 12
                        },
                    end: 12
                }],
            end: 12
        }
    );

    expect(acorn.parse('void a')).toEqual(
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
                            operator: 'void',
                            argument: {type: 'Identifier', start: 5, name: 'a', end: 6},
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    );

    expect(acorn.parse('a instanceof b.c')).toEqual(
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
                            operator: 'instanceof',
                            right:
                                {
                                    start: 13,
                                    type: 'MemberExpression',
                                    object: {type: 'Identifier', start: 13, name: 'b', end: 14},
                                    property: {type: 'Identifier', start: 15, name: 'c', end: 16},
                                    computed: false,
                                    end: 16
                                },
                            end: 16
                        },
                    end: 16
                }],
            end: 16
        }
    );

    expect(acorn.parse('a()')).toEqual(
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
                            callee: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            end: 3
                        },
                    end: 3
                }],
            end: 3
        }
    );

    expect(acorn.parse('a(b,c)')).toEqual(
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
                                    {type: 'Identifier', start: 4, name: 'c', end: 5}],
                            callee: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            end: 6
                        },
                    end: 6
                }],
            end: 6
        }
    );

    expect(acorn.parse('a[b]')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'MemberExpression',
                            start: 0,
                            object: {type: 'Identifier', start: 0, name: 'a', end: 1},
                            property: {type: 'Identifier', start: 2, name: 'b', end: 3},
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    );
});
