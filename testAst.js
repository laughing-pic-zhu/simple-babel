const acorn = require('./lib/acorn');
// console.dir(acorn.parse('{let a=1}'), {depth: 20});

console.dir(acorn.parse('class A extends B{\n\tconstructor(){\n\t\tx.super()\n\t}\n\t\n}'),{depth:20})