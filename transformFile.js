const transform = require('./lib/transform');
const fs = require('fs');
const path = require('path');
var readdir   = require("fs-readdir-recursive");
// const str = fs.readFileSync('./a.js');
//
// path.join(process.cwd() + filename);
// console.log(transform(str))

console.log(readdir('./src'))