const acorn = require('./lib/acorn');
console.dir(acorn.parse('var a=function (){\nreturn 1;\n}'), {depth: 20});
