import Vue from "vue";
import monent from "moment";

//定义全局过滤器
//参数1 源数据
//参数2 需要处理后为什么格式的
Vue.filter("dateFmt",(input,formatStr='YYYY-MM-DD')=>{
    return monent(input).format(formatStr)
})