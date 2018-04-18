<template>
    <div>
        <card class="card">
            <div slot="header" class="head">
                <span>订单编号：1212121</span>
                <span>待支付</span>
            </div>
            <div slot="content" class="card_con">
                <ul>
                    <li><span>订单时间：</span>2017-10-55</li>
                    <li><span>投保人：</span>李偲</li>
                    <li><span>车牌号：</span>李偲</li>
                    <li><span>订单总额：</span>6,567元</li>
                </ul>
                <ul>
                    <li class="title">交强险</li>
                    <li><span>交强险保单号：</span>-</li>
                    <li><span>交强险保费：</span>3050元</li>
                    <li><span>车船税：</span>订单总额：6,567元</li>
                </ul>
                <ul>
                    <li class="title">商业险</li>
                    <li>订单时间：2017-10-55</li>
                    <li>投保人：李偲</li>
                    <li>订单总额：6,567元</li>
                </ul>
            </div>
        </card>
    </div>
</template>
<script>
import { Card } from 'vux'
export default {
    name: 'test',

    beforeCreate: function () {

    },
    created() {

    },
    data() {
        return {

        }
    },
    components: {
        Card
    },
    methods: {

    },
    watch: {

    },
    mounted() {

    },
    computed: {

    }
}
</script>
<style lang='scss' scoped>
@import "orderDetail"
</style>