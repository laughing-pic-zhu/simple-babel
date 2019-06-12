const acorn = require('../../../lib/acorn');

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

    expect(acorn.parse('function a(n=1,m=4){var b=3}')).toEqual(
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
                            type: 'AssignmentPattern',
                            start: 11,
                            left: {type: 'Identifier', start: 11, name: 'n', end: 12},
                            right: {type: 'Literal', start: 13, value: 1, raw: '1', end: 14},
                            end: 14
                        },
                            {
                                type: 'AssignmentPattern',
                                start: 15,
                                left: {type: 'Identifier', start: 15, name: 'm', end: 16},
                                right: {type: 'Literal', start: 17, value: 4, raw: '4', end: 18},
                                end: 18
                            }],
                    expression: false,
                    generator: false,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 19,
                            body:
                                [{
                                    type: 'VariableDeclaration',
                                    start: 20,
                                    kind: 'var',
                                    declarations:
                                        [{
                                            type: 'VariableDeclarator',
                                            start: 24,
                                            id: {type: 'Identifier', start: 24, name: 'b', end: 25},
                                            init: {type: 'Literal', start: 26, value: 3, raw: '3', end: 27},
                                            end: 27
                                        }],
                                    end: 27
                                }],
                            end: 28
                        },
                    end: 28
                }],
            end: 28
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
                    id: {type: 'Identifier', start: 9, name: 'a', end: 10},
                    params:
                        [{
                            type: 'AssignmentPattern',
                            start: 11,
                            left: {type: 'Identifier', start: 11, name: 'b', end: 12},
                            right: {type: 'Literal', start: 13, value: 3, raw: '3', end: 14},
                            end: 14
                        },
                            {
                                type: 'AssignmentPattern',
                                start: 15,
                                left: {type: 'Identifier', start: 15, name: 'c', end: 16},
                                right:
                                    {
                                        type: 'BinaryExpression',
                                        start: 17,
                                        left: {type: 'Literal', start: 17, value: 4, raw: '4', end: 18},
                                        operator: '*',
                                        right: {type: 'Literal', start: 19, value: 3, raw: '3', end: 20},
                                        end: 20
                                    },
                                end: 20
                            }],
                    expression: false,
                    generator: false,
                    body: {type: 'BlockStatement', start: 21, body: [], end: 23},
                    end: 23
                }],
            end: 23
        }
    )
})