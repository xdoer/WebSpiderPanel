<template>
  <div class="webspider">
    <div class="config">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" label-position="right" class="ruleForm">
        <el-form-item label="目标网站" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="网页编码" prop="charset">
          <el-select v-model="ruleForm.charset" placeholder="请选择网页编码">
            <el-option label="utf-8" value="utf-8"></el-option>
            <el-option label="gbk" value="bgk"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抓取模式" prop="mode">
          <el-select v-model="ruleForm.mode" placeholder="请选择抓取模式">
            <el-option label="普通模式" value="plain"></el-option>
            <el-option label="分页模式" value="pagination"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分页起始页" prop="start" v-if="ruleForm.mode === 'pagination'" class="input-nmber">
          <el-input-number v-model="ruleForm.start" :min="0" :max="ruleForm.end-1" label="起始页"></el-input-number>
        </el-form-item>

        <el-form-item label="分页终止页" prop="end"  v-if="ruleForm.mode === 'pagination'" class="input-nmber">
          <el-input-number v-model="ruleForm.end" :min="ruleForm.start+1" :max="100" label="终止页"></el-input-number>
        </el-form-item>

        <el-form-item label="抓取深度" prop="depth">
          <el-select v-model="ruleForm.depth" placeholder="请选择抓取深度">
            <el-option label="1" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-for="i in ruleForm.depth" :key="i" :label="`${i}级标签选择器`" prop="tags">
          <el-input v-model="ruleForm.tags[i-1]"></el-input>
        </el-form-item>


        <el-form-item label="代理模式" prop="proxyMode">
          <el-select v-model="ruleForm.proxyMode" placeholder="请选择代理模式">
            <el-option label="内置代理" value="internal"></el-option>
            <el-option label="无代理" value="none"></el-option>
            <el-option label="自定义代理" value="own"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="代理地址" prop="proxy" v-if="ruleForm.proxyMode === 'own'">
          <el-input v-model="ruleForm.proxy"  placeholder="请输入代理地址,多个代理地址请用英文逗号隔开。例如: http://24.48.0.1:888,http://24.48.0.1:887"></el-input>
        </el-form-item>

        <el-form-item label="输出格式" prop="form">
          <el-input type="textarea" v-model="ruleForm.form"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">预览结果</el-button>
          <el-button @click="resetForm('ruleForm')">生成API</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="preview">
      {{ result }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Crawl',
  data() {
    return {
      ruleForm: {
        url: '',
        charset: 'utf-8',
        mode: '普通模式',
        proxyMode: '内置代理',
        proxy: '',
        form: '',
        depth: 1,
        tags: [],
        start: 0,
        end: 5,
      },
      rules: {
        url: [
          { 
            required: true,
            message: '请输入抓取地址', 
            trigger: 'blur',
          },
        ],
        proxy: [
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '' && this.ruleForm.proxyMode === '自定义代理') {
                callback(new Error('请输入代理地址'));
                return;
              }
              if (value) {
                const m = value.split(',');
                if (m.every(n => /^http:\/\/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?):\d{2,5}/g.test(n))) {
                  callback();
                } else {
                  callback(new Error('请输入正确的代理地址(请求头+ip+端口号)'));
                }
              }
            },
          },
        ],
        form: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入"输出格式"'));
              } else {
                try {
                  JSON.parse(value);
                  callback();
                } catch (e) {
                  callback(new Error('请检查是否是JSON格式数据'));
                }
              }
            },
          },
        ],
        tags: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value.length) {
              callback(new Error('请输入"输出格式"'));
            } else if (this.ruleForm.depth === value.length) {
              callback();
            } else {
              callback(new Error('选择的抓取深度与输入的标签选择器长度不匹配'));
            }
          },
        }],
      },
      result: '',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post('/crawl/preview', this.$qs.stringify({
            ...this.ruleForm,
            mode: this.ruleForm.mode === '普通模式' ? 'plain' : 'pagination',
            proxyMode: this.ruleForm.proxyMode === '内置代理' ? 'internal' : this.ruleForm.proxyMode === '无代理'? 'none' : 'own' ,
            proxies: this.ruleForm.proxy.split(',').filter(n => Boolean(n)),
          })).then( res => {
            if (res.data.state) {
              this.result = res.data.data;
            } else {
              console.log('抓取失败');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="stylus">
.webspider{
  width 80%
  margin 0 auto
  .input-nmber{
    width 300px
    display inline-block
  }
  .preview{
    border 1px solid #dcdfe6
  }
}
</style>
