<template>
  <div>
    <!-- 头部 -->
    <myheader></myheader>
    <!-- 中间部分 -->
    <router-view></router-view>
    <!-- 尾部 -->
    <myfooter></myfooter>
    <!-- 回到顶部 -->
    <back-to-top bottom="50px" right="50px" style="border-radius: 50%;">
      <button type="button" class="btn btn-info btn-to-top">
        <i class="el-icon-arrow-up"></i>
      </button>
    </back-to-top>
  </div>
</template>

<script>
// 导入子组件
import myheader from "./components/layout/header.vue";
import myfooter from "./components/layout/footer.vue";

export default {
  //注册子组件
  components: {
    myheader,
    myfooter
  }
};
</script>

<style>
/* 导入样式文件 */
  @import "./statics/site/css/style.css";

  .btn-to-top {
    width: 60px;
    height: 60px;
    padding: 10px 16px;
    border-radius: 50%;
    font-size: 22px;
    line-height: 22px;
    color: white;
    background-color: #34ad2a;
  }
  /* 取消按钮获得焦点后的外边框 */
  button:focus{
    outline: none;
  }
</style>
