<template>
    <div class="login">
    	<!--记得后面加上v-if="isShow"-->
        <div v-if="isShow"> 
            <img src="../../assets/img_denglu@2x.png" alt="" class="banner" />

            <div class="form">
				<span class="warn_tip" :style="{top:warnTop}" :class="{shake:isShake}">{{warnTip}}</span>
            	
	            <img src="../../assets/text_baoxianzhongjielianmeng@2x.png" alt="" class="tit_img" />
	            	
	                <div class="user_name">
	                    <input type="number" v-model="miblephone" @focus="focus" placeholder="请输入账号" class="ipt" maxlength="12"/>
	                    <img src="../../assets/btn_zhanghao@2x.png" alt="" class="icon" />
	                </div>
	                <div class="yzm">
	                    <input type="text" v-model="Verification" @focus="focus" placeholder="请输入验证码" class="ipt" />
	                    <img src="../../assets/btn_mima@2x.png" alt="" class="icon" />
	                    <div class="get_yzm" :class="{isActive:isActive}">
	                        <span></span>
	                        <span @click="getVeCode" :class="{isActive:isActive}" :style="{color:color}">{{text_tip}}</span>
	                    </div>
	                </div>
	                
	                <x-button class="login_btn" style="color:#ffffff;background: #FF6C2A;cursor: pointer" @click.native="login">
	                	<span styel="cursor:pointer">{{isLoading?"正在登陆":"登录"}}</span>
	                	<inline-loading v-if="isLoading"></inline-loading>
	                </x-button>
	                <!--<div class="register">
	                	<router-link :to='{name:"Register",params:{id:"forget"}}' class="forget">忘记密码>></router-link>
	                </div>-->
	                <!--<div v-transfer-dom>
	                <loading></loading>
	            </div>-->
            </div>
        </div>
    </div>
</template>
<script>
import * as getData from '@/service/getData'
import Vue from 'vue'
import { XButton, ToastPlugin, AlertPlugin, WechatPlugin,InlineLoading } from 'vux';
import { getQueryString, initWeiXin, hideWeiXinMenu, getStore, setStore ,vilidate} from '../../config/util.js'
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)



