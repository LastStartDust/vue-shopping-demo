<template>
  <div class="header">
    <!-- 1.0 导航栏头部 -->
    <div class="head-top">
      <div class="section">
        <div class="left-box">
          <span>黑马买买买</span>
          <a target="_blank" href="#"></a>
          <a target="_blank" href="#"></a>
        </div>

        <div id="menu" class="right-box">
          <span v-if="!isLogin">
            <router-link to="/login">登录</router-link>
            <strong>|</strong>
            <a href class>注册</a>
            <strong>|</strong>
          </span>
          <span  v-if="isLogin">
            <router-link to="/vipCenter" class>会员中心</router-link>
            <strong>|</strong>
            <a @click="logout">退出</a>
            <strong>|</strong>
          </span>
          <router-link to="/shopcart" class>
            <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车(
            <span>
              <!-- 获取仓库的数据 -->
              <span>{{$store.getters.getGoodsCount}}</span>
            </span>)
          </router-link>
        </div>
      </div>
    </div>

    <!-- 2.0 导航条 -->
    <div class="head-nav">
      <div class="section">
        <div id="menu2" class="nav-box menuhd">
          <ul>
            <li class="index">
              <a href="#" class>
                <span class="out" style="top: 0px;">首页</span>
              </a>
            </li>
            <li class="news">
              <a href="#" class>
                <span class="out" style="top: 0px;">每日精选</span>
              </a>
            </li>
            <li class="photo">
              <a href="#" class>
                <span class="out" style="top: 0px;">秒杀专区</span>
              </a>
            </li>
            <li class="video">
              <a href="#" class>
                <span class="out" style="top: 0px;">黑马超市</span>
              </a>
            </li>
            <li class="down">
              <a href="#" class>
                <span class="out" style="top: 0px;">会员权益</span>
              </a>
            </li>
            <li class="goods">
              <router-link to="/goodslist" class="router-link-exact-active">
                <span class="out" style="top: 0px;">购物商城</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="search-box">
          <div class="input-box">
            <input
              id="keywords"
              name="keywords"
              type="text"
              onkeydown="if(event.keyCode==13){};"
              placeholder="输入关健字"
              x-webkit-speech
            >
          </div>
          <a href="javascript:;">
            <i class="iconfont icon-search"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//导入公共vue实例bus,用于非父子组件通信
import {bus} from "../../common/bus.js"

export default {
  data(){
    return {
      isLogin:false
    }
  },

  //挂载完成,第一次渲染html完成
  mounted() {
    this.initNavPlugin()
    // console.log("getters",this.$store.getters.getGoodsCount);
  },
  created() {
    
    //接收消息:监听公共实例bus的自定义事件logined,并在回调函数中进行处理
    bus.$on('logined',()=>{
       this.isLogin = true
    })

    //刷新网页,重新发送请求查询登录状态
    this.checkkLogin()
  },
  methods: {
    //初始化导航栏
    initNavPlugin() {
      // console.log("----mounted-----");
      // 初始化插件Query鼠标悬停上下翻滚动画导航菜单
      $(document).ready(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
          $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
        });

        $("#menu2 li a").hover(
          function() {
            $(".out", this)
              .stop()
              .animate({ top: "48px" }, 300); // move down - hide
            $(".over", this)
              .stop()
              .animate({ top: "0px" }, 300); // move down - show
          },
          function() {
            $(".out", this)
              .stop()
              .animate({ top: "0px" }, 300); // move up - show
            $(".over", this)
              .stop()
              .animate({ top: "-48px" }, 300); // move up - hide
          }
        );
      });
    },
    //登出
    logout(){
      //发送登出请求
      this.$axios.get('site/account/logout')
        .then(response=>{
          if(response.data.status===0){
            //将isLogin置为false
            this.isLogin = false
            //跳转到登录页面
            this.$router.push('/login')
          }
          
        })
    },
    //检测是否登录
    checkkLogin(){
      this.$axios.get('site/account/islogin')
      .then((response) => {
        if (response.data.code === 'logined') {
          this.isLogin = true
        }
      })
    }
  }
};
</script>

<style scoped>
/* scoped样式只在当前实例中有用 */
@import "../../statics/site/jquery_plugins/hoverNav/css/style.css";

</style>