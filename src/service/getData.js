import 'promise-polyfill'
import 'whatwg-fetch'


//本地

//       const HTTP_BASE_PATH_LOGIN = "http://IQSZ-L5767:9088/icp-portal/icp-iaa"; //before login
//       const HTTP_BASE_PATH = "http://IQSZ-L5767:9088/icp-portal/icp-iaa/iaa"; //after login


//测试

//const HTTP_BASE_PATH_LOGIN = "http://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa"; //before login
//const HTTP_BASE_PATH = "http://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa";   //after login


//测试、生产
//
const HTTP_BASE_PATH_LOGIN = "/icp-portal/icp-iaa"; //before login
const HTTP_BASE_PATH = "/icp-portal/icp-iaa/iaa"; //after login



//封装fetch API
const fetchFun = (url, data) => fetch(url, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
}).then(function (response) {
    return response.json()
});


const fetchFunGet = (url, data) => {
    var str = "";
    for (var key in data) {
        str = str + key + "=" + data[key] + "&"
    }
    var url = url + "?" + str.substr(0, str.length - 1);

    return fetch(url, {
        credentials: "same-origin"
    })
}



/**
 *
 *登录页面
 *
 */
//获取微信ID加密串
export const getOpenId = (data) => fetchFunGet(HTTP_BASE_PATH_LOGIN + "/beforeLogin/weChat/getWeOpenID.do", data);


//查询绑定用户的信息
export const getWeChatUserInfo = (data) => fetchFunGet(HTTP_BASE_PATH_LOGIN + '/beforeLogin/WeChatUser/getWeChatUserInfo.do', data);


//获取验证码接口
export const sendSmsCode = (data) => fetchFunGet(HTTP_BASE_PATH_LOGIN + '/beforeLogin/WeChatUser/sendSmsCode.do', data);


//点击登录绑定微信账号
export const saveWeChatUserInfo = (data) => fetchFunGet(HTTP_BASE_PATH_LOGIN + '/beforeLogin/WeChatUser/saveWeChatUserInfo.do', data);

//微信自定义功能参数获取
export const getWeChatTicket = (data) => fetchFun(HTTP_BASE_PATH_LOGIN + '/beforeLogin/weChat/getWeChatTicket.do', data);



/**
 *
 *首页
 *
 */
//获取更多热销产品
export const getMoreProduct = (data) => fetchFun(HTTP_BASE_PATH + '/product/queryProductLists.do', data);



/**
 *
 *个人中心
 *
 */
//获取账号余额
export const getBalance = (data) => fetchFun(HTTP_BASE_PATH + '/user/getUserBalance.do', data);


//跳转至订单中心
export const goToOrderCenter = (data) => {
    let url = data.insuranceType === 'carInsurance' ?
        HTTP_BASE_PATH + '/QueryCarOrderUrl.do' : // 车险
        HTTP_BASE_PATH + '/QueryNonCarOrderUrl.do'; // 非车险

    return fetchFun(url, data);
}

//退出登录
export const logOut = (data) => fetchFun(HTTP_BASE_PATH + '/WeChatUser/logout.do', data);

//图形验证码
export const validCodeUrl=()=>{
	return HTTP_BASE_PATH_LOGIN+"/common/imageCode/randCodeImageRequest.do"+"?"+Math.random(12);
}

//修改密码-验证手机验证码
export const forgetValidCode = (data) => fetchFun(HTTP_BASE_PATH_LOGIN + '/beforeLogin/WeChatUser/checkVerifyCodeText.do', data);

//修改密码,确定提交
export const forgetSubmit = (data) => fetchFun(HTTP_BASE_PATH_LOGIN + '/beforeLogin/WeChatUser/resetUserPwd.do', data);