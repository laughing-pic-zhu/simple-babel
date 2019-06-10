var A = function (B) {
    function A() {
        B.call(this);
        x.super();
        B.xxx;
        B.prototype.ccc.call(this);
        this.a = 1;
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
    return A;
}(B);
