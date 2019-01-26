import Vue from 'vue'

// 获取公开权限的api
export function fetchShareConfig(config) {
  const url = '/crawl/share';
  return Vue.axios.get(url, {
    params: config,
  });
}

// 后台登录，用户看到的api信息
export function fetchManageConfig(config) {
  const url = '/crawl/config';
  return Vue.axios.get(url, {
    params: config,
  });
}

// 后台登录，用户更新api信息
export function updateConfig(config) {
  const url = '/crawl/config';
  return Vue.axios.post(url, Vue.qs.stringify(config));
}

// 后台登录，用户删除api
export function deleteConfig(config) {
  const url = '/crawl/config';
  return Vue.axios.delete(url, {
    params: config,
  });
}
