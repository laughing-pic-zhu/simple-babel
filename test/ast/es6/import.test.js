const acorn = require('../../../lib/acorn');

test('test modules import', () => {
    expect(acorn.parse('import a from "b";')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ImportDefaultSpecifier',
                            start: 7,
                            local: {type: 'Identifier', start: 7, name: 'a', end: 8},
                            end: 8
                        }],
                    source: {type: 'Literal', start: 14, value: 'b', raw: '"b"', end: 17},
                    end: 18
                }],
            end: 18
        }
    )

    expect(acorn.parse('import * as a from "b"')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ImportNamespaceSpecifier',
                            start: 7,
                            local: {type: 'Identifier', start: 12, name: 'a', end: 13},
                            end: 13
                        }],
                    source: {type: 'Literal', start: 19, value: 'b', raw: '"b"', end: 22},
                    end: 22
                }],
            end: 22
        }
    )

    expect(acorn.parse('import {a,b,c as d} from "b"')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ImportSpecifier',
                            start: 8,
                            imported: {type: 'Identifier', start: 8, name: 'a', end: 9},
                            local: {type: 'Identifier', start: 8, name: 'a', end: 9},
                            end: 9
                        },
                            {
                                type: 'ImportSpecifier',
                                start: 10,
                                imported: {type: 'Identifier', start: 10, name: 'b', end: 11},
                                local: {type: 'Identifier', start: 10, name: 'b', end: 11},
                                end: 11
                            },
                            {
                                type: 'ImportSpecifier',
                                start: 12,
                                imported: {type: 'Identifier', start: 12, name: 'c', end: 13},
                                local: {type: 'Identifier', start: 17, name: 'd', end: 18},
                                end: 18
                            }],
                    source: {type: 'Literal', start: 25, value: 'b', raw: '"b"', end: 28},
                    end: 28
                }],
            end: 28
        }
    )

    expect(acorn.parse('import h,{a,b,c as d} from "b"')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ImportDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ImportDefaultSpecifier',
                            start: 7,
                            local: {type: 'Identifier', start: 7, name: 'h', end: 8},
                            end: 8
                        },
                            {
                                type: 'ImportSpecifier',
                                start: 10,
                                imported: {type: 'Identifier', start: 10, name: 'a', end: 11},
                                local: {type: 'Identifier', start: 10, name: 'a', end: 11},
                                end: 11
                            },
                            {
                                type: 'ImportSpecifier',
                                start: 12,
                                imported: {type: 'Identifier', start: 12, name: 'b', end: 13},
                                local: {type: 'Identifier', start: 12, name: 'b', end: 13},
                                end: 13
                            },
                            {
                                type: 'ImportSpecifier',
                                start: 14,
                                imported: {type: 'Identifier', start: 14, name: 'c', end: 15},
                                local: {type: 'Identifier', start: 19, name: 'd', end: 20},
                                end: 20
                            }],
                    source: {type: 'Literal', start: 27, value: 'b', raw: '"b"', end: 30},
                    end: 30
                }],
            end: 30
        }
    )

})