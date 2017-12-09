//TODO: let the exercise2.js be GREEN!
var Model = {};
Model.create = function () {
    // return function () {
    //     this.initalize.apply(this, arguments);
    // };

    var fn = function () {
        this.initalize.apply(this, arguments);
    }

    // 继承
    fn.extend = function () {
        var self = this

        var obj = function () {
            this.__super__ = new self()
            // this.initalize.apply(this, arguments)
            self.apply(this, arguments)
        }

        obj.extend = this.extend
        inhertPrototype(obj, this)

        return obj
    }

    return fn
};

// 使用Object.create()，减少了传统原型链继承的一次new的开销和存储
function inhertPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype)

    // 解决因重写原形链导致的constructor丢失的问题
    prototype.constructor = subType
    subType.prototype = prototype
}

module.exports = Model;
