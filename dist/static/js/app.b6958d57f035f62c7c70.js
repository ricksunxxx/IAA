webpackJsonp([14],{"1OFZ":function(e,n){},M93x:function(e,n,t){var o=t("VU/8")(t("xzd6"),t("vFMz"),function(e){t("1OFZ")},null,null);e.exports=o.exports},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("7+uW"),r=t("/ocq"),a=t("M93x"),i=t.n(a);o.a.use(r.a);var u,c=new r.a({routes:[{path:"/",component:i.a,children:[{path:"",redirect:"/login"},{path:"/home",name:"Home",component:function(e){return Promise.all([t.e(0),t.e(4)]).then(function(){return e(t("OC6q"))}.bind(null,t)).catch(t.oe)}},{path:"/login",name:"Login",component:function(e){return Promise.all([t.e(0),t.e(3)]).then(function(){return e(t("fAfb"))}.bind(null,t)).catch(t.oe)}},{path:"/my",name:"My",component:function(e){return Promise.all([t.e(0),t.e(5)]).then(function(){return e(t("lqqW"))}.bind(null,t)).catch(t.oe)}},{path:"/aboutUs",name:"AboutUs",component:function(e){return t.e(9).then(function(){return e(t("kn9R"))}.bind(null,t)).catch(t.oe)}},{path:"/carInsurance",name:"CarInsurance",component:function(e){return Promise.all([t.e(0),t.e(1)]).then(function(){return e(t("/Xsc"))}.bind(null,t)).catch(t.oe)}},{path:"/help",name:"Help",component:function(e){return t.e(11).then(function(){return e(t("lOUG"))}.bind(null,t)).catch(t.oe)}},{path:"/orderCenter",name:"OrderCenter",component:function(e){return t.e(12).then(function(){return e(t("aDGC"))}.bind(null,t)).catch(t.oe)}},{path:"/orderDetail",name:"OrderDetail",component:function(e){return Promise.all([t.e(0),t.e(7)]).then(function(){return e(t("CeBB"))}.bind(null,t)).catch(t.oe)}},{path:"/personalInfo",name:"PersonalInfo",component:function(e){return t.e(10).then(function(){return e(t("697Q"))}.bind(null,t)).catch(t.oe)}},{path:"/carIntroduce",name:"CarIntroduce",component:function(e){return t.e(8).then(function(){return e(t("uVxe"))}.bind(null,t)).catch(t.oe)}},{path:"/productSearch",name:"ProductSearch",component:function(e){return Promise.all([t.e(0),t.e(2)]).then(function(){return e(t("f/Am"))}.bind(null,t)).catch(t.oe)}},{path:"/myInfor",name:"MyInfor",component:function(e){return Promise.all([t.e(0),t.e(6)]).then(function(){return e(t("M+2K"))}.bind(null,t)).catch(t.oe)}}]}]}),l=t("NYxO"),m=t("bOdI"),f=t.n(m),s=(u={},f()(u,"UPDATE_SATAINFO",function(e,n){e.webChatSatetInfo=n}),f()(u,"UPDATE_USERIFO",function(e,n){e.webChatUserInfo=n,n.employeeCode&&n.employeeCode.length>0&&(e.isLogin=!0)}),f()(u,"UPDATE_ISLOGIN",function(e,n){e.isLogin=n}),f()(u,"UPDATE_PAGENUM",function(e,n){e.pageNum=e.pageNum+n.count}),u);o.a.use(l.a);var p=new l.a.Store({state:{webChatSatetInfo:{},webChatUserInfo:{},isLogin:!1},getters:{webChatSatetInfo:function(e){return e.webChatSatetInfo},webChatUserInfo:function(e){return e.webChatUserInfo},isLogin:function(e){return e.isLogin}},actions:{updatewebChatSatetInfo:function(e,n){(0,e.commit)("UPDATE_SATAINFO",n)},updateWebChatUserInfo:function(e,n){(0,e.commit)("UPDATE_USERIFO",n)},updateIsLogin:function(e,n){(0,e.commit)("UPDATE_ISLOGIN",n)},updatePageNum:function(e,n){(0,e.commit)("UPDATE_PAGENUM",n)}},mutations:s});t("RmtD");o.a.config.productionTip=!1,new o.a({el:"#app",router:c,store:p,render:function(e){return e(i.a)}})},RmtD:function(e,n){!function(e,n){function t(){var n=a.getBoundingClientRect().width;n/c>540&&(n=540*c);var t=n/10;a.style.fontSize=t+"px",m.rem=e.rem=t}var o,r=e.document,a=r.documentElement,i=r.querySelector('meta[name="viewport"]'),u=r.querySelector('meta[name="flexible"]'),c=0,l=0,m=n.flexible||(n.flexible={});if(i){console.warn("将根据已有的meta标签来设置缩放比例");var f=i.getAttribute("content").match(/initial\-scale=([\d\.]+)/);f&&(l=parseFloat(f[1]),c=parseInt(1/l))}else if(u){var s=u.getAttribute("content");if(s){var p=s.match(/initial\-dpr=([\d\.]+)/),d=s.match(/maximum\-dpr=([\d\.]+)/);p&&(c=parseFloat(p[1]),l=parseFloat((1/c).toFixed(2))),d&&(c=parseFloat(d[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var h=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),b=e.devicePixelRatio;l=1/(c=h?b>=3&&(!c||c>=3)?3:b>=2&&(!c||c>=2)?2:1:1)}if(a.setAttribute("data-dpr",c),!i)if(i=r.createElement("meta"),i.setAttribute("name","viewport"),i.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no"),a.firstElementChild)a.firstElementChild.appendChild(i);else{var v=r.createElement("div");v.appendChild(i),r.write(v.innerHTML)}e.addEventListener("resize",function(){clearTimeout(o),o=setTimeout(t,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(o),o=setTimeout(t,300))},!1),"complete"===r.readyState?r.body.style.fontSize=12*c+"px":r.addEventListener("DOMContentLoaded",function(){r.body.style.fontSize=12*c+"px"},!1),t(),m.dpr=e.dpr=c,m.refreshRem=t,m.rem2px=function(e){var n=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(n+="px"),n},m.px2rem=function(e){var n=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(n+="rem"),n}}(window,window.lib||(window.lib={}))},vFMz:function(e,n){e.exports={render:function(){var e=this.$createElement,n=this._self._c||e;return n("transition",{attrs:{name:"router-fade"}},[n("router-view")],1)},staticRenderFns:[]}},xzd6:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"app"}}},["NHnr"]);
//# sourceMappingURL=app.b6958d57f035f62c7c70.js.map