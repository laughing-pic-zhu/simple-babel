const acorn = require('../../acorn');

test('test block bind', () => {
        expect(acorn.parse('let a')).toEqual(
            {
                type: 'Program',
                start: 0,
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        kind: 'let',
                        declarations:
                            [{
                                type: 'VariableDeclarator',
                                start: 4,
                                id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                                init: null,
                                end: 5
                            }],
                        end: 5
                    }],
                end: 5
            }
        )

        expect(acorn.parse('let a=1')).toEqual(
            {
                type: 'Program',
                start: 0,
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        kind: 'let',
                        declarations:
                            [{
                                type: 'VariableDeclarator',
                                start: 4,
                                id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                                init: {type: 'Literal', start: 6, value: 1, raw: '1', end: 7},
                                end: 7
                            }],
                        end: 7
                    }],
                end: 7
            }
        )

        expect(acorn.parse('let a,b,c')).toEqual(
            {
                type: 'Program',
                start: 0,
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        kind: 'let',
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

        expect(acorn.parse('const a=3')).toEqual(
            {
                type: 'Program',
                start: 0,
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        kind: 'const',
                        declarations:
                            [{
                                type: 'VariableDeclarator',
                                start: 6,
                                id: {type: 'Identifier', start: 6, name: 'a', end: 7},
                                init: {type: 'Literal', start: 8, value: 3, raw: '3', end: 9},
                                end: 9
                            }],
                        end: 9
                    }],
                end: 9
            }
        )

        expect(acorn.parse('for(let a,b,c=3;a<b;a++){\n}')).toEqual(
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
                                kind: 'let',
                                declarations:
                                    [{
                                        type: 'VariableDeclarator',
                                        start: 8,
                                        id: {type: 'Identifier', start: 8, name: 'a', end: 9},
                                        init: null,
                                        end: 9
                                    },
                                        {
                                            type: 'VariableDeclarator',
                                            start: 10,
                                            id: {type: 'Identifier', start: 10, name: 'b', end: 11},
                                            init: null,
                                            end: 11
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            start: 12,
                                            id: {type: 'Identifier', start: 12, name: 'c', end: 13},
                                            init: {type: 'Literal', start: 14, value: 3, raw: '3', end: 15},
                                            end: 15
                                        }],
                                end: 15
                            },
                        test:
                            {
                                start: 16,
                                type: 'BinaryExpression',
                                left: {type: 'Identifier', start: 16, value: 'a', end: 17},
                                operator: '<',
                                right: {type: 'Identifier', start: 18, value: 'b', end: 19},
                                end: 19
                            },
                        update:
                            {
                                start: 20,
                                type: 'UpdateExpression',
                                argument: {type: 'Identifier', start: 20, value: 'a', end: 21},
                                operator: '++',
                                prefix: false,
                                end: 23
                            },
                        body: {type: 'BlockStatement', start: 24, body: [], end: 27},
                        end: 27
                    }],
                end: 27
            }
        )

        expect(acorn.parse('for(let a in b){}')).toEqual(
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
                                kind: 'let',
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
                        body: {type: 'BlockStatement', start: 15, body: [], end: 17},
                        end: 17
                    }],
                end: 17
            }
        )
    }
)