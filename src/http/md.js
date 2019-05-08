import http from './http'

export function fetchGuideMd(config) {
  const url = '/guide';
  return http.get(url, config)
}

export function fetchHistoryMd(config) {
  const url = '/history';
  return http.get(url, config)
}