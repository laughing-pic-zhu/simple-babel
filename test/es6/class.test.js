const acorn = require('../../acorn');

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
                                object: {type: 'Identifier', start: 16, value: 'b', end: 17},
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
                                object: {type: 'Identifier', start: 16, value: 'b', end: 17},
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
                        superClass: {type: 'Identifier', start: 16, value: 'B', end: 17},
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
    }
)
