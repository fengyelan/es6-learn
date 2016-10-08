"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by yuanlan on 2016/10/8.
 */
$(function () {
    var _obj;

    //1.对象属性的简写，方法简写
    //允许只写属性名，不写属性值，属性值等于属性名所代表的变量
    var name = "yl";
    var person = {
        name: name,
        sayName: function sayName() {
            console.log("I am yl");
        }
    };

    //定义属性：
    //es5
    var obj = {};
    obj.a = 1;
    obj['a' + 1] = "a1";

    //es6:
    var obj2 = (_obj = {
        a: 1
    }, _defineProperty(_obj, 'a' + 1, "a1"), _defineProperty(_obj, "fn", function fn() {
        console.log("fn1");
    }), _defineProperty(_obj, 'h' + 'ello', function () {
        console.log("hello");
    }), _obj);

    //输出函数名字
    console.log(person.sayName.name); //sayName
    console.log(obj2.fn.name); //fn

    //有两种特殊情况：
    // bind方法创造的函数，name属性返回“bound”加上原函数的名字；
    // Function构造函数创造的函数，name属性返回“anonymous”。
    console.log(new Function().name); //anonymous
    var f = function f() {};
    console.log(f.bind().name); //bound f


    //2.Object.is(a,b);比较两个值是否相等，与严格相等===基本一致，但是还略有不同
    // （采用es6提出的同值相等的算法，ES6提出“Same-value equality”（同值相等）算法)

    //ES5比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
    // 它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。
    // JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

    Object.is("foo", "foo"); //true
    Object.is({}, {}); //false

    Object.is(NaN, NaN); //true
    Object.is(+0, -0); //false

    NaN === NaN; //false
    +0 === -0; //true

    //3.对象合并Object.assign(target,source1,source2);
    //第一个参数是目标对象，后面的参数都是源对象。
    var target = { a: 1 },
        source1 = { b: 2 },
        source2 = { c: 3 };
    Object.assign(target, source1, source2); //target =  {a: 1, b: 2, c: 3},

    //如果只有一个参数，Object.assign会直接返回该参数。
    //如果target不是对象，则需要先转化为对象,undefined和null是无法转化为对象
    //Object.assign(undefined); //报错 Uncaught TypeError: Cannot convert undefined or null to object(…)
    //Object.assign(null); //报错 Uncaught TypeError: Cannot convert undefined or null to object(…)

    _typeof(Object.assign(2)) === "object"; //true

    //布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，
    // 这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。
    Object(2); //{[[PrimitiveValue]]: 2}
    Object.assign(2); //{[[PrimitiveValue]]: 2}

    Object("abc"); //{0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
    Object.assign("abc"); //{0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

    Object.assign({ a: 1 }, "abc"); // {0: "a", 1: "b", 2: "c", a: 1}
    Object.assign({ a: 1 }, 1); // {a: 1};

    //Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），
    // 也不拷贝不可枚举的属性（enumerable: false）。
    Object.assign({ a: 1 }, Object.defineProperty({}, "invisible", {
        enumerable: false,
        value: "hello"
    })); //{a: 1}


    //Object.assign方法实行的是浅拷贝，而不是深拷贝。
    // 也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

    //一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

    //Object.assign的应用：
    //(1)给对象添加属性

    var Point = function Point(x, y) {
        _classCallCheck(this, Point);

        Object.assign(this, { x: x, y: y });
    };

    //(2)给对象添加方法


    Object.assign(Point.prototype, {
        method1: function method1() {
            //..
        },
        method2: function method2() {
            //..
        }
    });

    //(3)克隆对象
    //原始对象的克隆，只能克隆对象本身的值，不能克隆继承的值
    function clone1(origin) {
        return Object.assign({}, origin);
    }

    //克隆自身与继承的值
    function clone2(origin) {
        var originSuper = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originSuper), origin);
    }

    //(4)合并多个对象
    var merge = function merge(target) {
        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            sources[_key - 1] = arguments[_key];
        }

        return Object.assign.apply(Object, [target].concat(sources));
    };

    //(5)为属性指定默认值
    var DEFAULT = {
        a: 0,
        b: 1
    };
    function setVal(option) {
        option = Object.assign({}, DEFAULT, option);
    }
    //DEFAULTS对象是默认值，options对象是用户提供的参数。
    // Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则option的属性值会覆盖DEFAULTS的属性值。


    //4.通过给对象设置enumerable属性为true，false表面此属性是否可枚举
    //Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
    Object.getOwnPropertyDescriptor(DEFAULT, "a");
});