<template>
    <div class="inputnumber">
        <div @click="reduce" :disabled="count<=1" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                count: 1,
                id: 0
            }
        },
        props: {
            initCount: Number,
            goodsId: Number
        },
        created() {
            this.count = this.initCount
            this.id = this.goodsId
        },
        methods: {
            reduce() {
                if (this.count <= 1) {
                    return;
                }
                this.count--
                this.notice()
            },
            add() {
                this.count++
                this.notice()
            },
            //通知父组件
            notice() {
                this.$emit("countChange", {
                    goodsId: this.id,
                    goodsCount: this.count
                })
            }
        },
    }
</script>
<style scoped>
    .left,
    .middle,
    .right {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-right: 1px solid rgba(90, 90, 90, .5);
        border-top: 1px solid rgba(90, 90, 90, .5);
        border-bottom: 1px solid rgba(90, 90, 90, .5);
        line-height: 30px;
        text-align: center;
        
    }
    .inputnumber div::selection {
        background-color: #fff;
    }

    .left {
        border-left: 1px solid rgba(90, 90, 90, .5);
    }

    .left,
    .right {
        cursor: pointer;
        user-select:none;
    }
    /* 禁止样式 */
    [disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
    }
</style>