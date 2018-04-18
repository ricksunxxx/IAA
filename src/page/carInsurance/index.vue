<template>
    <div>
        <div class="tab">
            <ul>
                <li><span class="active">全部</span></li>
                <li><span>待支付</span></li>
                <li><span>待处理</span></li>
                <li><span>待续保</span></li>
            </ul>
        </div>
        <div class="content">
            <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
                <div class="box2">
                    <div class="month first">
                        <div class="tit">
                            <span>2017-10</span>
                            <span>成交2单</span>
                        </div>
                        <card class="card">
                            <div slot="header" class="head">
                                <span>订单编号：1212121</span>
                                <span>待支付</span>
                            </div>
                            <div slot="content" class="card_con">
                                <ul>
                                    <li>订单时间：2017-10-55</li>
                                    <li>投保人：李偲</li>
                                    <li>订单总额：6,567元</li>
                                </ul>
                            </div>
                        </card>
                        <card class="card">
                            <div slot="header" class="head">
                                <span>订单编号：1212121</span>
                                <span>待支付</span>
                            </div>
                            <div slot="content" class="card_con">
                                <ul>
                                    <li>订单时间：2017-10-55</li>
                                    <li>投保人：李偲</li>
                                    <li>订单总额：6,567元</li>
                                </ul>
                            </div>
                        </card>
                        <card class="card">
                            <div slot="header" class="head">
                                <span>订单编号：1212121</span>
                                <span>待支付</span>
                            </div>
                            <div slot="content" class="card_con">
                                <ul>
                                    <li>订单时间：2017-10-55</li>
                                    <li>投保人：李偲</li>
                                    <li>订单总额：6,567元</li>
                                </ul>
                            </div>
                        </card>
                    </div>
                    <div class="month">
                        <div class="tit">
                            <span>2017-10</span>
                            <span>成交2单</span>
                        </div>
                        <card class="card">
                            <div slot="header" class="head">
                                <span>订单编号：1212121</span>
                                <span>待支付</span>
                            </div>
                            <div slot="content" class="card_con">
                                <ul>
                                    <li>订单时间：2017-10-55</li>
                                    <li>投保人：李偲</li>
                                    <li>订单总额：6,567元</li>
                                </ul>
                            </div>
                        </card>
                        <card class="card">
                            <div slot="header" class="head">
                                <span>订单编号：1212121</span>
                                <span>待支付</span>
                            </div>
                            <div slot="content" class="card_con">
                                <ul>
                                    <li>订单时间：2017-10-55</li>
                                    <li>投保人：李偲</li>
                                    <li>订单总额：6,567元</li>
                                </ul>
                            </div>
                        </card>
                        <card class="card">
                            <div slot="header" class="head">
                                <span>订单编号：1212121</span>
                                <span>待支付</span>
                            </div>
                            <div slot="content" class="card_con">
                                <ul>
                                    <li>订单时间：2017-10-55</li>
                                    <li>投保人：李偲</li>
                                    <li>订单总额：6,567元</li>
                                </ul>
                            </div>
                        </card>
                    </div>
                    <load-more tip="loading"></load-more>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
import { Scroller, LoadMore, Card } from 'vux'
export default {
    name: 'test',
    beforeCreate: function () {

    },
    created() {

    },
    data() {
        return {
            bottomCount: 100
        }
    },
    components: {
        Scroller,
        LoadMore,
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
@import "carInsurance"
</style>