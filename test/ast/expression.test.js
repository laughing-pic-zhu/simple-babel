const acorn = require('../../lib/acorn');

test('test expression', () => {
    expect(acorn.parse('var a=1;')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 8}},
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 8}},
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                {start: {line: 1, column: 4}, end: {line: 1, column: 7}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 5
                                },
                            init:
                                {
                                    type: 'Literal',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                    value: 1,
                                    raw: '1',
                                    end: 7
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 0}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'ThisExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            end: 4
                        },
                    end: 4
                }],
            end: 5
        }
    );

    expect(acorn.parse('x = []')).toEqual(
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
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 6}},
                                    elements: [],
                                    end: 6
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 11}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 11}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 11}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 11}},
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 11}},
                                    elements:
                                        [{
                                            type: 'Literal',
                                            start: 6,
                                            loc:
                                                {start: {line: 1, column: 6}, end: {line: 1, column: 8}},
                                            value: 42,
                                            raw: '42',
                                            end: 8
                                        }],
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 16}},
                                    elements:
                                        [{
                                            type: 'Literal',
                                            start: 6,
                                            loc:
                                                {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                            value: 1,
                                            raw: '1',
                                            end: 7
                                        },
                                            {
                                                type: 'Literal',
                                                start: 9,
                                                loc:
                                                    {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                                                value: 2,
                                                raw: '2',
                                                end: 10
                                            },
                                            {
                                                type: 'Literal',
                                                start: 12,
                                                loc:
                                                    {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                                value: 3,
                                                raw: '3',
                                                end: 13
                                            }],
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ArrayExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 13}},
                                    elements:
                                        [null,
                                            null,
                                            {
                                                type: 'Literal',
                                                start: 9,
                                                loc:
                                                    {start: {line: 1, column: 9}, end: {line: 1, column: 11}},
                                                value: 42,
                                                raw: '42',
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


    expect(acorn.parse('x = {}')).toEqual(
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
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 6}},
                                    properties: [],
                                    end: 6
                                },
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
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 7}},
                                    properties: [],
                                    end: 7
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 13}},
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 5,
                                            loc:
                                                {start: {line: 1, column: 5}, end: {line: 1, column: 11}},
                                            computed: false,
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 5,
                                                    loc:
                                                        {start: {line: 1, column: 5}, end: {line: 1, column: 7}},
                                                    name: 'if',
                                                    end: 7
                                                },
                                            kind: 'init',
                                            shorthand: false,
                                            method: false,
                                            value:
                                                {
                                                    type: 'Literal',
                                                    start: 9,
                                                    loc:
                                                        {start: {line: 1, column: 9}, end: {line: 1, column: 11}},
                                                    value: 42,
                                                    raw: '42',
                                                    end: 11
                                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 15}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 15}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 15}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 15}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 15}},
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 5,
                                            loc:
                                                {start: {line: 1, column: 5}, end: {line: 1, column: 13}},
                                            computed: false,
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 5,
                                                    loc:
                                                        {start: {line: 1, column: 5}, end: {line: 1, column: 9}},
                                                    name: 'true',
                                                    end: 9
                                                },
                                            kind: 'init',
                                            shorthand: false,
                                            method: false,
                                            value:
                                                {
                                                    type: 'Literal',
                                                    start: 11,
                                                    loc:
                                                        {start: {line: 1, column: 11}, end: {line: 1, column: 13}},
                                                    value: 42,
                                                    raw: '42',
                                                    end: 13
                                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 18}},
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 6,
                                            loc:
                                                {start: {line: 1, column: 6}, end: {line: 1, column: 10}},
                                            computed: false,
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 6,
                                                    loc:
                                                        {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                                    name: 'x',
                                                    end: 7
                                                },
                                            kind: 'init',
                                            shorthand: false,
                                            method: false,
                                            value:
                                                {
                                                    type: 'Literal',
                                                    start: 9,
                                                    loc:
                                                        {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                                                    value: 1,
                                                    raw: '1',
                                                    end: 10
                                                },
                                            end: 10
                                        },
                                            {
                                                type: 'Property',
                                                start: 12,
                                                loc:
                                                    {start: {line: 1, column: 12}, end: {line: 1, column: 16}},
                                                computed: false,
                                                key:
                                                    {
                                                        type: 'Identifier',
                                                        start: 12,
                                                        loc:
                                                            {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                                        name: 'x',
                                                        end: 13
                                                    },
                                                kind: 'init',
                                                shorthand: false,
                                                method: false,
                                                value:
                                                    {
                                                        type: 'Literal',
                                                        start: 15,
                                                        loc:
                                                            {start: {line: 1, column: 15}, end: {line: 1, column: 16}},
                                                        value: 2,
                                                        raw: '2',
                                                        end: 16
                                                    },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                    expression:
                        {
                            type: 'AssignmentExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 13}},
                                    name: 'x',
                                    end: 1
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'ObjectExpression',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 13}},
                                    properties:
                                        [{
                                            type: 'Property',
                                            start: 5,
                                            loc:
                                                {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                            computed: false,
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 5,
                                                    loc:
                                                        {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                                    name: 'a',
                                                    end: 6
                                                },
                                            kind: 'init',
                                            shorthand: true,
                                            method: false,
                                            value:
                                                {
                                                    type: 'Identifier',
                                                    start: 5,
                                                    loc:
                                                        {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                                    name: 'a',
                                                    end: 6
                                                },
                                            end: 6
                                        },
                                            {
                                                type: 'Property',
                                                start: 7,
                                                loc:
                                                    {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                                                computed: false,
                                                key:
                                                    {
                                                        type: 'Identifier',
                                                        start: 7,
                                                        loc:
                                                            {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                                                        name: 'b',
                                                        end: 8
                                                    },
                                                kind: 'init',
                                                shorthand: true,
                                                method: false,
                                                value:
                                                    {
                                                        type: 'Identifier',
                                                        start: 7,
                                                        loc:
                                                            {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                                                        name: 'b',
                                                        end: 8
                                                    },
                                                end: 8
                                            },
                                            {
                                                type: 'Property',
                                                start: 9,
                                                loc:
                                                    {start: {line: 1, column: 9}, end: {line: 1, column: 12}},
                                                computed: false,
                                                key:
                                                    {
                                                        type: 'Identifier',
                                                        start: 9,
                                                        loc:
                                                            {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                                                        name: 'c',
                                                        end: 10
                                                    },
                                                kind: 'init',
                                                shorthand: false,
                                                method: false,
                                                value:
                                                    {
                                                        type: 'Literal',
                                                        start: 11,
                                                        loc:
                                                            {start: {line: 1, column: 11}, end: {line: 1, column: 12}},
                                                        value: 1,
                                                        raw: '1',
                                                        end: 12
                                                    },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                            prefix: true,
                            operator: 'delete',
                            argument:
                                {
                                    type: 'MemberExpression',
                                    start: 7,
                                    loc:
                                        {start: {line: 1, column: 7}, end: {line: 1, column: 10}},
                                    object:
                                        {
                                            type: 'Identifier',
                                            start: 7,
                                            loc:
                                                {start: {line: 1, column: 7}, end: {line: 1, column: 10}},
                                            name: 'a',
                                            end: 8
                                        },
                                    property:
                                        {
                                            type: 'Identifier',
                                            start: 9,
                                            loc:
                                                {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                                            name: 'b',
                                            end: 10
                                        },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 12}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 12}},
                    expression:
                        {
                            type: 'UnaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 12}},
                            prefix: true,
                            operator: 'typeof',
                            argument:
                                {
                                    type: 'CallExpression',
                                    start: 7,
                                    loc:
                                        {start: {line: 1, column: 7}, end: {line: 1, column: 12}},
                                    arguments: [],
                                    callee:
                                        {
                                            type: 'MemberExpression',
                                            start: 7,
                                            loc:
                                                {start: {line: 1, column: 7}, end: {line: 1, column: 12}},
                                            object:
                                                {
                                                    type: 'Identifier',
                                                    start: 7,
                                                    loc:
                                                        {start: {line: 1, column: 7}, end: {line: 1, column: 12}},
                                                    name: 'a',
                                                    end: 8
                                                },
                                            property:
                                                {
                                                    type: 'Identifier',
                                                    start: 9,
                                                    loc:
                                                        {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                                                    name: 'b',
                                                    end: 10
                                                },
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
                            operator: 'void',
                            argument:
                                {
                                    type: 'Identifier',
                                    start: 5,
                                    loc:
                                        {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                    name: 'a',
                                    end: 6
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                    expression:
                        {
                            type: 'BinaryExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                                    name: 'a',
                                    end: 1
                                },
                            operator: 'instanceof',
                            right:
                                {
                                    type: 'MemberExpression',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 16}},
                                    object:
                                        {
                                            type: 'Identifier',
                                            start: 13,
                                            loc:
                                                {start: {line: 1, column: 13}, end: {line: 1, column: 16}},
                                            name: 'b',
                                            end: 14
                                        },
                                    property:
                                        {
                                            type: 'Identifier',
                                            start: 15,
                                            loc:
                                                {start: {line: 1, column: 15}, end: {line: 1, column: 16}},
                                            name: 'c',
                                            end: 16
                                        },
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
                            type: 'CallExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                            arguments: [],
                            callee:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                                    name: 'a',
                                    end: 1
                                },
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
                            type: 'CallExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                            arguments:
                                [{
                                    type: 'Identifier',
                                    start: 2,
                                    loc:
                                        {start: {line: 1, column: 2}, end: {line: 1, column: 3}},
                                    name: 'b',
                                    end: 3
                                },
                                    {
                                        type: 'Identifier',
                                        start: 4,
                                        loc:
                                            {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                        name: 'c',
                                        end: 5
                                    }],
                            callee:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                                    name: 'a',
                                    end: 1
                                },
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
                            type: 'MemberExpression',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            object:
                                {
                                    type: 'Identifier',
                                    start: 0,
                                    loc:
                                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
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
                            computed: true,
                            end: 4
                        },
                    end: 4
                }],
            end: 4
        }
    );
});
