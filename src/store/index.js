import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
    webChatSatetInfo: {},
    webChatUserInfo: {},
    isLogin: false
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})