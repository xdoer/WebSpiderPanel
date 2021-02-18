<template>
  <div class="webspider">
    <fieldset>
      <legend>配置面板</legend>
      <div class="config">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          label-position="right"
          class="ruleForm"
        >
          <el-form-item label="目标网站" prop="url">
            <el-input v-model="ruleForm.url"></el-input>
          </el-form-item>

          <el-form-item label="网页编码" prop="charset">
            <el-select v-model="ruleForm.charset" placeholder="请选择网页编码">
              <el-option label="utf-8" value="utf-8"></el-option>
              <el-option label="gbk" value="gbk"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="抓取模式" prop="mode">
            <el-select v-model="ruleForm.mode" placeholder="请选择抓取模式">
              <el-option label="普通模式" value="plain"></el-option>
              <el-option label="分页模式" value="pagination"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="分页起始页"
            prop="start"
            v-if="ruleForm.mode === 'pagination'"
            class="input-nmber"
          >
            <el-input-number
              v-model="ruleForm.start"
              :min="0"
              :max="ruleForm.end - 1"
              label="起始页"
            ></el-input-number>
          </el-form-item>

          <el-form-item
            label="分页终止页"
            prop="end"
            v-if="ruleForm.mode === 'pagination'"
            class="input-nmber"
          >
            <el-input-number
              v-model="ruleForm.end"
              :min="ruleForm.start + 1"
              :max="100"
              label="终止页"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="抓取深度" prop="depth">
            <el-select v-model="ruleForm.depth" placeholder="请选择抓取深度">
              <el-option label="1" :value="1"></el-option>
              <el-option label="2" :value="2"></el-option>
              <el-option label="3" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-for="i in ruleForm.depth"
            :key="i"
            :label="`${i}级标签选择器`"
            prop="tags"
          >
            <el-input v-model="ruleForm.tags[i - 1]"></el-input>
          </el-form-item>

          <el-form-item label="输出格式" prop="form">
            <el-input type="textarea" v-model="ruleForm.form"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">预览结果</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="nav-btn">
        <div class="nav-btn-left">
          <span
            ><a
              href="https://hanblog.herokuapp.com/artical_detiail/luckyhh/1528369921460"
              target="_blank"
              >参考配置</a
            ></span
          >
          <span
            ><a
              href="https://github.com/LuckyHH/WebSpider"
              target="_blank"
              rel="noopener noreferrer"
              >项目地址</a
            ></span
          >
          <span
            ><a
              href="https://github.com/LuckyHH/WebSpider/issues"
              target="_blank"
              rel="noopener noreferrer"
              >报错</a
            ></span
          >
          <span
            ><a href="https://hanblog.herokuapp.com" target="_blank" rel="noopener noreferrer"
              >文享日志</a
            ></span
          >
        </div>
        <div class="nav-btn-right">
          <span @click="onInstanceFill">实例填充</span>
          <span @click="onReset">重置</span>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>预览面板</legend>
      <div class="preview">
        {{ result }}
      </div>
    </fieldset>
  </div>
</template>

<script>
import { fetchPreview } from '@/http/crawl';

export default {
  name: 'Crawl',
  data() {
    return {
      ruleForm: {
        url: '',
        charset: 'utf-8',
        mode: 'plain',
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
        tags: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error('请输入"选择器"'));
              } else if (this.ruleForm.depth === value.length) {
                callback();
              } else {
                callback(new Error('选择的抓取深度与输入的标签选择器长度不匹配'));
              }
            },
          },
        ],
      },
      result: '',
      state: true, // 状态锁
      num: 1,
    };
  },
  methods: {
    submitForm(formName) {
      if (this.state) {
        this.state = false;
        this.num = 1;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.result = '数据正在抓取中，请等待...';
            fetchPreview(this.ruleForm)
              .then((res) => {
                this.result = res.data;
                this.state = true;
              })
              .catch((e) => {
                this.result = `出错啦🙀 , 错误详情:${e}...
                             请按照下列指示进行操作:
                             (1)请点击"预览结果"再试几次;
                             (2)请检查源网站能不能访问;
                             (3)请检查一遍配置是否正确;
                             (4)如果配置了"内置代理",请更换为"无代理";
                             `;
                this.state = true;
              });
          } else {
            return false;
          }
        });
      } else {
        let n = '';
        for (let i = 0; i < this.num; i++) {
          n += '耐心';
        }
        if (this.num !== 5) {
          this.result = `数据正在抓取中，请${n}等待...`;
        } else {
          this.result = '服了你了,状态锁关了,这回再点就重新请求';
          this.state = true;
        }
        this.num = this.num + 1;
      }
    },
    // 实例填充
    onInstanceFill() {
      this.ruleForm = {
        charset: 'utf-8',
        mode: 'plain',
        form:
          '{"title": "$element.children(\'.news_title\').text()","content": "$element.children(\'.news_txt\').text()"}',
        depth: 2,
        tags: ["$('.news_li').children('h2').children('a')", "$('.newscontent')"],
        url: 'https://www.thepaper.cn/',
      };
    },
    // 重置表格
    onReset() {
      this.ruleForm = {
        url: '',
        charset: 'utf-8',
        mode: 'plain',
        proxyMode: 'internal',
        proxies: '',
        form: '',
        depth: 1,
        tags: [],
        start: 0,
        end: 5,
      };
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
  .config{
    padding 10px 10px 40px 10px
  }
  .nav-btn{
    height 30px
    display flex
    justify-content space-between
    font-size 70%
    color #868282
    span{
      cursor pointer
      display inline-block
      padding 0 10px
    }
    a{
      font-size 70%
      color #868282
      text-decoration none
    }
  }
  .preview{
    padding 10px
  }
}
</style>
