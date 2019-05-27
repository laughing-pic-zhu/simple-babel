const acorn = require('../acorn');

test('test number type', () => {
    expect(acorn.parse('123\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
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
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: '123', end: 3},
                    end: 3
                }],
            end: 3
        }
    )

    expect(acorn.parse('1.230')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 1.23, raw: '1.230', end: 5},
                    end: 5
                }],
            end: 5
        }
    )
});


