<template>
  <div class="container">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.name">{{ tab.label }}</el-tab-pane>
      </el-tabs>
    </div>
    <div class="main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      activeName: 'crawl',
      tabList:[{
        label: 'WebSpider',
        name: 'crawl'
      }, {
        label: 'Http代理',
        name: 'proxy'
      }, {
        label: '操作说明',
        name: 'guide',
      }, {
        label: 'API分享',
        name: 'share',
      }, {
        label: '管理面板',
        name: 'manage'
      }, {
        label: '更新日志',
        name: 'log'
      }]
    }
  },
  methods: {
    handleClick(tab) {
      this.$router.push(`/${tab.name}`)
    }
  }
};
</script>

<style lang="stylus">
.container{
  height 100vh
  width 70%
  margin 20px auto 0px
  .head{
    width 100%
  }
  .main{
    width 100%
    height 500px
    padding 20px 0px 0px 0px
    // background yellow
  }
}

  

</style>