var A = function () {
    function A() {
        this.a = 1;
        this.xxx = function () {
        };
    }
    A.prototype.xxx = function () {
    };
    return A;
}();
