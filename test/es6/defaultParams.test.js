const acorn = require('../../lib/acorn');

test('test default params', () => {
    expect(acorn.parse('function a(b=3){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    expression: false,
                    generator: false,
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params:
                        [{
                            start: 11,
                            type: 'AssignmentPattern',
                            left: {type: 'Identifier', start: 11, name: 'b', end: 12},
                            right: {type: 'Literal', start: 13, value: 3, raw: '3', end: 14},
                            end: 14
                        }],
                    body: {type: 'BlockStatement', start: 15, body: [], end: 17},
                    end: 17
                }],
            end: 17
        }
    )

    expect(acorn.parse('function a(b=3,c=4*3){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    expression: false,
                    generator: false,
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params:
                        [{
                            start: 11,
                            type: 'AssignmentPattern',
                            left: {type: 'Identifier', start: 11, name: 'b', end: 12},
                            right:
                                {
                                    start: 13,
                                    type: 'SequenceExpression',
                                    expression:
                                        [{type: 'Literal', start: 13, value: 3, raw: '3', end: 14},
                                            {
                                                start: 15,
                                                type: 'AssignmentExpression',
                                                left: {type: 'Identifier', start: 15, name: 'c', end: 16},
                                                operator: '=',
                                                right:
                                                    {
                                                        start: 17,
                                                        type: 'BinaryExpression',
                                                        left: {type: 'Literal', start: 17, value: 4, raw: '4', end: 18},
                                                        operator: '*',
                                                        right: {
                                                            type: 'Literal',
                                                            start: 19,
                                                            value: 3,
                                                            raw: '3',
                                                            end: 20
                                                        },
                                                        end: 20
                                                    },
                                                end: 20
                                            }],
                                    end: 20
                                },
                            end: 20
                        }],
                    body: {type: 'BlockStatement', start: 21, body: [], end: 23},
                    end: 23
                }],
            end: 23
        }
    )
})