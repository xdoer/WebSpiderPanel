import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login.vue'
import signup from './components/signup.vue'
import manage from './components/manage.vue'

Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: "/login",
        component: login
    }, {
        path: "/register",
        component: signup
    }, {
        path: "/manage",
        component: manage
    }]
})