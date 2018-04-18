<template>
    <div class="my">
        <div class="account-container">
            <div class="my-portrait" @click="showPersonalInfo">
                <span class="portrait">
                    <img src="../../assets/my_pic.png" alt="我的头像">
                </span>
                <span class="phone">{{loginPhone}}</span>
            </div>
            <div class="my-account">
                <span @click="withdrawal" class="withdrawal">提现</span>
                <div class="balance">
                    <p class="balance-name">账户余额</p>
                    <p class="balance-money">{{accountObj.accountBalance||'--'}}<span>元</span></p>
                </div>
            </div>
        </div>
        <div class="fee">
            <div class="fee-block">
                <p class="fee-name">本月保费总额</p>
                <p class="fee-money">{{accountObj.curMonthPremium||'--'}}</p>
            </div>
            <div class="fee-block">
                <p class="fee-name">本月佣金</p>
                <p class="fee-money">{{accountObj.curMonthFee||'--'}}</p>
            </div>
        </div>
        <div class="my-order">
            <h2>我的订单</h2>
            <div class="my-order-container">
                <ul>
                    <li class="item" @click="goToCarInsurance">
                        <p class="item-menu">车险</p>
                    </li>
                    <li class="item" @click="goToAccident">
                        <p class="item-menu">意外险</p>
                    </li>
                    <li class="item" @click="goToProperty">
                        <p class="item-menu">财产险</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="help-info">
            <router-link to="/help">帮助中心</router-link>
            <router-link to="/aboutUs">关于我们</router-link>
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import footerBottom from '@/components/footer'
import { getBalance, goToOrderCenter } from '@/service/getData'
import { hideWeiXinMenu } from '@/config/util.js'
import Vue from 'vue'
import { ToastPlugin, AlertPlugin, WechatPlugin, cookie as Cookie } from 'vux'
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)

export default {
    name: 'my',
    components: {
        footerBottom
    },
    data() {
        return {
            loginPhone: this.$store.state.webChatUserInfo.loginPhone, //登录手机
            accountObj: {}, //账号余额信息
            userId: this.$store.state.webChatUserInfo.employeeCode //用户ID
        }
    },
    beforeCreate() {
        if (this.$store.state.isLogin) {
            Cookie.set('iaaState', JSON.stringify(this.$store.state));
            return;
        }

        let iaaState = JSON.parse(Cookie.get('iaaState') || null);
        if (iaaState && iaaState.isLogin) {
            this.$store.replaceState(iaaState);
            return;
        }

        this.$router.replace('login');
    },
    created() {
        hideWeiXinMenu(Vue.wechat)
        this.getAccountInfo();
    },
    methods: {
        //跳转至个人信息展示页
        showPersonalInfo() {
            this.$router.push('myInfor');
        },
        // 提现
        withdrawal() {
            this.$vux.toast.show({
                width: '80%',
                type: 'text',
                text: '提现功能正在开发中，敬请期待...'
            });
        },
        //获取账号余额
        getAccountInfo() {
            getBalance()
                .then((res) => {
                    if (res.resultCode === '00') {
                        this.accountObj = res.result || {};
                    } else {
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg || '系统出错，请稍后再试'
                        });
                    }
                })
                .catch(() => {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '网络似乎有点问题，请稍后再试'
                    });
                })
        },
        //跳转到车险
        goToCarInsurance() {
            let params = {
                insuranceType: 'carInsurance',
                userId: this.userId
            };
            this.goToOrderList(params);
        },
        // 跳转到意健险
        goToAccident() {
            let params = {
                insuranceType: 'accident',
                userId: this.userId,
                callbackUrl: window.location.href
            };
            this.goToOrderList(params);
        },
        // 跳转到财产险
        goToProperty() {
            let params = {
                insuranceType: 'property',
                userId: this.userId,
                callbackUrl: window.location.href
            };
            this.goToOrderList(params);
        },
        //跳转到订单列表
        goToOrderList(params) {
            let orderListURL = params.insuranceType === 'carInsurance' ? 'QueryCarOrderUrl' : 'QueryNonCarOrderUrl';

            goToOrderCenter(params)
                .then((res) => {
                    if (res.result && res.result.resultCode === '00' && res[orderListURL]) {
                        if (orderListURL === 'QueryCarOrderUrl') {
                            let url = res[orderListURL] + '&orderBackUrl=' + encodeURIComponent(window.location.href);
                            window.location.href = url;
                        } else {
                            window.location.href = res[orderListURL];
                        }
                    } else {
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg || '系统出错，请稍后再试'
                        });
                    }
                })
                .catch(() => {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '网络似乎有点问题，请稍后再试'
                    });
                })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "my"
</style>