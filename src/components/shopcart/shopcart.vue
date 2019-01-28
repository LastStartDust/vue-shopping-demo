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
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
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
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-for="(item,i) in goodsList" :key="item.id">
                  <td width="48" align="center">
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#13ce66"
                      inactive-color="#ccc"
                    ></el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <div class="shopInfo">
                      <img :src="item.img_url">
                      <span>{{item.title}}</span>
                    </div>
                  </td>
                  <td width="84" align="left">{{item.sell_price}}</td>
                  <td width="104" align="center">
                    <!-- <el-input-number @change="updateCount(item.id,item.buycount)" size="mini" v-model="item.buycount" :min="0"></el-input-number> -->
                    <inputnumber
                      @countChange="getCountChange"
                      :initCount="item.buycount"
                      :goodsId="item.id"
                    ></inputnumber>
                  </td>
                  <td width="104" align="left">{{item.sell_price*item.buycount}}</td>
                  <td width="54" align="center">
                    <a @click="deleteGoods(item.id,i)" href="javascript:void(0)">删除</a>
                  </td>
                </tr>
                <tr v-if="goodsList.length===0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" @click="$router.push({ path: 'goodsList' })">继续购物</button>
              <button class="submit" @click="goToOrder">提交订单</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
    <!-- 加载数据时的loading动画 -->
    <div
      v-loading.fullscreen="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%;height:100%;"
    ></div>
  </div>
</template>
<script>
import {
  getLocalGoods,
  updateLocalGoods,
  removeLocalGoods
} from "../../common/localStorage.js";
import inputnumber from "../subcomponents/inputnumber.vue";
export default {
  components: {
    inputnumber
  },
  data() {
    return {
      goodsList: [],
      loading: false
    };
  },
  created() {
    this.getGoodsList()
  },
  computed: {
    //已选商品个数
    selectCount() {
      let count = 0;
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          count += item.buycount;
        }
      });
      return count;
    },
    //已选商品总价格
    getTotalPrice() {
      let totalPrice = 0;
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          totalPrice += item.sell_price * item.buycount;
        }
      });
      return totalPrice;
    }
  },
  methods: {
    getGoodsList(){
       //开启加载动画
      this.loading = true;

      let localGoods = getLocalGoods();
      //获取本地存储中所有商品的id
      //Object.keys 获取对象的所有key的集合
      let ids = Object.keys(localGoods);
      // console.log();
      let url = `site/comment/getshopcargoods/${ids.join(",")}`;

      this.$axios.get(url)
        .then(response => {
          //修改商品的购买数量和默认选中
          response.data.message.forEach(item => {
            item.buycount = localGoods[item.id];
            item.isSelected = true;
          });

          this.goodsList = response.data.message;

          //关闭加载动画
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          //关闭加载动画
          this.loading = false;
        });
    },
    //更新数量到本地存储中
    // updateCount(goodsId,goodsCount){
    //     //载荷
    //     let payload = {
    //         goodsId,
    //         goodsCount
    //     }
    //      //修改仓库的值
    //     this.$store.commit("updateGoods",payload)

    //     this.goodsList.forEach(item=>{
    //         if(item.id==goodsId){
    //             item.buycount=goodsCount
    //         }
    //     })

    // },
    //删除商品
    deleteGoods(goodsId, index) {
      this.$confirm("您确定要删除商品吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });

          //删除本地存储中的数据
          this.$store.commit("removeGoods", goodsId);
          //
          this.goodsList.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //监听子组件触发的事件,修改数量
    getCountChange(goods) {
      //遍历数组,修改为最新梳理
      this.goodsList.forEach(item => {
        if (item.id == goods.goodsId) {
          item.buycount = goods.goodsCount;
        }
      });

      //修改本地存储
      this.$store.commit("updateGoods", goods);
    },
    //去到提交订单页面
    goToOrder() {
      let ids = [];
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          ids.push(item.id);
        }
      });

      //判断订单是否为空
      if (ids.length === 0) {
        this.$message({
          showClose: true,
          message: "没有选择商品,无法下单",
          type: "warning"
        });
        return;
      }

      //编程式的导航,去到订单页面
      // query方式 /order?ids=89,90
      // this.$router.push({ path: '/order', query: { ids: ids.join(',')}})

      //param传值,使用name属性进行匹配路由,
        //动态路径参数为/order/:ids 变为=> /order/89,90
        //动态路径参数为/order/ids:ids 变为=> /order/ids=89,90
       this.$router.push({ name: 'order', params: {ids:ids.join(',')} })

      //参数写在path中 /order?ids=89,90
      // this.$router.push({path:`/order?ids=${ids.join(',')}`})

    }
  }
};
</script>

<style scoped>
  .shopInfo {
    display: flex;
    align-items: center;
  }
  .shopInfo img {
    width: 78px;
  }
</style>
<style>
  /* 修改elementui的加载图标大小 */
  .el-loading-mask.is-fullscreen .el-icon-loading {
    font-size: 50px;
  }
</style>

