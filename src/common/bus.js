//公共vue实例,用于非父子组件通信
import Vue from "vue"

//创建空的vue实例
const bus = new Vue()

//导出
export {bus}