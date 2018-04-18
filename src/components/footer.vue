<template>
    <footer>
        <span @click="toHome" :class="['tab-bar', 'tab-home',{'active':isHomeActive}]">首页</span>
        <span @click="toMy" :class="['tab-bar', 'tab-my',{'active':!isHomeActive}]">我的</span>
    </footer>
</template>
<script>
export default {
    name: 'Footer',
    data() {
        return {
            isHomeActive: false
        }
    },
    created() {
        this.isHomeActive = this.$route.name === 'Home' ? true : false;
    },
    methods: {
        toHome() {
            this.$router.replace('home');
        },
        toMy() {
            this.$router.replace('my');
        }
    }
}
</script>
<style lang="scss" scoped>
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1PX solid #efebe9;
    background: #f7f6f5;
    .tab-bar {
        flex: 1;
        text-align: center;
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding-top: 30px;
        font-size: 12px;
        color: #a6a6a6;
        &.active {
            color: #f87539;
        }
        &:before {
            content: '';
            position: absolute;
            left: 50%;
            top: 4px;
            transform: translate(-50%, 0);
            display: block;
            width: 24px;
            height: 24px;
        }
        &.tab-home:before {
            background: url(../assets/tabbar_home.png) no-repeat center;
            background-size: contain;
        }
        &.active.tab-home:before {
            background: url(../assets/tabbar_home_on.png) no-repeat center;
            background-size: contain;
        }
        &.tab-my:before {
            background: url(../assets/tabbar_profile.png) no-repeat center;
            background-size: contain;
        }
        &.active.tab-my:before {
            background: url(../assets/tabbar_profile_on.png) no-repeat center;
            background-size: contain;
        }
    }
}
</style>