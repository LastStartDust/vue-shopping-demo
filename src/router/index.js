import Vue from 'vue'
import VueRouter from 'vue-router'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
Vue.use(VueRouter)

//导入组件
// import goodslist from "../components/goods/goodslist.vue"
// import shopcart from "../components/shopcart/shopcart"
// import goodsdetail from "../components/goods/goodsdetail.vue"
// import order from "../components/order/order.vue"
// import login from "../components/login/login.vue"
// import pay from "../components/pay/pay.vue"

// import paySuccess from "../components/pay/paySuccess.vue"
// import vipCenter from "../components/vipCenter/vipCenter.vue"
// import personInfo from "../components/vipCenter/personInfo.vue"
// import myOrder from "../components/vipCenter/myOrder.vue"
// import accountInfo from "../components/vipCenter/accountInfo.vue"
// import orderDetail from "../components/vipCenter/orderDetail.vue"
 import axios from "axios"

const goodslist = ()=>import(/* webpackChunkName: "goodslist" */'../components/goods/goodslist.vue')
const shopcart = ()=>import(/* webpackChunkName: "shopcart" */'../components/shopcart/shopcart')
const goodsdetail = ()=>import(/* webpackChunkName: "goodsdetail" */'../components/goods/goodsdetail.vue')
const order = ()=>import(/* webpackChunkName: "order" */'../components/order/order.vue')
const login = ()=>import(/* webpackChunkName: "login" */'../components/login/login.vue')
const pay = ()=>import(/* webpackChunkName: "pay" */'../components/pay/pay.vue')

const paySuccess = ()=>import(/* webpackChunkName: "paySuccess" */'../components/pay/paySuccess.vue')
const vipCenter = ()=>import(/* webpackChunkName: "vipCenter" */'../components/vipCenter/vipCenter.vue')
const personInfo = ()=>import(/* webpackChunkName: "personInfo" */'../components/vipCenter/personInfo.vue')
const myOrder = ()=>import(/* webpackChunkName: "myOrder" */'../components/vipCenter/myOrder.vue')
const accountInfo = ()=>import(/* webpackChunkName: "accountInfo" */'../components/vipCenter/accountInfo.vue')
const orderDetail = ()=>import(/* webpackChunkName: "orderDetail" */'../components/vipCenter/orderDetail.vue')

//设置基本地址,一定要加/
axios.defaults.baseURL = "http://47.106.215.12:8899"
axios.defaults.withCredentials=true //让ajax携带cookie
//将axios放到Vue的原型上,任何实例都可以访问到
Vue.prototype.$axios = axios

//创建路有对象,设置路由规则
const router = new VueRouter({
  routes: [
    {path: "/",redirect: "/goodslist"},
    { path: "/goodslist",component: goodslist},
    {path: "/shopcart",component: shopcart},
    {path: "/site/goodsinfo/:artID",component: goodsdetail},
    {path: "/login", component: login},
    //以下路径需要验证是否登录
    //路由元信息 needLogin:true
    // {path: "/order", component: order,meta: {needLogin: true}}

    //命名路径给params传值使用 /order?ids=89,90
    {path: "/order/:ids",name:"order", component: order,meta: {needLogin: true}},
    {path: "/pay", component: pay,meta: {needLogin: true}},
    {path: "/paySuccess", component: paySuccess,meta: {needLogin: true}},
    {path: "/vipCenter", component: vipCenter,meta: {needLogin: true},
        children:[
          {path:"personInfo",component:personInfo,meta: {needLogin: true}},
          {path:"",redirect:"personInfo"},
          {path:"myOrder",component:myOrder,meta: {needLogin: true}},
          {path:"accountInfo",component:accountInfo,meta: {needLogin: true}},
          {path:"orderDetail",component:orderDetail,meta: {needLogin: true}},
        ]
    }
  ]
})


//导航守卫(拦截所有路由的跳转)
router.beforeEach((to, from, next) => {

  // console.log(to);
  //在本地存储中存储除了login的路由外,所有路由跳转的to目标信息
  if(to.path!=='/login'){
    localStorage.setItem("toPath",to.fullPath)
  }

  //to的meta中信息,决定哪些可以直接通过,哪些需要校验
  if (to.meta.needLogin) {
    //发送请求,查询登录状态,如果没有登录,跳转到登录页面,否则允许通过过
    axios.get('site/account/islogin')
      .then((response) => {
        if (response.data.code === 'nologin') {
          //未登录,跳转到登录页面
          router.push({
            path: '/login'
          })
        } else {
          next()
        }
      })
  } else {
    next()
  }

})


//默认导出,把router对象导出去
export default router