(function (obj) {
    for (var i in obj) {
        exports[i] = obj[i];
    }
}(require('c')));
