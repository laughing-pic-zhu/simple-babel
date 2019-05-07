const acorn = require('../acorn');

test('test notes', () => {
    expect(acorn.parse('//')).toEqual(
        {
            type: 'Program',
            start: 0,
            body: [],
            end: 2
        }
    );

    expect(acorn.parse('//123')).toEqual(
        {type: 'Program', start: 0, body: [], end: 5}
    );

    expect(acorn.parse('// ')).toEqual(
        {type: 'Program', start: 0, body: [], end: 3}
    );

    expect(acorn.parse('// Hello, world!\n42')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 17,
                    expression: {type: 'Literal', start: 17, value: 42, raw: '42', end: 19},
                    end: 19
                }],
            end: 19
        }
    );

    expect(acorn.parse('44// line comment')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 44, raw: '44', end: 2},
                    end: 2
                }],
            end: 17
        }
    );

    expect(acorn.parse('/*123*/')).toEqual(
        {type: 'Program', start: 0, body: [], end: 7}
    );
    expect(acorn.parse('/**123*/')).toEqual(
        {type: 'Program', start: 0, body: [], end: 8}
    );
    expect(acorn.parse('/*123*/123')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 7,
                    expression: {type: 'Literal', start: 7, value: 123, raw: '123', end: 10},
                    end: 10
                }],
            end: 10
        }
    );
    expect(acorn.parse('123/*123\n*/123')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: '123', end: 3},
                    end: 3
                },
                    {
                        type: 'ExpressionStatement',
                        start: 11,
                        expression: {type: 'Literal', start: 11, value: 123, raw: '123', end: 14},
                        end: 14
                    }],
            end: 14
        }
    );


    expect(acorn.parse('if(a){//a\nxxx}')).toEqual(
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
                                    start: 10,
                                    expression: {type: 'Identifier', start: 10, value: 'xxx', end: 13},
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
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: '123', end: 3},
                    end: 3
                },
                    {
                        type: 'ExpressionStatement',
                        start: 11,
                        expression: {type: 'Literal', start: 11, value: 123, raw: '123', end: 14},
                        end: 14
                    }],
            end: 14
        }
    );


    expect(acorn.parse('123/*123\n*/123')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: '123', end: 3},
                    end: 3
                },
                    {
                        type: 'ExpressionStatement',
                        start: 11,
                        expression: {type: 'Literal', start: 11, value: 123, raw: '123', end: 14},
                        end: 14
                    }],
            end: 14
        }
    );

    expect(acorn.parse('switch(a){case a:/*abc*/b;}')).toEqual(
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
                            start: 10,
                            test: {type: 'Identifier', start: 15, value: 'a', end: 16},
                            consequent:
                                [{
                                    type: 'ExpressionStatement',
                                    start: 24,
                                    expression: {type: 'Identifier', start: 24, value: 'b', end: 25},
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
                                    start: 12,
                                    expression: {type: 'Identifier', start: 12, value: 'a', end: 13},
                                    end: 14
                                },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 14,
                                        expression: {type: 'Identifier', start: 14, value: 'b', end: 15},
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