<template>
  <div class="guide">
    <div v-html="content"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import { fetchGuideMd } from '@/http/md'
  export default {
      name: 'Guide',
      data () {
        return {
          content: ''
        }
      },
      activated () {
        fetchGuideMd()
        .then(res => {
          this.content = marked(res.data.data)
        })
        .catch(e => {
          console.log(e)
        })
      }
  }
</script>

<style lang="stylus">
.guide{
  width 80%
  height 100%
  margin 0 auto
  article{
    padding-bottom 30px
  }
}
</style>