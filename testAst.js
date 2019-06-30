const acorn = require('./lib/acorn');
// console.dir(acorn.parse('export { encrypt as enc } from "crypto";'),{depth:20})
console.dir(acorn.parse('export {a as c,b as d} from "e"'), {depth: 20})