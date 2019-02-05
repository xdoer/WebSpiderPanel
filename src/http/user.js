import http from './http'

// 用户登录
export function userLogin(config) {
  const url = '/user/login';
  return http.post(url, config)
}

// 注册
export function userRegister(config) {
  const url = '/user/register';
  return http.post(url, config)
}

// 注销
export function userLogout() {
  const url = '/user/logout';
  return http.get(url);
}

// 删除账户
// config参数包含账号密码
export function userDelete(config) {
  const url = '/user/post';
  return http.post(url, config)
}

// 用户登录状态查询
export function userState() {
  const url = '/user/status';
  return http.get(url);
}
