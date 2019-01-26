/* eslint-disable */

'use strict';

import Vue from 'vue';
import qs from 'qs';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'http://localhost:3000';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: 'http://localhost:3000',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  Vue.qs = qs;
  window.axios = _axios;
  window.qs = qs;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
    qs: {
      get() {
        return qs;
      }
    },
    $qs: {
      get() {
        return qs;
      }
    }

  });
};

Vue.use(Plugin);

export default Plugin;
