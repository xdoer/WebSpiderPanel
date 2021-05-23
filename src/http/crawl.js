import http from './http';

// 爬虫预览
export function fetchPreview(config) {
  const url = '/crawl/preview';
  return http.post(url, config);
}
