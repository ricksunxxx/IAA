车险订单后台接口地址http://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa/QueryCarOrderUrl.do? userId=
入参userId，用户ID
出参
成功：result：{“resultCode”:”00”,”message”:””},QueryCarOrderUrl:url
失败：result：{“resultCode”:”01”,”message”:””}
异常：result：{“resultCode”:”02”,”message”:””}



非车险订单后台接口地址：http://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa/QueryNonCarOrderUrl.do? userId=123123&insuranceType=accident&callbackUrl=

入参userId 用户id
    insuranceType 保险产品类型 险种：accident (意见险)、property (财产险)
    callbackUrl 回调地址
出参
成功：result：{“resultCode”:”00”,”message”:””}, QueryNonCarOrderUrl:url
失败：result：{“resultCode”:”01”,”message”:””}
异常：result：{“resultCode”:”02”,”message”:””}




保险中介联盟入口测试地址
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf25331d166e4075f&redirect_uri=https://test2-iicp-dmzstg.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect

保险中介联盟入口生产地址
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8034478ad4b8cbb&redirect_uri=https://iicp.pingan.com.cn/icp-portal/icp-iaa/iaa/dist/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect



