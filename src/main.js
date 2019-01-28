import Vue from 'vue'
import App from './App.vue'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import VueLazyLoad from 'vue-lazyload'
import BackToTop from 'vue-backtotop'

Vue.use(BackToTop)

Vue.use(VueLazyLoad,{
    loading: require("./statics/site/images/01.gif") //没有加载出来的占位图
})

//安装ElementUI功能
// Vue.use(ElementUI);
//按需导入ElementUI
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col,
  Table,
  TableColumn
} from 'element-ui'


Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

//导入过滤器
import "./filters/index.js"

Vue.config.productionTip = false

import router from "./router/index.js" //导入路由
import store from "./store/index.js" //导入仓库

new Vue({
  store,
  router,
  render: h => h(App),
  components:{
    BackToTop
  }
}).$mount('#app')
