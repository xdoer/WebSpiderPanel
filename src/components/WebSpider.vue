<template>
  <div class="webspider">
    <div class="config">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="ruleForm">
        <el-form-item label="目标网站" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="网页编码" prop="code">
          <el-select v-model="ruleForm.code" placeholder="请选择网页编码">
            <el-option label="utf-8" value="utf-8"></el-option>
            <el-option label="gbk" value="bgk"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抓取模式" prop="mode">
          <el-select v-model="ruleForm.mode" placeholder="请选择抓取模式">
            <el-option label="普通模式" value="plain"></el-option>
            <el-option label="分页模式" value="Pagination"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抓取深度" prop="depth">
          <el-select v-model="ruleForm.depth" placeholder="请选择抓取深度">
            <el-option label="1" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-for="i in ruleForm.depth" :label="`${i}级标签选择器`" prop="proxy">
          <el-input v-model="ruleForm.tag[i]"></el-input>
        </el-form-item>


        <el-form-item label="代理模式" prop="proxyMode">
          <el-select v-model="ruleForm.proxyMode" placeholder="请选择代理模式">
            <el-option label="内置代理" value="internal"></el-option>
            <el-option label="自定义代理" value="own"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="代理地址" prop="proxy" v-if="ruleForm.proxyMode === 'own'">
          <el-input v-model="ruleForm.proxy"  placeholder="请输入代理地址"></el-input>
        </el-form-item>

        <el-form-item label="输出格式" prop="output">
          <el-input type="textarea" v-model="ruleForm.output"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">预览结果</el-button>
          <el-button @click="resetForm('ruleForm')">生成API</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="preview">
      啦啦
    </div>
  </div>
</template>

<script>
export default {
  name: 'Crawl',
  data () {
    return {
      ruleForm: {
        name: '',
        code: '',
        mode: '',
        proxyMode: '',
        proxy: '',
        type: [],
        output: '',
        depth: 1,
        tag: new Array(3)
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
}
</script>

<style lang="stylus">
.webspider{
  width 80%
  height 100%
  margin 0 auto
}
</style>