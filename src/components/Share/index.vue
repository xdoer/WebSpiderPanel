<template>
  <div class="share">
    <el-table
      :data="apis"
      style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="API地址" style="width:100%">
              <span><a :href="props.row.api" target="_blank">{{props.row.api}}</a> </span>
            </el-form-item>
            <el-form-item label="更新间隔">
              <span>{{ props.row.interval === '0' ? '不更新' : props.row.interval + ' 小时' }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.author }}</span>
            </el-form-item>            
            <el-form-item label="描述信息" style="width:100%">
              <span>{{ props.row.description }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="目标地址"
        prop="config.url">
      </el-table-column>
      <el-table-column
        align="right"
        label="标签">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-for="tag in scope.row.tag" @click="onGetTag(tag)">{{ tag }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition name="slide-fade">
      <tag v-show="show" :tagType="tag" @change-state="onChangeState"/>
    </transition>
  </div>
</template>

<script>
import { fetchShareConfig } from '@/http/crawl'
import Tag from './tag'
import envConfig from '@/config'

export default {
  name: 'Share',
  components: {
    Tag
  },
  data() {
    return {
      apis: [{
        api: 'http://localhost:3000/crawl/api?user=han&cid=a',
        interval: 0,
        config: {
          url: 'https://www.thepaper.cn',
          charset: 'utf-8',
          proxyMode: 'none',
          mode: 'plain',
          depth: '2',
          tags: ['aaa'],
          form: 'aaaa',
          start: 1,
          end: 2
        },
        tag: ['新闻', '足球'],
        description: '无描述信息',
      }],
      page: 0,
      pageSize: 10,
      show: false, // 控制类别面板显示
      tag: '', // 传递到Tag组件
    }
  },
  methods: {
    onGetTag(tag) {
      const ele = document.querySelector('.el-table')
      ele.style.width = 'calc(100% - 400px)'
      this.tag = tag
      this.show = true
    },
    onChangeState(type, state) {
      const ele = document.querySelector('.el-table')
      ele.style.width = '100%'
      this.show = false
    },
  },
  activated() {
    try {
      fetchShareConfig({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.state) {
          this.apis = res.data.data.map(n => {
            n.api = `${ envConfig.baseUrl || window.location.origin }/crawl/api?user=${n.author}&cid=${n.cid}`
            return n 
          })
        } else {
          this.$message.info(res.data.msg);
        }        
      })
    } catch(e) {
      this.$message.error(e);
    }
  },
}
</script>

<style lang="stylus">
.slide-fade-enter-active {
  transition all 1s ease
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
.share{
  width 80%
  height 100%
  margin 0 auto
  position relative
  .el-table{
    width 100%
    float left
    transition all 1s ease    
    .demo-table-expand {
      font-size: 0;
      label {
        width: 90px;
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }    
  }

}
</style>