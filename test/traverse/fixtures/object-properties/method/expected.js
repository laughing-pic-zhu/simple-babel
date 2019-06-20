var obj = function (obj) {
    Object.defineProperties(obj, {
        x: {
            set: function (x) {
            }
        }
    });;
    return obj;
}({
    xxx: function () {
    },
    yyy: function (y) {
        y;
    }
});
