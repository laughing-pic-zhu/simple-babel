const acorn = require('../../lib/acorn');

test('test atom type', () => {
    expect(acorn.parse('null\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 0}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                    expression:
                        {
                            type: 'Literal',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            value: null,
                            raw: 'null',
                            end: 4
                        },
                    end: 4
                }],
            end: 5
        }
    );

    expect(acorn.parse('true;')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'Literal',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 4}},
                            value: true,
                            raw: 'true',
                            end: 4
                        },
                    end: 5
                }],
            end: 5
        }
    )

    expect(acorn.parse('false\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 2, column: 0}},
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                    expression:
                        {
                            type: 'Literal',
                            start: 0,
                            loc:
                                {start: {line: 1, column: 0}, end: {line: 1, column: 5}},
                            value: false,
                            raw: 'false',
                            end: 5
                        },
                    end: 5
                }],
            end: 6
        }
    )
});


