const acorn = require('../acorn');

test('测试基本类型', () => {
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
        });

    expect(acorn.parse('123\n')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'expressionStatement',
                    start: 0,
                    expression: {type: 'Literal', start: 0, value: 123, raw: 123, end: 3},
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
                    expression: {type: 'Literal', start: 0, value: 123, raw: 123, end: 3},
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


