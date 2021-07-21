/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-05-13 21:00:58
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-05-13 22:28:49
 */

// 1、商品正常
const normalCommodity = [31, 32, 33]
// 2、商品全部下架
const allSaleCommodity = [11, 12, 13]
// 3、商品部分下架
const partSaleCommodity = [21,22,23]
// 4、赠品正常
const normalGiveaway = [13, 23, 33]
// 5、赠品全部下架
const allSaleGiveaway = [11, 21, 31]
// 6、赠品部分下架
const partSaleGiveaway = [12,22,32]

function checkStatus(status) {
  if(normalCommodity.includes(status) && normalGiveaway.includes(status)) {
    console.log('商品和赠品都正常，可以直接下单');
  } else if(allSaleCommodity.includes(status)) {
    console.log('商品全部下架，提示关闭');
  } else if(normalCommodity.includes(status)) {
    if (allSaleGiveaway.includes(status) && partSaleGiveaway.includes(status)) {
      console.log('商品正常但是赠品异常，是否重新下单');
    }
  } else if (partSaleCommodity.includes(status)) {
    console.log('商品部分下架，提示商品');
  } else {
    console.log('非法状态');
  }
}
// checkStatus(33)
// checkStatus(12)
// checkStatus(22)

// 商品正常   3开头
// 商品部分下架  2开头
// 商品全部下架  1开头


// 赠品全部下架   1结尾
// 赠品部分下架    2结尾
// 赠品正常       3结尾
const statusAction = () => {
  const Fn1 = () => {
    console.log('商品正常、赠品正常，可以下单');
  }
  const Fn2 = () => {
    console.log('商品正常，查看赠品，如果赠品异常，提示是否重新下单');
  }
  const Fn3 = () => {
    console.log('商品部分下架，提示商品');
  }
  const Fn4 = () => {
    console.log('商品全部下架，提示关闭');
  }
}