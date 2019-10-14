const acorn = require('./lib/acorn');
console.dir(acorn.parse('import x from "x"',{loc: false}), {depth: 20})
