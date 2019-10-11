const acorn = require('../../../lib/acorn');

test('test resetElement', () => {
    expect(acorn.parse('function a(b,...c){}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 20 } },
            body:
                [ { type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 20 } },
                    id:
                        { type: 'Identifier',
                            start: 9,
                            loc:
                                { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                            name: 'a',
                            end: 10 },
                    params:
                        [ { type: 'Identifier',
                            start: 11,
                            loc:
                                { start: { line: 1, column: 11 }, end: { line: 1, column: 12 } },
                            name: 'b',
                            end: 12 },
                            { type: 'RestElement',
                                start: 13,
                                loc:
                                    { start: { line: 1, column: 13 }, end: { line: 1, column: 17 } },
                                argument:
                                    { type: 'Identifier',
                                        start: 16,
                                        loc:
                                            { start: { line: 1, column: 16 }, end: { line: 1, column: 17 } },
                                        name: 'c',
                                        end: 17 },
                                end: 17 } ],
                    expression: false,
                    generator: false,
                    body:
                        { type: 'BlockStatement',
                            start: 18,
                            loc:
                                { start: { line: 1, column: 18 }, end: { line: 1, column: 20 } },
                            body: [],
                            end: 20 },
                    end: 20 } ],
            end: 20 }
    )

    expect(acorn.parse('(a,...b)=>{}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
                    expression:
                        { type: 'ArrowFunctionExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
                            id: null,
                            generator: false,
                            params:
                                [ { type: 'Identifier',
                                    start: 1,
                                    loc:
                                        { start: { line: 1, column: 1 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 2 },
                                    { type: 'RestElement',
                                        start: 3,
                                        loc:
                                            { start: { line: 1, column: 3 }, end: { line: 1, column: 7 } },
                                        argument:
                                            { type: 'Identifier',
                                                start: 6,
                                                loc:
                                                    { start: { line: 1, column: 6 }, end: { line: 1, column: 7 } },
                                                name: 'b',
                                                end: 7 },
                                        end: 7 } ],
                            expression: false,
                            body:
                                { type: 'BlockStatement',
                                    start: 10,
                                    loc:
                                        { start: { line: 1, column: 10 }, end: { line: 1, column: 12 } },
                                    body: [],
                                    end: 12 },
                            end: 12 },
                    end: 12 } ],
            end: 12 }
    )

    expect(acorn.parse('(...a)=>{}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 10 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 10 } },
                    expression:
                        { type: 'ArrowFunctionExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 10 } },
                            id: null,
                            generator: false,
                            params:
                                [ { type: 'RestElement',
                                    start: 1,
                                    loc:
                                        { start: { line: 1, column: 1 }, end: { line: 1, column: 5 } },
                                    argument:
                                        { type: 'Identifier',
                                            start: 4,
                                            loc:
                                                { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                            name: 'a',
                                            end: 5 },
                                    end: 5 } ],
                            expression: false,
                            body:
                                { type: 'BlockStatement',
                                    start: 8,
                                    loc:
                                        { start: { line: 1, column: 8 }, end: { line: 1, column: 10 } },
                                    body: [],
                                    end: 10 },
                            end: 10 },
                    end: 10 } ],
            end: 10 }
    )

    expect(acorn.parse('function a(...b){}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 18 } },
            body:
                [ { type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 18 } },
                    id:
                        { type: 'Identifier',
                            start: 9,
                            loc:
                                { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                            name: 'a',
                            end: 10 },
                    params:
                        [ { type: 'RestElement',
                            start: 11,
                            loc:
                                { start: { line: 1, column: 11 }, end: { line: 1, column: 15 } },
                            argument:
                                { type: 'Identifier',
                                    start: 14,
                                    loc:
                                        { start: { line: 1, column: 14 }, end: { line: 1, column: 15 } },
                                    name: 'b',
                                    end: 15 },
                            end: 15 } ],
                    expression: false,
                    generator: false,
                    body:
                        { type: 'BlockStatement',
                            start: 16,
                            loc:
                                { start: { line: 1, column: 16 }, end: { line: 1, column: 18 } },
                            body: [],
                            end: 18 },
                    end: 18 } ],
            end: 18 }
    )
});
