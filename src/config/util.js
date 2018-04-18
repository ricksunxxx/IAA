import * as getData from '@/service/getData'

export const ajax = opt => {
	opt.body = JSON.stringify(opt.body)
	var setting = {
		method: "POST",
		body: {},
		funName: ""
	}
	for(var key in opt) {
		setting[key] = opt[key];
	}
	return getData[setting.funName](setting)
}

export const getQueryString = (name, str) => {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var t = window.location.search.substr(1);
	if(str && str === "hash") t = window.location.hash.substr(location.hash.indexOf("?") + 1);
	var r = t.match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}

export const formatSearch = function(se) {
	if(typeof se !== "undefined") {
		se = se.substr(1);
		var arr = se.split("&"),
			obj = {},
			newarr = [];
		$.each(arr, function(i, v) {
			newarr = v.split("=");
			if(typeof obj[newarr[0]] === "undefined") {
				obj[newarr[0]] = newarr[1];
			}
		});
		for(var key in obj) {
			obj[key] = decodeURI(obj[key]);
		}
		return obj
	}
};

//获取localStorage
export const getStore = (name, isReturnObj) => {
	if(!name) {
		return;
	}
	let value = window.sessionStorage.getItem(name);
	if(isReturnObj) {
		return JSON.parse(value);
	}
	return value;
}

//存储localStorage
export const setStore = (name, content) => {
	if(!name) {
		return;
	}
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

//删除localStorage
export const removeStore = name => {

	if(!name) {
		return;
	}
	window.sessionStorage.removeItem(name);
}

const randomString = () => {
	var len = len || 16;　　
	var $chars = 'ABCDa6bcdE7FG01HIJKLvwxy45zMNOPQfghi8RSTlmnoU9VWXYZ3ejkp2qrstu';　　
	var maxPos = $chars.length;　　
	var pwd = '';　　
	for(var i = 0; i < len; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));　　
	}　　
	return pwd;
}

//微信自定义功能参数配置
export const initWeiXin = (wx, jsApiList, callback) => {

	var signUrl = location.href.split('#')[0];
	var timestamp = (new Date()).valueOf() + "";
	var nonceStr = randomString();

	getData.getWeChatTicket({
		'url': signUrl,
		'noncestr': nonceStr,
		'timestamp': timestamp
	}).then(function(res) {
		if(res.resultCode === '000000') {
			var weixinJsSdkConfig = res.result;
			wx.config({
				debug: false, // 开启调试模式,
				appId: weixinJsSdkConfig.appId, // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: weixinJsSdkConfig.signature, // 必填，签名
				// 必填,需要使用的JS接口列表
				jsApiList: jsApiList
			});

			// 异步配置完成后，自动调用
			wx.ready(function() {
				if(callback) {
					callback()
				}
			});
		} else {
			console.info(res.resultMsg || '系统出错，请稍后再试')
		}
	}).catch(function(e) {
		console.info('网络似乎有点问题，请稍后再试')
	});
}

//隐藏微信右键按钮功能
export const hideWeiXinMenu = (wx) => {
	initWeiXin(wx, ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideOptionMenu', 'showOptionMenu'], function() {
		//2.3 隐藏不用的按钮
		console.info("隐藏不用的按钮");
		wx.hideOptionMenu()
	})
}

//rsa加密
export const rsa = (JSEncrypt, content) => {
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRQZ5O/AOAjeYAaSFf6Rjhqovws78I716I9oGF7WxCIPmcaUa1YuyLOncCCuPsaw69+RMWjdbOBp8hd4PPM/d4mKTOVEYUE0SfxhhDTZaM5CzQEUXUyXy7icQTGR5wBjrbjU1yHCKOf5PJJZZQWB06husSFZ40TdL7FdlBpZ1u1QIDAQAB");
	if(typeof content == "string") {
		return encrypt.encryptLong(content);
	} else {
		return encrypt.encryptLong(JSON.stringify(content));
	}
}

//验证封装
export const vilidate = (obj, tip, top,viliCon,viliRule,bs,bol) => {
	if(!(viliRule.test(viliCon))) {
		//					this.$vux.toast.text('请输入手机号码')	
		warn(obj, tip, top)
		obj[bs] = false;		
		return "";
				
	}
}

//文字震动提示
export const warn = (obj, tip, top) => {
	var that = obj;
	obj['warnTip'] = tip;
	obj['warnTop'] = top;
	obj['isShake'] = true;
	var timer = setTimeout(function() {
		that['isShake'] = false;
		clearTimeout(timer)
	}, 500)
}

//判断是测试环境还是生产环境
export const judgeInv = () => {
	if(location.href.indexOf("test2-iicp-dmzstg.pingan.com.cn")) {
		
		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf25331d166e4075f&redirect_uri=https://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
		
	} else {
		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8034478ad4b8cbb&redirect_uri=https://iicp.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
	}
}
//去除字符串空格
export const trim = (str,bol) => {
	return bol?str.replace(/\s/g,""):str.replace(/(^\s*)|(\s*$)/g, "")
	
}