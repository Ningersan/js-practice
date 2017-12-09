var Class = function(methods) {
    var fn = function(params) {
        if (methods && methods.initialize) {
            methods.initialize.call(this, params)
        }
    }

    // 原型链继承
    fn.extend = function (source) {
        var obj = function (params) {
            var func = Class(source)
            func.call(this, params)
        }

        obj.prototype = new this()
        shallowCopy(source, obj.prototype)
        return obj
    }

    shallowCopy(methods, fn.prototype)
    return fn
}

// 浅复制
function shallowCopy(source, target) {
    for (var key in source) {
        target[key] = source[key]
    }
}

//TODO: define your Class!

module.exports = Class;
