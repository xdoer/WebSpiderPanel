<template>
  <div class="manage">
    <el-table
      :data="apis"
      class="api-table">
      <el-table-column :show-overflow-tooltip="true" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="API地址" style="width:100%">
              <span><a :href="props.row.api" target="_blank">{{props.row.api}}</a> </span>
            </el-form-item>
            <el-form-item label="开放权限">
              <span>{{ props.row.permission }}</span>
            </el-form-item>
            <el-form-item label="更新间隔">
              <span>{{ props.row.interval === '0' ? '不更新' : props.row.interval + ' 小时' }}</span>
            </el-form-item>           
            <el-form-item label="标签">
              <span v-for="(tag, idx) in props.row.tag" :key="idx" style="padding:0 5px">{{ tag }}</span>
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
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onSideShow(scope.row, scope.$index, 'edit')">编辑</el-button>
          <el-button type="info" size="mini" @click="onSideShow(scope.row, scope.$index, 'detials')">详情</el-button>
          <el-button type="danger" size="mini" @click="onDeleteApi(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition name="slide-fade">
      <edit v-if="showEdit" v-show="showEdit" :editAPI="editAPI" @change-state="onChangeState"/>
      <detail v-else v-show="showMore" :apiConfig="apiDetial" @change-state="onChangeState"/>
    </transition>
  </div>
</template>

<script>
import { fetchManageConfig, deleteConfig } from '@/http/crawl'
import envConfig from '@/config'
import Edit from './edit'
import Detail from './details'

export default {
  name: 'Manage',
  components: {
    Edit,
    Detail,
  },
  data() {
    return {
      apis: [],
      editAPI: {},
      apiDetial: {
        config: {},
      },

      page: 0,
      pageSize: 10,

      showEdit: false,
      showMore: false,
    };
  },
  methods: {
    onSideShow(config, idx, type) {
      const ele = document.querySelector('.api-table')
      ele.style.width = 'calc(100% - 400px)'
      if (type === 'edit') {
        this.editAPI = {
          site: config.config.url,
          cid: config.cid,
          tag: config.tag,
          description: config.description,
          permission: config.permission,
          interval: config.interval,
        }
        this.showEdit = true
        this.showMore = false        
      } else {
        this.apiDetial = config
        this.showMore = true
        this.showEdit = false
      }
    },
    onChangeState(type, state) {
      const ele = document.querySelector('.api-table')
      ele.style.width = '100%'
      if (type === 'edit') {
        this.showEdit = state
      } else if (type === 'detials') {
        this.showMore = state
      }
    },
    onDeleteApi({cid}, idx) {
      this.$confirm('此操作将永久删除配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(()=>{
        return deleteConfig({cid})
      })
      .then(res => {
        if (res.data.state) {
          this.apis.splice(idx, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          });          
        } else {
          this.$message({
            type: 'error',
            message: res.data.data,
          });
          console.log('配置删除失败', res.data.data)
        }        
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
  },
  activated () {
    if (!this.$store.state.user) {
      this.$router.push('enter')
    }
    fetchManageConfig({ page: this.page, pageSize: this.pageSize })
    .then(res => {
      if (res.data.state) {
        this.apis = res.data.data.map(n => {
          n.api = `${envConfig.baseUrl}/crawl/api?user=${n.author}&cid=${n.cid}`
          return n 
        })        
      } else {
        this.$message.error(res.data.msg)
      }
    })
    .catch(e => {
      console.log('捕获到错误',e)
    })
  }
};
</script>

<style lang="stylus">
.slide-fade-enter-active {
  transition all 1s ease
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
.manage{
  width 80%
  height 100%
  margin 0 auto
  position relative
  .api-table{
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
