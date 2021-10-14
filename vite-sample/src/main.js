/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-07-30 10:05:30
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-07-30 10:21:48
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from "/@/router/index.js"

createApp(App)
.use(router)
.mount('#app')
