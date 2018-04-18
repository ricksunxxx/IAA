<template>
    <div class="help">
        <p class="desc">本服务号是酷保云开放平台的官方微信账号, 酷保云平台致力于为垂直领域互联网公司提供定制化、保险产品、场景化解决方案。
        </p>
        <p>酷保云平台：<span>http://iicp.pingan.com.cn</span></p>
        <p>开发运营方：<span>平安科技(深圳)有限公司</span></p>
        <p>合作咨询热线：<span>400-878-2058</span></p>
        <p>商务合作邮箱：<span>pub_iicp@pingan.com.cn</span></p>
    </div>
</template>
<script>
export default {
    name: 'help',
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.help {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 12px;
    font-size: 16px;
    color: #999;
    background: #fff;
    p {
        &.desc {
            line-height: 25px;
            margin-bottom: 20px;
        }
        margin-bottom: 6px;
        span {
            color: #ff6122;
        }
    }
}
</style>