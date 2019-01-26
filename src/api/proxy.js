import Vue from 'vue'

export default function fetchProxies () {
  const url = '/proxy';
  return Vue.axios.get(url);
}