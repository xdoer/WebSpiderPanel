<template>
  <div class="container">
    <el-tabs
      v-model="activeName"
      tab-position="left"
      type="border-card"
      class="panel"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabList"
        :key="tab.label"
        :label="tab.label"
        :name="tab.name">
        {{ tab.label }}
      </el-tab-pane>
      <div class="main">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      activeName: 'crawl',
      tabList: [{
        label: 'WebSpider',
        name: 'crawl',
      }, {
        label: 'Http代理',
        name: 'proxy',
      }, {
        label: 'API Store',
        name: 'share',
      }, {
        label: '管理面板',
        name: 'manage',
      }, {
        label: '使用说明',
        name: 'guide',
      }, {
        label: '更新日志',
        name: 'log',
      }],
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push(`/${tab.name}`);
    },
  },
  mounted() {
    const main = document.querySelector('.main');
    main.style.height = `calc(100vh - ${main.offsetTop + 50}px)`;

    switch (this.$route.name) {
      case 'crawl': this.activeName = 'crawl'; break;
      case 'guide': this.activeName = 'guide'; break;
      case 'proxy': this.activeName = 'proxy'; break;
      case 'share': this.activeName = 'share'; break;
      case 'manage': this.activeName = 'manage'; break;
      case 'log': this.activeName = 'log'; break;
      default: this.activeName = 'crawl'; break;
    }
  },
};
</script>

<style lang="stylus">
.container{
  height calc(100vh - 30px)
  width 70%
  margin 20px auto 10px
  .panel{
    height 100%
    .main{
      padding-top 10px
      height calc(100% - 10px)
      overflow-y scroll
      border 1px solid #dcdfe6
      -webkit-box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
      box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
    }
  }
}

</style>
