(function () {
    for (var a in b) {
        (function () {
            console.log(1);
            var i = 1;
        }());
    }
}());
