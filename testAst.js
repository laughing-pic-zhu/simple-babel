const acorn = require('./lib/acorn');
console.dir(acorn.parse('FUNCTION.bind(this)'), {depth: 20});
