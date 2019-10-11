const acorn = require('../../lib/acorn');

test('test string', () => {
    expect(acorn.parse('var a="1"')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 9}},
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            loc:
                                {start: {line: 1, column: 4}, end: {line: 1, column: 9}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    loc:
                                        {start: {line: 1, column: 4}, end: {line: 1, column: 5}},
                                    name: 'a',
                                    end: 5
                                },
                            init:
                                {
                                    type: 'Literal',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 9}},
                                    value: '1',
                                    raw: '"1"',
                                    end: 9
                                },
                            end: 9
                        }],
                    end: 9
                }],
            end: 9
        }
    );

    expect(acorn.parse('const a="\\""')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 12}},
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 12}},
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                {start: {line: 1, column: 6}, end: {line: 1, column: 12}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                    name: 'a',
                                    end: 7
                                },
                            init:
                                {
                                    type: 'Literal',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 12}},
                                    value: '"',
                                    raw: '"\\""',
                                    end: 12
                                },
                            end: 12
                        }],
                    end: 12
                }],
            end: 12
        }
    );

    expect(acorn.parse('const a="\\n34"')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 14}},
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 14}},
                    kind: 'const',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 6,
                            loc:
                                {start: {line: 1, column: 6}, end: {line: 1, column: 14}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 6,
                                    loc:
                                        {start: {line: 1, column: 6}, end: {line: 1, column: 7}},
                                    name: 'a',
                                    end: 7
                                },
                            init:
                                {
                                    type: 'Literal',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 14}},
                                    value: '\n34',
                                    raw: '"\\n34"',
                                    end: 14
                                },
                            end: 14
                        }],
                    end: 14
                }],
            end: 14
        }
    );
});