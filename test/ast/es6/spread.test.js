const acorn = require('../../../lib/acorn');

test('test spread identifier', () => {
    expect(acorn.parse('[...a]')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 6 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 6 } },
                    expression:
                        { type: 'ArrayExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 6 } },
                            elements:
                                [ { type: 'SpreadElement',
                                    start: 1,
                                    loc:
                                        { start: { line: 1, column: 1 }, end: { line: 1, column: 5 } },
                                    argument:
                                        { type: 'Identifier',
                                            start: 4,
                                            loc:
                                                { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                            name: 'a',
                                            end: 5 },
                                    end: 5 } ],
                            end: 6 },
                    end: 6 } ],
            end: 6 }
    )

    expect(acorn.parse('const a={b,...c,d}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 18 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 18 } },
                    kind: 'const',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                { start: { line: 1, column: 6 }, end: { line: 1, column: 18 } },
                            id:
                                { type: 'Identifier',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 7 },
                            init:
                                { type: 'ObjectExpression',
                                    start: 8,
                                    loc:
                                        { start: { line: 1, column: 8 }, end: { line: 1, column: 18 } },
                                    properties:
                                        [ { type: 'Property',
                                            start: 9,
                                            loc:
                                                { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                                            computed: false,
                                            key:
                                                { type: 'Identifier',
                                                    start: 9,
                                                    loc:
                                                        { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                                                    name: 'b',
                                                    end: 10 },
                                            kind: 'init',
                                            shorthand: true,
                                            method: false,
                                            value:
                                                { type: 'Identifier',
                                                    start: 9,
                                                    loc:
                                                        { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                                                    name: 'b',
                                                    end: 10 },
                                            end: 10 },
                                            { type: 'SpreadElement',
                                                start: 11,
                                                loc:
                                                    { start: { line: 1, column: 11 }, end: { line: 1, column: 15 } },
                                                argument:
                                                    { type: 'Identifier',
                                                        start: 14,
                                                        loc:
                                                            { start: { line: 1, column: 14 }, end: { line: 1, column: 15 } },
                                                        name: 'c',
                                                        end: 15 },
                                                end: 15 },
                                            { type: 'Property',
                                                start: 16,
                                                loc:
                                                    { start: { line: 1, column: 16 }, end: { line: 1, column: 17 } },
                                                computed: false,
                                                key:
                                                    { type: 'Identifier',
                                                        start: 16,
                                                        loc:
                                                            { start: { line: 1, column: 16 }, end: { line: 1, column: 17 } },
                                                        name: 'd',
                                                        end: 17 },
                                                kind: 'init',
                                                shorthand: true,
                                                method: false,
                                                value:
                                                    { type: 'Identifier',
                                                        start: 16,
                                                        loc:
                                                            { start: { line: 1, column: 16 }, end: { line: 1, column: 17 } },
                                                        name: 'd',
                                                        end: 17 },
                                                end: 17 } ],
                                    end: 18 },
                            end: 18 } ],
                    end: 18 } ],
            end: 18 }
    )

    expect(acorn.parse('a(b,...c,d)')).toEqual(
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
                        { type: 'CallExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 11 } },
                            arguments:
                                [ { type: 'Identifier',
                                    start: 2,
                                    loc:
                                        { start: { line: 1, column: 2 }, end: { line: 1, column: 3 } },
                                    name: 'b',
                                    end: 3 },
                                    { type: 'SpreadElement',
                                        start: 4,
                                        loc:
                                            { start: { line: 1, column: 4 }, end: { line: 1, column: 8 } },
                                        argument:
                                            { type: 'Identifier',
                                                start: 7,
                                                loc:
                                                    { start: { line: 1, column: 7 }, end: { line: 1, column: 8 } },
                                                name: 'c',
                                                end: 8 },
                                        end: 8 },
                                    { type: 'Identifier',
                                        start: 9,
                                        loc:
                                            { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                                        name: 'd',
                                        end: 10 } ],
                            callee:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 11 } },
                                    name: 'a',
                                    end: 1 },
                            end: 11 },
                    end: 11 } ],
            end: 11 }
    )

    expect(acorn.parse('a.b(c,...d,e)')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
                    expression:
                        { type: 'CallExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
                            arguments:
                                [ { type: 'Identifier',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                    name: 'c',
                                    end: 5 },
                                    { type: 'SpreadElement',
                                        start: 6,
                                        loc:
                                            { start: { line: 1, column: 6 }, end: { line: 1, column: 10 } },
                                        argument:
                                            { type: 'Identifier',
                                                start: 9,
                                                loc:
                                                    { start: { line: 1, column: 9 }, end: { line: 1, column: 10 } },
                                                name: 'd',
                                                end: 10 },
                                        end: 10 },
                                    { type: 'Identifier',
                                        start: 11,
                                        loc:
                                            { start: { line: 1, column: 11 }, end: { line: 1, column: 12 } },
                                        name: 'e',
                                        end: 12 } ],
                            callee:
                                { type: 'MemberExpression',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
                                    object:
                                        { type: 'Identifier',
                                            start: 0,
                                            loc:
                                                { start: { line: 1, column: 0 }, end: { line: 1, column: 13 } },
                                            name: 'a',
                                            end: 1 },
                                    property:
                                        { type: 'Identifier',
                                            start: 2,
                                            loc:
                                                { start: { line: 1, column: 2 }, end: { line: 1, column: 3 } },
                                            name: 'b',
                                            end: 3 },
                                    computed: false,
                                    end: 3 },
                            end: 13 },
                    end: 13 } ],
            end: 13 }
    )

    expect(acorn.parse('a(...b)')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 7 } },
            body:
                [ { type: 'ExpressionStatement',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 7 } },
                    expression:
                        { type: 'CallExpression',
                            start: 0,
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 7 } },
                            arguments:
                                [ { type: 'SpreadElement',
                                    start: 2,
                                    loc:
                                        { start: { line: 1, column: 2 }, end: { line: 1, column: 6 } },
                                    argument:
                                        { type: 'Identifier',
                                            start: 5,
                                            loc:
                                                { start: { line: 1, column: 5 }, end: { line: 1, column: 6 } },
                                            name: 'b',
                                            end: 6 },
                                    end: 6 } ],
                            callee:
                                { type: 'Identifier',
                                    start: 0,
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 7 } },
                                    name: 'a',
                                    end: 1 },
                            end: 7 },
                    end: 7 } ],
            end: 7 }
    )

})
