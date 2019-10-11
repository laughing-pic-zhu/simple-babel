const acorn = require('../../../lib/acorn');

test('test default params', () => {
    expect(acorn.parse('function a(b=3){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
                    id:
                        {
                            type: 'Identifier',
                            start: 9,
                            loc:
                                {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                            name: 'a',
                            end: 10
                        },
                    params:
                        [{
                            type: 'AssignmentPattern',
                            start: 11,
                            loc:
                                {start: {line: 1, column: 11}, end: {line: 1, column: 14}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 11,
                                    loc:
                                        {start: {line: 1, column: 11}, end: {line: 1, column: 14}},
                                    name: 'b',
                                    end: 12
                                },
                            right:
                                {
                                    type: 'Literal',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                    value: 3,
                                    raw: '3',
                                    end: 14
                                },
                            end: 14
                        }],
                    expression: false,
                    generator: false,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 1, column: 17}},
                            body: [],
                            end: 17
                        },
                    end: 17
                }],
            end: 17
        }
    );

    expect(acorn.parse('function a(n=1,m=4){var b=3}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 28}},
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 28}},
                    id:
                        {
                            type: 'Identifier',
                            start: 9,
                            loc:
                                {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                            name: 'a',
                            end: 10
                        },
                    params:
                        [{
                            type: 'AssignmentPattern',
                            start: 11,
                            loc:
                                {start: {line: 1, column: 11}, end: {line: 1, column: 14}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 11,
                                    loc:
                                        {start: {line: 1, column: 11}, end: {line: 1, column: 14}},
                                    name: 'n',
                                    end: 12
                                },
                            right:
                                {
                                    type: 'Literal',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                    value: 1,
                                    raw: '1',
                                    end: 14
                                },
                            end: 14
                        },
                            {
                                type: 'AssignmentPattern',
                                start: 15,
                                loc:
                                    {start: {line: 1, column: 15}, end: {line: 1, column: 18}},
                                left:
                                    {
                                        type: 'Identifier',
                                        start: 15,
                                        loc:
                                            {start: {line: 1, column: 15}, end: {line: 1, column: 18}},
                                        name: 'm',
                                        end: 16
                                    },
                                right:
                                    {
                                        type: 'Literal',
                                        start: 17,
                                        loc:
                                            {start: {line: 1, column: 17}, end: {line: 1, column: 18}},
                                        value: 4,
                                        raw: '4',
                                        end: 18
                                    },
                                end: 18
                            }],
                    expression: false,
                    generator: false,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 19,
                            loc:
                                {start: {line: 1, column: 19}, end: {line: 1, column: 28}},
                            body:
                                [{
                                    type: 'VariableDeclaration',
                                    start: 20,
                                    loc:
                                        {start: {line: 1, column: 20}, end: {line: 1, column: 27}},
                                    kind: 'var',
                                    declarations:
                                        [{
                                            type: 'VariableDeclarator',
                                            start: 24,
                                            loc:
                                                {start: {line: 1, column: 24}, end: {line: 1, column: 27}},
                                            id:
                                                {
                                                    type: 'Identifier',
                                                    start: 24,
                                                    loc:
                                                        {start: {line: 1, column: 24}, end: {line: 1, column: 25}},
                                                    name: 'b',
                                                    end: 25
                                                },
                                            init:
                                                {
                                                    type: 'Literal',
                                                    start: 26,
                                                    loc:
                                                        {start: {line: 1, column: 26}, end: {line: 1, column: 27}},
                                                    value: 3,
                                                    raw: '3',
                                                    end: 27
                                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 23}},
            body:
                [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 23}},
                    id:
                        {
                            type: 'Identifier',
                            start: 9,
                            loc:
                                {start: {line: 1, column: 9}, end: {line: 1, column: 10}},
                            name: 'a',
                            end: 10
                        },
                    params:
                        [{
                            type: 'AssignmentPattern',
                            start: 11,
                            loc:
                                {start: {line: 1, column: 11}, end: {line: 1, column: 14}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 11,
                                    loc:
                                        {start: {line: 1, column: 11}, end: {line: 1, column: 14}},
                                    name: 'b',
                                    end: 12
                                },
                            right:
                                {
                                    type: 'Literal',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                    value: 3,
                                    raw: '3',
                                    end: 14
                                },
                            end: 14
                        },
                            {
                                type: 'AssignmentPattern',
                                start: 15,
                                loc:
                                    {start: {line: 1, column: 15}, end: {line: 1, column: 20}},
                                left:
                                    {
                                        type: 'Identifier',
                                        start: 15,
                                        loc:
                                            {start: {line: 1, column: 15}, end: {line: 1, column: 20}},
                                        name: 'c',
                                        end: 16
                                    },
                                right:
                                    {
                                        type: 'BinaryExpression',
                                        start: 17,
                                        loc:
                                            {start: {line: 1, column: 17}, end: {line: 1, column: 20}},
                                        left:
                                            {
                                                type: 'Literal',
                                                start: 17,
                                                loc:
                                                    {start: {line: 1, column: 17}, end: {line: 1, column: 20}},
                                                value: 4,
                                                raw: '4',
                                                end: 18
                                            },
                                        operator: '*',
                                        right:
                                            {
                                                type: 'Literal',
                                                start: 19,
                                                loc:
                                                    {start: {line: 1, column: 19}, end: {line: 1, column: 20}},
                                                value: 3,
                                                raw: '3',
                                                end: 20
                                            },
                                        end: 20
                                    },
                                end: 20
                            }],
                    expression: false,
                    generator: false,
                    body:
                        {
                            type: 'BlockStatement',
                            start: 21,
                            loc:
                                {start: {line: 1, column: 21}, end: {line: 1, column: 23}},
                            body: [],
                            end: 23
                        },
                    end: 23
                }],
            end: 23
        }
    )
});