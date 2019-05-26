const acorn = require('../acorn');

test('test string', () => {
    expect(acorn.parse('var a="1"')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'VariableDeclaration',
                    start: 0,
                    kind: 'var',
                    declarations:
                        [{
                            type: 'VariableDeclarator',
                            start: 4,
                            id: {type: 'Identifier', start: 4, name: 'a', end: 5},
                            init: {type: 'Literal', start: 6, value: '1', raw: '"1"', end: 9},
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
                            init: {type: 'Literal', start: 8, value: '"', raw: '"\\""', end: 12},
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
                                    type: 'Literal',
                                    start: 8,
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

})