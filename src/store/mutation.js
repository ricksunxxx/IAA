const UPDATE_SATAINFO = 'UPDATE_SATAINFO';
const UPDATE_USERIFO = 'UPDATE_USERIFO';
const UPDATE_ISLOGIN = 'UPDATE_ISLOGIN';
const UPDATE_PAGENUM = 'UPDATE_PAGENUM';

export default {

    [UPDATE_SATAINFO](state, payload) {
        state.webChatSatetInfo = payload;
    },

    [UPDATE_USERIFO](state, payload) {
        state.webChatUserInfo = payload;
//     debugger
        if(payload.employeeCode && payload.employeeCode.length > 0){
        	state.isLogin =true;
        }


    },

    [UPDATE_ISLOGIN](state, payload) {
        state.isLogin = payload;
    },

    //更新热销产品列表页码
    [UPDATE_PAGENUM](state, payload) {
        state.pageNum = state.pageNum + payload.count;
    }
    
//  退出登录时

}