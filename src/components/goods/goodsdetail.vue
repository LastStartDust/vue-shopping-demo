<template>
  <div>
    <!-- 加入购物车的图片 -->
    <div v-if="goods.goodsinfo" id="toCartImg" class="toCartImg">
      <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <img v-show="isShow" :src="goods.imglist[0].original_path" alt>
      </transition>
    </div>

    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div v-if="goods.goodsinfo" class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <!-- 放大镜的代码写在这里 -->
              <div class="pic-box">
                <div  class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <!--当前图片显示容器-->
                    <div  class="images-cover"></div>
                    <!--跟随鼠标移动的盒子-->
                    <div class="move-view"></div>
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="item in goods.imglist" :key="item.id">
                          <div class="small-img">
                            <img :src="item.original_path">
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>
              </div>

              <div class="goods-spec">
                <h1>{{goods.goodsinfo.title}}</h1>
                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          size="small"
                          v-model="goodsCount"
                          :min="1"
                          :max="goods.goodsinfo.stock_quantity"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button @click="changeShow" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <Affix>
                <div
                  id="tabHead"
                  class="tab-head"
                  style="position: static; top: 517px; width: 925px;"
                >
                  <ul>
                    <li @click="showIntroduction=true">
                      <a href="javascript:;" :class="{selected:showIntroduction}">商品介绍</a>
                    </li>
                    <li @click="showIntroduction=false">
                      <a href="javascript:;" :class="{selected:!showIntroduction}">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <!-- 商品介绍 -->
              <div
                v-show="showIntroduction"
                class="tab-content entry"
                style="display: block;"
                v-html="goods.goodsinfo.content"
              ></div>
              <!-- 商品评论 -->
              <div v-show="!showIntroduction" class="tab-content" style="display: block;">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="commentcontent"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="postComment"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      v-if="commentList&&commentList.length===0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentList" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | dateFmt("YYYYMMDD HH:mm:ss")}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div id="pagination" class="digg">
                      <!-- 分页器 -->
                      <div class="block">
                        <span class="demonstration">完整功能</span>
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="pageIndex"
                          :page-sizes="[5,10, 20, 50, 100]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="totalCount"
                        ></el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="hotgoods in goods.hotgoodslist" :key="hotgoods.id">
                    <div class="img-box">
                      <router-link :to="'/site/goodsinfo/'+hotgoods.id" class>
                        <img v-lazy="hotgoods.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/site/goodsinfo/'+hotgoods.id" class>{{hotgoods.title}}</router-link>
                      <span>{{hotgoods.add_time | dateFmt('YYYYMMDD HH:mm')}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js";
//按需引入iview的Affix图钉组件
import { Affix } from "iview";
import Velocity from "velocity-animate";

export default {
  data() {
    return {
      goods: {},
      goodsCount: 1,
      showIntroduction: true, //显示商品介绍
      commentList: [], //所有评论
      totalCount: 0, //总评论数
      pageIndex: 1, //页码
      pageSize: 5, //页容量
      commentcontent: "", //评论内容,
      isShow: false,
      startOffset:null, //购物车开始时位置
      endOffset:null //购物车结束时的位置
    };
  },
  components: {
    Affix
  },
  watch: {
    $route: function() {
      this.getGoods();
    }
  },
  created() {
    this.getGoods();
    this.getCommentList();
  },
  updated() {
    this.initMagnifier();
  },
  methods: {
    getGoods() {
      this.goods = {};

      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.artID}`)
        .then(response => {
          this.goods = response.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initMagnifier() {
      $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
    },
    getCommentList() {
      this.$axios
        .get(`site/comment/getbypage/goods/${this.$route.params.artID}`, {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        .then(response => {
          this.totalCount = response.data.totalcount;
          this.commentList = response.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改页码
    handleCurrentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      this.getCommentList();
    },
    //修改页容量
    handleSizeChange(newPageSize) {
      this.pageIndex = 1;
      this.pageSize = newPageSize;
      this.getCommentList();
    },
    //提交评论
    postComment() {
      if (this.commentcontent.length === 0) {
        //提醒用户输入不能为空
        this.$message({
          message: "评论内容不能为空!",
          type: "warning"
        });
        return false;
      }

      this.$axios
        .post(`site/validate/comment/post/goods/${this.$route.params.artID}`, {
          commenttxt: this.commentcontent
        })
        .then(response => {
          //清空文本框
          this.commentcontent = "";
          //提示
          this.$message({
            message: "提交评论成功",
            type: "success"
          });
          //重新加载第一页
          this.pageIndex = 1;
          this.getCommentList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //动画
    //进入阶段
    beforeEnter(el) {
      //设置进入的开始状态
      $(el).css({
        left:this.startOffset.left+'px',
        top:this.startOffset.top+'px'
      })
    },
    enter(el, done) {
      //参数1 需要动画的元素
      //参数2 动画属性
      //参数3 动画时长和调用回调函数done
      //移动图片
      Velocity(el,{left:this.endOffset.left+'px',top:this.endOffset.top+'px',scale:0.5},{duration:1000,comlete:done});
      let that = this;
      setTimeout(function(){
            //隐藏图片
            that.isShow=false;
      },900)
    },
    afterEnter(el) {

    },
    //加入购物车
    changeShow(e) {
      //获取加入购物车坐标的开始位置
      this.startOffset = $(e.target).offset()

      //获取结束时购物车偏移位置
      this.endOffset = $("#shoppingCartCount").offset()
      
      this.isShow = true;

      //载荷
      let payload = {
        goodsId:this.$route.params.artID,
        goodsCount:this.goodsCount
      }

      //修改仓库的值
      this.$store.commit("addGoods",payload)
    }
  }
};
</script>

<style scoped>
@import "../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css";

.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.toCartImg {
  width: 50px;
  height: 50px;
}
.toCartImg img {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 999;
}
</style>
