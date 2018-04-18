import * as getData from '@/service/getData'
import Vue from 'vue'
import { XButton, ToastPlugin, LoadingPlugin, AlertPlugin, WechatPlugin, InlineLoading } from 'vux';
import { getQueryString, initWeiXin, hideWeiXinMenu, getStore, setStore, rsa, warn, vilidate, judgeInv } from '../../config/util.js'
import JSEncrypt from '../../config/jsencrypt-long.js'
import md5 from 'js-md5';
//	import JSEncrypt from 'JSEncrypt'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)

export default {
	name: 'login',

	beforeCreate: function() {
		
		
	},
	created() {
		
		
		//		console.log(rsa(JSEncrypt,{name:"dfd积极fd"})) 
		//			判断是忘记密码还是注册
		if(this.page_bs === "forget") {
			this.crumbs_data = ["1.账户验证", "2.重置密码"]
		} else {
			this.crumbs_data = ["1.账户验证", "2.设置密码", "3.设置机构归属"]
		}

		// debugger
		if(this.$store.getters.isLogin) {
			this.$router.replace("Home");
			return;
		}
		var wx = Vue.wechat;
		hideWeiXinMenu(wx)
		this.getValidImg()
		var that = this;
		var code = getQueryString('code') || '';

	},
	data() {
		return {
			miblephone: '',
			verificationImg: '',
			verification: '',
			password: '',
			repassword: '',
			companyCode: '',
			departmentCode: '',

			warnTip: '',
			warnTop: '',
			isShake: false,
			qh_bs: 0,
			page_bs: this.$route.params.id,
			text_tip: '获取验证码',
			getCodeBol: false,
			isActive: false,
			isLoginCli: false,
			isSetCli: false,
			isSumbitCli: false,
			isShow: false,
			color: '#217FED',
			isLoading: false,
			crumbs_data: ["1.账户验证", "2.重置密码"],
			validCodeUrl: "",
			idIaaUserInfo: ""
		}
	},
	components: {

		XButton,
		ToastPlugin,
		InlineLoading
	},
	methods: {
		getValidImg() {
			this.validCodeUrl = getData.validCodeUrl();
		},
		focus() {
			this.warnTip = "";

		},
		vilidates(bs) {
			if(vilidate(this, "请输入手机号码", "2.29rem", this.miblephone, /\S/, bs) === "") return "";
			if(vilidate(this, "请输入正确格式的手机号码", "2.29rem", this.miblephone, /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/, bs) === "") return "";
			if(vilidate(this, "请输入图片验证码", "3.89rem", this.verificationImg, /\S/, bs) === "") return "";

		},
		//          获取验证码
		getVeCode() {

			if(this.getCodeBol) return
			this.getCodeBol = true;
			var that = this;
			if(this.vilidates("getCodeBol") === "") return
			this.color = "#DCDCDC";
			//                  请求发送二维码接口
			getData.sendSmsCode({
					'loginPhone': that.miblephone,
					'operType': '2',
					'verifyCodeImg': that.verificationImg
				})
				.then(function(response) {
					return response.json();
				})
				.then(function(res) {
					if(res.resultCode == '00') {
						that.$vux.toast.text("验证码短息已发出");
						//              虚拟倒计时
						var countdown = 59
						that.isActive = true;
						that.text_tip = '60秒后重新获取'
						var iCount = setInterval(function() {
							countdown = countdown - 1;
							that.text_tip = countdown + '秒后重新获取';
							if(countdown == 0) {
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
						that.getValidImg();
						that.$vux.toast.text(res.resultMsg || '系统出错，请稍后再试');
						that.getCodeBol = false;

					}
				})
				.catch(function(e) {
					that.getValidImg();
					that.color = "#217FED";
					/*that.isActive = false;
					that.text_tip = '获取验证码';
					clearInterval(iCount);*/ //清除倒计时
					that.$vux.toast.text('网络似乎有点问题，请稍后再试')
					that.getCodeBol = false;
				});

		},
		//          点击校验手机
		checkPhone() {

			var that = this;
			if(this.isLoginCli) return;
			this.isLoginCli = true;
			if(this.vilidates("isLoginCli") === "") return
			if(vilidate(this, "请输入验证码", "5.44rem", this.verification, /\S/, "isLoginCli") === "") return;
			this.isLoading = true;

			var parm = {
				//                  'weixinOpenId':this.webChatSatetInfo.openid,
				'secKey': this.webChatSatetInfo.secretkey,
				'loginPhone': this.miblephone,
				'smsCode': this.verification,
				'operType': '2'
			}

			getData.forgetValidCode(parm)
				.then(function(res) {
					that.isLoading = false;
					that.isLoginCli = false;
					if(res.resultCode == '00') {
						
						that.qh_bs = 1;
						that.idIaaUserInfo = res.idIaaUserInfo;
					} else {

						that.$vux.toast.text(res.resultMsg || '系统出错，请稍后再试')
					}
				})
				.catch(function(e) {
					that.isLoading = false;
					that.$vux.toast.text('网络似乎有点问题，请稍后再试')
					that.isLoginCli = false;
				});

		},
		setPassword() {

			//				debugger
			var that = this;
			if(this.isSetCli) return;
			this.isSetCli = true;
			if(vilidate(this, "请输入密码", "2.29rem", this.password, /\S/, "isSetCli") === "") return;
			//			if(vilidate(this,"密码必须为数字和字母的组合，且不少于6位", "2.29rem",this.password,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,"isSetCli")==="") return;
			if(vilidate(this, "密码不能少于6位", "2.29rem", this.password, /^\S{6,}$/, "isSetCli") === "") return;
			if(vilidate(this, "密码必须包括数字和字母", "2.29rem", this.password, /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/, "isSetCli") === "") return;
			//			if(vilidate(this,"密码必须为数字和字母的组合", "2.29rem",this.password,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,"isSetCli")==="") return;

			if(vilidate(this, "重复输入一次密码", "3.89rem", this.repassword, /\S/, "isSetCli") === "") return;
			if(this.repassword !== this.password) {
				warn(this, "两次输入密码不同", "3.89rem")
				this.isSetCli = false;
				return;
			}
			/*this.qh_bs = 2
			this.isSetCli = false;*/

			this.isLoading = true;
			getData.forgetSubmit({
					"idIaaUserInfo": that.idIaaUserInfo,
					"password": md5(that.password),
					"loginPhone ":that.miblephone, 
					'operType': '2'
				})
				.then(function(res) {
					that.isLoading = false;
					that.isSetCli = false;
					if(res.resultCode == '00') {
						that.$vux.toast.text('密码修改成功');
						setTimeout(function() {
							that.$router.push('login');
						}, 1500)
					} else {
						that.$vux.toast.text(res.resultMsg || '系统出错，请稍后再试')
					}
				})
				.catch(function(e) {
					that.isLoading = false;
					that.$vux.toast.text('网络似乎有点问题，请稍后再试')
					that.isSetCli = false;
				});
		},
		/*submit() {
			var that = this;
			if(this.isSumbitCliCli) return;
			this.isSumbitCliCli = true;
			if(vilidate(this,"公司编码不能为空", "2.29rem",this.companyCode,/\S/,"isSumbitCliCli")==="") return;
			if(vilidate(this,"机构代码不能为空", "3.89rem",this.departmentCode,/\S/,"isSumbitCliCli")==="") return;
			this.isSumbitCliCli = false;
		},
		scan: function() {
			initWeiXin(Vue.wechat, ['scanQRCode'], function() {
				//2.3 隐藏不用的按钮
				console.info("扫一扫成功");
				Vue.wechat.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						alert(res) // 当needResult 为 1 时，扫码返回的结果
					}
				});

			})
		}*/
	},
	watch: {

	},
	mounted() {
		debugger
		document.getElementsByTagName("body")[0].style.background="#ffffff"
	},
	computed: {

		webChatSatetInfo: function() {
			return this.$store.getters.webChatSatetInfo
		}
	},
    beforeDestroy(){
    	
    	document.getElementsByTagName("body")[0].style.background="#f7f6f5"
    }
}