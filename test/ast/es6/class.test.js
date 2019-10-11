const acorn = require('../../../lib/acorn');

test('test class function', () => {
        expect(acorn.parse('class A {}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass: null,
                        body:
                            {
                                type: 'ClassBody',
                                start: 8,
                                loc:
                                    {start: {line: 1, column: 8}, end: {line: 1, column: 10}},
                                body: [],
                                end: 10
                            },
                        end: 10
                    }],
                end: 10
            }
        )

        expect(acorn.parse('var a=class {}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 14}},
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 14}},
                        kind: 'var',
                        declarations:
                            [{
                                type: 'VariableDeclarator',
                                start: 4,
                                loc:
                                    {start: {line: 1, column: 4}, end: {line: 1, column: 14}},
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
                                        type: 'ClassExpression',
                                        start: 6,
                                        loc:
                                            {start: {line: 1, column: 6}, end: {line: 1, column: 14}},
                                        id: null,
                                        superClass: null,
                                        body:
                                            {
                                                type: 'ClassBody',
                                                start: 12,
                                                loc:
                                                    {start: {line: 1, column: 12}, end: {line: 1, column: 14}},
                                                body: [],
                                                end: 14
                                            },
                                        end: 14
                                    },
                                end: 14
                            }],
                        end: 14
                    }],
                end: 14
            }
        )

        expect(acorn.parse('class A extends b.c{}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 21}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 21}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass:
                            {
                                type: 'MemberExpression',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                object:
                                    {
                                        type: 'Identifier',
                                        start: 16,
                                        loc:
                                            {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                        name: 'b',
                                        end: 17
                                    },
                                property:
                                    {
                                        type: 'Identifier',
                                        start: 18,
                                        loc:
                                            {start: {line: 1, column: 18}, end: {line: 1, column: 19}},
                                        name: 'c',
                                        end: 19
                                    },
                                computed: false,
                                end: 19
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 19,
                                loc:
                                    {start: {line: 1, column: 19}, end: {line: 1, column: 21}},
                                body: [],
                                end: 21
                            },
                        end: 21
                    }],
                end: 21
            }
        )

        expect(acorn.parse('class A extends b.c{\n\tconstructor(a,b,c){}\n\tstatic n(){}\n}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 4, column: 1}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 4, column: 1}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass:
                            {
                                type: 'MemberExpression',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                object:
                                    {
                                        type: 'Identifier',
                                        start: 16,
                                        loc:
                                            {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                        name: 'b',
                                        end: 17
                                    },
                                property:
                                    {
                                        type: 'Identifier',
                                        start: 18,
                                        loc:
                                            {start: {line: 1, column: 18}, end: {line: 1, column: 19}},
                                        name: 'c',
                                        end: 19
                                    },
                                computed: false,
                                end: 19
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 19,
                                loc:
                                    {start: {line: 1, column: 19}, end: {line: 4, column: 1}},
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 22,
                                        loc:
                                            {start: {line: 2, column: 1}, end: {line: 2, column: 21}},
                                        static: false,
                                        kind: 'constructor',
                                        key:
                                            {
                                                type: 'Identifier',
                                                start: 22,
                                                loc:
                                                    {start: {line: 2, column: 1}, end: {line: 2, column: 12}},
                                                name: 'constructor',
                                                end: 33
                                            },
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 33,
                                                loc:
                                                    {start: {line: 2, column: 12}, end: {line: 2, column: 21}},
                                                id: null,
                                                params:
                                                    [{
                                                        type: 'Identifier',
                                                        start: 34,
                                                        loc:
                                                            {start: {line: 2, column: 13}, end: {line: 2, column: 14}},
                                                        name: 'a',
                                                        end: 35
                                                    },
                                                        {
                                                            type: 'Identifier',
                                                            start: 36,
                                                            loc:
                                                                {start: {line: 2, column: 15}, end: {line: 2, column: 16}},
                                                            name: 'b',
                                                            end: 37
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            start: 38,
                                                            loc:
                                                                {start: {line: 2, column: 17}, end: {line: 2, column: 18}},
                                                            name: 'c',
                                                            end: 39
                                                        }],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 40,
                                                        loc:
                                                            {start: {line: 2, column: 19}, end: {line: 2, column: 21}},
                                                        body: [],
                                                        end: 42
                                                    },
                                                end: 42
                                            },
                                        end: 42
                                    },
                                        {
                                            type: 'MethodDefinition',
                                            start: 44,
                                            loc:
                                                {start: {line: 3, column: 1}, end: {line: 3, column: 13}},
                                            static: true,
                                            kind: 'method',
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 51,
                                                    loc:
                                                        {start: {line: 3, column: 8}, end: {line: 3, column: 9}},
                                                    name: 'n',
                                                    end: 52
                                                },
                                            computed: false,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 52,
                                                    loc:
                                                        {start: {line: 3, column: 9}, end: {line: 3, column: 13}},
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        {
                                                            type: 'BlockStatement',
                                                            start: 54,
                                                            loc:
                                                                {start: {line: 3, column: 11}, end: {line: 3, column: 13}},
                                                            body: [],
                                                            end: 56
                                                        },
                                                    end: 56
                                                },
                                            end: 56
                                        }],
                                end: 58
                            },
                        end: 58
                    }],
                end: 58
            }
        )

        expect(acorn.parse('class A extends B{\n\tconstructor(a,b,c){\n\t\tsuper()\n\t\tsuper.s()\n\t}\n\t\n}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 7, column: 1}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 7, column: 1}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass:
                            {
                                type: 'Identifier',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 17}},
                                name: 'B',
                                end: 17
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                loc:
                                    {start: {line: 1, column: 17}, end: {line: 7, column: 1}},
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 20,
                                        loc:
                                            {start: {line: 2, column: 1}, end: {line: 5, column: 2}},
                                        static: false,
                                        kind: 'constructor',
                                        key:
                                            {
                                                type: 'Identifier',
                                                start: 20,
                                                loc:
                                                    {start: {line: 2, column: 1}, end: {line: 2, column: 12}},
                                                name: 'constructor',
                                                end: 31
                                            },
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 31,
                                                loc:
                                                    {start: {line: 2, column: 12}, end: {line: 5, column: 2}},
                                                id: null,
                                                params:
                                                    [{
                                                        type: 'Identifier',
                                                        start: 32,
                                                        loc:
                                                            {start: {line: 2, column: 13}, end: {line: 2, column: 14}},
                                                        name: 'a',
                                                        end: 33
                                                    },
                                                        {
                                                            type: 'Identifier',
                                                            start: 34,
                                                            loc:
                                                                {start: {line: 2, column: 15}, end: {line: 2, column: 16}},
                                                            name: 'b',
                                                            end: 35
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            start: 36,
                                                            loc:
                                                                {start: {line: 2, column: 17}, end: {line: 2, column: 18}},
                                                            name: 'c',
                                                            end: 37
                                                        }],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 38,
                                                        loc:
                                                            {start: {line: 2, column: 19}, end: {line: 5, column: 2}},
                                                        body:
                                                            [{
                                                                type: 'ExpressionStatement',
                                                                start: 42,
                                                                loc:
                                                                    {
                                                                        start: {line: 3, column: 2},
                                                                        end: {line: 3, column: 9}
                                                                    },
                                                                expression:
                                                                    {
                                                                        type: 'CallExpression',
                                                                        start: 42,
                                                                        loc:
                                                                            {
                                                                                start: {line: 3, column: 2},
                                                                                end: {line: 3, column: 9}
                                                                            },
                                                                        arguments: [],
                                                                        callee:
                                                                            {
                                                                                type: 'Super',
                                                                                start: 42,
                                                                                loc:
                                                                                    {
                                                                                        start: {line: 3, column: 2},
                                                                                        end: {line: 3, column: 9}
                                                                                    },
                                                                                end: 47
                                                                            },
                                                                        end: 49
                                                                    },
                                                                end: 49
                                                            },
                                                                {
                                                                    type: 'ExpressionStatement',
                                                                    start: 52,
                                                                    loc:
                                                                        {
                                                                            start: {line: 4, column: 2},
                                                                            end: {line: 4, column: 11}
                                                                        },
                                                                    expression:
                                                                        {
                                                                            type: 'CallExpression',
                                                                            start: 52,
                                                                            loc:
                                                                                {
                                                                                    start: {line: 4, column: 2},
                                                                                    end: {line: 4, column: 11}
                                                                                },
                                                                            arguments: [],
                                                                            callee:
                                                                                {
                                                                                    type: 'MemberExpression',
                                                                                    start: 52,
                                                                                    loc:
                                                                                        {
                                                                                            start: {line: 4, column: 2},
                                                                                            end: {line: 4, column: 11}
                                                                                        },
                                                                                    object:
                                                                                        {
                                                                                            type: 'Super',
                                                                                            start: 52,
                                                                                            loc:
                                                                                                {
                                                                                                    start: {
                                                                                                        line: 4,
                                                                                                        column: 2
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 4,
                                                                                                        column: 11
                                                                                                    }
                                                                                                },
                                                                                            end: 57
                                                                                        },
                                                                                    property:
                                                                                        {
                                                                                            type: 'Identifier',
                                                                                            start: 58,
                                                                                            loc:
                                                                                                {
                                                                                                    start: {
                                                                                                        line: 4,
                                                                                                        column: 8
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 4,
                                                                                                        column: 9
                                                                                                    }
                                                                                                },
                                                                                            name: 's',
                                                                                            end: 59
                                                                                        },
                                                                                    computed: false,
                                                                                    end: 59
                                                                                },
                                                                            end: 61
                                                                        },
                                                                    end: 61
                                                                }],
                                                        end: 64
                                                    },
                                                end: 64
                                            },
                                        end: 64
                                    }],
                                end: 68
                            },
                        end: 68
                    }],
                end: 68
            }
        )

        expect(acorn.parse('class A extends B{\n\tconstructor(){\n\t\tx.super()\n\t}\n\t\n}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 6, column: 1}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 6, column: 1}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass:
                            {
                                type: 'Identifier',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 17}},
                                name: 'B',
                                end: 17
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                loc:
                                    {start: {line: 1, column: 17}, end: {line: 6, column: 1}},
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 20,
                                        loc:
                                            {start: {line: 2, column: 1}, end: {line: 4, column: 2}},
                                        static: false,
                                        kind: 'constructor',
                                        key:
                                            {
                                                type: 'Identifier',
                                                start: 20,
                                                loc:
                                                    {start: {line: 2, column: 1}, end: {line: 2, column: 12}},
                                                name: 'constructor',
                                                end: 31
                                            },
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 31,
                                                loc:
                                                    {start: {line: 2, column: 12}, end: {line: 4, column: 2}},
                                                id: null,
                                                params: [],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 33,
                                                        loc:
                                                            {start: {line: 2, column: 14}, end: {line: 4, column: 2}},
                                                        body:
                                                            [{
                                                                type: 'ExpressionStatement',
                                                                start: 37,
                                                                loc:
                                                                    {
                                                                        start: {line: 3, column: 2},
                                                                        end: {line: 3, column: 11}
                                                                    },
                                                                expression:
                                                                    {
                                                                        type: 'CallExpression',
                                                                        start: 37,
                                                                        loc:
                                                                            {
                                                                                start: {line: 3, column: 2},
                                                                                end: {line: 3, column: 11}
                                                                            },
                                                                        arguments: [],
                                                                        callee:
                                                                            {
                                                                                type: 'MemberExpression',
                                                                                start: 37,
                                                                                loc:
                                                                                    {
                                                                                        start: {line: 3, column: 2},
                                                                                        end: {line: 3, column: 11}
                                                                                    },
                                                                                object:
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        start: 37,
                                                                                        loc:
                                                                                            {
                                                                                                start: {line: 3, column: 2},
                                                                                                end: {line: 3, column: 11}
                                                                                            },
                                                                                        name: 'x',
                                                                                        end: 38
                                                                                    },
                                                                                property:
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        start: 39,
                                                                                        loc:
                                                                                            {
                                                                                                start: {line: 3, column: 4},
                                                                                                end: {line: 3, column: 9}
                                                                                            },
                                                                                        name: 'super',
                                                                                        end: 44
                                                                                    },
                                                                                computed: false,
                                                                                end: 44
                                                                            },
                                                                        end: 46
                                                                    },
                                                                end: 46
                                                            }],
                                                        end: 49
                                                    },
                                                end: 49
                                            },
                                        end: 49
                                    }],
                                end: 53
                            },
                        end: 53
                    }],
                end: 53
            }
        )

        expect(acorn.parse('class A extends B{set x(x){this.x=x} get x(){return this.x}}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 60}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 60}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass:
                            {
                                type: 'Identifier',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 17}},
                                name: 'B',
                                end: 17
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                loc:
                                    {start: {line: 1, column: 17}, end: {line: 1, column: 60}},
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 18,
                                        loc:
                                            {start: {line: 1, column: 18}, end: {line: 1, column: 36}},
                                        static: false,
                                        kind: 'set',
                                        key:
                                            {
                                                type: 'Identifier',
                                                start: 22,
                                                loc:
                                                    {start: {line: 1, column: 22}, end: {line: 1, column: 23}},
                                                name: 'x',
                                                end: 23
                                            },
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 23,
                                                loc:
                                                    {start: {line: 1, column: 23}, end: {line: 1, column: 36}},
                                                id: null,
                                                params:
                                                    [{
                                                        type: 'Identifier',
                                                        start: 24,
                                                        loc:
                                                            {start: {line: 1, column: 24}, end: {line: 1, column: 25}},
                                                        name: 'x',
                                                        end: 25
                                                    }],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 26,
                                                        loc:
                                                            {start: {line: 1, column: 26}, end: {line: 1, column: 36}},
                                                        body:
                                                            [{
                                                                type: 'ExpressionStatement',
                                                                start: 27,
                                                                loc:
                                                                    {
                                                                        start: {line: 1, column: 27},
                                                                        end: {line: 1, column: 35}
                                                                    },
                                                                expression:
                                                                    {
                                                                        type: 'AssignmentExpression',
                                                                        start: 27,
                                                                        loc:
                                                                            {
                                                                                start: {line: 1, column: 27},
                                                                                end: {line: 1, column: 35}
                                                                            },
                                                                        left:
                                                                            {
                                                                                type: 'MemberExpression',
                                                                                start: 27,
                                                                                loc:
                                                                                    {
                                                                                        start: {line: 1, column: 27},
                                                                                        end: {line: 1, column: 35}
                                                                                    },
                                                                                object:
                                                                                    {
                                                                                        type: 'ThisExpression',
                                                                                        start: 27,
                                                                                        loc:
                                                                                            {
                                                                                                start: {
                                                                                                    line: 1,
                                                                                                    column: 27
                                                                                                },
                                                                                                end: {line: 1, column: 35}
                                                                                            },
                                                                                        end: 31
                                                                                    },
                                                                                property:
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        start: 32,
                                                                                        loc:
                                                                                            {
                                                                                                start: {
                                                                                                    line: 1,
                                                                                                    column: 32
                                                                                                },
                                                                                                end: {line: 1, column: 33}
                                                                                            },
                                                                                        name: 'x',
                                                                                        end: 33
                                                                                    },
                                                                                computed: false,
                                                                                end: 33
                                                                            },
                                                                        operator: '=',
                                                                        right:
                                                                            {
                                                                                type: 'Identifier',
                                                                                start: 34,
                                                                                loc:
                                                                                    {
                                                                                        start: {line: 1, column: 34},
                                                                                        end: {line: 1, column: 35}
                                                                                    },
                                                                                name: 'x',
                                                                                end: 35
                                                                            },
                                                                        end: 35
                                                                    },
                                                                end: 35
                                                            }],
                                                        end: 36
                                                    },
                                                end: 36
                                            },
                                        end: 36
                                    },
                                        {
                                            type: 'MethodDefinition',
                                            start: 37,
                                            loc:
                                                {start: {line: 1, column: 37}, end: {line: 1, column: 59}},
                                            static: false,
                                            kind: 'get',
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 41,
                                                    loc:
                                                        {start: {line: 1, column: 41}, end: {line: 1, column: 42}},
                                                    name: 'x',
                                                    end: 42
                                                },
                                            computed: false,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 42,
                                                    loc:
                                                        {start: {line: 1, column: 42}, end: {line: 1, column: 59}},
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        {
                                                            type: 'BlockStatement',
                                                            start: 44,
                                                            loc:
                                                                {start: {line: 1, column: 44}, end: {line: 1, column: 59}},
                                                            body:
                                                                [{
                                                                    type: 'ReturnStatement',
                                                                    start: 45,
                                                                    loc:
                                                                        {
                                                                            start: {line: 1, column: 45},
                                                                            end: {line: 1, column: 58}
                                                                        },
                                                                    argument:
                                                                        {
                                                                            type: 'MemberExpression',
                                                                            start: 52,
                                                                            loc:
                                                                                {
                                                                                    start: {line: 1, column: 52},
                                                                                    end: {line: 1, column: 58}
                                                                                },
                                                                            object:
                                                                                {
                                                                                    type: 'ThisExpression',
                                                                                    start: 52,
                                                                                    loc:
                                                                                        {
                                                                                            start: {line: 1, column: 52},
                                                                                            end: {line: 1, column: 58}
                                                                                        },
                                                                                    end: 56
                                                                                },
                                                                            property:
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    start: 57,
                                                                                    loc:
                                                                                        {
                                                                                            start: {line: 1, column: 57},
                                                                                            end: {line: 1, column: 58}
                                                                                        },
                                                                                    name: 'x',
                                                                                    end: 58
                                                                                },
                                                                            computed: false,
                                                                            end: 58
                                                                        },
                                                                    end: 58
                                                                }],
                                                            end: 59
                                                        },
                                                    end: 59
                                                },
                                            end: 59
                                        }],
                                end: 60
                            },
                        end: 60
                    }],
                end: 60
            }
        )

        expect(acorn.parse('class A extends B{x(){};;static y(){}}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 38}},
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 38}},
                        id:
                            {
                                type: 'Identifier',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                name: 'A',
                                end: 7
                            },
                        superClass:
                            {
                                type: 'Identifier',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 17}},
                                name: 'B',
                                end: 17
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                loc:
                                    {start: {line: 1, column: 17}, end: {line: 1, column: 38}},
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 18,
                                        loc:
                                            {start: {line: 1, column: 18}, end: {line: 1, column: 23}},
                                        static: false,
                                        kind: 'method',
                                        key:
                                            {
                                                type: 'Identifier',
                                                start: 18,
                                                loc:
                                                    {start: {line: 1, column: 18}, end: {line: 1, column: 19}},
                                                name: 'x',
                                                end: 19
                                            },
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 19,
                                                loc:
                                                    {start: {line: 1, column: 19}, end: {line: 1, column: 23}},
                                                id: null,
                                                params: [],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 21,
                                                        loc:
                                                            {start: {line: 1, column: 21}, end: {line: 1, column: 23}},
                                                        body: [],
                                                        end: 23
                                                    },
                                                end: 23
                                            },
                                        end: 23
                                    },
                                        {
                                            type: 'MethodDefinition',
                                            start: 25,
                                            loc:
                                                {start: {line: 1, column: 25}, end: {line: 1, column: 37}},
                                            static: true,
                                            kind: 'method',
                                            key:
                                                {
                                                    type: 'Identifier',
                                                    start: 32,
                                                    loc:
                                                        {start: {line: 1, column: 32}, end: {line: 1, column: 33}},
                                                    name: 'y',
                                                    end: 33
                                                },
                                            computed: false,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 33,
                                                    loc:
                                                        {start: {line: 1, column: 33}, end: {line: 1, column: 37}},
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        {
                                                            type: 'BlockStatement',
                                                            start: 35,
                                                            loc:
                                                                {start: {line: 1, column: 35}, end: {line: 1, column: 37}},
                                                            body: [],
                                                            end: 37
                                                        },
                                                    end: 37
                                                },
                                            end: 37
                                        }],
                                end: 38
                            },
                        end: 38
                    }],
                end: 38
            }
        )
    }
)
