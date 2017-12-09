var should = require('should');
var Class = require('./myClass');

describe('my own framework', function () {
    it('should have class', function () {
        var Product = new Class();

        var o = new Product();
        o.should.be.ok;
    });

    it('should have methods', function () {
        var Product = new Class({
            getPrice: function () { },
            show: function () { }
        });

        var o = new Product();
        o.should.have.properties(['getPrice', 'show']);
    });

    it('should have constructor', function () {
        var Product = new Class({
            initialize: function (name) {
                this.name = name;
            }
        });

        var o = new Product('iPhone');
        o.name.should.eql('iPhone');
    });

    it('should have constructor and methods', function () {
        var Product = new Class({
            initialize: function (name) {
                this.name = name;
            },
            getPrice: function () { },
            show: function () { }
        });

        var o = new Product('iPhone');
        o.name.should.eql('iPhone');
        o.should.have.properties(['name', 'getPrice', 'show']);
    });

    it('should can be extended', function () {
        var Product = new Class({
            method: function () { }
        });

        var Book = Product.extend({
            myMethod: function () { }
        });

        var o = new Product();
        var p = new Book();
        o.should.be.ok;
        p.should.be.ok;
        o.should.not.have.properties(['myMethod']);
        p.should.have.properties(['method', 'myMethod']);

    });

    it('extends should have initialize', function () {
        var Product = new Class({
            initialize: function (name) {
                this.name = name;
            }
        });

        var Book = Product.extend({
            initialize: function (name, pages) {
                this.name = name;
                this.pages = pages;
            }
        });

        var o = new Product('iPhone');
        var p = new Book('ES6', 800);
        o.should.have.properties(['name']);
        o.should.not.have.properties(['pages']);
        p.should.have.properties(['name', 'pages']);
    });
});