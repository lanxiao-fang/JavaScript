/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-04-18 00:22:51
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-04-18 00:55:34
 */
const nums = [2,11,15,7]
const target = 9
function sumTotal (nums,target) {
  let map = new Map()
  for(let i = 0; i < nums.length; i++ ) {
    const complement = target - nums[i]
    // map.has原理，读取的是什么？
    if (map.has(complement)) {
      console.log('有complement')
      return [map.get(complement), i]
    } else {
      // 以value做属性,以index做属性值
      map.set(nums[i], i)
    }
  }
  return []
}

console.log(sumTotal(nums,target));
