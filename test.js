const acorn = require('./acorn');
const fs = require('fs');
const a = fs.readFileSync('./source.js');
console.dir(acorn.parse(a.toString()), {depth: 20});