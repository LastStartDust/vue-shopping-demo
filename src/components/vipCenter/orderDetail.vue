<template>
  <div class="bg-wrap" style="min-height: 765px;">
    <div class="sub-tit">
      <a href="javascript:void(0)" class="add">
        <i @click="$router.go(-1)" class="iconfont icon-reply"></i>返回
      </a>
      <ul>
        <li class="selected">
          <a href="javascript:;">查看订单</a>
        </li>
      </ul>
    </div>
    <div class="order-progress">
      <ul>
        <li class="first" :class='{active:orderInfo.status==0}'>
          <div class="progress">下单</div>
          <div class="info">{{orderInfo.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div>
        </li>
        <li :class='{active:orderInfo.status==1}'>
          <div class="progress" >已付款</div>
          <div class="info">{{orderInfo.payment_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div>
        </li>
        <li class>
          <div class="progress">已经发货</div>
          <div class="info">{{orderInfo.confirm_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div>
        </li>
        <li class="last">
          <div class="progress">已完成</div>
          <div class="info">{{orderInfo.complete_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div>
        </li>
      </ul>
    </div>
    <div class="form-box accept-box form-box1">
      <dl class="head form-group">
        <dd>
          订单号：{{orderInfo.order_no}}
          <router-link v-if="orderInfo.status===1" :to="'/pay?orderid='+orderInfo.id" class="btn-pay">去付款</router-link>
          <!---->
        </dd>
      </dl>
      <dl class="form-group">
        <dt>订单状态：</dt>
        <dd>待付款</dd>
      </dl>
      <dl class="form-group">
        <dt>快递方式：</dt>
        <dd>{{orderInfo.expressTitle}}</dd>
      </dl>
      <dl class="form-group">
        <dt>支付方式：</dt>
        <dd>支付宝</dd>
      </dl>
    </div>
    <div class="table-wrap">
      <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
        <tbody>
          <tr>
            <th align="left">商品信息</th>
            <th width="60%">名称</th>
            <th width="10%">单价</th>
            <th width="10%">数量</th>
            <th width="10%">金额</th>
          </tr>
          <tr v-for="item in goodsList" :key="item.id"> 
            <td width="60">
              <img
                style="width:50px;height:50px"
                :src="item.imgurl"
                class="img"
              >
            </td>
            <td align="left">
              <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
            </td>
            <td align="center">
              <s>￥{{item.goods_price}}</s>
              <p>￥{{item.real_price}}</p>
            </td>
            <td align="center">{{item.quantity}}</td>
            <td align="center">￥{{item.real_price*item.quantity}}</td>
          </tr>
          <tr>
            <td colspan="7" align="right">
              <p>
                商品金额：
                <b class="red">￥{{totalPrice}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                <b class="red">￥{{orderInfo.express_fee}}</b>
              </p>
              <p style="font-size: 22px;">
                应付总金额：
                <b class="red">￥{{totalPrice+orderInfo.express_fee}}</b>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form-box accept-box">
      <dl class="head form-group">
        <dd>收货信息</dd>
      </dl>
      <dl class="form-group">
        <dt>顾客姓名：</dt>
        <dd>{{orderInfo.accept_name}}</dd>
      </dl>
      <dl class="form-group">
        <dt>送货地址：</dt>
        <dd>{{orderInfo.area+orderInfo.address}}</dd>
      </dl>
      <dl class="form-group">
        <dt>联系电话：</dt>
        <dd>{{orderInfo.mobile}}</dd>
      </dl>
      <dl class="form-group">
        <dt>电子邮箱：</dt>
        <dd>{{orderInfo.email}}</dd>
      </dl>
      <dl class="form-group">
        <dt>备注留言：</dt>
        <dd>{{orderInfo.message}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            goodsList:[],
            orderInfo:{},
            totalPrice:0,
        }
    },
    created() {
        this.getOrderData()
    },
    methods: {
        getOrderData(){
            this.$axios.get(`site/validate/order/getorderdetial/${this.$route.query.orderid}`)
                .then((response) => {
                    response.data.message.goodslist.forEach(item => {
                        this.totalPrice+=item.real_price*item.quantity
                    });

                    this.goodsList = response.data.message.goodslist
                    this.orderInfo = response.data.message.orderinfo
                    
                })
                .catch((err) => {
                    console.log(err);    
                })
        }
    },
}
</script>
