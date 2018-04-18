<template>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="50" ref="scrollerBottom">
        <div class="prodcuct-search">
            <div class="search">
                <span class="search-input-wrap"><input placeholder="搜索保险产品" type="text" v-model.trim="searchKeyword"></span>
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
                                    <dd>保险期限：{{hotProduct.insurancePeriod||''}}</dd>
                                    <dd>适用人群：{{hotProduct.fitForPeople||''}}</dd>
                                    <dd>产品特色：{{hotProduct.productDesc||hotProduct.productName}} </dd>
                                </dl>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <load-more :show-loading="isShowLoading" :tip="tip"></load-more>
        </div>
    </scroller>
</template>
<script>
import { getMoreProduct } from '@/service/getData'
import { Scroller, LoadMore, AlertPlugin, cookie as Cookie } from 'vux'
import Vue from 'vue'
Vue.use(AlertPlugin)

export default {
    name: 'prodcuctSearch',
    components: {
        Scroller,
        LoadMore
    },
    data() {
        return {
            isShowLoading: true, //正在加载中
            onfetching: true, //正在请求数据            
            searchKeyword: '', //搜索关键字
            imgNasPath: '/icp-portal/icp-iaa/do/nas/images/', //产品列表的展示图片路径
            hotProductList: [], //热销产品
            productList: [], //查询接口返回的热销产品列表，不能在程序中改写，因为数据是一次性请求完成的
            productListBySearch: [] //通过关键字过滤后的热销产品列表
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
        this.fetchProductList();
    },
    computed: {
        tip() {
            return this.isShowLoading ? '正在加载...' : '';
        }
    },
    watch: {
        searchKeyword(newVal, oldVal) {
            this.productListBySearch = newVal === '' ?
                this.productList :
                this.productList.filter(function (item) {
                    return item.productName.indexOf(newVal) > -1;
                });
            this.hotProductList = this.productListBySearch.slice(0, 5);
            this.refleshLoadingMoreStatus();
        }
    },
    methods: {
        // 下拉加载更多
        onScrollBottom() {
            if (!this.onFetching) {
                this.onFetching = true;
                setTimeout(() => {
                    this.hotProductList = this.productListBySearch.slice(0, this.hotProductList.length + 5);
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset();
                    });
                    this.refleshLoadingMoreStatus();
                }, 800);
            }
        },
        //更新下拉加载更多的状态
        refleshLoadingMoreStatus() {
            if (this.hotProductList.length === this.productListBySearch.length) {
                this.isShowLoading = false;
                this.onFetching = true;
            } else {
                this.isShowLoading = true;
                this.onFetching = false;
            }
        },
        //获取产品列表
        fetchProductList() {
            let param = {
                kindType: 0
            };
            getMoreProduct(param)
                .then((res) => {
                    if (res.resultCode === '00') {
                        if (Object.prototype.toString.call(res.result) === '[object Array]') {
                            this.productList = res.result;
                            this.productListBySearch = res.result;
                            this.hotProductList = res.result.slice(0, 5);
                            this.refleshLoadingMoreStatus();
                        }
                    } else {
                        this.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg || '系统出错，请稍后再试'
                        });
                        this.isShowLoading = false;
                    }
                })
                .catch(() => {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '网络似乎有点问题，请稍后再试'
                    });
                    this.isShowLoading = false;
                });
        }
    }
}
</script>
<style lang="scss" scoped>
@import "productSearch"
</style>