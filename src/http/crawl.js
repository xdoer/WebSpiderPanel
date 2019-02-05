import http from './http'

// 获取公开权限的api
export function fetchShareConfig(config) {
  const url = '/crawl/share';
  return http.get(url, config)
}

// 获取公开权限的api
export function fetchTag(config) {
  console.log(config)
  const url = '/crawl/tag';
  return http.get(url, config)
}

// 后台登录，用户看到的api信息
export function fetchManageConfig(config) {
  const url = '/crawl/config';
  return http.get(url, config)
}

// 后台登录，用户更新api信息
export function updateConfig(config) {
  const url = '/crawl/config';
  return http.post(url, config);
}

// 后台登录，用户删除api
export function deleteConfig(config) {
  const url = '/crawl/config';
  return http.delete(url, config);
}

// 爬虫预览
export function fetchPreview(config) {
  const url = '/crawl/preview';
  return http.post(url, config)
}

// 生成API
export function saveConfig(config) {
  const url = '/crawl/save';
  return http.post(url, config);
}
