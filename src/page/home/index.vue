<template>
    <div class="home">
        <swiper @click.native="clickBanner" v-model="bannerIndex" loop auto :list="bannerList" dots-position="center" dots-class="iaa-dots">
        </swiper>
        <div class="car-insurance">
            <a href="javascript:void(0);" @click="buyCarIns">
                <img src="../../assets/car_insurance.png" alt="车险投保">
                <div class="tips">
                    <span class="tips-text">点击快速投保</span>
                    <div class="tips-arrow">
                        <span class="icon"></span>
                        <span class="icon"></span>
                        <span class="icon"></span>
                    </div>
                </div>
            </a>
        </div>
        <div class="hot-sale">
            <div class="hot-sale-header">
                <h2>热销推荐</h2>
                <span @click="linkToProductSearchPage" class="hot-sale-regain">更多</span>
            </div>
            <div class="hot-sale-wrap">
                <ul>
                    <li class="item" v-for="hotProduct in hotProductList">
                        <a :href="hotProduct.applyUrl">
                            <div class="item-header">
                                <h3>{{hotProduct.productName||''}}</h3>
                                <span><i>{{hotProduct.amount||'0'}}</i>元起</span>
                            </div>
                            <div class="item-wrap">
                                <img class="item-wrap-img" :src="imgNasPath+hotProduct.mobileSquarePic" :alt="hotProduct.productName|| ''">
                                <dl class="item-wrap-body">
                                    <!-- <dt>{{hotProduct.productDesc||hotProduct.productName}} </dt> -->
                                    <dd>保险期限：{{hotProduct.insurancePeriod||''}}</dd>
                                    <dd>适用人群：{{hotProduct.fitForPeople||''}}</dd>
                                    <dd>产品特色：{{hotProduct.productDesc||hotProduct.productName}} </dd>
                                </dl>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <keep-alive> -->
        <footer-bottom></footer-bottom>
        <!-- </keep-alive> -->
    </div>
</template>
<script>
import footerBottom from '@/components/footer'
import { getMoreProduct } from '@/service/getData'
import Vue from 'vue'
import { Swiper, AlertPlugin, WechatPlugin, cookie as Cookie } from 'vux'
import { hideWeiXinMenu } from '@/config/util.js'
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)
import banner01 from '@/assets/banner01.png'
import banner02 from '@/assets/banner02.png'
const imgList = [{
    url: 'javascript:',
    img: banner01,
}, {
    url: 'javascript:',
    img: banner02,
}];
const isPrd = window.location.host.indexOf('iicp.pingan.com.cn') > -1;

export default {
    name: 'home',
    components: { footerBottom, Swiper },
    data() {
        return {
            bannerList: imgList, //轮播图
            bannerIndex: 0, //当前轮播图
            hotProductList: [], //热销产品列表
            imgNasPath: '/icp-portal/icp-iaa/do/nas/images/' //产品列表的展示图片路径
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
        hideWeiXinMenu(Vue.wechat);
        this.fetchProductList();
    },
    methods: {
        // 点击banner
        clickBanner() {
            if (this.bannerIndex === 0) {
                this.buyCarIns();
            } else if (this.bannerIndex === 1) {
                let userId = this.$store.state.webChatUserInfo.employeeCode;
                if (isPrd) {
                    window.location.href = 'https://iicp.pingan.com.cn/icp/adminResources/src/productDetail.html?keyCode=SfKQaj&userId=' + userId + '&callBackUrl=https%253A%252F%252Fopen.weixin.qq.com%252Fconnect%252Foauth2%252Fauthorize%253Fappid%253Dwxb8034478ad4b8cbb%2526redirect_uri%253Dhttps%253A%252F%252Fiicp.pingan.com.cn%252Ficp-portal%252Ficp-iaa%252Fiaa%252Fdist%252Findex.html%2526response_type%253Dcode%2526scope%253Dsnsapi_userinfo%2526state%253DSTATE%2523wechat_redirect';
                } else {
                    window.location.href = 'https://test-iicp-dmzstg.pingan.com.cn/icp/adminResources/src/productDetail.html?keyCode=fwFFoh&userId=' + userId + '&callBackUrl=https%253A%252F%252Fopen.weixin.qq.com%252Fconnect%252Foauth2%252Fauthorize%253Fappid%253Dwxf25331d166e4075f%2526redirect_uri%253Dhttps%253A%252F%252Ftest2-iicp-dmzstg.pingan.com.cn%252Ficp-portal%252Ficp-iaa%252Fiaa%252Fdist%252Findex.html%2526response_type%253Dcode%2526scope%253Dsnsapi_userinfo%2526state%253DSTATE%2523wechat_redirect';
                }
            }
        },
        //车险投保
        buyCarIns() {
            let carUrl = this.$store.state.webChatUserInfo.autoApplyUrl;
            if (carUrl && typeof carUrl === 'string') {
                window.location.href = carUrl;
            } else {
                this.$vux.alert.show({
                    title: '提示',
                    content: '车险投保链接缺失，请联系管理员'
                });
            }
        },
        //更多
        linkToProductSearchPage() {
            this.$router.push('productSearch');
        },
        //获取产品列表
        fetchProductList() {
            let param = {
                kindType: 0,
                isHotFlag: 1
            };
            getMoreProduct(param)
                .then((res) => {
                    if (res.resultCode === '00') {
                        if (Object.prototype.toString.call(res.result) === '[object Array]') {
                            this.hotProductList = res.result;
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
                });
        }
    }
}
</script>
<style lang='scss' scoped>
@import 'home';
</style>
<style lang='scss'>
.home .iaa-dots {
    .vux-icon-dot {
        background-color: rgba(255, 255, 255, .5) !important;
        transition: all .2s;
        &.active {
            background-color: #fff !important;
            width: 8PX !important;
        }
    }
}

.home .vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-img {
    background: top center no-repeat;
    background-size: 100% 100% !important;
}
</style>