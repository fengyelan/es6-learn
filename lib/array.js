"use strict";

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2016/10/6 0006.
 */
$(function () {
    //1.Array.from：可以将两类对象转化为数组，一时类似数组的对象，二是可遍历的对象,即就是具有iterator接口

    var arraylike = {
        0: 11,
        1: 22,
        2: 33,
        length: 3
    };
    //es5
    var arr1 = [].slice.call(arraylike); //arr1 = [11, 22, 33]
    //es6
    var arr2 = Array.from(arraylike); //arr2 = [11, 22, 33]

    var arr3 = Array.from(new Set([1, 2, 3])); //arr3 = [1, 2, 3]

    //Array.from还可以接收第二个参数,类似于数组的map方法
    var arr4 = Array.from(arraylike, function (x) {
        return x * x;
    }); //arr4 = [121, 484, 1089]

    var arr5 = Array.from(arraylike).map(function (x) {
        return x * x;
    }); //arr5 = [121, 484, 1089]

    //eg。返回各种数据的数据类型
    function typesOf() {
        return Array.from(arguments, function (val) {
            return typeof val === "undefined" ? "undefined" : (0, _typeof3.default)(val);
        });
    }
    var res = typesOf(null, undefined, "123", 123, function () {}); //res = ["object", "undefined", "string", "number", "function"]

    //任何有length属性的对象，都可以通过Array.from方法转为数组,只要类似数组的对象具有length属性
    var arr6 = Array.from({ length: 5 });
    var arr7 = Array.from({ length: 2 }, function () {
        return "xm";
    });

    //将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
    function strLength(str) {
        return Array.from(str).length;
    }
    strLength("𠮷1"); //2

    //2.Array.of()：将一组值转化为数组
    //Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。
    Array.of(); //[]
    Array.of(undefined); //[undefined]
    Array.of(1); //[1]
    Array.of(1, 2, 3); //[1,2,3]

    //es5
    Array(); //[]
    Array(2); //[,]
    Array(1, 2); //[1,2]


    //3.数组实例的copyWithin():在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
    //[1,2,3,4,5].copyWithin(target, start = 0, end = this.length)
    //target（必需）：从该位置开始替换数据。
    //start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    //end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

    var newArr = [1, 2, 3, 4, 5].copyWithin(0, 2, 4); //[3,4,3,4,5]

    //4.数组实例的find()和findIndex()
    //find():找出第一个符合条件的数组成员,返回该成员。如果没有符合条件的成员，则返回undefined。
    //findIndex() :返回第一个符合条件的数组成员的下标，如果所有成员都不符合条件，则返回-1。
    [1, 2, -1, 3].find(function (n) {
        return n < 0;
    }); //-1
    [1, 2, -1, 3].findIndex(function (n) {
        return n < 0;
    }); //2

    //数组实例的fill():用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。Array(5).fill('a')
    //fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置[1,2,3,4,5].fill('a',1,3); 下标1开始，3之前的下标结束
    var fillArr1 = Array(5).fill('a'); //fillArr1 = ["a", "a", "a", "a", "a"]
    var fillArr2 = [1, 2, 3].fill('a'); //fillArr2 = ["a", "a", "a"]
    var fillArr3 = [1, 2, 3, 4, 5].fill('a', 1, 3); //fillArr3 = [1, "a", "a", 4, 5]

    //数组实例的entries()，keys()和values()
    //它们都返回一个遍历器对象,可以用for...of循环进行遍历，
    // 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
    var arrTemp = [1, 2, 3, 4, 5];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arrTemp.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            console.log(k);
        }
        //0
        //1
        //2
        //3
        //4

        //for(let value of arrTemp.values()){   //这个还需要查资料 values报错了
        //    console.log(value);
        //}
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = arrTemp.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2);

            var key = _step2$value[0];
            var val = _step2$value[1];

            console.log(key + ":" + val);
        }
        //0:1
        //1:2
        //2:3
        //3:4
        //4:5
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
});