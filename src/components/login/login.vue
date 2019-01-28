<template>
      <div>
      <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input v-model="user_name" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input v-model="password" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click="login" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
//导入公共vue实例bus,用于非父子组件通信
import {bus} from "../../common/bus.js"

export default {
    data() {
        return {
            user_name:'',
            password:''
        }
    },
    methods: {
        login(){
            this.$axios.post('site/account/login',{
                user_name:this.user_name,
                password:this.password
            }).then((response) => {
                //  console.log(reponse);
                 //登录成功,跳转到登录前的目标地址
                 if(response.data.status===0){
                    //  console.log("1111",localStorage.getItem('toPath'));
                     this.$router.push({path:localStorage.getItem('toPath')})
                     //发送消息:通过触发公共实例的自定义事件logined,通知其它组件
                     bus.$emit("logined")
                 }
            })
        }
    },
}
</script>
