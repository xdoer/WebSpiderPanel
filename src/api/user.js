import Vue from 'vue'

// 用户登录
export function userLogin(config) {
  const url = '/user/login';
  return Vue.axios.post(url, Vue.qs.stringify(config));
}

// 注册
export function userRegister(config) {
  const url = '/user/register';
  return Vue.axios.post(url, Vue.qs.stringify(config));
}

// 注销
export function userLogout() {
  const url = '/user/logout';
  return Vue.axios.get(url);
}

// 删除账户
// config参数包含账号密码
export function userDelete(config) {
  const url = '/user/post';
  return Vue.axios.post(url, Vue.qs.stringify(config));
}
