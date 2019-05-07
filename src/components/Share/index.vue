<template>
  <div class="share">
    <el-table
      :data="apis"
      v-loadmore="getNewData"
      height="calc(100% - 10px)"
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
  directives: {
    loadmore: {
      // 指令的定义
      bind(el, binding, vnode) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
          const sign = 50
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
            vnode.context.getNewData()
          }
        })
      }
    }
  },
  data() {
    return {
      apis: [],
      page: 0,
      pageSize: 10,
      show: false, // 控制类别面板显示
      tag: '', // 传递到Tag组件
      flag: true,
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
    getNewData() {
      if (this.flag) {
        this.flag = false
        try {
          fetchShareConfig({
            page: ++this.page,
            pageSize: this.pageSize
          }).then(res => {
            if (res.data.state) {
              this.apis = this.apis.concat(res.data.data.map(n => {
                n.api = `${ envConfig.baseUrl || window.location.origin }/crawl/api?user=${n.author}&cid=${n.cid}`
                return n 
              }))
              this.flag = res.data.data.length === this.pageSize
            } else {
              this.flag = false
              this.$message.info(res.data.msg);
            }
          })
        } catch(e) {
          this.$message.error(e);
        }        
      } else {
        console.log("无新数据");
      }
    }
  },
  activated() {
    this.apis = []
    this.page = 0
    this.show = false
    this.tag = ''
    this.flag = true
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