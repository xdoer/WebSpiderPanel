<template>
  <div class="proxy">
    <div class="config">
      代理检测说明
    </div>
    <div class="preview">
      {{ result }}
    </div>
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