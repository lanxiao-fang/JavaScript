/*
 * @Description: reduce学习
 * @Author: xiaofang lan
 * @Date: 2021-06-07 16:36:24
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-07 18:14:52
 */
/*
reduce接收了2个参数
  1-回调函数：callback
    其回调函数又可以接收4个参数
      1-acc：累计器， 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue。
      2-cur：当前值， 数组中正在处理的元素。
      3-idx：当前索引，数组中正在处理的当前元素的索引。 
             如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。
      4-src：源数组， 调用reduce()的数组
  2-初始值：initialValue（可选的）
    作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，
    则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
*/

const arr = [1,2,3,4,5,0]
const sum = arr.reduce(((sum, cur,idx,src) => {
  console.log(sum, cur,idx,src);
  return sum += cur
}), 0)
console.log('总和', sum);// 15


// 按属性对object分类
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');
console.log(groupedPeople);