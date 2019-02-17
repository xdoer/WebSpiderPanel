<template>
  <div class="statistics">
    <span class="close" @click="hiddenDetails"></span>
    <h2>API调用统计</h2>
    <div class="main" v-if="apiStatistics.state">
      <table>
        <tr>
          <td>{{ apiStatistics.api }}</td>
        </tr>
        <tr>
          <td>该API创建于{{ apiStatistics.time }}，距今共计调用{{ apiStatistics.count }}次</td>
        </tr>
      </table>
      <p>调用列表如下</p>
      <ul class="year" v-for="(year, idx) in apiStatistics.history" :key="idx">
        <li>
          {{ year.year }}年
        </li>
        <li>
          <ul class="month" v-for="(month, idx) in year.data" :key="idx">
            <li>{{ month.month }}月</li>
            <li class="date" v-for="(date, idx) in month.data" :key="idx">         
              <ul>
                <li>{{ date.day }}日</li>
                <li>
                  <ul class="time" v-for="(time, idx) in date.data" :key="idx">
                    <li>{{ time }}</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>          
        </li>
      </ul>
    </div>
    <div v-else>
      <p>该API尚未初始化，没有该API调用信息</p>
    </div>
  </div>
</template>

<script>
import { fetchStatistics } from '@/http/statistics';

export default {
  name: 'Statistics',
  props: {
    apiStatistics: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    hiddenDetails() {
      this.$emit('change-state', 'statistics', false);
    },
  },
};
</script>

<style lang="stylus" scoped>
.statistics{
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
  ul{
    list-style none
    margin 0
    // padding 0 0 0 20px
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
      }
    }
  }
}
.details::-webkit-scrollbar{
    display none
}
</style>

