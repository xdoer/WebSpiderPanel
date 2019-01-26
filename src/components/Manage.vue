<template>
  <div class="manage">
    <div class="contral">
      <div><el-button type="primary">登录</el-button></div>
      <div><el-button type="primary">注册</el-button></div>
    </div>
    <div class="panel">
      <el-table
        :data="apis"
        style="width: 100%">
        <el-table-column :show-overflow-tooltip="true" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="API地址" style="width:100%">
                <span>{{ props.row.api }}</span>
              </el-form-item>
              <el-form-item label="配置ID" style="width:100%">
                <span>{{ props.row.cid }}</span>
              </el-form-item>
              <el-form-item label="开放权限">
                <span>{{ props.row.permission }}</span>
              </el-form-item>
              <el-form-item label="更新间隔">
                <span>{{ props.row.interval }}</span>
              </el-form-item>
              <el-form-item label="抓取模式">
                <span>{{ props.row.config.mode }}</span>
              </el-form-item>
              <el-form-item label="代理模式">
                <span>{{ props.row.config.proxyMode }}</span>
              </el-form-item>              
              <el-form-item label="标签">
                <span>{{ props.row.tag }}</span>
              </el-form-item>
              <el-form-item label="描述信息" style="width:100%">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="目标网站"
          width="400px"
          prop="config.url">
        </el-table-column>
        <el-table-column
          width="200px"
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="onEditApi(scope.row, scope.$index)">编辑</el-button>
            <el-button type="danger" size="mini" @click="onDeleteApi(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { fetchManageConfig, deleteConfig } from '../api/crawl';
import { resolve } from 'q';
export default {
  name: 'Manage',
  data() {
    return {
      apis: [{
        cid: 'c2ef091d-2b03-48be-bf93-acfe9bf147c1',
        api: 'http://localhost:3000/crawl/api?user=han&cid=a',
        permission: true,
        interval: 0,
        config: {
          url: 'https://www.thepaper.cn',
          charset: 'utf-8',
          proxyMode: 'none',
          mode: 'plain',          
        },
        tag: '新闻',
        description: '无描述信息',
      }],
      page: 0,
      pageSize: 10,
    };
  },
  methods: {
    onEditApi({cid}) {
      console.log(cid);
    },
    onDeleteApi({cid}, idx) {
      this.$confirm('此操作将永久删除配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(()=>{
        const res = deleteConfig({cid})
        if (res.data.state) {
          this.apis.splice(idx, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          });          
        } else {
          this.$message({
            type: 'error',
            message: '删除失败',
          });
          console.log('配置删除失败', res.data.data)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
  async mounted() {
    try {
      const res = await fetchManageConfig({ page: this.page, pageSize: this.pageSize })
      this.apis = res.data.data
    } catch(e) {
      console.log('捕获到错误',e)
    }
  },
};
</script>

<style lang="stylus">
.manage{
  width 80%
  height 100%
  margin 0 auto
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
</style>
