var A = function (B) {
    function A() {
        this.a = 1;
        this.xxx = function () {
        };
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
    A.prototype.xxx = function () {
    };
    return A;
}(B);
