<template>
  <div>
    <div class="sub-tit">
      <ul>
        <li class="selected">
          <a href="/user/order-list.html">交易订单</a>
        </li>
      </ul>
    </div>
    <div class="table-wrap">
         <!--  @selection-change="selection"写在el-table中 多选的选项变化时触发 -->
      <el-table :data="orders" style="width: 100%" stripe>
        <!-- 多选框
        <el-table-column
            type="selection"
            width="55"
            >
        </el-table-column> -->
        <el-table-column prop="order_no" label="订单号" width="180"></el-table-column>
        <el-table-column prop="accept_name" label="收货人"></el-table-column>
        <el-table-column prop="order_amount" label="订单金额"></el-table-column>
        <el-table-column prop="add_time" label="下单时间" :formatter="formatter" width="180"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="$router.push(`/vipCenter/orderDetail?orderid=${scope.row.id}`)" type="text" size="small">查看订单</el-button>
            <el-button v-if="scope.row.status==1" type="text" size="small">去支付</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
    data() {
        return {
            orders: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount:0
        };
    },
    created() {
        this.getOrders();
    },
    methods: {
        //获取订单数据
        getOrders() {
        this.$axios
            .get(
            `site/validate/order/userorderlist?pageIndex=${
                this.pageIndex
            }&pageSize=${this.pageSize}`
            )
            .then(response => {
                this.orders = response.data.message;
                this.totalCount = response.data.totalcount
            })
            .catch(err => {
                console.log(err);
            });
        },
        //格式化时间
        //row 这一行数据
        formatter(row, column) {
        return moment(row.add_time).format("YYYY-MM-DD HH:mm:ss");
        },

        //修改页容量
        handleSizeChange(val) {
            this.pageIndex = 1;
            this.pageSize = val;
            this.getOrders();
        },

        //当前页改变
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getOrders();
        },
        //多选
        // selection(val){
        //     console.log(val);//返回被选中项的数组
        // }
    }
};
</script>
<style>
    .el-pagination {
        margin-top: 5px;
    }
</style>
