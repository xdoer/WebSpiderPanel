import Vue from 'vue';
import Vuex from 'vuex';
import { userState } from '@/http/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setUser(context) {
      return new Promise((resolve, reject) => {
        userState().then(res => {
          if (res.data.state) {
            context.commit('setUser', res.data.data);
            resolve();
          } else {
            reject();
          }
        }).catch(err => {
          console.error("网络错误", err);
        });
      })

    }
  },
});
