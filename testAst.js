const acorn = require('./lib/acorn');
// console.dir(acorn.parse('{let a=1}'), {depth: 20});
//class A{set a(x){this.x=x;}}
console.dir(acorn.parse('class Test {get test() {return 5 + 5;}}'),{depth:20})