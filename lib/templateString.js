"use strict";

/**
 * Created by Administrator on 2016/10/6 0006.
 */
$(function () {
    var basket = {
        count: 3,
        onSale: "apple"
    };
    $('#result').append("\n     There are <b>" + basket.count + "</b> items\n     in your basket, <em>" + basket.onSale + "</em>\n     are on sale!\n   ");

    $("#result").append("There are 6 items in the basket,<em> orange </em> are on the sale\u3002");

    $("#result").append("`Hi`,xiaoming");

    $("#list").append("\n    <ul>\n        <li>111</li>\n        <li>111</li>\n        <li>111</li>\n        <li>111</li>\n        <li>111</li>\n    </ul>\n    ");

    $("#list2").append("\n    <ul>\n        <li>111</li>\n        <li>111</li>\n        <li>111</li>\n        <li>111</li>\n        <li>111</li>\n    </ul>\n    ".trim());

    //模板字符串中写表达式
    var x = 1,
        y = 2;
    console.log(x + "+" + y + "=" + (x + y)); //1+2=3
    console.log(x + "+" + y * 4 + "=" + (x + y * 4)); //1+8=9

    //模板字符串中写函数
    function fn() {
        return "hello";
    }
    console.log(fn() + ",world"); //hello,world

    //模板字符串嵌套
    var tmpl = function tmpl(addrs) {
        return "\n    <table>\n    " + addrs.map(function (addr) {
            return "\n        <tr><td>" + addr.first + "</td></tr>\n        <tr><td>" + addr.last + "</td></tr>\n    ";
        }).join('') + "\n    </table>\n    ";
    };
    var data = [{ first: "aaa", last: "bbb" }, { first: "ccc", last: "ddd" }];
    console.log(tmpl(data));

    //引用模板字符串本身，在需要时执行
    var str = "return" + " `hello,${name}`";
    var func = new Function("name", str);
    console.log(func('Jack')); //hello,Jack

});