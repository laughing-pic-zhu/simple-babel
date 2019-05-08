const acorn = require('../acorn');

test('test statement', () => {
    expect(acorn.parse('var a,b,c')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init: null,
                            end: 5
                        },
                            {
                                type: 'VariableDeclarator',
                                start: 6,
                                id: {type: 'Identifier', start: 6, name: 'b', end: 7},
                                init: null,
                                end: 7
                            },
                            {
                                type: 'VariableDeclarator',
                                start: 8,
                                id: {type: 'Identifier', start: 8, name: 'c', end: 9},
                                init: null,
                                end: 9
                            }],
                    end: 9
                }],
            end: 9
        }
    )

    expect(acorn.parse('var a,b,c')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init: null,
                            end: 5
                        },
                            {
                                type: 'VariableDeclarator',
                                start: 6,
                                id: {type: 'Identifier', start: 6, name: 'b', end: 7},
                                init: null,
                                end: 7
                            },
                            {
                                type: 'VariableDeclarator',
                                start: 8,
                                id: {type: 'Identifier', start: 8, name: 'c', end: 9},
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
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params:
                        [{type: 'Identifier', start: 11, name: 'b', end: 12},
                            {type: 'Identifier', start: 13, name: 'c', end: 14}],
                    body:
                        {
                            type: 'BlockStatement',
                            start: 15,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 17,
                                    expression: {type: 'Identifier', start: 17, value: 'e', end: 18},
                                    end: 19
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 19,
                                        expression: {type: 'Identifier', start: 19, value: 'f', end: 20},
                                        end: 21
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 21,
                                        expression: {type: 'Identifier', start: 21, value: 'g', end: 22},
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
            body:
                [{
                    type: 'BlockStatement',
                    start: 0,
                    body:
                        [{
                            type: 'ExpressionStatement',
                            start: 1,
                            expression: {type: 'Identifier', start: 1, value: 'e', end: 2},
                            end: 3
                        },
                            {
                                type: 'ExpressionStatement',
                                start: 3,
                                expression: {type: 'Identifier', start: 3, value: 'f', end: 4},
                                end: 5
                            },
                            {
                                type: 'ExpressionStatement',
                                start: 5,
                                expression: {type: 'Identifier', start: 5, value: 'g', end: 6},
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
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params: [],
                    body:
                        {
                            type: 'BlockStatement',
                            start: 12,
                            body:
                                [{
                                    type: 'ReturnStatement',
                                    start: 14,
                                    arguments: {type: 'Literal', start: 21, value: 1, raw: '1', end: 22},
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
            body:
                [{
                    type: 'ThrowStatement',
                    start: 0,
                    argument:
                        {
                            start: 6,
                            type: 'MemberExpression',
                            object: {type: 'Identifier', start: 6, value: 'a', end: 7},
                            property: {type: 'Identifier', start: 8, name: 'b', end: 9},
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
            body:
                [{
                    type: 'IfStatement',
                    start: 0,
                    test: {type: 'Identifier', start: 3, value: 'a', end: 4},
                    consequent:
                        {
                            type: 'BlockStatement',
                            start: 5,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 8,
                                    expression: {type: 'Identifier', start: 8, value: 'e', end: 9},
                                    end: 9
                                }],
                            end: 11
                        },
                    alternate:
                        {
                            type: 'IfStatement',
                            start: 16,
                            test: {type: 'Identifier', start: 19, value: 'b', end: 20},
                            consequent:
                                {
                                    type: 'BlockStatement',
                                    start: 21,
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 24,
                                            expression: {type: 'Identifier', start: 24, value: 'f', end: 25},
                                            end: 25
                                        }],
                                    end: 27
                                },
                            alternate:
                                {
                                    type: 'BlockStatement',
                                    start: 31,
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 34,
                                            expression: {type: 'Identifier', start: 34, value: 'g', end: 35},
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
            body:
                [{
                    type: 'SwitchStatement',
                    start: 0,
                    discriminant: {type: 'Identifier', start: 7, value: 'a', end: 8},
                    cases:
                        [{
                            type: 'SwitchCase',
                            start: 12,
                            test: {type: 'Identifier', start: 17, value: 'b', end: 18},
                            consequent:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 23,
                                    expression: {type: 'Identifier', start: 23, value: 'e', end: 24},
                                    end: 25
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 25,
                                        expression: {type: 'Identifier', start: 25, value: 'f', end: 26},
                                        end: 27
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 27,
                                        expression: {type: 'Identifier', start: 27, value: 'g', end: 28},
                                        end: 29
                                    }],
                            end: 29
                        },
                            {
                                type: 'SwitchCase',
                                start: 32,
                                test: {type: 'Identifier', start: 37, value: 'c', end: 38},
                                consequent: [],
                                end: 39
                            },
                            {
                                type: 'SwitchCase',
                                start: 41,
                                test: {type: 'Identifier', start: 46, value: 'd', end: 47},
                                consequent:
                                    [{
                                        type: 'ExpressionStatement',
                                        start: 51,
                                        expression: {type: 'Identifier', start: 51, value: 'e', end: 52},
                                        end: 53
                                    },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 53,
                                            expression: {type: 'Identifier', start: 53, value: 'f', end: 54},
                                            end: 55
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 55,
                                            expression: {type: 'Identifier', start: 55, value: 'g', end: 56},
                                            end: 57
                                        }],
                                end: 57
                            },
                            {
                                type: 'SwitchCase',
                                start: 60,
                                test: null,
                                consequent:
                                    [{
                                        type: 'ExpressionStatement',
                                        start: 71,
                                        expression: {type: 'Identifier', start: 71, value: 'e', end: 72},
                                        end: 73
                                    },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 73,
                                            expression: {type: 'Identifier', start: 73, value: 'f', end: 74},
                                            end: 75
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 75,
                                            expression: {type: 'Identifier', start: 75, value: 'g', end: 76},
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
            body:
                [{
                    type: 'ForStatement',
                    start: 0,
                    init: null,
                    test: null,
                    update: null,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 7,
                            body: [{type: 'BreakStatement', start: 10, label: null, end: 16}],
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
            body:
                [{
                    type: 'ForStatement',
                    start: 0,
                    init: null,
                    test: null,
                    update: null,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 7,
                            body:
                                [{type: 'ContinueStatement', start: 10, label: null, end: 18}],
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
            body: [{type: 'EmptyStatement', start: 0, end: 1}],
            end: 1
        }
    )
    expect(acorn.parse('for(var a;a<b;a++){\n\te;\n\tf;\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ForStatement',
                    start: 0,
                    init:
                        {
                            type: 'VariableDeclaration',
                            start: 4,
                            declarations:
                                [{
                                    type: 'VariableDeclarator',
                                    start: 8,
                                    id: {type: 'Identifier', start: 8, name: 'a', end: 9},
                                    init: null,
                                    end: 9
                                }],
                            end: 9
                        },
                    test:
                        {
                            start: 10,
                            type: 'BinaryExpression',
                            left: {type: 'Identifier', start: 10, value: 'a', end: 11},
                            operator: '<',
                            right: {type: 'Identifier', start: 12, value: 'b', end: 13},
                            end: 13
                        },
                    update:
                        {
                            start: 14,
                            type: 'UpdateExpression',
                            argument: {type: 'Identifier', start: 14, value: 'a', end: 15},
                            operator: '++',
                            prefix: false,
                            end: 17
                        },
                    body:
                        {
                            type: 'BlockStatement',
                            start: 18,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 21,
                                    expression: {type: 'Identifier', start: 21, value: 'e', end: 22},
                                    end: 23
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 25,
                                        expression: {type: 'Identifier', start: 25, value: 'f', end: 26},
                                        end: 27
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 29,
                                        expression: {type: 'Identifier', start: 29, value: 'g', end: 30},
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
            body:
                [{
                    type: 'ForInStatement',
                    start: 0,
                    left:
                        {
                            type: 'VariableDeclaration',
                            start: 4,
                            declarations:
                                [{
                                    type: 'VariableDeclarator',
                                    start: 8,
                                    id: {type: 'Identifier', start: 8, name: 'a', end: 9},
                                    init: null,
                                    end: 9
                                }],
                            end: 9
                        },
                    right: {type: 'Identifier', start: 13, value: 'b', end: 14},
                    body:
                        {
                            type: 'BlockStatement',
                            start: 15,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 18,
                                    expression: {type: 'Identifier', start: 18, value: 'e', end: 19},
                                    end: 20
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 22,
                                        expression: {type: 'Identifier', start: 22, value: 'f', end: 23},
                                        end: 24
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 26,
                                        expression: {type: 'Identifier', start: 26, value: 'g', end: 27},
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
            body:
                [{
                    type: 'WhileStatement',
                    start: 0,
                    test:
                        {
                            start: 6,
                            type: 'BinaryExpression',
                            left: {type: 'Identifier', start: 6, value: 'a', end: 7},
                            operator: '===',
                            right: {type: 'Identifier', start: 10, value: 'b', end: 11},
                            end: 11
                        },
                    body:
                        {
                            type: 'BlockStatement',
                            start: 12,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 15,
                                    expression: {type: 'Identifier', start: 15, value: 'e', end: 16},
                                    end: 17
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 19,
                                        expression: {type: 'Identifier', start: 19, value: 'f', end: 20},
                                        end: 21
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 23,
                                        expression: {type: 'Identifier', start: 23, value: 'g', end: 24},
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
            body:
                [{
                    type: 'DoWhileStatement',
                    start: 0,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 2,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 5,
                                    expression: {type: 'Identifier', start: 5, value: 'e', end: 6},
                                    end: 7
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 9,
                                        expression: {type: 'Identifier', start: 9, value: 'f', end: 10},
                                        end: 11
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 13,
                                        expression: {type: 'Identifier', start: 13, value: 'g', end: 14},
                                        end: 14
                                    }],
                            end: 16
                        },
                    test:
                        {
                            start: 22,
                            type: 'BinaryExpression',
                            left: {type: 'Identifier', start: 22, value: 'a', end: 23},
                            operator: '===',
                            right: {type: 'Identifier', start: 26, value: 'b', end: 27},
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
            body: [{type: 'DebuggerStatement', start: 0, end: 9}],
            end: 9
        }
    )

    expect(acorn.parse('try{\n\te;\n\tf;\n\tg\n}catch(e){\n\te;\n\tf;\n\tg\n}finally{\n\te;\n\tf;\n\tg\n}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'TryStatement',
                    start: 0,
                    block:
                        {
                            type: 'BlockStatement',
                            start: 3,
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 6,
                                    expression: {type: 'Identifier', start: 6, value: 'e', end: 7},
                                    end: 8
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 10,
                                        expression: {type: 'Identifier', start: 10, value: 'f', end: 11},
                                        end: 12
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 14,
                                        expression: {type: 'Identifier', start: 14, value: 'g', end: 15},
                                        end: 15
                                    }],
                            end: 17
                        },
                    handler:
                        {
                            type: 'CatchClause',
                            start: 17,
                            param: {type: 'Identifier', start: 23, name: 'e', end: 24},
                            body:
                                {
                                    type: 'BlockStatement',
                                    start: 25,
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 28,
                                            expression: {type: 'Identifier', start: 28, value: 'e', end: 29},
                                            end: 30
                                        },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 32,
                                                expression: {type: 'Identifier', start: 32, value: 'f', end: 33},
                                                end: 34
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 36,
                                                expression: {type: 'Identifier', start: 36, value: 'g', end: 37},
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
                            body:
                                {
                                    type: 'BlockStatement',
                                    start: 46,
                                    body:
                                        [{
                                            type: 'ExpressionStatement',
                                            start: 49,
                                            expression: {type: 'Identifier', start: 49, value: 'e', end: 50},
                                            end: 51
                                        },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 53,
                                                expression: {type: 'Identifier', start: 53, value: 'f', end: 54},
                                                end: 55
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 57,
                                                expression: {type: 'Identifier', start: 57, value: 'g', end: 58},
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
            body:
                [{
                    type: 'BlockStatement',
                    start: 0,
                    body:
                        [{
                            type: 'LabeledStatement',
                            start: 1,
                            label: {type: 'Identifier', start: 1, value: 'a', end: 2},
                            body:
                                {
                                    type: 'ExpressionStatement',
                                    start: 3,
                                    expression: {type: 'Identifier', start: 3, value: 'b', end: 4},
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