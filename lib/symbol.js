"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yuanlan on 2016/10/8.
 */
$(function () {
    var _b;

    //1.Symbol是es6引入的一种新的数据类型，引入原因是为了防止属性名的冲突，使得属性名独一无二
    //es6之后有七种数据类型：null、undefined、Boolean、String、Number、Object、Symbol

    //Symbol值是通过Symbol函数生成的，


    var s = Symbol();
    typeof s === "undefined" ? "undefined" : (0, _typeof3.default)(s); //symbol

    //Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
    var s1 = Symbol();
    var s2 = Symbol();

    s1 === s2; //false

    var s3 = Symbol("sym");
    var s4 = Symbol("sym");

    s3 === s4; //false

    //Symbol值不能与其他类型的值进行运算,
    //Symbol值可以显式转为字符串,Symbol值也可以转为布尔值，但是不能转为数值。
    String(s3); //"Symbol(sym)"
    s3.toString(); //"Symbol(sym)"

    Boolean(s3); //true
    //Number(Symbol(12));//symbol.js:37 Uncaught TypeError: Cannot convert a Symbol value to a number

    //对象的属性名可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。
    // 凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

    var a = {};
    a[s] = 1;
    // Symbol值作为对象属性名时，不能用点运算符。因为点运算符后面总是字符串

    var b = (_b = {}, (0, _defineProperty3.default)(_b, Symbol("s1"), 1), (0, _defineProperty3.default)(_b, Symbol("s2"), 2), (0, _defineProperty3.default)(_b, "s3", 3), (0, _defineProperty3.default)(_b, "s4", 4), _b);

    Object.getOwnPropertySymbols(b); //[Symbol(s1), Symbol(s2)]
    Reflect.ownKeys(b); //["s3", "s4", Symbol(s1), Symbol(s2)]

    //搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值
    var s5 = Symbol.for('foo');
    var s6 = Symbol.for('foo');
    s5 === s6; //true

    //Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。
    // 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
    // Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
    //Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。

    //Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
    Symbol.keyFor(Symbol.for('foo')); //foo
    Symbol.keyFor(Symbol()); //undefined


    //es6提供了11个内置的Symbol值，指向语言内部使用的方法。

});