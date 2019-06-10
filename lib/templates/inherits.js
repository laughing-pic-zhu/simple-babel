CLASSNAME.prototype = Object.assign(PARENT.prototype, {
    constructor: {
        value: CLASSNAME,
        enumerable: false,
        editable: true,
        writable: true,
        configurable: true
    }
})
