<template>
      <div>
    <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="orderForm" status-icon :rules="rules" ref="orderForm" label-width="150px" class="demo-ruleForm">
                                    <el-form-item  label="收货人姓名" prop="accept_name">
                                        <el-input style="width:500px;" v-model="orderForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="所属地区" prop="area">
                                        <v-distpicker  
                                            @selected="selected"
                                            :province="orderForm.area.province.value" 
                                            :city="orderForm.area.city.value" 
                                            :area="orderForm.area.area.value">
                                        </v-distpicker>
                                    </el-form-item>
                                    <el-form-item  label="详细地址" prop="address">
                                        <el-input style="width:500px" v-model="orderForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="手机号码" prop="mobile">
                                        <el-input style="width:500px" v-model="orderForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="电子邮箱" prop="email">
                                        <el-input style="width:500px" v-model="orderForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="邮政编码">
                                        <el-input style="width:500px" v-model="orderForm.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付<em>手续费：0.00元</em></el-radio>
                                    </label>
                                </li>
                                
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio-group v-model="orderForm.express_id" @change="getExpress">
                                            <el-radio label="1">顺丰快递<em>费用：20.00元</em></el-radio>
                                            <el-radio label="2">圆通<em>费用：10.00元</em></el-radio>
                                            <el-radio label="3">韵达<em>费用：8.00元</em></el-radio>
                                        </el-radio-group>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                {{item.buycount*item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="orderForm.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link class="btn button" to="/shopcart">返回购物车</router-link>
                                        <a @click="postForm" id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>

//导入省市地区模块
import VDistpicker from 'v-distpicker'

import {getLocalGoods} from "../../common/localStorage.js"

export default {
    components: { VDistpicker },
    data() {

        //验证手机号的函数
        //rule 规则对象本身
        //value 需要验证的值,就是输入框中的值
        // callback 回调函数
            // callback() 验证成功
            // callback(new Error('验证失败的提示信息')) 验证失败并返回提示
        const checkMobile = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('手机号不能为空'));
            }

            //定义一个验证手机号的正则
            let reg = /^1[3-9][0-9]{9}$/
            //验证
            if(reg.test(value)){
                //验证通过
                callback()
            }else{
                //验证失败
                return callback(new Error('手机号不合法'));
            }
        };
        //验证邮箱地址
        const checkEmail = (rule,value,callback)=>{
        
            if (!value) {
                return callback(new Error('邮箱地址不能为空'));
            }

            //定义一个验证邮箱地址的正则
            let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
            //验证
            if(reg.test(value)){
                //验证通过
                callback()
            }else{
                //验证失败
                return callback(new Error('邮箱地址不合法'));
            }
        };

        return {
            //商品信息
            goodsList:[],
            totalCount:0,
            totalPrice:0,
            orderForm:{
                accept_name:'草海', //收货人姓名
                address:'深圳', //地址
                mobile:'13518548663', //手机号
                email:'a1106225027@qq.com', //邮箱
                post_code:'518000', //邮编
                area:{ //地区
                    province:{"code":440000,value:"广东省"},
                    city:{"code":440300,value:"深圳市"},
                    area:{"code":440306,value:"宝安区"}
                },
                payment_id:"6",//支付方式 6--在线支付
                express_id:"1",//配送方式 1-顺丰 2-圆通 3-韵达
                message:'备注信息',//备注信息
                expressMoment:20, //运费
                goodsAmount:0, //总金额
                goodsids:'',//提交订单的商品id
                cargoodsobj:{} //商品id和数量
            },
            rules:{
                accept_name: [//收货人姓名规则
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                address: [//地址
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                mobile: [//手机号
                    { required: true, trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                email: [//验证邮箱地址
                    {validator: checkEmail, trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        //请求商品信息
        this.getGoodsList()

        this.getIds()
        
    },
    methods: {

      //获取ids
      getIds(){
          this.orderForm.goodsids = this.$route.params.ids
      },
      //提交订单
      postForm() {
        this.$refs.orderForm.validate((valid) => {
           if(valid){
                console.log(this.orderForm);
                console.log("--------------");
               this.$axios.post('site/validate/order/setorder',this.orderForm)
                .then(response=>{
                    if(response.data.status===0){
                        //跳转到支付页面
                        this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}})

                        this.goodsList.forEach(item=>{
                            //清除本地存储中的商品信息
                            this.$store.commit('removeGoods',item.id)
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);    
                })
              
           }else{
                this.$message({
                    message: '订单中信息有误',
                    type: 'warning'
                });
           }
        });
      },

        //更新运费
        getExpress(value){
            console.log(value);
            switch (value) {
                case "1":
                    this.orderForm.expressMoment = 20;
                    break;
                case "2":
                    this.orderForm.expressMoment = 10;
                    break;
                case "3":
                    this.orderForm.expressMoment = 8;
                    break;
                default:
                    break;
            }
        },

        //获取商品
        getGoodsList(){
            let localGoods = getLocalGoods()
            this.$axios.get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
                .then((response) => {
                    response.data.message.forEach(item => {
                        //修改数量
                        item.buycount=localGoods[item.id]

                        //总数量和总价格
                        this.totalCount+=item.buycount
                        this.totalPrice+=item.buycount*item.sell_price

                        //cargoodsobj设置商品id和数量对应关系
                        this.orderForm.cargoodsobj[item.id] = item.buycount
                    });

                    this.goodsList = response.data.message
                })
        },
        
        //省市区最后一项选择时,进行数据更新
        selected(value){
            this.orderForm.area = value
        }
    },
    computed: {
        //计算总金额
        getTotalAmount(){
            this.orderForm.goodsAmount = this.totalPrice+this.orderForm.expressMoment
            return this.totalPrice+this.orderForm.expressMoment
        }
    },
}
</script>
