"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yuanlan on 2016/10/11.
 */
$(function () {
    es5定义一个类;
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.print = function () {
        console.log(this.x, this.y);
    };
    var p = new Point(1, 2);
    p.print(); //1 2

    //es6定义一个类

    var Person = function () {
        function Person(name, age) {
            (0, _classCallCheck3.default)(this, Person);

            this.name = name;
            this.age = age;
        }

        (0, _createClass3.default)(Person, [{
            key: "sayName",
            value: function sayName() {
                console.log(this.name);
            }
        }]);
        return Person;
    }();

    var person = new Person("yl", 21);
    person.sayName();
});