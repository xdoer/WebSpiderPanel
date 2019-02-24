<template>
  <div class="tag-type">
    <span class="close" @click="hiddenPanel"></span>
    <h2>{{ tagType }}</h2>
    <el-table
      :data="apis"
      style="width: 100%">
      <el-table-column type="expand">
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
    </el-table>
  </div>
</template>

<script>
import { fetchTag } from '@/http/crawl'
import envConfig from '@/config'

export default {
  name: 'Tag',
  props:{
    tagType: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      apis: []
    }
  },
  methods: {
    hiddenPanel() {
      this.$emit('change-state')
    },
  },
  watch: {
    tagType() {
      fetchTag({tag: this.tagType})
      .then(res => {
        if (res.data.state) {
          this.apis = res.data.data.map(n => {
            n.api = `${ envConfig.baseUrl || window.location.origin }/crawl/api?user=${n.author}&cid=${n.cid}`
            return n 
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
      .catch(e => {
        this.$message.error(e)
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.tag-type{
  width 400px
  height calc(100% - 100px)
  box-shadow 0 4px 14px -6px rgba(0,0,0,0.4)
  position fixed
  right 16vw
  padding 10px
  background #ffffff
  overflow-y scroll
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }  
}
.tag-type::-webkit-scrollbar {
    display none
}

</style>

