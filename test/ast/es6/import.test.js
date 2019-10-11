const acorn = require('../../../lib/acorn');

test('test modules import', () => {
    expect(acorn.parse('import a from "b";')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
                    specifiers:
                        [{
                            type: 'ImportDefaultSpecifier',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                            local:
                                {
                                    type: 'Identifier',
                                    start: 7,
                                    loc:
                                        {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                                    name: 'a',
                                    end: 8
                                },
                            end: 8
                        }],
                    source:
                        {
                            type: 'Literal',
                            start: 14,
                            loc:
                                {start: {line: 1, column: 14}, end: {line: 1, column: 17}},
                            value: 'b',
                            raw: '"b"',
                            end: 17
                        },
                    end: 18
                }],
            end: 18
        }
    );

    expect(acorn.parse('import * as a from "b"')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 22}},
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 22}},
                    specifiers:
                        [{
                            type: 'ImportNamespaceSpecifier',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 1, column: 13}},
                            local:
                                {
                                    type: 'Identifier',
                                    start: 12,
                                    loc:
                                        {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                    name: 'a',
                                    end: 13
                                },
                            end: 13
                        }],
                    source:
                        {
                            type: 'Literal',
                            start: 19,
                            loc:
                                {start: {line: 1, column: 19}, end: {line: 1, column: 22}},
                            value: 'b',
                            raw: '"b"',
                            end: 22
                        },
                    end: 22
                }],
            end: 22
        }
    );

    expect(acorn.parse('import {a,b,c as d} from "b"')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 28}},
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 28}},
                    specifiers:
                        [{
                            type: 'ImportSpecifier',
                            start: 8,
                            loc:
                                {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                            imported:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 9
                                },
                            local:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 9
                                },
                            end: 9
                        },
                            {
                                type: 'ImportSpecifier',
                                start: 10,
                                loc:
                                    {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                imported:
                                    {
                                        type: 'Identifier',
                                        start: 10,
                                        loc:
                                            {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                        name: 'b',
                                        end: 11
                                    },
                                local:
                                    {
                                        type: 'Identifier',
                                        start: 10,
                                        loc:
                                            {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                        name: 'b',
                                        end: 11
                                    },
                                end: 11
                            },
                            {
                                type: 'ImportSpecifier',
                                start: 12,
                                loc:
                                    {start: {line: 1, column: 12}, end: {line: 1, column: 18}},
                                imported:
                                    {
                                        type: 'Identifier',
                                        start: 12,
                                        loc:
                                            {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                        name: 'c',
                                        end: 13
                                    },
                                local:
                                    {
                                        type: 'Identifier',
                                        start: 17,
                                        loc:
                                            {start: {line: 1, column: 17}, end: {line: 1, column: 18}},
                                        name: 'd',
                                        end: 18
                                    },
                                end: 18
                            }],
                    source:
                        {
                            type: 'Literal',
                            start: 25,
                            loc:
                                {start: {line: 1, column: 25}, end: {line: 1, column: 28}},
                            value: 'b',
                            raw: '"b"',
                            end: 28
                        },
                    end: 28
                }],
            end: 28
        }
    )

    expect(acorn.parse('import h,{a,b,c as d} from "b"')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 30}},
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 30}},
                    specifiers:
                        [{
                            type: 'ImportDefaultSpecifier',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                            local:
                                {
                                    type: 'Identifier',
                                    start: 7,
                                    loc:
                                        {start: {line: 1, column: 7}, end: {line: 1, column: 8}},
                                    name: 'h',
                                    end: 8
                                },
                            end: 8
                        },
                            {
                                type: 'ImportSpecifier',
                                start: 10,
                                loc:
                                    {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                imported:
                                    {
                                        type: 'Identifier',
                                        start: 10,
                                        loc:
                                            {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                        name: 'a',
                                        end: 11
                                    },
                                local:
                                    {
                                        type: 'Identifier',
                                        start: 10,
                                        loc:
                                            {start: {line: 1, column: 10}, end: {line: 1, column: 11}},
                                        name: 'a',
                                        end: 11
                                    },
                                end: 11
                            },
                            {
                                type: 'ImportSpecifier',
                                start: 12,
                                loc:
                                    {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                imported:
                                    {
                                        type: 'Identifier',
                                        start: 12,
                                        loc:
                                            {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                        name: 'b',
                                        end: 13
                                    },
                                local:
                                    {
                                        type: 'Identifier',
                                        start: 12,
                                        loc:
                                            {start: {line: 1, column: 12}, end: {line: 1, column: 13}},
                                        name: 'b',
                                        end: 13
                                    },
                                end: 13
                            },
                            {
                                type: 'ImportSpecifier',
                                start: 14,
                                loc:
                                    {start: {line: 1, column: 14}, end: {line: 1, column: 20}},
                                imported:
                                    {
                                        type: 'Identifier',
                                        start: 14,
                                        loc:
                                            {start: {line: 1, column: 14}, end: {line: 1, column: 15}},
                                        name: 'c',
                                        end: 15
                                    },
                                local:
                                    {
                                        type: 'Identifier',
                                        start: 19,
                                        loc:
                                            {start: {line: 1, column: 19}, end: {line: 1, column: 20}},
                                        name: 'd',
                                        end: 20
                                    },
                                end: 20
                            }],
                    source:
                        {
                            type: 'Literal',
                            start: 27,
                            loc:
                                {start: {line: 1, column: 27}, end: {line: 1, column: 30}},
                            value: 'b',
                            raw: '"b"',
                            end: 30
                        },
                    end: 30
                }],
            end: 30
        }
    )

})