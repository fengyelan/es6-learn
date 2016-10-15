"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    }, (0, _defineProperty3.default)(_obj, 'a' + 1, "a1"), (0, _defineProperty3.default)(_obj, "fn", function fn() {
        console.log("fn1");
    }), (0, _defineProperty3.default)(_obj, 'h' + 'ello', function () {
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

    (0, _typeof3.default)(Object.assign(2)) === "object"; //true

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
        (0, _classCallCheck3.default)(this, Point);

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
    var o = { a: 1 };
    Object.getOwnPropertyDescriptor(o, "a");
    //{value: 1, writable: true, enumerable: true, configurable: true}
    //value:值；writable：是否只读；enumerable：是否被枚举；configurable：是否可以被删除

    //es5有三个操作会忽略enumerable为false的属性
    //for...in循环：只遍历对象自身的和继承的可枚举的属性
    //Object.keys()：返回对象自身的所有可枚举的属性的键名
    //JSON.stringify()：只串行化对象自身的可枚举的属性

    //es6新增了一个操作Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。


    //总结es6之后遍历对象属性的各种方法：
    //for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
    //Object.keys(obj)返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
    //Object.getOwnPropertyNames(obj)返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
    //Object.getOwnPropertySymbols(obj)返回一个数组，包含对象自身的所有Symbol属性。
    //Reflect.ownKeys(obj)返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

    //以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。
    //首先遍历所有属性名为数值的属性，按照数字排序。
    //其次遍历所有属性名为字符串的属性，按照生成时间排序。
    //最后遍历所有属性名为Symbol值的属性，按照生成时间排序。


    //5.__proto__属性，用来读取或设置当前对象的prototype对象
    // Object.setPrototypeOf()，设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。
    // Object.getPrototypeOf(),与setPrototypeOf方法配套，用于读取一个对象的prototype对象。

});