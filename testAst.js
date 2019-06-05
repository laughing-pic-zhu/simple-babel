const acorn = require('./lib/acorn');
console.dir(acorn.parse('{let a=1}'), {depth: 20});
