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
      <div class="nav-btn">
        <div class="nav-btn-left">
          <span><a href="https://proxies.docmobile.cn" target="_blank" rel="noopener noreferrer">HttpProxy</a></span>
          <span><a href="https://github.com/LuckyHH/HttpProxy" target="_blank" rel="noopener noreferrer">项目地址</a></span>
          <span><a href="http://spider.docmobile.cn/proxy" target="_blank" rel="noopener noreferrer">API</a></span>
        </div>
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
import fetchProxies from '@/http/proxy'
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
      this.result = e
    }
  }
}
</script>

<style lang="stylus">
.proxy{
  width 80%
  height 100%
  margin 0 auto
  .nav-btn{
    height 30px
    display flex
    justify-content left
    font-size 70%
    color #868282
    span{
      cursor pointer
      display inline-block
      padding 0 10px
    }
    a{
      font-size 70%
      color #868282
      text-decoration none
    }
  }
}
</style>