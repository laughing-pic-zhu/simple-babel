const fs = require('fs');
const transform = require('../../../lib/transform');
const dir = __dirname + "/fixtures";

describe('my beverage', () => {
    fs.readdir(dir, (err, files) => {
        test('all the transform', done => {
            let subjectLen = files.length;
            files.forEach(file => {
                const subject = dir + '/' + file;
                fs.readdir(subject, (err, types) => {
                    let typeLen = types.length;
                    console.log(types)
                    types.forEach(type => {
                        const actual = fs.readFileSync(subject + '/' + type + '/actual.js', 'utf-8')
                        const expected = fs.readFileSync(subject + '/' + type + '/expected.js', 'utf-8')
                        expect(transform(actual)).toBe(expected);
                        typeLen--;
                        if (typeLen <= 0) {
                            subjectLen--;
                        }
                        if (subjectLen <= 0) {
                            done()
                        }

                    })

                })
            })
        })
    })
})