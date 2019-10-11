const acorn = require('../../../lib/acorn');

test('test arrow function', () => {
        expect(acorn.parse('(a,b,c)=>b')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                body:
                    [{
                        type: 'ExpressionStatement',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                        expression:
                            {
                                type: 'ArrowFunctionExpression',
                                start: 0,
                                loc:
                                    {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                                id: null,
                                generator: false,
                                params:
                                    [{
                                        type: 'Identifier',
                                        start: 1,
                                        loc:
                                            {start: {line: 1, column: 1}, end: {line: 1, column: 6}},
                                        name: 'a',
                                        end: 2
                                    },
                                        {
                                            type: 'Identifier',
                                            start: 3,
                                            loc:
                                                {start: {line: 1, column: 3}, end: {line: 1, column: 4}},
                                            name: 'b',
                                            end: 4
                                        },
                                        {
                                            type: 'Identifier',
                                            start: 5,
                                            loc:
                                                {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                            name: 'c',
                                            end: 6
                                        }],
                                expression: true,
                                body:
                                    {
                                        type: 'Identifier',
                                        start: 9,
                                        loc:
                                            {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                                        name: 'b',
                                        end: 10
                                    },
                                end: 10
                            },
                        end: 10
                    }],
                end: 10
            }
        );

        expect(acorn.parse('(a)=>b')).toEqual(
            {
                type: 'Program',
                start: 0,
                loc:
                    {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                body:
                    [{
                        type: 'ExpressionStatement',
                        start: 0,
                        loc:
                            {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                        expression:
                            {
                                type: 'ArrowFunctionExpression',
                                start: 0,
                                loc:
                                    {start: {line: 1, column: 0}, end: {line: 1, column: 6}},
                                id: null,
                                generator: false,
                                params:
                                    [{
                                        type: 'Identifier',
                                        start: 1,
                                        loc:
                                            {start: {line: 1, column: 1}, end: {line: 1, column: 2}},
                                        name: 'a',
                                        end: 2
                                    }],
                                expression: true,
                                body:
                                    {
                                        type: 'Identifier',
                                        start: 5,
                                        loc:
                                            {start: {line: 1, column: 5}, end: {line: 1, column: 6}},
                                        name: 'b',
                                        end: 6
                                    },
                                end: 6
                            },
                        end: 6
                    }],
                end: 6
            }
        )

        expect(acorn.parse('()=>b')).toEqual(
            { type: 'Program',
                start: 0,
                loc:
                    { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
                body:
                    [ { type: 'ExpressionStatement',
                        start: 0,
                        loc:
                            { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
                        expression:
                            { type: 'ArrowFunctionExpression',
                                start: 0,
                                loc:
                                    { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
                                id: null,
                                generator: false,
                                params: [],
                                expression: true,
                                body:
                                    { type: 'Identifier',
                                        start: 4,
                                        loc:
                                            { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                        name: 'b',
                                        end: 5 },
                                end: 5 },
                        end: 5 } ],
                end: 5 }
        )

        expect(acorn.parse('a=>b')).toEqual(
            { type: 'Program',
                start: 0,
                loc:
                    { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                body:
                    [ { type: 'ExpressionStatement',
                        start: 0,
                        loc:
                            { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                        expression:
                            { type: 'ArrowFunctionExpression',
                                start: 0,
                                loc:
                                    { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                                id: null,
                                generator: false,
                                params:
                                    [ { type: 'Identifier',
                                        start: 0,
                                        loc:
                                            { start: { line: 1, column: 0 }, end: { line: 1, column: 4 } },
                                        name: 'a',
                                        end: 1 } ],
                                expression: true,
                                body:
                                    { type: 'Identifier',
                                        start: 3,
                                        loc:
                                            { start: { line: 1, column: 3 }, end: { line: 1, column: 4 } },
                                        name: 'b',
                                        end: 4 },
                                end: 4 },
                        end: 4 } ],
                end: 4 }
        )

        expect(acorn.parse('a=>{b}')).toEqual(
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
                            { type: 'ArrowFunctionExpression',
                                start: 0,
                                loc:
                                    { start: { line: 1, column: 0 }, end: { line: 1, column: 6 } },
                                id: null,
                                generator: false,
                                params:
                                    [ { type: 'Identifier',
                                        start: 0,
                                        loc:
                                            { start: { line: 1, column: 0 }, end: { line: 1, column: 6 } },
                                        name: 'a',
                                        end: 1 } ],
                                expression: false,
                                body:
                                    { type: 'BlockStatement',
                                        start: 3,
                                        loc:
                                            { start: { line: 1, column: 3 }, end: { line: 1, column: 6 } },
                                        body:
                                            [ { type: 'ExpressionStatement',
                                                start: 4,
                                                loc:
                                                    { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                                expression:
                                                    { type: 'Identifier',
                                                        start: 4,
                                                        loc:
                                                            { start: { line: 1, column: 4 }, end: { line: 1, column: 5 } },
                                                        name: 'b',
                                                        end: 5 },
                                                end: 5 } ],
                                        end: 6 },
                                end: 6 },
                        end: 6 } ],
                end: 6 }
        )
    }
)