const acorn = require('../../../lib/acorn');

test('test default params', () => {
    expect(acorn.parse('var a={get x(){},}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 18 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 18 } },
                    kind: 'var',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                { start: { line: 1, column: 4 }, end: { line: 1, column: 18 } },
                            id:
                                { type: 'Identifier',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                    name: 'a',
                                    end: 5 },
                            init:
                                { type: 'ObjectExpression',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 18 } },
                                    properties:
                                        [ { type: 'Property',
                                            start: 7,
                                            loc:
                                                { start: { line: 1, column: 7 }, end: { line: 1, column: 16 } },
                                            computed: false,
                                            key:
                                                { type: 'Identifier',
                                                    start: 11,
                                                    loc:
                                                        { start: { line: 1, column: 11 }, end: { line: 1, column: 12 } },
                                                    name: 'x',
                                                    end: 12 },
                                            kind: 'get',
                                            shorthand: false,
                                            method: true,
                                            value:
                                                { type: 'FunctionExpression',
                                                    start: 12,
                                                    loc:
                                                        { start: { line: 1, column: 12 }, end: { line: 1, column: 16 } },
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        { type: 'BlockStatement',
                                                            start: 14,
                                                            loc:
                                                                { start: { line: 1, column: 14 }, end: { line: 1, column: 16 } },
                                                            body: [],
                                                            end: 16 },
                                                    end: 16 },
                                            end: 16 } ],
                                    end: 18 },
                            end: 18 } ],
                    end: 18 } ],
            end: 18 }
    )

    expect(acorn.parse('var a={set x(d){},}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
                    kind: 'var',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                { start: { line: 1, column: 4 }, end: { line: 1, column: 19 } },
                            id:
                                { type: 'Identifier',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                    name: 'a',
                                    end: 5 },
                            init:
                                { type: 'ObjectExpression',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 19 } },
                                    properties:
                                        [ { type: 'Property',
                                            start: 7,
                                            loc:
                                                { start: { line: 1, column: 7 }, end: { line: 1, column: 17 } },
                                            computed: false,
                                            key:
                                                { type: 'Identifier',
                                                    start: 11,
                                                    loc:
                                                        { start: { line: 1, column: 11 }, end: { line: 1, column: 12 } },
                                                    name: 'x',
                                                    end: 12 },
                                            kind: 'set',
                                            shorthand: false,
                                            method: true,
                                            value:
                                                { type: 'FunctionExpression',
                                                    start: 12,
                                                    loc:
                                                        { start: { line: 1, column: 12 }, end: { line: 1, column: 17 } },
                                                    id: null,
                                                    params:
                                                        [ { type: 'Identifier',
                                                            start: 13,
                                                            loc:
                                                                { start: { line: 1, column: 13 }, end: { line: 1, column: 14 } },
                                                            name: 'd',
                                                            end: 14 } ],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        { type: 'BlockStatement',
                                                            start: 15,
                                                            loc:
                                                                { start: { line: 1, column: 15 }, end: { line: 1, column: 17 } },
                                                            body: [],
                                                            end: 17 },
                                                    end: 17 },
                                            end: 17 } ],
                                    end: 19 },
                            end: 19 } ],
                    end: 19 } ],
            end: 19 }
    )

    expect(acorn.parse('var a={set x(d){},get x(){}}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 28 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 28 } },
                    kind: 'var',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                { start: { line: 1, column: 4 }, end: { line: 1, column: 28 } },
                            id:
                                { type: 'Identifier',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                    name: 'a',
                                    end: 5 },
                            init:
                                { type: 'ObjectExpression',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 28 } },
                                    properties:
                                        [ { type: 'Property',
                                            start: 7,
                                            loc:
                                                { start: { line: 1, column: 7 }, end: { line: 1, column: 17 } },
                                            computed: false,
                                            key:
                                                { type: 'Identifier',
                                                    start: 11,
                                                    loc:
                                                        { start: { line: 1, column: 11 }, end: { line: 1, column: 12 } },
                                                    name: 'x',
                                                    end: 12 },
                                            kind: 'set',
                                            shorthand: false,
                                            method: true,
                                            value:
                                                { type: 'FunctionExpression',
                                                    start: 12,
                                                    loc:
                                                        { start: { line: 1, column: 12 }, end: { line: 1, column: 17 } },
                                                    id: null,
                                                    params:
                                                        [ { type: 'Identifier',
                                                            start: 13,
                                                            loc:
                                                                { start: { line: 1, column: 13 }, end: { line: 1, column: 14 } },
                                                            name: 'd',
                                                            end: 14 } ],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        { type: 'BlockStatement',
                                                            start: 15,
                                                            loc:
                                                                { start: { line: 1, column: 15 }, end: { line: 1, column: 17 } },
                                                            body: [],
                                                            end: 17 },
                                                    end: 17 },
                                            end: 17 },
                                            { type: 'Property',
                                                start: 18,
                                                loc:
                                                    { start: { line: 1, column: 18 }, end: { line: 1, column: 27 } },
                                                computed: false,
                                                key:
                                                    { type: 'Identifier',
                                                        start: 22,
                                                        loc:
                                                            { start: { line: 1, column: 22 }, end: { line: 1, column: 23 } },
                                                        name: 'x',
                                                        end: 23 },
                                                kind: 'get',
                                                shorthand: false,
                                                method: true,
                                                value:
                                                    { type: 'FunctionExpression',
                                                        start: 23,
                                                        loc:
                                                            { start: { line: 1, column: 23 }, end: { line: 1, column: 27 } },
                                                        id: null,
                                                        params: [],
                                                        expression: false,
                                                        generator: false,
                                                        body:
                                                            { type: 'BlockStatement',
                                                                start: 25,
                                                                loc:
                                                                    { start: { line: 1, column: 25 }, end: { line: 1, column: 27 } },
                                                                body: [],
                                                                end: 27 },
                                                        end: 27 },
                                                end: 27 } ],
                                    end: 28 },
                            end: 28 } ],
                    end: 28 } ],
            end: 28 }
    )

    expect(acorn.parse('var a={set (){}}')).toEqual(
        { type: 'Program',
            start: 0,
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 16 } },
            body:
                [ { type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 16 } },
                    kind: 'var',
                    declarations:
                        [ { type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                { start: { line: 1, column: 4 }, end: { line: 1, column: 16 } },
                            id:
                                { type: 'Identifier',
                                    start: 4,
                                    loc:
                                        { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                    name: 'a',
                                    end: 5 },
                            init:
                                { type: 'ObjectExpression',
                                    start: 6,
                                    loc:
                                        { start: { line: 1, column: 6 }, end: { line: 1, column: 16 } },
                                    properties:
                                        [ { type: 'Property',
                                            start: 7,
                                            loc:
                                                { start: { line: 1, column: 7 }, end: { line: 1, column: 15 } },
                                            computed: false,
                                            key:
                                                { type: 'Identifier',
                                                    start: 7,
                                                    loc:
                                                        { start: { line: 1, column: 7 }, end: { line: 1, column: 10 } },
                                                    name: 'set',
                                                    end: 10 },
                                            kind: 'init',
                                            shorthand: false,
                                            method: true,
                                            value:
                                                { type: 'FunctionExpression',
                                                    start: 11,
                                                    loc:
                                                        { start: { line: 1, column: 11 }, end: { line: 1, column: 15 } },
                                                    id: null,
                                                    params: [],
                                                    expression: false,
                                                    generator: false,
                                                    body:
                                                        { type: 'BlockStatement',
                                                            start: 13,
                                                            loc:
                                                                { start: { line: 1, column: 13 }, end: { line: 1, column: 15 } },
                                                            body: [],
                                                            end: 15 },
                                                    end: 15 },
                                            end: 15 } ],
                                    end: 16 },
                            end: 16 } ],
                    end: 16 } ],
            end: 16 }
    )
})