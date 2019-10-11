const acorn = require('../../lib/acorn');

test('test option', () => {
    expect(acorn.parse('FUNCTION.bind(this)', {loc: false})).toEqual(
        { type: 'Program',
            loc:
                { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
            body:
                [ { type: 'ExpressionStatement',
                    loc:
                        { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
                    expression:
                        { type: 'CallExpression',
                            loc:
                                { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
                            arguments:
                                [ { type: 'ThisExpression',
                                    loc:
                                        { start: { line: 1, column: 14 }, end: { line: 1, column: 18 } } } ],
                            callee:
                                { type: 'MemberExpression',
                                    loc:
                                        { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
                                    object:
                                        { type: 'Identifier',
                                            loc:
                                                { start: { line: 1, column: 0 }, end: { line: 1, column: 19 } },
                                            name: 'FUNCTION' },
                                    property:
                                        { type: 'Identifier',
                                            loc:
                                                { start: { line: 1, column: 9 }, end: { line: 1, column: 13 } },
                                            name: 'bind' },
                                    computed: false } } } ] }
    );
})