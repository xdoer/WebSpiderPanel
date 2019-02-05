<template>
  <div class="edit">
    <span class="close" @click="hiddenEdit"></span>
    <h2>编辑</h2>
    <el-form ref="form" :model="editAPI" label-width="80px">
      <el-form-item label="目标网站">
        <el-input v-model="editAPI.site" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="API-ID">
        <el-input v-model="editAPI.cid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开放权限">
        <el-switch
          v-model="editAPI.permission"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="API标签">
        <el-tag
          :key="tag"
          v-for="tag in editAPI.tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input type="textarea" v-model="editAPI.description"></el-input>
      </el-form-item>
      <el-form-item label="更新间隔">
        <el-input-number size="mini" :step="0.5" :min="0" v-model="editAPI.interval"></el-input-number><span>小时</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="hiddenEdit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>

<script>
import { updateConfig } from '@/http/crawl'

export default {
  name: 'EditAPI',
  props: {
    editAPI: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    // 隐藏编辑API信息面板
    hiddenEdit() {
      this.$emit('change-state', 'edit', false)
    },
    // 提交更新信息按钮
    onSubmit() {
      updateConfig({
        cid: this.editAPI.cid,
        permission: this.editAPI.permission,
        tag: this.editAPI.tag.slice(0, 3),
        description: this.editAPI.description,
        interval: this.editAPI.interval,
      })
      .then(res => {
        if (res.data.state) {
          this.$message.success('保存成功')
        } else {
          if (res.data.data.nModified === 0) {
            this.$message.info('配置未修改')
          } else {
            this.$message.error(res.data.msg)
          }
        }
      })
      .catch(e => {
        this.$message.error(e)
      })
    },
    handleClose(tag) {
      this.editAPI.tag.splice(this.editAPI.tag.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.editAPI.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  },
}
</script>

<style lang="stylus" scoped>
.edit{
  width 400px
  height calc(100% - 80px)
  box-shadow 0 4px 14px -6px rgba(0,0,0,0.4)
  position fixed
  right 16vw
  padding 10px
  background #ffffff
  overflow-y scroll
  .input-new-tag{
    width 100px
  }      
  .close{
    display inline-block
    cursor pointer
    width 30px
    height 30px
    border-radius 15px
    position absolute
    right 15px
    top 35px
    background url('../../assets/close.png') no-repeat center
    background-size 15px
    box-shadow 0 0 14px -6px rgba(0,0,0,0.4)
  }
}
.edit::-webkit-scrollbar {
    display none
}
</style>

