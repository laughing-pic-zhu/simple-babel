const fs = require('fs');
const transform = require('../../lib/transform');
const dir = __dirname + "/fixtures";

const files = fs.readdirSync(dir);
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const subject = dir + '/' + file;
    const types = fs.readdirSync(subject);
    for (let j = 0; j < types.length; j++) {
        const type = types[j];
        test('transform ' + file + ' ' + type, () => {
            const actual = fs.readFileSync(subject + '/' + type + '/actual.js', 'utf-8')
            const expected = fs.readFileSync(subject + '/' + type + '/expected.js', 'utf-8')
            expect(transform(actual)).toBe(expected);
        })
    }
}
