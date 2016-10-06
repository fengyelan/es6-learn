/**
 * Created by Administrator on 2016/10/6 0006.
 */
$(function(){

    //es6规定二进制必须以0b或者0B开头，八进制必须以0o或者0O开头
    console.log(0o111===73);//true
    console.log(0b111===7); //true

    //es6提供了Number.isFinite()和Number.isNaN()，只对数值有效，非数值一律返回false。
    //es5的isFinite和isNaN将非数值的值转为数值，再进行判断
    Number.isFinite(24);//true
    Number.isFinite("24");//false
    Number.isFinite(Infinity);//false
    Number.isFinite(-Infinity);//false

    //es5
    isFinite(24);//true
    isFinite("24");//true

    Number.isNaN(123);//false
    Number.isNaN(NaN);//true
    Number.isNaN("NaN");//false

    //es5
    isNaN(NaN);//true
    isNaN("NaN");//true


    //es5 parseInt parseFloat； es6现在是Number.parseInt()   Number.parseFloat()

    //Number.isInteger()
    Number.isInteger(123);//true
    Number.isInteger(123.0);//true
    Number.isInteger(123.1);//false

    //ES6在Number对象上面，新增一个极小的常量Number.EPSILON
    Number.EPSILON;  //2.220446049250313e-16
    Number.EPSILON.toFixed(20);//0.00000000000000022204

    //Number.EPSILON为浮点数计算，设置一个误差范围,浮点数计算是不精确的。
    //误差能够小于Number.EPSILON，我们就可以认为得到了正确结果

    0.1+0.2 //0.30000000000000004
    0.1+0.2-0.3<Number.EPSILON;//true

    //误差检查函数
    function checkError(num1,num2){
        return Math.abs(num1-num2)<Number.EPSILON;
    }
    checkError(0.1+0.2,0.3);//true

    //JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
    //es6提供了一个函数检查是否是安全整数Number.isSafeInteger() ，以及一个表示最大和最小安全整数的常量Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
    Number.isSafeInteger(55);//
    Math.pow(2, 53) === Math.pow(2, 53) + 1;
    Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
    Number.MIN_SAFE_INTEGER === -Math.pow(2, 53) + 1
    Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER

    //Math对象新增了一些方法 （这里没写，参照连接http://es6.ruanyifeng.com/#docs/number）

})
