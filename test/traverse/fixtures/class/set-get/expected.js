var A = function (B) {
    function A() {
        B.call(this);
    }
    A.prototype = Object.assign(B.prototype, {
        constructor: {
            value: A,
            enumerable: false,
            editable: true,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperties(A.prototype, {
        x: {
            set: function (x) {
                this.x = x;
            },
            get: function () {
                return this.x;
            }
        },
        y: {
            set: function (x) {
            }
        }
    });
    return A;
}(B);
