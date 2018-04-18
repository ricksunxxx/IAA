<template>
    <transition name="router-fade">
        <router-view></router-view>
    </transition>
</template>
<script>
export default {
    name: 'app'
}
</script>
<style lang="scss">
@import 'style/reset.scss';

.router-fade-enter,
.router-fade-leave {
    opacity: 0;
}

.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity .6s;
}
</style>