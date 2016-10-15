/**
 * Created by yuanlan on 2016/10/10.
 */
$(function(){

    //es6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，
    //es6中有三种数据结构具备Iterator接口
    //1.数组  2.某些类似数组的对象 3.Set和Map数据结构
    let arr = [1,2,3];
    let iter = arr[Symbol.iterator]();

    console.log(iter.next());//{value: 1, done: false}
    console.log(iter.next());//{value: 2, done: false}
    console.log(iter.next());//{value: 3, done: false}
    console.log(iter.next());//{value: undefined, done: true}

    //三类数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们
    //除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。


    //为对象添加iterator接口的例子
    let obj = {
        data: [ 'hello', 'world' ],
        [Symbol.iterator]() {
            const self = this;
            let index = 0;
            return {
                next() {
                    if (index < self.data.length) {
                        return {
                            value: self.data[index++],
                            done: false
                        };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    };

    var it = obj[Symbol.iterator]();
    console.log(it.next());//{value: "hello", done: false}
    console.log(it.next());//{value: "world", done: false}
    console.log(it.next());//{value: undefined, done: true}

})