const acorn = require('./acorn');

test('test jest', () => {
    expect(acorn.parse('var a=1;')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init: {type: 'Literal', start: 6, value: 1, raw: 1, end: 7},
                            end: 7
                        }],
                    end: 8
                }],
            end: 8
        }
    );

    expect(acorn.parse('this\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'thisExpression', start: 0, end: 4},
                    end: 4
                }],
            end: 5
        })
});


