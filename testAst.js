const acorn = require('./lib/acorn');
console.dir(acorn.parse('FUNCTION.bind(this)',{loc: false}), {depth: 20})
