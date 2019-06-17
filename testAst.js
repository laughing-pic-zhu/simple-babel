const acorn = require('./lib/acorn');
// console.dir(acorn.parse('export { encrypt as enc } from "crypto";'),{depth:20})
console.dir(acorn.parse('module.exports=3'), {depth: 20})