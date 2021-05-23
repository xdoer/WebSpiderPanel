import Vue from 'vue';

export default {
  get(url, config) {
    return Vue.axios.get(url, {
      params: config,
    });
  },
  post(url, config) {
    return Vue.axios.post(url, Vue.qs.stringify(config));
  },
  delete(url, config) {
    return Vue.axios.delete(url, {
      params: config,
    });
  },
};
