<template>
  <div class="history">
    <article>
      <h1>更新日志</h1>

      <h2>3.0.0/2019-02-04</h2>

      <blockquote><ul><li>爬虫配置模型增加API标签，描述等信息</li><li>添加 redis 控制 API 请求频率</li><li>优化代码模块划分</li><li>mocha代码测试</li><li>集成HttpProxy</li><li>esLint代码规范化</li><li>完备的说明文档</li><li>3种运行环境。可配置的程序运行记录模式</li><li>API调用次数统计</li><li>被动式数据更新模式,占用服务器资源更少。可配置的API&quot;更新间隔&quot;,兼顾API访问速度与数据时效性。</li></ul></blockquote>

      <h2>2.1.0/2018-08-15</h2>

      <blockquote><ul><li>更新验证可用代理方式</li></ul></blockquote>

      <h2>2.0.0/2018-08-08</h2>

      <blockquote><ul><li>前后端分离</li></ul></blockquote>

      <h2>1.5.1/2018-08-05</h2>

      <blockquote><ul><li>添加后台前台输入验证</li><li>添加国外代理模式</li></ul></blockquote>

      <h2>1.5.0/2018-07-27</h2>

      <blockquote><ul><li>数据接口API添加成功与否的状态</li><li>优化代码。增强了应用健壮性，减少代码冗余</li><li>修复自动更新模块在应用意外重启后失效的Bug</li><li>主页面&quot;提交&quot;按钮添加锁🔐，防止多次连续不断的点击使得应用崩溃重启</li></ul></blockquote>

      <h2>1.4.0/2018-07-21</h2>

      <blockquote><ul><li>添加 JSONP 调用支持</li></ul></blockquote>

      <h2>1.3.1/2018-07-20</h2>

      <blockquote><ul><li>优化返回数据格式</li></ul></blockquote>

      <h2>1.3.0/2018-07-18</h2>

      <blockquote><ul><li>添加分享配置界面，方便查看所有分享的配置</li></ul></blockquote>

      <h2>1.2.1/2018-07-15</h2>

      <blockquote><ul><li>修复应用意外重启后，定时更新数据失效的Bug</li></ul></blockquote>

      <h2>1.2.0/2018-07-11</h2>

      <blockquote><ul><li>添加HTTP代理配置</li></ul></blockquote>

      <h2>1.1.0/2018-07-05</h2>

      <blockquote><ul><li>将抓取结果保存到数据库，后台默认每3小时更新一次数据。保证了数据接口响应速度。</li><li>针对移动端访问优化</li></ul></blockquote>

      <h2>1.0.0/2018-06-20</h2>

      <blockquote><ul><li>添加对GBK格式网页的抓取支持</li><li>添加对分页网址的抓取支持</li><li>添加登录注册</li><li>支持生成数据接口</li><li>首页面板添加用户分享的接口链接</li></ul></blockquote>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'History'
  }
</script>

<style lang="stylus">
.history{
  width 80%
  height 100%
  margin 0 auto
}
</style>