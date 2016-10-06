/**
 * Created by Administrator on 2016/10/6 0006.
 */
$(function(){

    //1.正则表达式的构造函数  es5有以下两种表示方式
    var reg1 = new RegExp("xyz","i");
    var reg2 = new RegExp(/xyz/i);  //=>等价于var reg = /xyz/i;

    //es5在第二种表示方式的时候不允许有第二个参数，
    // 但是es6有，第二个参数表示正则表达式的修饰符，会覆盖了第一个表达式的修饰符

    console.log(new RegExp(/xyz/,"i").flags);//i
    console.log(new RegExp(/xyz/ig,"i").flags);//i

    //2.新增u修饰符
    console.log(/\uD842/u.test("\uD842\uDFB7"));//false
    console.log(/^\uD842/.test("\uD842\uDFB7"));//true
    //\uD83D\uDC2A是一个四个字节的UTF-16编码，代表一个字符。
    // 但是，ES5不支持四个字节的UTF-16编码，会将其识别为两个字符，导致第二行代码结果为true。
    // 加了u修饰符以后，ES6就会识别其为一个字符，所以第一行代码结果为false。

    //正则表达式中的.可以匹配除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符
    var str = "𠮷";
    console.log(/^.$/.test(str));//false
    console.log(/^.$/u.test(str));//true

    //ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别。
    console.log(/\u{61}/.test("a"));    //false不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配61个连续的u。
    console.log(/\u{61}/u.test("a"));//true
    console.log(/\u{20BB7}/u.test(str));//true

    //总之，凡是要识别Unicode码大于0xFFFF的字符就必须添加修饰符u
    console.log(/^\S$/.test('𠮷'));//false
    console.log(/^\S$/u.test('𠮷'));//true
    console.log(/𠮷{2}/.test('𠮷𠮷'));//false
    console.log(/𠮷{2}/u.test('𠮷𠮷'));//true

    //返回字符串长度的函数(包含unicode码大于oxFFFFFF的字符)
    function strLength(str){
        var res = str.match(/[\s\S]/gu);
        return res ? res.length : 0;
    }
    console.log(str.length);//2
    console.log(strLength(str));//1


    //3.新增y修饰符，黏连修饰符
    //y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
    // 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
    var s = "aa_aaa_aa",
        regg = /aa/g,
        regy = /aa/y;

    console.log(regg.exec(s));//["aa", index: 0, input: "aa_aaa_aa"]
    console.log(regy.exec(s));//["aa", index: 0, input: "aa_aaa_aa"]

    console.log(regg.exec(s));//["aa", index: 3, input: "aa_aaa_aa"]
    console.log(regy.exec(s));//null
    regy.lastIndex = 3;
    console.log(regy.exec(s));//["aa", index: 3, input: "aa_aaa_aa"]

    var r1 = /a/g,
        ss = "sasa";

    r1.lastIndex = 2;
    console.log(r1.exec(ss));//["a", index: 3, input: "sasa"]

    var r2 = /a/y;

    r2.lastIndex = 2;
    console.log(r2.exec(ss));//null
    r2.lastIndex = 3;
    console.log(r2.exec(ss));//["a", index: 3, input: "sasa"]


    //y修饰符号隐含了头部匹配的标志^
    console.log(/b/y.test("abc"));//false
    console.log(/b/y.test("bba"));//true

    //4.正则表达式新增属性sticky、flags
    console.log(r1.sticky);//false
    console.log(r2.sticky);//true

    console.log(r1.flags);//g
    console.log(r1.source);//a





})