const acorn = require('../../../lib/acorn');

test('test template literals', () => {
    expect(acorn.parse('const a=`abc`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
                    kind: 'const',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                { start: { line: 1, column: 6 }, end: { line: 1, column: 13 } },
                            id:
                                { type: 'Identifier',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 7 },
                            init:
                                { type: 'TemplateLiteral',
                                    start: 8,
                                    loc:
                                        { start: { line: 1, column: 8 }, end: { line: 1, column: 13 } },
                                    expressions: [],
                                    quasis:
                                        [ { type: 'TemplateElement',
                                            start: 9,
                                            loc:
                                                { start: { line: 1, column: 9 }, end: { line: 1, column: 12 } },
                                            value: { raw: 'abc', cooked: 'abc' },
                                            tail: true,
                                            end: 12 } ],
                                    value: '',
                                    end: 13 },
                            end: 13 } ],
                    end: 13 } ],
            end: 13 }
    )

    expect(acorn.parse('const a=`\\abc`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 14 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 14 } },
                    kind: 'const',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                { start: { line: 1, column: 6 }, end: { line: 1, column: 14 } },
                            id:
                                { type: 'Identifier',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 7 },
                            init:
                                { type: 'TemplateLiteral',
                                    start: 8,
                                    loc:
                                        { start: { line: 1, column: 8 }, end: { line: 1, column: 14 } },
                                    expressions: [],
                                    quasis:
                                        [ { type: 'TemplateElement',
                                            start: 9,
                                            loc:
                                                { start: { line: 1, column: 9 }, end: { line: 1, column: 13 } },
                                            value: { raw: '\\abc', cooked: 'abc' },
                                            tail: true,
                                            end: 13 } ],
                                    value: '',
                                    end: 14 },
                            end: 14 } ],
                    end: 14 } ],
            end: 14 }
    )

    expect(acorn.parse('const a=`abc${abc}`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
                    kind: 'const',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                { start: { line: 1, column: 6 }, end: { line: 1, column: 19 } },
                            id:
                                { type: 'Identifier',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 7 },
                            init:
                                { type: 'TemplateLiteral',
                                    start: 8,
                                    loc:
                                        { start: { line: 1, column: 8 }, end: { line: 1, column: 19 } },
                                    expressions:
                                        [ { type: 'Identifier',
                                            start: 14,
                                            loc:
                                                { start: { line: 1, column: 14 }, end: { line: 1, column: 17 } },
                                            name: 'abc',
                                            end: 17 } ],
                                    quasis:
                                        [ { type: 'TemplateElement',
                                            start: 9,
                                            loc:
                                                { start: { line: 1, column: 9 }, end: { line: 1, column: 12 } },
                                            value: { raw: 'abc', cooked: 'abc' },
                                            tail: false,
                                            end: 12 },
                                            { type: 'TemplateElement',
                                                start: 18,
                                                loc:
                                                    { start: { line: 1, column: 18 }, end: { line: 1, column: 18 } },
                                                value: { raw: '', cooked: '' },
                                                tail: true,
                                                end: 18 } ],
                                    value: '',
                                    end: 19 },
                            end: 19 } ],
                    end: 19 } ],
            end: 19 }
    )

    expect(acorn.parse('const a=`abc${efg}\\h${efg}`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 27 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 27 } },
                    kind: 'const',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                { start: { line: 1, column: 6 }, end: { line: 1, column: 27 } },
                            id:
                                { type: 'Identifier',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 7 },
                            init:
                                { type: 'TemplateLiteral',
                                    start: 8,
                                    loc:
                                        { start: { line: 1, column: 8 }, end: { line: 1, column: 27 } },
                                    expressions:
                                        [ { type: 'Identifier',
                                            start: 14,
                                            loc:
                                                { start: { line: 1, column: 14 }, end: { line: 1, column: 17 } },
                                            name: 'efg',
                                            end: 17 },
                                            { type: 'Identifier',
                                                start: 22,
                                                loc:
                                                    { start: { line: 1, column: 22 }, end: { line: 1, column: 25 } },
                                                name: 'efg',
                                                end: 25 } ],
                                    quasis:
                                        [ { type: 'TemplateElement',
                                            start: 9,
                                            loc:
                                                { start: { line: 1, column: 9 }, end: { line: 1, column: 12 } },
                                            value: { raw: 'abc', cooked: 'abc' },
                                            tail: false,
                                            end: 12 },
                                            { type: 'TemplateElement',
                                                start: 18,
                                                loc:
                                                    { start: { line: 1, column: 18 }, end: { line: 1, column: 20 } },
                                                value: { raw: '\\h', cooked: 'h' },
                                                tail: false,
                                                end: 20 },
                                            { type: 'TemplateElement',
                                                start: 26,
                                                loc:
                                                    { start: { line: 1, column: 26 }, end: { line: 1, column: 26 } },
                                                value: { raw: '', cooked: '' },
                                                tail: true,
                                                end: 26 } ],
                                    value: '',
                                    end: 27 },
                            end: 27 } ],
                    end: 27 } ],
            end: 27 }
    )

    expect(acorn.parse('`${test}`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 9 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 9 } },
                    expression:
                        { type: 'TemplateLiteral',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 9 } },
                            expressions:
                                [ { type: 'Identifier',
                                    start: 3,
                                    loc:
                                        { start: { line: 1, column: 3 }, end: { line: 1, column: 7 } },
                                    name: 'test',
                                    end: 7 } ],
                            quasis:
                                [ { type: 'TemplateElement',
                                    start: 1,
                                    loc:
                                        { start: { line: 1, column: 1 }, end: { line: 1, column: 1 } },
                                    value: { raw: '', cooked: '' },
                                    tail: false,
                                    end: 1 },
                                    { type: 'TemplateElement',
                                        start: 8,
                                        loc:
                                            { start: { line: 1, column: 8 }, end: { line: 1, column: 8 } },
                                        value: { raw: '', cooked: '' },
                                        tail: true,
                                        end: 8 } ],
                            value: '',
                            end: 9 },
                    end: 9 } ],
            end: 9 }
    )

    expect(acorn.parse('`${test} a`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 11 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 11 } },
                    expression:
                        { type: 'TemplateLiteral',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 11 } },
                            expressions:
                                [ { type: 'Identifier',
                                    start: 3,
                                    loc:
                                        { start: { line: 1, column: 3 }, end: { line: 1, column: 7 } },
                                    name: 'test',
                                    end: 7 } ],
                            quasis:
                                [ { type: 'TemplateElement',
                                    start: 1,
                                    loc:
                                        { start: { line: 1, column: 1 }, end: { line: 1, column: 1 } },
                                    value: { raw: '', cooked: '' },
                                    tail: false,
                                    end: 1 },
                                    { type: 'TemplateElement',
                                        start: 8,
                                        loc:
                                            { start: { line: 1, column: 8 }, end: { line: 1, column: 10 } },
                                        value: { raw: ' a', cooked: ' a' },
                                        tail: true,
                                        end: 10 } ],
                            value: '',
                            end: 11 },
                    end: 11 } ],
            end: 11 }
    )

    expect(acorn.parse('` ${test} a`')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
                    expression:
                        { type: 'TemplateLiteral',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 12 } },
                            expressions:
                                [ { type: 'Identifier',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 8 } },
                                    name: 'test',
                                    end: 8 } ],
                            quasis:
                                [ { type: 'TemplateElement',
                                    start: 1,
                                    loc:
                                        { start: { line: 1, column: 1 }, end: { line: 1, column: 2 } },
                                    value: { raw: ' ', cooked: ' ' },
                                    tail: false,
                                    end: 2 },
                                    { type: 'TemplateElement',
                                        start: 9,
                                        loc:
                                            { start: { line: 1, column: 9 }, end: { line: 1, column: 11 } },
                                        value: { raw: ' a', cooked: ' a' },
                                        tail: true,
                                        end: 11 } ],
                            value: '',
                            end: 12 },
                    end: 12 } ],
            end: 12 }
    )
})
