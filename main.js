import Vue from 'vue'
import App from './App'
import Host from "./common/request"
import store from './store'
import axios from 'axios';
import qs from 'qs'

Vue.prototype.$ajax = axios;
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.$store = store
Vue.prototype.$http = Host

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
