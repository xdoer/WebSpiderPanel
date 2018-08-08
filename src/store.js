import Vue from 'vue'
import Vuex from 'vuex'
import CONF from './config'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: ""
    },
    mutations: {
        set_user(state, user) {
            state.user = user;
        }
    },
    actions: {
        set_user(context) {
            axios.get(`${CONF.BASEURL}/userstatus`)
                .then(function(response) {
                    if (response.data.state) {
                        context.commit("set_user", response.data.data)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
})