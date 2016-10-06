/**
 * Created by Administrator on 2016/10/6 0006.
 */
$(function(){
    var basket = {
        count:3,
        onSale:"apple"
    };
    $('#result').append(`
     There are <b>${basket.count}</b> items
     in your basket, <em>${basket.onSale}</em>
     are on sale!
   `);

    $("#result").append(`There are 6 items in the basket,<em> orange </em> are on the sale。`);

    $("#result").append(`\`Hi\`,xiaoming`);

    $("#list").append(`
    <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
    </ul>
    `);

    $("#list2").append(`
    <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
    </ul>
    `.trim());

    //模板字符串中写表达式
    var x= 1,y=2;
    console.log(`${x}+${y}=${x+y}`);//1+2=3
    console.log(`${x}+${y*4}=${x+y*4}`);//1+8=9

    //模板字符串中写函数
    function fn(){
        return "hello"
    }
    console.log(`${fn()},world`);//hello,world

    //模板字符串嵌套
    const tmpl = addrs =>`
    <table>
    ${addrs.map(addr =>`
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
    `).join('')}
    </table>
    `;
    const data = [
        {first:"aaa",last:"bbb"},
        {first:"ccc",last:"ddd"}
    ];
    console.log(tmpl(data));

    //引用模板字符串本身，在需要时执行
    let str = "return"+" `hello,${name}`";
    let func = new Function("name",str);
    console.log(func('Jack'));//hello,Jack





})
