const acorn = require('./lib/acorn');
console.dir(acorn.parse('function a(b=3,c=4*3){}'),{depth:20})
