/**
 * Created by yuanlan on 2016/10/9.
 */

$(function(){

    //Set数据结构，没有重复值
    let s = new Set([1,2,3,3,3,3,3]);//s = Set{1,2,3};
    [...s];//[1,2,3]
    Array.from(s);

    //删除数组的重复成员
    function delArrayRepeatVal(arr){
        return [...new Set(arr)];
    }
    function delArrayRepeatVal2(arr){
        return Array.from(new Set(arr));
    }

    //Set实例的属性和方法
    s.constructor;//function Set(){}
    s.size;//3

    s.has(1);//true
    s.add(4);//Set {1, 2, 3, 4}
    s.delete(2);//true
    s.clear();//清空Set的成员

    //Set结构实例的遍历
    let s1 = new Set(["aa","bb","cc"]);
    s1.keys();
    s1.values();
    s1.entries();

    for(let item of s1.keys()){
        console.log(item);
    }
    //aa
    //bb
    //cc

    for(let item of s1.values()){
        console.log(item);
    }
    //aa
    //bb
    //cc

    for(let item of s1.entries()){
        console.log(item);
    }
    //["aa", "aa"]
    //["bb", "bb"]
    //["cc", "cc"]

    s1.forEach((v,k)=>console.log(v+"qq"));
    //aaqq
    //bbqq
    //ccqq

    //数组的map和filter用于Set
    let s2 = new Set([1,2,3,4].map(x => x*2)); //Set{2,4,6,8}
    let s3 = new Set([1,2,3,4].filter(x => (x%2==0))); //Set{2,4}


    //WeakSet的成员只能是对象，而不能是其他类型的值。
    //WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，
    // 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。
    // 这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

    //es6提供了map的数据结构，任意类型的值都可以作为键
    let o = {title:"aa"};
    let m = new Map();
    m.set(o,'bbbbb');
    m.get(o);//'bbbbb'

    m.has(o);//true
    m.delete(o);//true
    m.has(o);//false

    //作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
    let m1 = new Map([
       [ "t1",12],
        ["t2",34]
    ]);
    m1.size;//2

    m1.has("t1");//true
    m1.has("t2");//true
    m1.has("t3");//false

    m1.get("t1");//12
    m1.get("t2");//34
    m1.get("t3");//undefined


    //map遍历
    //    keys()：返回键名的遍历器。
    //values()：返回键值的遍历器。
    //entries()：返回所有成员的遍历器。
    //forEach()：遍历Map的所有成员。

    //Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
    //map转化为数组
    [...m1];//[[ "t1",12],["t2",34]]

    //数组转化为map
    let m2 = new Map([
        ['a',1],
        ['b',1]
    ])

    //如果所有Map的键都是字符串，它可以转为对象。
     function mapToObject(map){
        let obj = Object.create(null);
        for(let [key,val] of map){
            obj[key]=val;
        }
        return obj;
    }
    mapToObject(new Map([['a',1],['b',1]]));

    //对象转化为map
    function objToMap(obj){
        let strMap = new Map();
        for(let k of Object.keys(obj)){
            strMap.set(k,obj[k]);
        }
        return strMap;
    }
    objToMap({a:12,b:13});

    //Map转化为JSON
    //Map的键名都是字符串，这时可以选择转为对象JSON。
    function mapToJson(map){
        return JSON.stringify(mapToJson(map));
    }
    mapToJson(new Map([['a',1],['b',2]]));
    //Map的键名有非字符串，这时可以选择转为数组JSON。
    function mapToArrayJSon(map){
        return JSON.stringify([...map]);
    }
    mapToArrayJSon(new Map().set(true,7).set({a:1},['abc']));

    //JSON转化为Map
    function jsonToMap(jsonStr) {
        return objToMap(JSON.parse(jsonStr));
    }

    //整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。
    function jsonArrayToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }






})
