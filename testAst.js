const acorn = require('./lib/acorn');
// console.dir(acorn.parse('export { encrypt as enc } from "crypto";'),{depth:20})
console.dir(acorn.parse('a[b]'), {depth: 20})