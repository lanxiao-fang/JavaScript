/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-07-30 10:18:28
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-07-30 10:21:00
 */
import {createRouter, createWebHashHistory} from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("/@/views/home.vue")
    }
  ]
})
export default router