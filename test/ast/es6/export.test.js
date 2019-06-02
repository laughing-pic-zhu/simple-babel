const acorn = require('../../../lib/acorn');

test('test modules export', () => {
    expect(acorn.parse('export const a=3;')).toEqual({
        type: 'Program',
        start: 0,
        body:
            [{
                type: 'ExportNamedDeclaration',
                start: 0,
                specifiers: [],
                declaration:
                    {
                        type: 'VariableDeclaration',
                        start: 7,
                        kind: 'const',
                        declarations:
                            [{
                                type: 'VariableDeclarator',
                                start: 13,
                                id: {type: 'Identifier', start: 13, name: 'a', end: 14},
                                init: {type: 'Literal', start: 15, value: 3, raw: '3', end: 16},
                                end: 16
                            }],
                        end: 17
                    },
                end: 17
            }],
        end: 17
    })

    expect(acorn.parse('export default  a=3;')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    declaration:
                        {
                            start: 16,
                            type: 'AssignmentExpression',
                            left: {type: 'Identifier', start: 16, name: 'a', end: 17},
                            operator: '=',
                            right: {type: 'Literal', start: 18, value: 3, raw: '3', end: 19},
                            end: 19
                        },
                    end: 20
                }],
            end: 20
        }
    )

    expect(acorn.parse('export default a')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    declaration: {type: 'Identifier', start: 15, name: 'a', end: 16},
                    end: 16
                }],
            end: 16
        }
    )

    expect(acorn.parse('export default function (){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    declaration:
                        {
                            type: 'FunctionDeclaration',
                            start: 15,
                            id: null,
                            params: [],
                            expression: false,
                            generator: false,
                            body: {type: 'BlockStatement', start: 26, body: [], end: 28},
                            end: 28
                        },
                    end: 28
                }],
            end: 28
        }
    )

    expect(acorn.parse('export default function a(){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    declaration:
                        {
                            type: 'FunctionDeclaration',
                            start: 15,
                            id: {type: 'Identifier', start: 24, name: 'a', end: 25},
                            params: [],
                            expression: false,
                            generator: false,
                            body: {type: 'BlockStatement', start: 27, body: [], end: 29},
                            end: 29
                        },
                    end: 29
                }],
            end: 29
        }
    )

    expect(acorn.parse('export default class A{}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    declaration:
                        {
                            type: 'ClassDeclaration',
                            start: 15,
                            id: {type: 'Identifier', start: 21, name: 'A', end: 22},
                            superClass: null,
                            body: {type: 'ClassBody', start: 22, body: [], end: 24},
                            end: 24
                        },
                    end: 24
                }],
            end: 24
        }
    )

    expect(acorn.parse('export default class {}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    declaration:
                        {
                            type: 'ClassDeclaration',
                            start: 15,
                            id: null,
                            superClass: null,
                            body: {type: 'ClassBody', start: 21, body: [], end: 23},
                            end: 23
                        },
                    end: 23
                }],
            end: 23
        }
    )

    expect(acorn.parse('export {a}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ExportSpecifier',
                            start: 8,
                            local: {type: 'Identifier', start: 8, name: 'a', end: 9},
                            exported: {type: 'Identifier', start: 8, name: 'a', end: 9},
                            end: 9
                        }],
                    declaration: null,
                    source: null,
                    end: 10
                }],
            end: 10
        }
    )

    expect(acorn.parse('export {a as c}')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ExportSpecifier',
                            start: 8,
                            local: {type: 'Identifier', start: 8, name: 'a', end: 9},
                            exported: {type: 'Identifier', start: 13, name: 'c', end: 14},
                            end: 14
                        }],
                    declaration: null,
                    source: null,
                    end: 15
                }],
            end: 15
        }
    )

    expect(acorn.parse('export {a as c} from "d";')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    specifiers:
                        [{
                            type: 'ExportSpecifier',
                            start: 8,
                            local: {type: 'Identifier', start: 8, name: 'a', end: 9},
                            exported: {type: 'Identifier', start: 13, name: 'c', end: 14},
                            end: 14
                        }],
                    declaration: null,
                    source: {type: 'Literal', start: 21, value: 'd', raw: '"d"', end: 24},
                    end: 25
                }],
            end: 25
        }
    )

    expect(acorn.parse('export * from "d";')).toEqual(
        {
            type: 'Program',
            start: 0,
            body:
                [{
                    type: 'ExportAllDeclaration',
                    start: 0,
                    source: {type: 'Literal', start: 14, value: 'd', raw: '"d"', end: 17},
                    end: 18
                }],
            end: 18
        }
    )
})
