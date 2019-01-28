import Vue from 'vue'
import Vuex from 'vuex'
import {
    addLocalGoods,
    totalCount,
    updateLocalGoods,
    removeLocalGoods
} from "../common/localStorage"

//安装Vuex
Vue.use(Vuex)

//创建仓库对象
const store = new Vuex.Store({
    //要操作的数据
    state: {
        buycount: totalCount()
    },
    //获取状态/数据
    getters: {
        getGoodsCount: state => {
            return state.buycount
        },
    },
    //修改状态/数据的方法
    mutations: {
        addGoods(state, goods) {
            //goods数据到本地存储localStorage中,并统计总数量,赋值给buycount
            state.buycount = addLocalGoods(goods)
        },
        //更新商品
        updateGoods(state, goodsId) {
            state.buycount = updateLocalGoods(goodsId)
        },
        //删除商品
        removeGoods(state, goods) {
            state.buycount = removeLocalGoods(goods)
        }
    },


})


//导出
export default store