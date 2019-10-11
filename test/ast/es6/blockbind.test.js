const acorn = require('../../../lib/acorn');

test('test block bind', () => {
        expect(acorn.parse('let a')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                        kind: 'let',
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
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                body:
                    [{
                        type: 'VariableDeclaration',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
                        kind: 'let',
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
                        end: 7
                    }],
                end: 7
            }
        )

        expect(acorn.parse('let a,b,c')).toEqual(
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
                        kind: 'let',
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

        expect(acorn.parse('const a=3')).toEqual(
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
                        kind: 'const',
                        declarations:
                            [{
                                type: 'VariableDeclarator',
                                start: 6,
                                loc:
                                    {start: {line: 1, column: 6}, end: {line: 1, column: 9}},
                                id:
                                    {
                                        type: 'Identifier',
                                        start: 6,
                                        loc:
                                            {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                        name: 'a',
                                        end: 7
                                    },
                                init:
                                    {
                                        type: 'Literal',
                                        start: 8,
                                        loc:
                                            {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                        value: 3,
                                        raw: '3',
                                        end: 9
                                    },
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
                loc:
                    {start: {line: 1, column: 0}, end: {line: 2, column: 1}},
                body:
                    [{
                        type: 'ForStatement',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 2, column: 1}},
                        init:
                            {
                                type: 'VariableDeclaration',
                                start: 4,
                                loc:
                                    {start: {line: 1, column: 4}, end: {line: 1, column: 15}},
                                kind: 'let',
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
                                    },
                                        {
                                            type: 'VariableDeclarator',
                                            start: 10,
                                            loc:
                                                {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                            id:
                                                {
                                                    type: 'Identifier',
                                                    start: 10,
                                                    loc:
                                                        {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                                    name: 'b',
                                                    end: 11
                                                },
                                            init: null,
                                            end: 11
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            start: 12,
                                            loc:
                                                {start: {line: 1, column: 12}, end: {line: 1, column: 15}},
                                            id:
                                                {
                                                    type: 'Identifier',
                                                    start: 12,
                                                    loc:
                                                        {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                                    name: 'c',
                                                    end: 13
                                                },
                                            init:
                                                {
                                                    type: 'Literal',
                                                    start: 14,
                                                    loc:
                                                        {start: {line: 1, column: 14}, end: {line: 1, column: 15}},
                                                    value: 3,
                                                    raw: '3',
                                                    end: 15
                                                },
                                            end: 15
                                        }],
                                end: 15
                            },
                        test:
                            {
                                type: 'BinaryExpression',
                                start: 16,
                                loc:
                                    {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                left:
                                    {
                                        type: 'Identifier',
                                        start: 16,
                                        loc:
                                            {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                        name: 'a',
                                        end: 17
                                    },
                                operator: '<',
                                right:
                                    {
                                        type: 'Identifier',
                                        start: 18,
                                        loc:
                                            {start: {line: 1, column: 18}, end: {line: 1, column: 19}},
                                        name: 'b',
                                        end: 19
                                    },
                                end: 19
                            },
                        update:
                            {
                                type: 'UpdateExpression',
                                start: 20,
                                loc:
                                    {start: {line: 1, column: 20}, end: {line: 1, column: 23}},
                                argument:
                                    {
                                        type: 'Identifier',
                                        start: 20,
                                        loc:
                                            {start: {line: 1, column: 20}, end: {line: 1, column: 23}},
                                        name: 'a',
                                        end: 21
                                    },
                                operator: '++',
                                prefix: false,
                                end: 23
                            },
                        body:
                            {
                                type: 'BlockStatement',
                                start: 24,
                                loc:
                                    {start: {line: 1, column: 24}, end: {line: 2, column: 1}},
                                body: [],
                                end: 27
                            },
                        end: 27
                    }],
                end: 27
            }
        )

        expect(acorn.parse('for(let a in b){}')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
                body:
                    [{
                        type: 'ForInStatement',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
                        left:
                            {
                                type: 'VariableDeclaration',
                                start: 4,
                                loc:
                                    {start: {line: 1, column: 4}, end: {line: 1, column: 9}},
                                kind: 'let',
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
                                    {start: {line: 1, column: 15}, end: {line: 1, column: 17}},
                                body: [],
                                end: 17
                            },
                        end: 17
                    }],
                end: 17
            }
        )
    }
)