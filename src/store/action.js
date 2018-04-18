export default {

    updatewebChatSatetInfo({
            commit
        },
        payload) {
        commit('UPDATE_SATAINFO', payload);
    },

    updateWebChatUserInfo({
            commit
        },
        payload) {
        commit('UPDATE_USERIFO', payload);
    },

    updateIsLogin({
            commit
        },
        payload) {
        commit('UPDATE_ISLOGIN', payload);
    },

    //更新热销产品列表页码
    updatePageNum({
            commit
        },
        payload) {
        commit('UPDATE_PAGENUM', payload);
    }

}