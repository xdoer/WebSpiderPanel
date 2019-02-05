<template>
  <div class="details">
    <span class="close" @click="hiddenDetails"></span>
    <h2>详情</h2>
    <div class="main">
      <table>
        <tr>
          <td>目标网址</td>
          <td>{{ apiConfig.config.url }}</td>
        </tr>
        <tr>
          <td>深度</td>
          <td>{{ apiConfig.config.depth }}</td>
        </tr>
        <tr>
          <td>编码</td>
          <td>{{ apiConfig.config.charset }}</td>
        </tr>
        <tr>
          <td>抓取模式</td>
          <td>{{ apiConfig.config.mode === 'plain' ? '普通模式' : '分页模式' }}</td>
        </tr> 
        <tr>
          <td>标签选择器</td>
          <td><span v-for="(item, idx) in apiConfig.config.tags" :key="idx">{{ item }}</span></td>
        </tr>
        <tr>
          <td>输出</td>
          <td>{{ apiConfig.config.form }}</td>
        </tr>
        <tr v-if="apiConfig.config.proxyMode === '自定义代理'">
          <td>代理</td>
          <td><span v-for="(item, idx) in apiConfig.config.proxies" :key="idx">{{ item }}</span></td>
        </tr>
        <tr>
          <td>代理模式</td>
          <td>{{ apiConfig.config.proxyMode === 'none' ? '无代理' : apiConfig.config.proxyMode === 'internal' ? '内置代理' : '自定义代理' }}</td>
        </tr>
        <tr v-if="apiConfig.config.mode !== 'plain'">
          <td>起始页</td>
          <td>{{ apiConfig.config.start }}</td>
        </tr>
        <tr v-if="apiConfig.config.mode !== 'plain'">
          <td>终止页</td>
          <td>{{ apiConfig.config.end }}</td>
        </tr>
        <tr>
          <td>权限</td>
          <td>{{ apiConfig.permission }}</td>
        </tr>
        <tr>
          <td>更新间隔</td>
          <td>{{ apiConfig.interval }}</td>
        </tr>
        <tr>
          <td>API标签</td>
          <td><span v-for="(item, idx) in apiConfig.tag">{{ item }}</span></td>
        </tr>
        <tr>
          <td>描述信息</td>
          <td>{{ apiConfig.description }}</td>
        </tr>
        <tr><td></td></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: {
    apiConfig: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    hiddenDetails() {
      this.$emit('change-state', 'detials', false)
    },
  },
}
</script>

<style lang="stylus" scoped>
.details{
  width 400px
  height calc(100% - 100px)
  box-shadow 0 4px 14px -6px rgba(0,0,0,0.4)
  position fixed
  right 16vw
  padding 10px
  background #ffffff
  .close{
    display inline-block
    width 30px
    height 30px
    border-radius 15px
    position absolute
    right 15px
    top 35px
    cursor pointer
    background url('../../assets/close.png') no-repeat center
    background-size 15px
    box-shadow 0 0 14px -6px rgba(0,0,0,0.4)
  }
  h2{
    height 40px
    line-height 40px
  }
  .main{
    height calc(100% - 55px)
    overflow-y scroll
    table{
      table-layout fixed
      width 100%
      tr{
        td{
          height 25px
          padding 10px
        }
        td:first-of-type{
          text-indent 10px
          width 30%
        }
      }
    }
  }
}
.details::-webkit-scrollbar{
    display none
}
</style>

