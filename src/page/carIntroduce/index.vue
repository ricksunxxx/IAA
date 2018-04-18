<template>
    <div>
        <img src="../../assets/carIntroduce.png" alt="" />
        <a :href="href">
            <div class="quickBuy">
                <div class="btn">立即购买</div>
            </div>
        </a>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    beforeCreate: function () {


    },
    created() {
        var userId = this.$store.getters.webChatUserInfo.employeeCode;
        var mediaSource = this.$store.getters.webChatUserInfo.companyCode;

        if (location.href.indexOf("test2-iicp-dmzstg.pingan.com.cn") !== -1) {
            this.href = 'https://test1-icp-core.pingan.com.cn/ebusiness/newUpingan/index.html#index?userId=' + userId + '&systemId=0060&mediaSource=' + mediaSource + '&isSpecialCity=true&orderBackUrl=https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf25331d166e4075f&redirect_uri=https://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            // this.href = "https://aop.pingan.com.cn/ebusiness/newUpingan/index.html#index?userId=test_emp&systemId=0060&mediaSource=YYY&isSpeciaCity=true&orderBackUrl=https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf25331d166e4075f&redirect_uri=https://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        } else {
            //          this.href = "https://aop.pingan.com.cn/ebusiness/newUpingan/index.html#index?userId=test_emp&systemId=0060&mediaSource=YYY&isSpecialCity=true&orderBackUrl=https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8034478ad4b8cbb&redirect_uri=https://iicp.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            this.href = 'https://aop.pingan.com.cn/ebusiness/newUpingan/index.html#index?userId=' + userId + '&systemId=0060&mediaSource=' + mediaSource + '&isSpecialCity=true&orderBackUrl=https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8034478ad4b8cbb&redirect_uri=https://iicp.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        }
    },
    data() {
        return {
            href: ""
        }
    },
    components: {

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
<style>
.quickBuy {
    position: fixed;
    bottom: 0;
    height: 70px;
    background: rgba(0, 0, 0, .3);
    width: 100%;
}

.quickBuy .btn {
    width: 90%;
    height: 50px;
    color: #ffffff;
    background-color: #FF6C2A;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    margin: 10px auto;
    line-height: 50px;
}
</style>