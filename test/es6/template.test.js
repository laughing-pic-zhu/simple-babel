const acorn = require('../../lib/acorn');

test('test template literals', () => {
    expect(acorn.parse('const a=`abc`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            id: {type: 'Identifier', start: 6, name: 'a', end: 7},
                            init:
                                {
                                    type: 'TemplateLiteral',
                                    start: 8,
                                    expressions: [],
                                    quasis:
                                        [{
                                            type: 'TemplateElement',
                                            start: 9,
                                            value: {raw: 'abc', cooked: 'abc'},
                                            tail: true,
                                            end: 12
                                        }],
                                    value: '',
                                    end: 13
                                },
                            end: 13
                        }],
                    end: 13
                }],
            end: 13
        }
    )

    expect(acorn.parse('const a=`\\abc`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            id: {type: 'Identifier', start: 6, name: 'a', end: 7},
                            init:
                                {
                                    type: 'TemplateLiteral',
                                    start: 8,
                                    expressions: [],
                                    quasis:
                                        [{
                                            type: 'TemplateElement',
                                            start: 9,
                                            value: {raw: '\\abc', cooked: 'abc'},
                                            tail: true,
                                            end: 13
                                        }],
                                    value: '',
                                    end: 14
                                },
                            end: 14
                        }],
                    end: 14
                }],
            end: 14
        }
    )

    expect(acorn.parse('const a=`abc${abc}`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            id: {type: 'Identifier', start: 6, name: 'a', end: 7},
                            init:
                                {
                                    type: 'TemplateLiteral',
                                    start: 8,
                                    expressions: [{type: 'Identifier', start: 14, name: 'abc', end: 17}],
                                    quasis:
                                        [{
                                            type: 'TemplateElement',
                                            start: 9,
                                            value: {raw: 'abc', cooked: 'abc'},
                                            tail: false,
                                            end: 12
                                        },
                                            {
                                                type: 'TemplateElement',
                                                start: 18,
                                                value: {raw: '', cooked: ''},
                                                tail: true,
                                                end: 18
                                            }],
                                    value: '',
                                    end: 19
                                },
                            end: 19
                        }],
                    end: 19
                }],
            end: 19
        }
    )

    expect(acorn.parse('const a=`abc${efg}\\h${efg}`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            id: {type: 'Identifier', start: 6, name: 'a', end: 7},
                            init:
                                {
                                    type: 'TemplateLiteral',
                                    start: 8,
                                    expressions:
                                        [{type: 'Identifier', start: 14, name: 'efg', end: 17},
                                            {type: 'Identifier', start: 22, name: 'efg', end: 25}],
                                    quasis:
                                        [{
                                            type: 'TemplateElement',
                                            start: 9,
                                            value: {raw: 'abc', cooked: 'abc'},
                                            tail: false,
                                            end: 12
                                        },
                                            {
                                                type: 'TemplateElement',
                                                start: 18,
                                                value: {raw: '\\h', cooked: 'h'},
                                                tail: false,
                                                end: 20
                                            },
                                            {
                                                type: 'TemplateElement',
                                                start: 26,
                                                value: {raw: '', cooked: ''},
                                                tail: true,
                                                end: 26
                                            }],
                                    value: '',
                                    end: 27
                                },
                            end: 27
                        }],
                    end: 27
                }],
            end: 27
        }
    )


    expect(acorn.parse('`${test}`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'TemplateLiteral',
                            start: 0,
                            expressions: [{type: 'Identifier', start: 3, name: 'test', end: 7}],
                            quasis:
                                [{
                                    type: 'TemplateElement',
                                    start: 1,
                                    value: {raw: '', cooked: ''},
                                    tail: false,
                                    end: 1
                                },
                                    {
                                        type: 'TemplateElement',
                                        start: 8,
                                        value: {raw: '', cooked: ''},
                                        tail: true,
                                        end: 8
                                    }],
                            value: '',
                            end: 9
                        },
                    end: 9
                }],
            end: 9
        }
    )

    expect(acorn.parse('`${test} a`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'TemplateLiteral',
                            start: 0,
                            expressions: [{type: 'Identifier', start: 3, name: 'test', end: 7}],
                            quasis:
                                [{
                                    type: 'TemplateElement',
                                    start: 1,
                                    value: {raw: '', cooked: ''},
                                    tail: false,
                                    end: 1
                                },
                                    {
                                        type: 'TemplateElement',
                                        start: 8,
                                        value: {raw: ' a', cooked: ' a'},
                                        tail: true,
                                        end: 10
                                    }],
                            value: '',
                            end: 11
                        },
                    end: 11
                }],
            end: 11
        }
    )

    expect(acorn.parse('` ${test} a`')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'TemplateLiteral',
                            start: 0,
                            expressions: [{type: 'Identifier', start: 4, name: 'test', end: 8}],
                            quasis:
                                [{
                                    type: 'TemplateElement',
                                    start: 1,
                                    value: {raw: ' ', cooked: ' '},
                                    tail: false,
                                    end: 2
                                },
                                    {
                                        type: 'TemplateElement',
                                        start: 9,
                                        value: {raw: ' a', cooked: ' a'},
                                        tail: true,
                                        end: 11
                                    }],
                            value: '',
                            end: 12
                        },
                    end: 12
                }],
            end: 12
        }
    )
})
