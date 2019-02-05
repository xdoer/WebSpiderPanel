import http from './http'

export default function fetchProxies (config) {
  const url = '/proxy'
  return http.get(url, config)
}