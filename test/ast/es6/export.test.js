const acorn = require('../../../lib/acorn');

test('test modules export', () => {
    expect(acorn.parse('export const a=3;')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 17}},
                    specifiers: [],
                    source: null,
                    declaration:
                        {
                            type: 'VariableDeclaration',
                            start: 7,
                            loc:
                                {start: {line: 1, column: 7}, end: {line: 1, column: 17}},
                            kind: 'const',
                            declarations:
                                [{
                                    type: 'VariableDeclarator',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 16}},
                                    id:
                                        {
                                            type: 'Identifier',
                                            start: 13,
                                            loc:
                                                {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                            name: 'a',
                                            end: 14
                                        },
                                    init:
                                        {
                                            type: 'Literal',
                                            start: 15,
                                            loc:
                                                {start: {line: 1, column: 15}, end: {line: 1, column: 16}},
                                            value: 3,
                                            raw: '3',
                                            end: 16
                                        },
                                    end: 16
                                }],
                            end: 17
                        },
                    end: 17
                }],
            end: 17
        }
    )

    expect(acorn.parse('export default  a=3;')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 20}},
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 20}},
                    declaration:
                        {
                            type: 'AssignmentExpression',
                            start: 16,
                            loc:
                                {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                            left:
                                {
                                    type: 'Identifier',
                                    start: 16,
                                    loc:
                                        {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
                                    name: 'a',
                                    end: 17
                                },
                            operator: '=',
                            right:
                                {
                                    type: 'Literal',
                                    start: 18,
                                    loc:
                                        {start: {line: 1, column: 18}, end: {line: 1, column: 19}},
                                    value: 3,
                                    raw: '3',
                                    end: 19
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 16}},
                    declaration:
                        {
                            type: 'Identifier',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 1, column: 16}},
                            name: 'a',
                            end: 16
                        },
                    end: 16
                }],
            end: 16
        }
    )

    expect(acorn.parse('export default function (){}')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 28}},
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 28}},
                    declaration:
                        {
                            type: 'FunctionDeclaration',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 1, column: 28}},
                            id: null,
                            params: [],
                            expression: false,
                            generator: false,
                            body:
                                {
                                    type: 'BlockStatement',
                                    start: 26,
                                    loc:
                                        {start: {line: 1, column: 26}, end: {line: 1, column: 28}},
                                    body: [],
                                    end: 28
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 29}},
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 29}},
                    declaration:
                        {
                            type: 'FunctionDeclaration',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 1, column: 29}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 24,
                                    loc:
                                        {start: {line: 1, column: 24}, end: {line: 1, column: 25}},
                                    name: 'a',
                                    end: 25
                                },
                            params: [],
                            expression: false,
                            generator: false,
                            body:
                                {
                                    type: 'BlockStatement',
                                    start: 27,
                                    loc:
                                        {start: {line: 1, column: 27}, end: {line: 1, column: 29}},
                                    body: [],
                                    end: 29
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 24}},
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 24}},
                    declaration:
                        {
                            type: 'ClassDeclaration',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 1, column: 24}},
                            id:
                                {
                                    type: 'Identifier',
                                    start: 21,
                                    loc:
                                        {start: {line: 1, column: 21}, end: {line: 1, column: 22}},
                                    name: 'A',
                                    end: 22
                                },
                            superClass: null,
                            body:
                                {
                                    type: 'ClassBody',
                                    start: 22,
                                    loc:
                                        {start: {line: 1, column: 22}, end: {line: 1, column: 24}},
                                    body: [],
                                    end: 24
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 23}},
            body:
                [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 23}},
                    declaration:
                        {
                            type: 'ClassDeclaration',
                            start: 15,
                            loc:
                                {start: {line: 1, column: 15}, end: {line: 1, column: 23}},
                            id: null,
                            superClass: null,
                            body:
                                {
                                    type: 'ClassBody',
                                    start: 21,
                                    loc:
                                        {start: {line: 1, column: 21}, end: {line: 1, column: 23}},
                                    body: [],
                                    end: 23
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 10}},
                    specifiers:
                        [{
                            type: 'ExportSpecifier',
                            start: 8,
                            loc:
                                {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                            local:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 9
                                },
                            exported:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 9
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 15}},
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 15}},
                    specifiers:
                        [{
                            type: 'ExportSpecifier',
                            start: 8,
                            loc:
                                {start: {line: 1, column: 8}, end: {line: 1, column: 14}},
                            local:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 9
                                },
                            exported:
                                {
                                    type: 'Identifier',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                    name: 'c',
                                    end: 14
                                },
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
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 25}},
            body:
                [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 25}},
                    specifiers:
                        [{
                            type: 'ExportSpecifier',
                            start: 8,
                            loc:
                                {start: {line: 1, column: 8}, end: {line: 1, column: 14}},
                            local:
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    loc:
                                        {start: {line: 1, column: 8}, end: {line: 1, column: 9}},
                                    name: 'a',
                                    end: 9
                                },
                            exported:
                                {
                                    type: 'Identifier',
                                    start: 13,
                                    loc:
                                        {start: {line: 1, column: 13}, end: {line: 1, column: 14}},
                                    name: 'c',
                                    end: 14
                                },
                            end: 14
                        }],
                    declaration: null,
                    source:
                        {
                            type: 'Literal',
                            start: 21,
                            loc:
                                {start: {line: 1, column: 21}, end: {line: 1, column: 24}},
                            value: 'd',
                            raw: '"d"',
                            end: 24
                        },
                    end: 25
                }],
            end: 25
        }
    )

    expect(acorn.parse('export * from "d";')).toEqual(
        {
            type: 'Program',
            start: 0,
            loc:
                {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
            body:
                [{
                    type: 'ExportAllDeclaration',
                    start: 0,
                    loc:
                        {start: {line: 1, column: 0}, end: {line: 1, column: 18}},
                    source:
                        {
                            type: 'Literal',
                            start: 14,
                            loc:
                                {start: {line: 1, column: 14}, end: {line: 1, column: 17}},
                            value: 'd',
                            raw: '"d"',
                            end: 17
                        },
                    end: 18
                }],
            end: 18
        }
    )
})
