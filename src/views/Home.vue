<template>
  <div class="container">
  <el-menu :default-active="activeIndex" class="head" mode="horizontal" @select="handleClick">
    <el-menu-item v-for="(item, idx) in tabList" :key="idx" :index="''+idx">{{item.label}}</el-menu-item>
  </el-menu>
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
  data() {
    return {
      activeIndex: '0',
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
    handleClick(idx) {
      this.$router.push(`/${this.tabList[idx].name}`);
    },
  },
  mounted() {
    const main = document.querySelector('.main');
    let activeIndex = '0'
    switch (this.$route.name) {
      case 'crawl': activeIndex = this.tabList.findIndex(n=>n.name === 'crawl'); break;
      case 'guide': activeIndex = this.tabList.findIndex(n=>n.name === 'guide'); break;
      case 'proxy': activeIndex = this.tabList.findIndex(n=>n.name === 'proxy'); break;
      case 'share': activeIndex = this.tabList.findIndex(n=>n.name === 'share'); break;
      case 'manage': activeIndex = this.tabList.findIndex(n=>n.name === 'manage'); break;
      case 'log': activeIndex = this.tabList.findIndex(n=>n.name === 'log'); break;
    }
    this.activeIndex = '' + activeIndex
  },
};
</script>

<style lang="stylus">
.container{
  height 100%
  width 70%
  margin 0 auto
  -webkit-box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
  box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
  .head{
    height 60px
  }
  .main{
    padding-top 10px
    height calc(100% - 70px)
    width 100%
    // border 1px solid yellow
    overflow-y scroll
  }
}

</style>
