import http from './http';

// 用户登录
export function fetchStatistics(config) {
  const url = '/statistics';
  return http.get(url, config);
}
