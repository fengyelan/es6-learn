/**
 * Created by yuanlan on 2016/10/10.
 */
$(function(){

 //Proxy是用于修改某些操作的默认行为，等于在语言层面上面做出了修改，属于一种元编程，对编程语言进行编程

    var obj = new Proxy({},{
        set:function(target,key,value,receiver){
            console.log(`setting ${key}!`);
            return Reflect.set(target,key,value,receiver);
        },
        get:function(target,key,receiver){
            console.log(`gettting ${key}!`);
            return Reflect.get(target,key,receiver);
        }
    })
    obj.a=1;
    //setting a!
    ++obj.a;
    //gettting a!
    //setting a!
    //Proxy实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。


    //双方括号[[ ]]代表内部方法，在一般的JS代码中不可见，你可以调用、删除或覆写普通方法，但是无法操作内部方法。


    //ES6原生提供Proxy构造函数，用来生成Proxy实例。
    //var proxy = new Proxy(target,handler);
    //Proxy对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。
    //new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
    //target:目标对象  handler：句柄对象，句柄对象的方法可以覆写任意代理的内部方法

    //将Proxy对象，设置到object.proxy属性，从而可以在object对象上调用。
    //var obj1 = {proxy:new Proxy(target,handler)};

    //Proxy实例也可以作为其他对象的原型对象
    var proxy2 = new Proxy({},{
        get:function(target,property){
            return 1;
        }
    });
    var obj2 = Object.create(proxy2);
    obj2.name;//1


    //一个拦截器可以设置多个操作
    var handler = {
        //get(target, propKey, receiver)
        // 拦截对象属性的读取，比如proxy.foo和proxy['foo'],最后一个参数receiver是一个对象
        get:function(target,name){
            if(name=="prototype"){
                return Object.prototype;
            }
            return 'Hello'+name;
        },

        //set(target,key,value,receiver)
        //拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
        set:function(target,key,value,receiver){
           if(key === "age" ){
               if(!Number.isInteger(value)){
                   throw new TypeError("The age need to be a interger!");
               }
               if(value>150){
                   throw new RangeError("The age is too large!");
               }
           }
            target[key]=value;
            return true;
        },

        //has(target, propKey)
        // propKey in proxy的操作，以及对象的hasOwnProperty方法，返回一个布尔值。
        //虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。
        has:function(target,key){
            console.log("called:"+key);
            return true;
        },

        //deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
        deleteProperty:function(target,key){
            if(key==="age"){
               throw new Error("不能删除属性"+key);
            }
            console.log("可以删除属性"+key);
            return true;

        },

        //apply(target, object, args)
        //拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
        apply:function(target,thisBinding,args){
            return args[0];
        },

        //construct(target, args)
        //拦截Proxy实例作为构造函数调用的操作,比如new proxy(...args)。
        construct:function(target,args){
            return {value:args[1]};
        }
    };
    var proxy3 = new Proxy(function(x,y){
        return x+y;
    },handler);

    proxy3(1,2);//1

    new proxy3(1,2);//2

    proxy3.prototype===Object.prototype;//true
    proxy3.a;//helloadele

    proxy3.age=123;//通过get读取helloage
    //proxy3.age=180; //Uncaught TypeError: The age need to be a interger!
    //proxy3.age="aa";// Uncaught TypeError: The age need to be a interger!

    'a' in proxy3;//called:a

    delete proxy3.a;//可以删除属性a
    //delete  proxy3.age;//Uncaught Error: 不能删除属性age




})