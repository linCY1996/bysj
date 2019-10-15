import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        userMsgs:{}
    },
    mutations: {
        haslogin(state, status) {
            state.hasLogin = status;
        },
        saveUserMsgs(state, msgs) {
			state.userMsgs = msgs
		}
    }
})

export default store