export default {
    name: 'login',

    beforeCreate: function () {
    	document.getElementsByTagName("body")[0].style.background="#ffffff"
        
    },
    created() {
        
        
        
        
        if (this.$store.getters.isLogin) {
            this.$router.replace("Home");
            return;
        }
        var wx = Vue.wechat;
        hideWeiXinMenu(wx)



        var that = this;
        var code = getQueryString('code') || '';
//      返回login的处理
        /*if(this.$store.getters.webChatSatetInfo.secretkey&&(!this.$store.getters.isLogin)){
        	this.isShow = true;
        	return;
        }*/
       
       
        /*var sessionCode = sessionStorage.getItem('ctr_61_user_code');
        var goQuery = false;
        if(sessionCode){
          goQuery = code == sessionCode ?true:false;
        }
        if(goQuery)return;
        sessionStorage.setItem('ctr_61_user_code',code);*/
        /*getData.hui({'fgfg':'fgfgf'})
            .then(function (response) {
                  return response.json();
                })
            .then(function (res) {
                console.log(res)
            })*/

        //   获取微信openid        
        if (!this.$store.getters.isLogin) {
            getData.getOpenId({
                    'code': code,
                    'openId': ''
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    if (res.resultCode == '000000') {
                        that.$store.dispatch('updatewebChatSatetInfo', res.result);
                        var nextData = {
                            //                      weixinOpenId:res.openid,
                            secKey: res.result.secretkey
                        };
                        return getData.getWeChatUserInfo(nextData)
                    } else {
                        that.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg || '系统出错，请稍后再试'
                        });
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    if (res.resultCode == '00') {
                        that.$store.dispatch('updateWebChatUserInfo', res.result);
                        if (res.result.employeeCode && res.result.employeeCode.length > 0) {
                            that.$router.replace('Home');
                        }
                    } else if (res.resultCode == '02') {
                        that.$store.dispatch('updateWebChatUserInfo', {
                            employeeCode: ''
                        });
                        that.isShow = true;
                    } else {
                        that.$vux.alert.show({
                            title: '提示',
                            content: res.resultMsg || '系统出错，请稍后再试'
                        });
                    }
                })
                .catch(function (e) {
                    that.$vux.alert.show({
                        title: '提示',
                        content: '网络似乎有点问题，请稍后再试'
                    });
                });
        }

    },
    data() {
        return {
            miblephone: '',
            Verification: '',
            text_tip: '获取验证码',
            getCodeBol: false,
            isActive: false,
            isLoginCli: false,
            isShow: false,
            color: '#217FED',
//          文字提示
            warnTip:"",
            warnTop:0,
            isShake:false,
            isLoading:false
        }
    },
    components: {
        
        XButton,
        ToastPlugin,
        InlineLoading
    },
    methods: {
    	focus() {
			this.warnTip = "";
		},
        //          获取验证码
        getVeCode() {

            if (this.getCodeBol) return
            this.getCodeBol = true;
            var that = this;
            if(vilidate(this,"请输入手机号码", "2.5rem",this.miblephone,/\S/,"getCodeBol")==="") return "";
            if(vilidate(this,"请输入正确格式的手机号码", "2.5rem",this.miblephone,/^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/,"getCodeBol")==="") return "";
            this.color = "#DCDCDC";
            //                  请求发送二维码接口
            getData.sendSmsCode({
                    'loginPhone': that.miblephone,
                    'operType':'1'
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    if (res.resultCode == '00') {
                        that.$vux.toast.text("验证码短息已发出");
                        //              虚拟倒计时
                        var countdown = 59
                        that.isActive = true;
                        that.text_tip = '60秒后重新获取'
                        var iCount = setInterval(function () {
                            countdown = countdown - 1;
                            that.text_tip = countdown + '秒后重新获取';
                            if (countdown == 0) {
                                that.color = "#217FED";
                                that.isActive = false;
                                that.text_tip = '获取验证码';
                                clearInterval(iCount); //清除倒计时  
                                that.getCodeBol = false;
                            };
                        }, 1000);

                    } else {
                        that.color = "#217FED";
                        //                          that.isActive = false;
                        //                          that.text_tip = '获取验证码';
                        //                          clearInterval(iCount); //清除倒计时
                        that.$vux.toast.text(res.resultMsg || '系统出错，请稍后再试');
                        that.getCodeBol = false;

                    }
                })
                .catch(function (e) {
                    that.color = "#217FED";
                    /*that.isActive = false;
                    that.text_tip = '获取验证码';
                    clearInterval(iCount);*/ //清除倒计时
                    that.$vux.toast.text('网络似乎有点问题，请稍后再试')
                    that.getCodeBol = false;
                });

        },
        //          点击登录按钮  
        login() {
            if (this.isLoginCli) return;
            this.isLoginCli = true;
            if(vilidate(this,"请输入手机号码", "2.5rem",this.miblephone,/\S/,"isLoginCli")==="") return "";
            if(vilidate(this,"请输入正确格式的手机号码", "2.5rem",this.miblephone,/^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/,"isLoginCli")==="") return "";
            if(vilidate(this,"请输入验证码", "4.24rem",this.Verification,/\S/,"isLoginCli")==="") return "";
//          if(vilidate(this,"请输入密码", "3.89rem",this.Verification,/\S/,"isLoginCli")==="") return "";

            /*this.$vux.loading.show({
                text: '登录中...'
            })*/
           this.isLoading=true;
            var that = this;
            var parm = {
                //                  'weixinOpenId':this.webChatSatetInfo.openid,
                'secKey': this.webChatSatetInfo.secretkey,
                'loginPhone': this.miblephone,
                'smsCode': this.Verification,
                'operType':'1'
            }
            
            getData.saveWeChatUserInfo(parm)
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    that.isLoading=false;
                    that.isLoginCli = false;
                    if (res.resultCode == '00') {
                        that.$store.dispatch('updateWebChatUserInfo', res.result);
                    } else {
                    	
                        that.$vux.toast.text(res.resultMsg || '系统出错，请稍后再试')
                    }
                })
                .catch(function (e) {
                	that.isLoading=false;               
                    that.$vux.toast.text('网络似乎有点问题，请稍后再试')
                    that.isLoginCli = false;
                });

        }
    },
    watch: {
        isLogin: function (new_val) {
            if (new_val) {
                this.$router.replace('Home');
            }
        }
    },
    mounted() {

    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin //this.$store.getters.webChatUserInfo;
        },
        webChatSatetInfo: function () {
            return this.$store.getters.webChatSatetInfo
        }
    },
    beforeDestroy(){
    	document.getElementsByTagName("body")[0].style.background="#f7f6f5"
    }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import 'login'
</style>