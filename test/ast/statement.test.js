const acorn = require('../../lib/acorn');

test('test statement', () => {
    expect(acorn.parse('var a,b,c')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 5
                                },
                            init: null,
                            end: 5
                        },
                            {
                                type: 'VariableDeclarator',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                id:
                                    {
                                        type: 'Identifier',
                                        start: 6,
                                        loc:
                                            {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                        name: 'b',
                                        end: 7
                                    },
                                init: null,
                                end: 7
                            },
                            {
                                type: 'VariableDeclarator',
                                start: 8,
                                loc:
                                    {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                id:
                                    {
                                        type: 'Identifier',
                                        start: 8,
                                        loc:
                                            {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                        name: 'c',
                                        end: 9
                                    },
                                init: null,
                                end: 9
                            }],
                    end: 9
                }],
            end: 9
        }
    )

    expect(acorn.parse('function a(b,c){\ne;f;g;\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
                    id:
                        {
                            type: 'Identifier',
                            start: 9,
                            loc:
                                {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                            name: 'a',
                            end: 10
                        },
                    params:
                        [{
                            type: 'Identifier',
                            start: 11,
                            loc:
                                {start: {line: 1, column: 11}, end: {line: 1, column: 12}},
                            name: 'b',
                            end: 12
                        },
                            {
                                type: 'Identifier',
                                start: 13,
                                loc:
                                    {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                name: 'c',
                                end: 14
                            }],
                    expression: false,
                    generator: false,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 3, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 17,
                                    loc:
                                        {start: {line: 2, column: 0}, end: {line: 2, column: 2}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 17,
                                            loc:
                                                {start: {line: 2, column: 0}, end: {line: 2, column: 1}},
                                            name: 'e',
                                            end: 18
                                        },
                                    end: 19
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 19,
                                        loc:
                                            {start: {line: 2, column: 2}, end: {line: 2, column: 4}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 19,
                                                loc:
                                                    {start: {line: 2, column: 2}, end: {line: 2, column: 3}},
                                                name: 'f',
                                                end: 20
                                            },
                                        end: 21
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 21,
                                        loc:
                                            {start: {line: 2, column: 4}, end: {line: 2, column: 6}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 21,
                                                loc:
                                                    {start: {line: 2, column: 4}, end: {line: 2, column: 5}},
                                                name: 'g',
                                                end: 22
                                            },
                                        end: 23
                                    }],
                            end: 25
                        },
                    end: 25
                }],
            end: 25
        }
    )

    expect(acorn.parse('{e;f;g}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
            body:
                [{
                    type: 'BlockStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                    body:
                        [{
                            type: 'ExpressionStatement',
                            start: 1,
                            loc:
                                {start: {line: 1, column: 1}, end: {line: 1, column: 3}},
                            expression:
                                {
                                    type: 'Identifier',
                                    start: 1,
                                    loc:
                                        {start: {line: 1, column: 1}, end: {line: 1, column: 2}},
                                    name: 'e',
                                    end: 2
                                },
                            end: 3
                        },
                            {
                                type: 'ExpressionStatement',
                                start: 3,
                                loc:
                                    {start: {line: 1, column: 3}, end: {line: 1, column: 5}},
                                expression:
                                    {
                                        type: 'Identifier',
                                        start: 3,
                                        loc:
                                            {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                        name: 'f',
                                        end: 4
                                    },
                                end: 5
                            },
                            {
                                type: 'ExpressionStatement',
                                start: 5,
                                loc:
                                    {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                expression:
                                    {
                                        type: 'Identifier',
                                        start: 5,
                                        loc:
                                            {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                        name: 'g',
                                        end: 6
                                    },
                                end: 6
                            }],
                    end: 7
                }],
            end: 7
        }
    )

    expect(acorn.parse('function a(){\nreturn 1;\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
                    id:
                        {
                            type: 'Identifier',
                            start: 9,
                            loc:
                                {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                            name: 'a',
                            end: 10
                        },
                    params: [],
                    expression: false,
                    generator: false,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 12,
                            loc:
                                {start: {line: 1, column: 12}, end: {line: 3, column: 1}},
                            body:
                                [{
                                    type: 'ReturnStatement',
                                    start: 14,
                                    loc:
                                        {start: {line: 2, column: 0}, end: {line: 2, column: 9}},
                                    argument:
                                        {
                                            type: 'Literal',
                                            start: 21,
                                            loc:
                                                {start: {line: 2, column: 7}, end: {line: 2, column: 8}},
                                            value: 1,
                                            raw: '1',
                                            end: 22
                                        },
                                    end: 23
                                }],
                            end: 25
                        },
                    end: 25
                }],
            end: 25
        }
    )

    expect(acorn.parse('throw a.b')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
            body:
                [{
                    type: 'ThrowStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
                    argument:
                        {
                            type: 'MemberExpression',
                            start: 6,
                            loc:
                                {start: {line: 1, column: 6}, end: {line: 1, column: 9}},
                            object:
                                {
                                    type: 'Identifier',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 7
                                },
                            property:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'b',
                                    end: 9
                                },
                            computed: false,
                            end: 9
                        },
                    computed: false,
                    end: 9
                }],
            end: 9
        }
    )

    expect(acorn.parse('if(a){\n\te\n}else if(b){\n\tf\n}else{\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 7, column: 1}},
            body:
                [{
                    type: 'IfStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 7, column: 1}},
                    test:
                        {
                            type: 'Identifier',
                            start: 3,
                            loc:
                                {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                            name: 'a',
                            end: 4
                        },
                    consequent:
                        {
                            type: 'BlockStatement',
                            start: 5,
                            loc:
                                {start: {line: 1, column: 5}, end: {line: 3, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 8,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 8,
                                            loc:
                                                {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                            name: 'e',
                                            end: 9
                                        },
                                    end: 9
                                }],
                            end: 11
                        },
                    alternate:
                        {
                            type: 'IfStatement',
                            start: 16,
                            loc:
                                {start: {line: 3, column: 6}, end: {line: 7, column: 1}},
                            test:
                                {
                                    type: 'Identifier',
                                    start: 19,
                                    loc:
                                        {start: {line: 3, column: 9}, end: {line: 3, column: 10}},
                                    name: 'b',
                                    end: 20
                                },
                            consequent:
                                {
                                    type: 'BlockStatement',
                                    start: 21,
                                    loc:
                                        {start: {line: 3, column: 11}, end: {line: 5, column: 1}},
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 24,
                                            loc:
                                                {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 24,
                                                    loc:
                                                        {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                                    name: 'f',
                                                    end: 25
                                                },
                                            end: 25
                                        }],
                                    end: 27
                                },
                            alternate:
                                {
                                    type: 'BlockStatement',
                                    start: 31,
                                    loc:
                                        {start: {line: 5, column: 5}, end: {line: 7, column: 1}},
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 34,
                                            loc:
                                                {start: {line: 6, column: 1}, end: {line: 6, column: 2}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 34,
                                                    loc:
                                                        {start: {line: 6, column: 1}, end: {line: 6, column: 2}},
                                                    name: 'g',
                                                    end: 35
                                                },
                                            end: 35
                                        }],
                                    end: 37
                                },
                            end: 37
                        },
                    end: 37
                }],
            end: 37
        }
    )

    expect(acorn.parse('switch(a){\n\tcase b: \n\t\te;f;g; \n\tcase c:\n\tcase d:\n\t\te;f;g; \n\tdefault:\n\t\te;f;g;\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 9, column: 1}},
            body:
                [{
                    type: 'SwitchStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 9, column: 1}},
                    discriminant:
                        {
                            type: 'Identifier',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                            name: 'a',
                            end: 8
                        },
                    cases:
                        [{
                            type: 'SwitchCase',
                            start: 12,
                            loc:
                                {start: {line: 2, column: 1}, end: {line: 3, column: 8}},
                            test:
                                {
                                    type: 'Identifier',
                                    start: 17,
                                    loc:
                                        {start: {line: 2, column: 6}, end: {line: 2, column: 7}},
                                    name: 'b',
                                    end: 18
                                },
                            consequent:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 23,
                                    loc:
                                        {start: {line: 3, column: 2}, end: {line: 3, column: 4}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 23,
                                            loc:
                                                {start: {line: 3, column: 2}, end: {line: 3, column: 3}},
                                            name: 'e',
                                            end: 24
                                        },
                                    end: 25
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 25,
                                        loc:
                                            {start: {line: 3, column: 4}, end: {line: 3, column: 6}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 25,
                                                loc:
                                                    {start: {line: 3, column: 4}, end: {line: 3, column: 5}},
                                                name: 'f',
                                                end: 26
                                            },
                                        end: 27
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 27,
                                        loc:
                                            {start: {line: 3, column: 6}, end: {line: 3, column: 8}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 27,
                                                loc:
                                                    {start: {line: 3, column: 6}, end: {line: 3, column: 7}},
                                                name: 'g',
                                                end: 28
                                            },
                                        end: 29
                                    }],
                            end: 29
                        },
                            {
                                type: 'SwitchCase',
                                start: 32,
                                loc:
                                    {start: {line: 4, column: 1}, end: {line: 4, column: 8}},
                                test:
                                    {
                                        type: 'Identifier',
                                        start: 37,
                                        loc:
                                            {start: {line: 4, column: 6}, end: {line: 4, column: 7}},
                                        name: 'c',
                                        end: 38
                                    },
                                consequent: [],
                                end: 39
                            },
                            {
                                type: 'SwitchCase',
                                start: 41,
                                loc:
                                    {start: {line: 5, column: 1}, end: {line: 6, column: 8}},
                                test:
                                    {
                                        type: 'Identifier',
                                        start: 46,
                                        loc:
                                            {start: {line: 5, column: 6}, end: {line: 5, column: 7}},
                                        name: 'd',
                                        end: 47
                                    },
                                consequent:
                                    [{
                                        type: 'ExpressionStatement',
                                        start: 51,
                                        loc:
                                            {start: {line: 6, column: 2}, end: {line: 6, column: 4}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 51,
                                                loc:
                                                    {start: {line: 6, column: 2}, end: {line: 6, column: 3}},
                                                name: 'e',
                                                end: 52
                                            },
                                        end: 53
                                    },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 53,
                                            loc:
                                                {start: {line: 6, column: 4}, end: {line: 6, column: 6}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 53,
                                                    loc:
                                                        {start: {line: 6, column: 4}, end: {line: 6, column: 5}},
                                                    name: 'f',
                                                    end: 54
                                                },
                                            end: 55
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 55,
                                            loc:
                                                {start: {line: 6, column: 6}, end: {line: 6, column: 8}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 55,
                                                    loc:
                                                        {start: {line: 6, column: 6}, end: {line: 6, column: 7}},
                                                    name: 'g',
                                                    end: 56
                                                },
                                            end: 57
                                        }],
                                end: 57
                            },
                            {
                                type: 'SwitchCase',
                                start: 60,
                                loc:
                                    {start: {line: 7, column: 1}, end: {line: 8, column: 8}},
                                test: null,
                                consequent:
                                    [{
                                        type: 'ExpressionStatement',
                                        start: 71,
                                        loc:
                                            {start: {line: 8, column: 2}, end: {line: 8, column: 4}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 71,
                                                loc:
                                                    {start: {line: 8, column: 2}, end: {line: 8, column: 3}},
                                                name: 'e',
                                                end: 72
                                            },
                                        end: 73
                                    },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 73,
                                            loc:
                                                {start: {line: 8, column: 4}, end: {line: 8, column: 6}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 73,
                                                    loc:
                                                        {start: {line: 8, column: 4}, end: {line: 8, column: 5}},
                                                    name: 'f',
                                                    end: 74
                                                },
                                            end: 75
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 75,
                                            loc:
                                                {start: {line: 8, column: 6}, end: {line: 8, column: 8}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 75,
                                                    loc:
                                                        {start: {line: 8, column: 6}, end: {line: 8, column: 7}},
                                                    name: 'g',
                                                    end: 76
                                                },
                                            end: 77
                                        }],
                                end: 77
                            }],
                    end: 79
                }],
            end: 79
        }
    )

    expect(acorn.parse('for(;;){\n\tbreak;\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
            body:
                [{
                    type: 'ForStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
                    init: null,
                    test: null,
                    update: null,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 3, column: 1}},
                            body:
                                [{
                                    type: 'BreakStatement',
                                    start: 10,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 7}},
                                    label: null,
                                    end: 16
                                }],
                            end: 18
                        },
                    end: 18
                }],
            end: 18
        }
    )
    expect(acorn.parse('for(;;){\n\tcontinue\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
            body:
                [{
                    type: 'ForStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 3, column: 1}},
                    init: null,
                    test: null,
                    update: null,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 3, column: 1}},
                            body:
                                [{
                                    type: 'ContinueStatement',
                                    start: 10,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 9}},
                                    label: null,
                                    end: 18
                                }],
                            end: 20
                        },
                    end: 20
                }],
            end: 20
        }
    )
    expect(acorn.parse(';')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 1}},
            body:
                [{
                    type: 'EmptyStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 1}},
                    end: 1
                }],
            end: 1
        }
    )
    expect(acorn.parse('for(var a;a<b;a++){\n\te;\n\tf;\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 5, column: 1}},
            body:
                [{
                    type: 'ForStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 5, column: 1}},
                    init:
                        {
                            type: 'VariableDeclaration',
                            start: 4,
                            loc:
                                {start: {line: 1, column: 4}, end: {line: 1, column: 9}},
                            kind: 'var',
                            declarations:
                                [{
                                    type: 'VariableDeclarator',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    id:
                                        {
                                            type: 'Identifier',
                                            start: 8,
                                            loc:
                                                {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                            name: 'a',
                                            end: 9
                                        },
                                    init: null,
                                    end: 9
                                }],
                            end: 9
                        },
                    test:
                        {
                            type: 'BinaryExpression',
                            start: 10,
                            loc:
                                {start: {line: 1, column: 10}, end: {line: 1, column: 13}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 10,
                                    loc:
                                        {start: {line: 1, column: 10}, end: {line: 1, column: 13}},
                                    name: 'a',
                                    end: 11
                                },
                            operator: '<',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 12,
                                    loc:
                                        {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                    name: 'b',
                                    end: 13
                                },
                            end: 13
                        },
                    update:
                        {
                            type: 'UpdateExpression',
                            start: 14,
                            loc:
                                {start: {line: 1, column: 14}, end: {line: 1, column: 17}},
                            argument:
                                {
                                    type: 'Identifier',
                                    start: 14,
                                    loc:
                                        {start: {line: 1, column: 14}, end: {line: 1, column: 17}},
                                    name: 'a',
                                    end: 15
                                },
                            operator: '++',
                            prefix: false,
                            end: 17
                        },
                    body:
                        {
                            type: 'BlockStatement',
                            start: 18,
                            loc:
                                {start: {line: 1, column: 18}, end: {line: 5, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 21,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 3}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 21,
                                            loc:
                                                {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                            name: 'e',
                                            end: 22
                                        },
                                    end: 23
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 25,
                                        loc:
                                            {start: {line: 3, column: 1}, end: {line: 3, column: 3}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 25,
                                                loc:
                                                    {start: {line: 3, column: 1}, end: {line: 3, column: 2}},
                                                name: 'f',
                                                end: 26
                                            },
                                        end: 27
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 29,
                                        loc:
                                            {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 29,
                                                loc:
                                                    {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                                name: 'g',
                                                end: 30
                                            },
                                        end: 30
                                    }],
                            end: 32
                        },
                    end: 32
                }],
            end: 32
        }
    )
    expect(acorn.parse('for(var a in b){\n\te;\n\tf;\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 5, column: 1}},
            body:
                [{
                    type: 'ForInStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 5, column: 1}},
                    left:
                        {
                            type: 'VariableDeclaration',
                            start: 4,
                            loc:
                                {start: {line: 1, column: 4}, end: {line: 1, column: 9}},
                            kind: 'var',
                            declarations:
                                [{
                                    type: 'VariableDeclarator',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    id:
                                        {
                                            type: 'Identifier',
                                            start: 8,
                                            loc:
                                                {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                            name: 'a',
                                            end: 9
                                        },
                                    init: null,
                                    end: 9
                                }],
                            end: 9
                        },
                    right:
                        {
                            type: 'Identifier',
                            start: 13,
                            loc:
                                {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                            name: 'b',
                            end: 14
                        },
                    body:
                        {
                            type: 'BlockStatement',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 5, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 18,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 3}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 18,
                                            loc:
                                                {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                            name: 'e',
                                            end: 19
                                        },
                                    end: 20
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 22,
                                        loc:
                                            {start: {line: 3, column: 1}, end: {line: 3, column: 3}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 22,
                                                loc:
                                                    {start: {line: 3, column: 1}, end: {line: 3, column: 2}},
                                                name: 'f',
                                                end: 23
                                            },
                                        end: 24
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 26,
                                        loc:
                                            {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 26,
                                                loc:
                                                    {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                                name: 'g',
                                                end: 27
                                            },
                                        end: 27
                                    }],
                            end: 29
                        },
                    end: 29
                }],
            end: 29
        }
    )
    expect(acorn.parse('while(a===b){\n\te;\n\tf;\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 5, column: 1}},
            body:
                [{
                    type: 'WhileStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 5, column: 1}},
                    test:
                        {
                            type: 'BinaryExpression',
                            start: 6,
                            loc:
                                {start: {line: 1, column: 6}, end: {line: 1, column: 11}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 11}},
                                    name: 'a',
                                    end: 7
                                },
                            operator: '===',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 10,
                                    loc:
                                        {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                    name: 'b',
                                    end: 11
                                },
                            end: 11
                        },
                    body:
                        {
                            type: 'BlockStatement',
                            start: 12,
                            loc:
                                {start: {line: 1, column: 12}, end: {line: 5, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 15,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 3}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 15,
                                            loc:
                                                {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                            name: 'e',
                                            end: 16
                                        },
                                    end: 17
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 19,
                                        loc:
                                            {start: {line: 3, column: 1}, end: {line: 3, column: 3}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 19,
                                                loc:
                                                    {start: {line: 3, column: 1}, end: {line: 3, column: 2}},
                                                name: 'f',
                                                end: 20
                                            },
                                        end: 21
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 23,
                                        loc:
                                            {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 23,
                                                loc:
                                                    {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                                name: 'g',
                                                end: 24
                                            },
                                        end: 24
                                    }],
                            end: 26
                        },
                    end: 26
                }],
            end: 26
        }
    )
    expect(acorn.parse('do{\n\te;\n\tf;\n\tg\n}while(a===b)')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 5, column: 13}},
            body:
                [{
                    type: 'DoWhileStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 5, column: 13}},
                    body:
                        {
                            type: 'BlockStatement',
                            start: 2,
                            loc:
                                {start: {line: 1, column: 2}, end: {line: 5, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 5,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 3}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 5,
                                            loc:
                                                {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                            name: 'e',
                                            end: 6
                                        },
                                    end: 7
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 9,
                                        loc:
                                            {start: {line: 3, column: 1}, end: {line: 3, column: 3}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 9,
                                                loc:
                                                    {start: {line: 3, column: 1}, end: {line: 3, column: 2}},
                                                name: 'f',
                                                end: 10
                                            },
                                        end: 11
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 13,
                                        loc:
                                            {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 13,
                                                loc:
                                                    {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                                name: 'g',
                                                end: 14
                                            },
                                        end: 14
                                    }],
                            end: 16
                        },
                    test:
                        {
                            type: 'BinaryExpression',
                            start: 22,
                            loc:
                                {start: {line: 5, column: 7}, end: {line: 5, column: 12}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 22,
                                    loc:
                                        {start: {line: 5, column: 7}, end: {line: 5, column: 12}},
                                    name: 'a',
                                    end: 23
                                },
                            operator: '===',
                            right:
                                {
                                    type: 'Identifier',
                                    start: 26,
                                    loc:
                                        {start: {line: 5, column: 11}, end: {line: 5, column: 12}},
                                    name: 'b',
                                    end: 27
                                },
                            end: 27
                        },
                    end: 28
                }],
            end: 28
        }
    )

    expect(acorn.parse('debugger;')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
            body:
                [{
                    type: 'DebuggerStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
                    end: 9
                }],
            end: 9
        }
    )

    expect(acorn.parse('try{\n\te;\n\tf;\n\tg\n}catch(e){\n\te;\n\tf;\n\tg\n}finally{\n\te;\n\tf;\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 13, column: 1}},
            body:
                [{
                    type: 'TryStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 13, column: 1}},
                    block:
                        {
                            type: 'BlockStatement',
                            start: 3,
                            loc:
                                {start: {line: 1, column: 3}, end: {line: 5, column: 1}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 6,
                                    loc:
                                        {start: {line: 2, column: 1}, end: {line: 2, column: 3}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 6,
                                            loc:
                                                {start: {line: 2, column: 1}, end: {line: 2, column: 2}},
                                            name: 'e',
                                            end: 7
                                        },
                                    end: 8
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 10,
                                        loc:
                                            {start: {line: 3, column: 1}, end: {line: 3, column: 3}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 10,
                                                loc:
                                                    {start: {line: 3, column: 1}, end: {line: 3, column: 2}},
                                                name: 'f',
                                                end: 11
                                            },
                                        end: 12
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 14,
                                        loc:
                                            {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 14,
                                                loc:
                                                    {start: {line: 4, column: 1}, end: {line: 4, column: 2}},
                                                name: 'g',
                                                end: 15
                                            },
                                        end: 15
                                    }],
                            end: 17
                        },
                    handler:
                        {
                            type: 'CatchClause',
                            start: 17,
                            loc:
                                {start: {line: 5, column: 1}, end: {line: 9, column: 1}},
                            param:
                                {
                                    type: 'Identifier',
                                    start: 23,
                                    loc:
                                        {start: {line: 5, column: 7}, end: {line: 5, column: 8}},
                                    name: 'e',
                                    end: 24
                                },
                            body:
                                {
                                    type: 'BlockStatement',
                                    start: 25,
                                    loc:
                                        {start: {line: 5, column: 9}, end: {line: 9, column: 1}},
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 28,
                                            loc:
                                                {start: {line: 6, column: 1}, end: {line: 6, column: 3}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 28,
                                                    loc:
                                                        {start: {line: 6, column: 1}, end: {line: 6, column: 2}},
                                                    name: 'e',
                                                    end: 29
                                                },
                                            end: 30
                                        },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 32,
                                                loc:
                                                    {start: {line: 7, column: 1}, end: {line: 7, column: 3}},
                                                expression:
                                                    {
                                                        type: 'Identifier',
                                                        start: 32,
                                                        loc:
                                                            {start: {line: 7, column: 1}, end: {line: 7, column: 2}},
                                                        name: 'f',
                                                        end: 33
                                                    },
                                                end: 34
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 36,
                                                loc:
                                                    {start: {line: 8, column: 1}, end: {line: 8, column: 2}},
                                                expression:
                                                    {
                                                        type: 'Identifier',
                                                        start: 36,
                                                        loc:
                                                            {start: {line: 8, column: 1}, end: {line: 8, column: 2}},
                                                        name: 'g',
                                                        end: 37
                                                    },
                                                end: 37
                                            }],
                                    end: 39
                                },
                            end: 39
                        },
                    finalizer:
                        {
                            type: 'BlockStatement',
                            start: 46,
                            loc:
                                {start: {line: 9, column: 8}, end: {line: 13, column: 1}},
                            body:
                                {
                                    type: 'BlockStatement',
                                    start: 46,
                                    loc:
                                        {start: {line: 9, column: 8}, end: {line: 13, column: 1}},
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 49,
                                            loc:
                                                {start: {line: 10, column: 1}, end: {line: 10, column: 3}},
                                            expression:
                                                {
                                                    type: 'Identifier',
                                                    start: 49,
                                                    loc:
                                                        {start: {line: 10, column: 1}, end: {line: 10, column: 2}},
                                                    name: 'e',
                                                    end: 50
                                                },
                                            end: 51
                                        },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 53,
                                                loc:
                                                    {start: {line: 11, column: 1}, end: {line: 11, column: 3}},
                                                expression:
                                                    {
                                                        type: 'Identifier',
                                                        start: 53,
                                                        loc:
                                                            {start: {line: 11, column: 1}, end: {line: 11, column: 2}},
                                                        name: 'f',
                                                        end: 54
                                                    },
                                                end: 55
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 57,
                                                loc:
                                                    {start: {line: 12, column: 1}, end: {line: 12, column: 2}},
                                                expression:
                                                    {
                                                        type: 'Identifier',
                                                        start: 57,
                                                        loc:
                                                            {start: {line: 12, column: 1}, end: {line: 12, column: 2}},
                                                        name: 'g',
                                                        end: 58
                                                    },
                                                end: 58
                                            }],
                                    end: 60
                                },
                            end: 60
                        },
                    end: 60
                }],
            end: 60
        }
    )

    expect(acorn.parse('{a:b}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'BlockStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    body:
                        [{
                            type: 'LabeledStatement',
                            start: 1,
                            loc:
                                {start: {line: 1, column: 1}, end: {line: 1, column: 4}},
                            label:
                                {
                                    type: 'Identifier',
                                    start: 1,
                                    loc:
                                        {start: {line: 1, column: 1}, end: {line: 1, column: 2}},
                                    name: 'a',
                                    end: 2
                                },
                            body:
                                {
                                    type: 'ExpressionStatement',
                                    start: 3,
                                    loc:
                                        {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 3,
                                            loc:
                                                {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                            name: 'b',
                                            end: 4
                                        },
                                    end: 4
                                },
                            end: 4
                        }],
                    end: 5
                }],
            end: 5
        }
    )
})