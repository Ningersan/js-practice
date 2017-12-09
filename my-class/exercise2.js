var should = require('should');
var Model = require('./Model');

var Person = Model.create();

Person.prototype.initalize = function (name) {
    this.name = name;
};

Person.prototype.sayHello = function () {
    return `Hi, i'm ${this.name}`;
}

var Student = Person.extend();

Student.prototype.initalize = function (name, grade) {
    this.__super__.initalize.apply(this, arguments);
    // console.log(this.name)
    this.grade = grade;
};

var CollegeStudent = Student.extend();

CollegeStudent.prototype.initalize = function (name, grade, major) {
    this.__super__.initalize.apply(this, arguments);
    this.major = major;
}

describe('my Model library', function () {
    it('should have class', function () {
        var o = new Person('Yiga');

        o.name.should.eql('Yiga');
        o.should.have.properties(['name']);
        o.should.not.have.properties(['grade']);

    });

    it('should have extend', function () {
        var o = new Student('Barry', 7);

        o.should.be.ok;
        o.name.should.eql('Barry');
        o.should.have.properties(['name', 'grade', 'sayHello']);
        o.grade.should.eql(7);
        o.sayHello().should.eql(`Hi, i'm ${o.name}`);
    });

    it('should have unlimited extend', function () {
        var o = new CollegeStudent('jason', 4, 'management');

        o.should.be.ok;
        o.name.should.eql('jason');
        // o.should.have.properties('name', 'grade', 'major', 'sayHello');
        // o.grade.should.eql(4);
        o.major.should.eql('management');
        o.sayHello().should.eql(`Hi, i'm ${o.name}`);
    });
})