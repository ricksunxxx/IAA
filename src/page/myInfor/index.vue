<template>
    <div>
    	
    	<ul class="my-infor">
    		<li class="clearfix">
    			<span class="pic">头像</span>
    			<img src="../../assets/my_pic.png" alt="" />
    		</li>
    		<li class="clearfix">
    			<span>手机号码</span>
    			<span>{{telphone}}</span>
    		</li>
    		<li class="clearfix">
    			<span>所属代理公司</span>
    			<span>{{company}}</span>
    		</li>
    	</ul>
    	
    	<div class="out-login" @click="logOut">
    		<span styel="cursor:pointer">{{isLoading?"退出中":"退出登录"}}</span>
    		<inline-loading v-if="isLoading"></inline-loading>
    	</div>
    	
    	

    </div>
</template>
<script>
import { logOut } from '@/service/getData'
import {judgeInv} from '@/config/util.js'
import Vue from 'vue'
import {AlertPlugin,InlineLoading, cookie as Cookie} from 'vux'
Vue.use(AlertPlugin);

export default {
	name: 'myInfor',
	components: {
		AlertPlugin,InlineLoading
	},
	data() {
		return {
            isLogOutCli:false,
            isLoading:false,
            telphone:this.$store.state.webChatUserInfo.loginPhone,
            company:this.$store.state.webChatUserInfo.departmentName,
            show:false
		}
	},
	beforeCreate() {

	},
	created() {

	},
	methods: {
		
		logOut() {
			this.show=true
			
			var that=this;
			if (this.isLogOutCli) return;
            this.isLogOutCli = true;
            this.isLoading=true;
            logOut().then(function (res) {
            		
                    if (res.resultCode === '00') {
                    	debugger
                    	that.$store.state.isLogin=false;
                    	that.$store.state.webChatSatetInfo={};
                    	that.$store.state.webChatUserInfo={};                    	
//	    				sessionStorage.removeItem("iaaState");                       
						Cookie.remove("iaaState")
                        setTimeout(function() {
                        	that.isLogOutCli = false;
            				that.isLoading=false;
							judgeInv();
						}, 200)
                    } else {
                    	that.isLogOutCli = false;
            			that.isLoading=false;
                        that.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg || '系统出错，请稍后再试'
                        });
                    }
                })
                .catch(function () {
                	that.isLogOutCli = false;
            		that.isLoading=false;
                    that.$vux.alert.show({
                        title: '提示',
                        content: '网络似乎有点问题，请稍后再试'
                    });
                })
		}
		
	}
}
</script>
<style lang="scss" scoped>
@import "myInfor"
</style>