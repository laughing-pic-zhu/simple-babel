const acorn = require('./lib/acorn');
// console.dir(acorn.parse('{let a=1}'), {depth: 20});


var {Map} = require('immutable')
var b = Map({a: 1})

var c = b.toJS()

console.log(c)