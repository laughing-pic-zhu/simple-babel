const acorn = require('../../../lib/acorn');

test('test class function', () => {
        expect(acorn.parse('class A {}')).toEqual(
            {
                type: 'Program',
                start: 0,
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass: null,
                        body: {type: 'ClassBody', start: 8, body: [], end: 10},
                        end: 10
                    }],
                end: 10
            }
        )

        expect(acorn.parse('var a=class {}')).toEqual(
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
                                        type: 'ClassExpression',
                                        start: 6,
                                        id: null,
                                        superClass: null,
                                        body: {type: 'ClassBody', start: 12, body: [], end: 14},
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
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass:
                            {
                                start: 16,
                                type: 'MemberExpression',
                                object: {type: 'Identifier', start: 16, name: 'b', end: 17},
                                property: {type: 'Identifier', start: 18, name: 'c', end: 19},
                                computed: false,
                                end: 19
                            },
                        body: {type: 'ClassBody', start: 19, body: [], end: 21},
                        end: 21
                    }],
                end: 21
            }
        )

        expect(acorn.parse('class A extends b.c{\n\tconstructor(a,b,c){}\n\tstatic n(){}\n}')).toEqual(
            {
                type: 'Program',
                start: 0,
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass:
                            {
                                start: 16,
                                type: 'MemberExpression',
                                object: {type: 'Identifier', start: 16, name: 'b', end: 17},
                                property: {type: 'Identifier', start: 18, name: 'c', end: 19},
                                computed: false,
                                end: 19
                            },
                        body:
                            {
                                type: 'ClassBody',
                                start: 19,
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 22,
                                        kind: 'constructor',
                                        computed: false,
                                        static: false,
                                        key: {type: 'Identifier', start: 22, name: 'constructor', end: 33},
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 33,
                                                expression: false,
                                                generator: false,
                                                id: null,
                                                params:
                                                    [{type: 'Identifier', start: 34, name: 'a', end: 35},
                                                        {type: 'Identifier', start: 36, name: 'b', end: 37},
                                                        {type: 'Identifier', start: 38, name: 'c', end: 39}],
                                                body: {type: 'BlockStatement', start: 40, body: [], end: 42},
                                                end: 42
                                            },
                                        end: 42
                                    },
                                        {
                                            type: 'MethodDefinition',
                                            start: 44,
                                            kind: 'method',
                                            computed: false,
                                            static: true,
                                            key: {type: 'Identifier', start: 51, name: 'n', end: 52},
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 52,
                                                    expression: false,
                                                    generator: false,
                                                    id: null,
                                                    params: [],
                                                    body: {type: 'BlockStatement', start: 54, body: [], end: 56},
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
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass: {type: 'Identifier', start: 16, name: 'B', end: 17},
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 20,
                                        kind: 'constructor',
                                        computed: false,
                                        static: false,
                                        key: {type: 'Identifier', start: 20, name: 'constructor', end: 31},
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 31,
                                                expression: false,
                                                generator: false,
                                                id: null,
                                                params:
                                                    [{type: 'Identifier', start: 32, name: 'a', end: 33},
                                                        {type: 'Identifier', start: 34, name: 'b', end: 35},
                                                        {type: 'Identifier', start: 36, name: 'c', end: 37}],
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 38,
                                                        body:
                                                            [{
                                                                type: 'ExpressionStatement',
                                                                start: 42,
                                                                expression:
                                                                    {
                                                                        start: 42,
                                                                        type: 'CallExpression',
                                                                        arguments: [],
                                                                        callee: {type: 'Super', start: 42, end: 47},
                                                                        end: 49
                                                                    },
                                                                end: 49
                                                            },
                                                                {
                                                                    type: 'ExpressionStatement',
                                                                    start: 52,
                                                                    expression:
                                                                        {
                                                                            start: 52,
                                                                            type: 'CallExpression',
                                                                            arguments: [],
                                                                            callee:
                                                                                {
                                                                                    start: 52,
                                                                                    type: 'MemberExpression',
                                                                                    object: {
                                                                                        type: 'Super',
                                                                                        start: 52,
                                                                                        end: 57
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        start: 58,
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
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass: {type: 'Identifier', start: 16, name: 'B', end: 17},
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 20,
                                        kind: 'constructor',
                                        computed: false,
                                        static: false,
                                        key: {type: 'Identifier', start: 20, name: 'constructor', end: 31},
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 31,
                                                id: null,
                                                params: [],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 33,
                                                        body:
                                                            [{
                                                                type: 'ExpressionStatement',
                                                                start: 37,
                                                                expression:
                                                                    {
                                                                        type: 'CallExpression',
                                                                        start: 37,
                                                                        arguments: [],
                                                                        callee:
                                                                            {
                                                                                type: 'MemberExpression',
                                                                                start: 37,
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    start: 37,
                                                                                    name: 'x',
                                                                                    end: 38
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    start: 39,
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
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass: {type: 'Identifier', start: 16, name: 'B', end: 17},
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 18,
                                        static: false,
                                        kind: 'set',
                                        key: {type: 'Identifier', start: 22, name: 'x', end: 23},
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 23,
                                                id: null,
                                                params: [{type: 'Identifier', start: 24, name: 'x', end: 25}],
                                                expression: false,
                                                generator: false,
                                                body:
                                                    {
                                                        type: 'BlockStatement',
                                                        start: 26,
                                                        body:
                                                            [{
                                                                type: 'ExpressionStatement',
                                                                start: 27,
                                                                expression:
                                                                    {
                                                                        type: 'AssignmentExpression',
                                                                        start: 27,
                                                                        left:
                                                                            {
                                                                                type: 'MemberExpression',
                                                                                start: 27,
                                                                                object: {
                                                                                    type: 'ThisExpression',
                                                                                    start: 27,
                                                                                    end: 31
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    start: 32,
                                                                                    name: 'x',
                                                                                    end: 33
                                                                                },
                                                                                computed: false,
                                                                                end: 33
                                                                            },
                                                                        operator: '=',
                                                                        right: {
                                                                            type: 'Identifier',
                                                                            start: 34,
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
                                            static: false,
                                            kind: 'get',
                                            key: {type: 'Identifier', start: 41, name: 'x', end: 42},
                                            computed: false,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 42,
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        {
                                                            type: 'BlockStatement',
                                                            start: 44,
                                                            body:
                                                                [{
                                                                    type: 'ReturnStatement',
                                                                    start: 45,
                                                                    argument:
                                                                        {
                                                                            type: 'MemberExpression',
                                                                            start: 52,
                                                                            object: {
                                                                                type: 'ThisExpression',
                                                                                start: 52,
                                                                                end: 56
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                start: 57,
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
                body:
                    [{
                        type: 'ClassDeclaration',
                        start: 0,
                        id: {type: 'Identifier', start: 6, name: 'A', end: 7},
                        superClass: {type: 'Identifier', start: 16, name: 'B', end: 17},
                        body:
                            {
                                type: 'ClassBody',
                                start: 17,
                                body:
                                    [{
                                        type: 'MethodDefinition',
                                        start: 18,
                                        static: false,
                                        kind: 'method',
                                        key: {type: 'Identifier', start: 18, name: 'x', end: 19},
                                        computed: false,
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 19,
                                                id: null,
                                                params: [],
                                                expression: false,
                                                generator: false,
                                                body: {type: 'BlockStatement', start: 21, body: [], end: 23},
                                                end: 23
                                            },
                                        end: 23
                                    },
                                        {
                                            type: 'MethodDefinition',
                                            start: 25,
                                            static: true,
                                            kind: 'method',
                                            key: {type: 'Identifier', start: 32, name: 'y', end: 33},
                                            computed: false,
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 33,
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body: {type: 'BlockStatement', start: 35, body: [], end: 37},
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
