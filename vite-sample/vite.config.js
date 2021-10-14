/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-07-30 10:05:30
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-07-30 10:15:15
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "/@": path.resolve(__dirname, "src"),
      comps: path.resolve(__dirname, "src/components"),
    }
  },
  plugins: [vue()]
})
