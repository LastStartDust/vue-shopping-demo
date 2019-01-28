//商品存储到localStorage中,有增删查改功能

//本地存储的key
const KEY = "GOODS"

//获取本地存储
const getLocalGoods = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

//统计总数量
const totalCount = () => {
    let localGoods = getLocalGoods()
    let total = 0
    for (const key in localGoods) {
        total += localGoods[key]
    }
    return total
}


//添加到本地存储
const addLocalGoods = goods => {
    //获取本地存储对象
    let localGoods = getLocalGoods()
    //判断对应的goods之前是否存储到本地中(通过goodsId判断),如果已经存储过,就将数量累加,没有存储过,进行新增
    if (localGoods[goods.goodsId]) {
        localGoods[goods.goodsId] += goods.goodsCount
    } else {
        localGoods[goods.goodsId] = goods.goodsCount
    }

    //重新存储到本地存储中
    localStorage.setItem(KEY, JSON.stringify(localGoods))
    //统计总数量,进行返回
    return totalCount()
}

//修改本地存储的数据
const updateLocalGoods = (goods) => {
    //获取本地存储对象
    let localGoods = getLocalGoods()
    localGoods[goods.goodsId] = goods.goodsCount

    //重新存储到本地存储中
    localStorage.setItem(KEY, JSON.stringify(localGoods))
    //统计总数量,进行返回
    return totalCount()
}

//移除本地存储的中指定id的商品信息
const removeLocalGoods = goodsId => {
    //获取本地存储对象
    let localGoods = getLocalGoods()

    //删除对象中goodsId=goods.goodsId的属性
    delete localGoods[goodsId]

    //重新存储到本地存储中
    localStorage.setItem(KEY, JSON.stringify(localGoods))
    //统计总数量,进行返回
    return totalCount()
}

//按需导出
export {
    addLocalGoods,
    totalCount,
    getLocalGoods,
    updateLocalGoods,
    removeLocalGoods
}