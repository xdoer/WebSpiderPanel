import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

new Vue({
    store,
    router,
    render: h => h(App),
    mounted: function() {
        //调用store中的actions中的函数
        //通过actions中的函数判断用户是否处于登录状态
        store.dispatch('set_user');
    }
}).$mount('#app')