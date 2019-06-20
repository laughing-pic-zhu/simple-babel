var obj = function (obj) {
    Object.defineProperties(obj, {
        x: {
            set: function (x) {
            },
            get: function () {
            }
        },
        y: {
            set: function (x) {
            }
        }
    });;
    return obj;
}({});
