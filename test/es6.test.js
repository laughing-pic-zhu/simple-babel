const acorn = require('../acorn');

test('test atom type', () => {
        expect(acorn.parse('(a,b,c)=>b')).toEqual(
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
                                type: 'ArrowFunctionExpression',
                                id: null,
                                expression: true,
                                generator: false,
                                params:
                                    [{type: 'Identifier', start: 1, value: 'a', end: 2},
                                        {type: 'Identifier', start: 3, value: 'b', end: 4},
                                        {type: 'Identifier', start: 5, value: 'c', end: 6}],
                                body: {type: 'Identifier', start: 9, value: 'b', end: 10},
                                end: 10
                            },
                        end: 10
                    }],
                end: 10
            }
        )

        expect(acorn.parse('(a)=>b')).toEqual(
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
                                type: 'ArrowFunctionExpression',
                                id: null,
                                expression: true,
                                generator: false,
                                params: [{type: 'Identifier', start: 1, value: 'a', end: 2}],
                                body: {type: 'Identifier', start: 5, value: 'b', end: 6},
                                end: 6
                            },
                        end: 6
                    }],
                end: 6
            }
        )

        expect(acorn.parse('()=>b')).toEqual(
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
                                type: 'ArrowFunctionExpression',
                                id: null,
                                expression: true,
                                generator: false,
                                params: [],
                                body: {type: 'Identifier', start: 4, value: 'b', end: 5},
                                end: 5
                            },
                        end: 5
                    }],
                end: 5
            }
        )

        expect(acorn.parse('a=>b')).toEqual(
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
                                type: 'ArrowFunctionExpression',
                                id: null,
                                expression: true,
                                generator: false,
                                params: [{type: 'Identifier', start: 0, value: 'a', end: 1}],
                                body: {type: 'Identifier', start: 3, value: 'b', end: 4},
                                end: 4
                            },
                        end: 4
                    }],
                end: 4
            }
        )

        expect(acorn.parse('a=>{b}')).toEqual(
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
                                type: 'ArrowFunctionExpression',
                                id: null,
                                generator: false,
                                params: [{type: 'Identifier', start: 0, value: 'a', end: 1}],
                                expression: false,
                                body:
                                    {
                                        type: 'BlockStatement',
                                        start: 3,
                                        body:
                                            [{
                                                type: 'ExpressionStatement',
                                                start: 4,
                                                expression: {type: 'Identifier', start: 4, value: 'b', end: 5},
                                                end: 5
                                            }],
                                        end: 6
                                    },
                                end: 6
                            },
                        end: 6
                    }],
                end: 6
            }
        )
    }
)