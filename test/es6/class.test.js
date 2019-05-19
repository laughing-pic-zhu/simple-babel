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

        expect(acorn.parse('class A extends b.c{\n\tconstruction(a,b,c){}\n\tstatic n(){}\n}')).toEqual(
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
                                        kind: 'method',
                                        computed: false,
                                        static: false,
                                        key: {type: 'Identifier', start: 22, name: 'construction', end: 34},
                                        value:
                                            {
                                                type: 'FunctionExpression',
                                                start: 34,
                                                id: null,
                                                params:
                                                    [{type: 'Identifier', start: 35, name: 'a', end: 36},
                                                        {type: 'Identifier', start: 37, name: 'b', end: 38},
                                                        {type: 'Identifier', start: 39, name: 'c', end: 40}],
                                                body: {type: 'BlockStatement', start: 41, body: [], end: 43},
                                                end: 43
                                            },
                                        end: 43
                                    },
                                        {
                                            type: 'MethodDefinition',
                                            start: 45,
                                            kind: 'method',
                                            computed: false,
                                            static: true,
                                            key: {type: 'Identifier', start: 52, name: 'n', end: 53},
                                            value:
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 53,
                                                    id: null,
                                                    params: [],
                                                    body: {type: 'BlockStatement', start: 55, body: [], end: 57},
                                                    end: 57
                                                },
                                            end: 57
                                        }],
                                end: 59
                            },
                        end: 59
                    }],
                end: 59
            }
        )



    }
)
