const acorn = require('../acorn');

test('test atom type', () => {
    expect(acorn.parse('123\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: '123', end: 3},
                    end: 3
                }],
            end: 4
        }
    )

    expect(acorn.parse(123)).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: '123', end: 3},
                    end: 3
                }],
            end: 3
        }
    )

    expect(acorn.parse('null\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: null, raw: 'null', end: 4},
                    end: 4
                }],
            end: 5
        }
    )

    expect(acorn.parse('true;')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: true, raw: 'true', end: 4},
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('false\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: false, raw: 'false', end: 5},
                    end: 5
                }],
            end: 6
        }
    )
});


