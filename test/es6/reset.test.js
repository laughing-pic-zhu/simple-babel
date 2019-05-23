const acorn = require('../../acorn');

test('test resetElement', () => {
    expect(acorn.parse('function a(b,...c){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params:
                        [{type: 'Identifier', start: 11, name: 'b', end: 12},
                            {
                                type: 'RestElement',
                                start: 13,
                                argument: {type: 'Identifier', start: 16, name: 'c', end: 17},
                                end: 17
                            }],
                    expression: false,
                    generator: false,
                    body: {type: 'BlockStatement', start: 18, body: [], end: 20},
                    end: 20
                }],
            end: 20
        }
    )

    expect(acorn.parse('(a,...b)=>{}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            start: 0,
                            type: 'ArrowFunctionExpression',
                            id: null,
                            generator: false,
                            params:
                                [{type: 'Identifier', start: 1, name: 'a', end: 2},
                                    {
                                        type: 'RestElement',
                                        start: 3,
                                        argument: {type: 'Identifier', start: 6, name: 'b', end: 7},
                                        end: 7
                                    }],
                            expression: false,
                            body: {type: 'BlockStatement', start: 10, body: [], end: 12},
                            end: 12
                        },
                    end: 12
                }],
            end: 12
        }
    )

    expect(acorn.parse('(...a)=>{}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            start: 0,
                            type: 'ArrowFunctionExpression',
                            id: null,
                            generator: false,
                            params:
                                [{
                                    type: 'RestElement',
                                    start: 1,
                                    argument: {type: 'Identifier', start: 4, name: 'a', end: 5},
                                    end: 5
                                }],
                            expression: false,
                            body: {type: 'BlockStatement', start: 8, body: [], end: 10},
                            end: 10
                        },
                    end: 10
                }],
            end: 10
        }
    )

    expect(acorn.parse('function a(...b){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params:
                        [{
                            type: 'RestElement',
                            start: 11,
                            argument: {type: 'Identifier', start: 14, name: 'b', end: 15},
                            end: 15
                        }],
                    expression: false,
                    generator: false,
                    body: {type: 'BlockStatement', start: 16, body: [], end: 18},
                    end: 18
                }],
            end: 18
        }
    )

})
