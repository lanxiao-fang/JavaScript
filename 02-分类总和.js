/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-05-11 15:04:01
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-05-16 12:43:42
 */
// 0代表第一周，1代表第二周，2代表第三周，3代表第四周
// 5本月指数
// 6上月指数
// 两个type空的就是本月指数或者上月指数之和

const data = [
  {"SCORE":"4880","STAT_TIME":"","ID":"1","TYPE":"0","NAME":"渣土车运行数"},
  {"SCORE":"83","STAT_TIME":"","ID":"3","TYPE":"0","NAME":"建筑工地数"},
  {"SCORE":"12","STAT_TIME":"","ID":"4","TYPE":"0","NAME":"建筑废弃事件数"},
  {"SCORE":"4621","STAT_TIME":"","ID":"7","TYPE":"1","NAME":"渣土车运行数"},
  {"SCORE":"7","STAT_TIME":"","ID":"10003","TYPE":"2","NAME":"预警事件"},
  {"SCORE":"25","STAT_TIME":"","ID":"10015","TYPE":"5","NAME":"建筑工地数本月指数"},
  {"SCORE":"97","STAT_TIME":"","ID":"10019","TYPE":"","NAME":"上月指数"},
  {"SCORE":"83","STAT_TIME":"","ID":"10005","TYPE":"2","NAME":"建筑工地数"},
  {"SCORE":"25","STAT_TIME":"","ID":"10023","TYPE":"6","NAME":"预警事件数上月指数"},
  {"SCORE":"24","STAT_TIME":"","ID":"10016","TYPE":"6","NAME":"建筑工地数上月指数"},
  {"SCORE":"8","STAT_TIME":"","ID":"10008","TYPE":"3","NAME":"建筑废弃事件数"},
  {"SCORE":"19","STAT_TIME":"","ID":"10011","TYPE":"4","NAME":"预警事件"},
  {"SCORE":"45","STAT_TIME":"","ID":"10012","TYPE":"4","NAME":"建筑废弃事件数"},
  {"SCORE":"6","STAT_TIME":"","ID":"2","TYPE":"0","NAME":"预警事件"},
  {"SCORE":"83","STAT_TIME":"","ID":"5","TYPE":"1","NAME":"建筑工地数"},
  {"SCORE":"16","STAT_TIME":"","ID":"6","TYPE":"1","NAME":"建筑废弃事件数"},
  {"SCORE":"3","STAT_TIME":"","ID":"8","TYPE":"1","NAME":"预警事件"},
  {"SCORE":"4965","STAT_TIME":"","ID":"10002","TYPE":"2","NAME":"渣土车运行数"},
  {"SCORE":"24","STAT_TIME":"","ID":"10017","TYPE":"5","NAME":"渣土车运行数本月指数"},
  {"SCORE":"24","STAT_TIME":"","ID":"10018","TYPE":"6","NAME":"渣土车运行数上月指数"},
  {"SCORE":"24","STAT_TIME":"","ID":"10020","TYPE":"5","NAME":"建筑废弃事件数本月指数"},
  {"SCORE":"9","STAT_TIME":"","ID":"10004","TYPE":"2","NAME":"建筑废弃事件数"},
  {"SCORE":"4723","STAT_TIME":"","ID":"10006","TYPE":"3","NAME":"渣土车运行数"},
  {"SCORE":"24","STAT_TIME":"","ID":"10021","TYPE":"6","NAME":"建筑废弃事件数上月指数"},
  {"SCORE":"3","STAT_TIME":"","ID":"10007","TYPE":"3","NAME":"预警事件"},
  {"SCORE":"23","STAT_TIME":"","ID":"10022","TYPE":"5","NAME":"预警事件数本月指数"},
  {"SCORE":"83","STAT_TIME":"","ID":"10009","TYPE":"3","NAME":"建筑工地数"},
  {"SCORE":"19189","STAT_TIME":"","ID":"10010","TYPE":"4","NAME":"渣土车运行数"},
  {"SCORE":"83","STAT_TIME":"","ID":"10013","TYPE":"4","NAME":"建筑工地数"},
  {"SCORE":"96","STAT_TIME":"","ID":"10014","TYPE":"","NAME":"本月指数"}
]

// 排序是为了让我自己总结规律而已
let sortData = data.sort(function (a, b) {
  return (a.TYPE - b.TYPE);
});
console.log(sortData);

// 第一种方法
function handleTotal1(data) {
  let typeTotal = []  // 存放最终数据结果
  let typeNameContainer = {} // 针对NAME键进行归类的容器
  let monthData = data.filter(item => item.TYPE !== '' && Number(item.TYPE) <= 4);
  monthData.forEach(item => {
    typeNameContainer[item.NAME] = typeNameContainer[item.NAME] || []
    typeNameContainer[item.NAME].push(item)
  })
  console.log('typeNameContainer', typeNameContainer);

  // 统计不同类型的数量
  const typeName = Object.keys(typeNameContainer)
  typeName.forEach(nameItem => {
    let count = 0
    typeNameContainer[nameItem].forEach(item => {
      count += Number(item.SCORE)
    })
    typeTotal.push({'NAME': nameItem, 'SCORE': count})
  })
  console.log('最终的结果',  typeTotal);
  return typeTotal
};
// handleTotal1(sortData)

// 第二种方法
console.log(Object.values(
  data.reduce((result, { TYPE, NAME, SCORE }) => {
    if (TYPE > 4 || !TYPE) return result;
    if (!result[NAME]) {
      result[NAME] = { NAME, SCORE };
    } else {
      result[NAME].SCORE = Number(result[NAME].SCORE) + Number(SCORE);
    }
    return result;
  }, {})
), '1111111111111');
