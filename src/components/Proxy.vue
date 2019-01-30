<template>
  <div class="proxy">
    <fieldset>
      <legend>代理检测说明</legend>
      <div class="config">
        <ul>
          <li>代理来源于<a href="https://www.xicidaili.com/" target="_blank" rel="noopener noreferrer">西刺代理</a>和<a href="https://free-proxy-list.net/" target="_blank" rel="noopener noreferrer">FreeProxyList</a></li>
          <li>检测原理:程序在设置代理后，对特定网站进行请求，检测返回的内容是否符合预期。</li>
        </ul>
      </div>      
    </fieldset>
    <fieldset>
      <legend>结果面板</legend>
      <div class="preview">
        {{ result }}
      </div>      
    </fieldset>
  </div>
</template>

<script>
import fetchProxies from '../api/proxy'
export default {
  name: 'Proxy',
  data () {
    return {
      result: '正在请求中，请等待...'
    }
  },
  async mounted () {
    try{
      const res = await fetchProxies();
      this.result = res.data
    } catch(e) {
      console.log(`代理获取失败${e}`)
    }
  }
}
</script>

<style lang="stylus">
.proxy{
  width 80%
  height 100%
  margin 0 auto
}
</style>