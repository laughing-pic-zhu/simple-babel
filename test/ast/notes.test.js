const acorn = require('../../lib/acorn');

test('test notes', () => {
    expect(acorn.parse('//')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 2}},
            body: [],
            end: 2
        }
    );

    expect(acorn.parse('//123')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body: [],
            end: 5
        }
    );

    expect(acorn.parse('// ')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
            body: [],
            end: 3
        }
    );

    expect(acorn.parse('// Hello, world!\n42')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 2}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 17,
                    loc:
                        {start: {line: 2, column: 0}, end: {line: 2, column: 2}},
                    expression:
                        {
                            type: 'Literal',
                            start: 17,
                            loc:
                                {start: {line: 2, column: 0}, end: {line: 2, column: 2}},
                            value: 42,
                            raw: '42',
                            end: 19
                        },
                    end: 19
                }],
            end: 19
        }
    );

    expect(acorn.parse('44// line comment')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 2}},
                    expression:
                        {
                            type: 'Literal',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 2}},
                            value: 44,
                            raw: '44',
                            end: 2
                        },
                    end: 2
                }],
            end: 17
        }
    );

    expect(acorn.parse('/*123*/')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 7}},
            body: [],
            end: 7
        }
    );
    expect(acorn.parse('/**123*/')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 8}},
            body: [],
            end: 8
        }
    );
    expect(acorn.parse('/*123*/123')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 7,
                    loc:
                        {start: {line: 1, column: 7}, end: {line: 1, column: 10}},
                    expression:
                        {
                            type: 'Literal',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 1, column: 10}},
                            value: 123,
                            raw: '123',
                            end: 10
                        },
                    end: 10
                }],
            end: 10
        }
    );

    expect(acorn.parse('if(a){//a\nxxx}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 4}},
            body:
                [{
                    type: 'IfStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 2, column: 4}},
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
                                {start: {line: 1, column: 5}, end: {line: 2, column: 4}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 10,
                                    loc:
                                        {start: {line: 2, column: 0}, end: {line: 2, column: 3}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 10,
                                            loc:
                                                {start: {line: 2, column: 0}, end: {line: 2, column: 3}},
                                            name: 'xxx',
                                            end: 13
                                        },
                                    end: 13
                                }],
                            end: 14
                        },
                    end: 14
                }],
            end: 14
        }
    );


    expect(acorn.parse('123/*123\n*/123')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                    expression:
                        {
                            type: 'Literal',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 3}},
                            value: 123,
                            raw: '123',
                            end: 3
                        },
                    end: 3
                },
                    {
                        type: 'ExpressionStatement',
                        start: 11,
                        loc:
                            {start: {line: 2, column: 2}, end: {line: 2, column: 5}},
                        expression:
                            {
                                type: 'Literal',
                                start: 11,
                                loc:
                                    {start: {line: 2, column: 2}, end: {line: 2, column: 5}},
                                value: 123,
                                raw: '123',
                                end: 14
                            },
                        end: 14
                    }],
            end: 14
        }
    );


    expect(acorn.parse('switch(a){case a:/*abc*/b;}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 27}},
            body:
                [{
                    type: 'SwitchStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 27}},
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
                            start: 10,
                            loc:
                                {start: {line: 1, column: 10}, end: {line: 1, column: 26}},
                            test:
                                {
                                    type: 'Identifier',
                                    start: 15,
                                    loc:
                                        {start: {line: 1, column: 15}, end: {line: 1, column: 16}},
                                    name: 'a',
                                    end: 16
                                },
                            consequent:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 24,
                                    loc:
                                        {start: {line: 1, column: 24}, end: {line: 1, column: 26}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 24,
                                            loc:
                                                {start: {line: 1, column: 24}, end: {line: 1, column: 25}},
                                            name: 'b',
                                            end: 25
                                        },
                                    end: 26
                                }],
                            end: 26
                        }],
                    end: 27
                }],
            end: 27
        }
    );

    expect(acorn.parse('if(a){//abc\na;b}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 4}},
            body:
                [{
                    type: 'IfStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 2, column: 4}},
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
                                {start: {line: 1, column: 5}, end: {line: 2, column: 4}},
                            body:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 12,
                                    loc:
                                        {start: {line: 2, column: 0}, end: {line: 2, column: 2}},
                                    expression:
                                        {
                                            type: 'Identifier',
                                            start: 12,
                                            loc:
                                                {start: {line: 2, column: 0}, end: {line: 2, column: 1}},
                                            name: 'a',
                                            end: 13
                                        },
                                    end: 14
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 14,
                                        loc:
                                            {start: {line: 2, column: 2}, end: {line: 2, column: 3}},
                                        expression:
                                            {
                                                type: 'Identifier',
                                                start: 14,
                                                loc:
                                                    {start: {line: 2, column: 2}, end: {line: 2, column: 3}},
                                                name: 'b',
                                                end: 15
                                            },
                                        end: 15
                                    }],
                            end: 16
                        },
                    end: 16
                }],
            end: 16
        }
    );
})