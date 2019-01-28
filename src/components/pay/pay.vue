<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderInfo.area+','+orderInfo.address}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderInfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                  <dzh-qrcode :url="url" :img_url="img_url"></dzh-qrcode>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DZHQRCode from "dzh-qrcode";

export default {
  components: { "dzh-qrcode": DZHQRCode },
  data() {
    return {
      //订单信息
      orderInfo: {},
      //二维码图片
      img_url:``,
      //二维码对应的url,手机扫码后,会带着订单号,发送到后台,请求支付方式页面,用户选择支付方式并完成支付后,支付平台会通知我们的后台订单支付结果
      url:'',
      //定时器id
      timerID:-1
    };
  },
  updated() {
     this.img_url=require("../../statics/site/images/alipay.png")
  },
  created() {
    //根据订单id获取订单信息
    this.getOrderInfo();

     this.url = `http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.query.orderid}`
     
     //定时查询支付结果
     this.taskTime()
  },
  methods: {
    //获取订单信息
    getOrderInfo() {
      this.$axios.get(`site/validate/order/getorder/${this.$route.query.orderid}`)
        .then(response => {
          if(response.data.message[0].status === 2){
             //跳转到支付成功页面
              this.$router.push('/paySuccess')
          }else{
            this.orderInfo = response.data.message[0];
          }
        })
        .catch((err) => {
            console.log(err);  
        })
    },
    //定时查询是否付款
    taskTime(){
       this.timerID = setInterval(() => {
          
          this.$axios.get(`site/validate/order/getorder/${this.$route.query.orderid}`)
            .then(respnose=>{
                console.log(respnose.data.message[0]);
                //已经付款,直接跳转到支付成功页面
                if(respnose.data.message[0].status === 2){
                  //清除定时器
                  clearInterval(this.timerID)
                  //跳转到支付成功页面
                  this.$router.push('/paySuccess')
                }
            })
            .catch((err) => {
              console.log(err);  
            })

       }, 3000);
    }
  }
};
</script>
