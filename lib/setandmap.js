"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by yuanlan on 2016/10/9.
 */

$(function () {

    //Set数据结构，没有重复值
    var s = new Set([1, 2, 3, 3, 3, 3, 3]); //s = Set{1,2,3};
    [].concat(_toConsumableArray(s)); //[1,2,3]
    Array.from(s);

    //删除数组的重复成员
    function delArrayRepeatVal(arr) {
        return [].concat(_toConsumableArray(new Set(arr)));
    }
    function delArrayRepeatVal2(arr) {
        return Array.from(new Set(arr));
    }

    //Set实例的属性和方法
    s.constructor; //function Set(){}
    s.size; //3

    s.has(1); //true
    s.add(4); //Set {1, 2, 3, 4}
    s.delete(2); //true
    s.clear(); //清空Set的成员

    //Set结构实例的遍历
    var s1 = new Set(["aa", "bb", "cc"]);
    s1.keys();
    s1.values();
    s1.entries();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = s1.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            console.log(item);
        }
        //aa
        //bb
        //cc
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
        for (var _iterator2 = s1.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _item = _step2.value;

            console.log(_item);
        }
        //aa
        //bb
        //cc
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

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = s1.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _item2 = _step3.value;

            console.log(_item2);
        }
        //["aa", "aa"]
        //["bb", "bb"]
        //["cc", "cc"]
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    s1.forEach(function (v, k) {
        return console.log(v + "qq");
    });
    //aaqq
    //bbqq
    //ccqq

    //数组的map和filter用于Set
    var s2 = new Set([1, 2, 3, 4].map(function (x) {
        return x * 2;
    })); //Set{2,4,6,8}
    var s3 = new Set([1, 2, 3, 4].filter(function (x) {
        return x % 2 == 0;
    })); //Set{2,4}


    //WeakSet的成员只能是对象，而不能是其他类型的值。
    //WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，
    // 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。
    // 这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

    //es6提供了map的数据结构，任意类型的值都可以作为键
    var o = { title: "aa" };
    var m = new Map();
    m.set(o, 'bbbbb');
    m.get(o); //'bbbbb'

    m.has(o); //true
    m.delete(o); //true
    m.has(o); //false

    //作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
    var m1 = new Map([["t1", 12], ["t2", 34]]);
    m1.size; //2

    m1.has("t1"); //true
    m1.has("t2"); //true
    m1.has("t3"); //false

    m1.get("t1"); //12
    m1.get("t2"); //34
    m1.get("t3"); //undefined


    //map遍历
    //    keys()：返回键名的遍历器。
    //values()：返回键值的遍历器。
    //entries()：返回所有成员的遍历器。
    //forEach()：遍历Map的所有成员。

    //Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
    //map转化为数组
    [].concat(_toConsumableArray(m1)); //[[ "t1",12],["t2",34]]

    //数组转化为map
    var m2 = new Map([['a', 1], ['b', 1]]);

    //如果所有Map的键都是字符串，它可以转为对象。
    function mapToObject(map) {
        var obj = Object.create(null);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = map[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = _slicedToArray(_step4.value, 2);

                var key = _step4$value[0];
                var val = _step4$value[1];

                obj[key] = val;
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return obj;
    }
    mapToObject(new Map([['a', 1], ['b', 1]]));

    //对象转化为map
    function objToMap(obj) {
        var strMap = new Map();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = Object.keys(obj)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var k = _step5.value;

                strMap.set(k, obj[k]);
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        return strMap;
    }
    objToMap({ a: 12, b: 13 });

    //Map转化为JSON
    //Map的键名都是字符串，这时可以选择转为对象JSON。
    function mapToJson(map) {
        return JSON.stringify(mapToJson(map));
    }
    mapToJson(new Map([['a', 1], ['b', 2]]));
    //Map的键名有非字符串，这时可以选择转为数组JSON。
    function mapToArrayJSon(map) {
        return JSON.stringify([].concat(_toConsumableArray(map)));
    }
    mapToArrayJSon(new Map().set(true, 7).set({ a: 1 }, ['abc']));

    //JSON转化为Map
    function jsonToMap(jsonStr) {
        return objToMap(JSON.parse(jsonStr));
    }

    //整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。
    function jsonArrayToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }
});