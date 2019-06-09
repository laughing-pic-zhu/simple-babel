const acorn = require('./lib/acorn');
// console.dir(acorn.parse('{let a=1}'), {depth: 20});
//class A{set a(x){this.x=x;}}
console.dir(acorn.parse('class A extends b.c{\n\tconstructor(a,b,c){}\n\tstatic n(){}\n}'),{depth:20})