const acorn = require('../../lib/acorn');

test('test option', () => {
    expect(acorn.parse('FUNCTION.bind(this)', {loc: false})).toEqual(
        {
            type: 'Program',
            body:
                [{
                    type: 'ExpressionStatement',
                    expression:
                        {
                            type: 'CallExpression',
                            arguments: [{type: 'ThisExpression'}],
                            callee:
                                {
                                    type: 'MemberExpression',
                                    object: {type: 'Identifier', name: 'FUNCTION'},
                                    property: {type: 'Identifier', name: 'bind'},
                                    computed: false
                                }
                        }
                }]
        }
    );

    expect(acorn.parse('FUNCTION.bind(this)')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExpressionStatement',
                    start: 0,
                    expression:
                        {
                            type: 'CallExpression',
                            start: 0,
                            arguments: [{type: 'ThisExpression', start: 14, end: 18}],
                            callee:
                                {
                                    type: 'MemberExpression',
                                    start: 0,
                                    object: {type: 'Identifier', start: 0, name: 'FUNCTION', end: 8},
                                    property: {type: 'Identifier', start: 9, name: 'bind', end: 13},
                                    computed: false,
                                    end: 13
                                },
                            end: 19
                        },
                    end: 19
                }],
            end: 19
        }
    );
})