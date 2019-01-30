<template>
  <div class="share">
    <el-table
      :data="apis"
      style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="API地址" style="width:100%">
              <span>{{ props.row.api }}</span>
            </el-form-item>
            <el-form-item label="抓取深度">
              <span>{{ props.row.config.depth }}</span>
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
            <el-form-item label="选择器" style="width:100%">
              <span>{{ props.row.config.tags }}</span>
            </el-form-item>
            <el-form-item label="输出格式" style="width:100%">
              <span>{{ props.row.config.form }}</span>
            </el-form-item>
            <el-form-item label="描述信息" style="width:100%">
              <span>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="目标网站"
        prop="config.url">
      </el-table-column>
      <el-table-column
        align="right"
        label="标签">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onGetTag(scope.row, scope.$index)">{{scope.row.tag}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchShareConfig } from '@/api/crawl'
export default {
  name: 'Share',
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
        tag: '新闻',
        description: '无描述信息',
      }],
      page: 0,
      pageSize: 10,
    }
  },
  methods: {
    onGetTag(item, idx) {
      console.log(item, idx)
    }
  },
  async mounted() {
    try {
      const res = await fetchShareConfig()
      console.log(res.data)
      if (res.data.state) {
        this.apis = res.data.data
      } else {
        console.log('失败')
      }
    } catch(e) {
      console.log('数据获取失败')
    }
  },
}
</script>

<style lang="stylus">
.share{
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