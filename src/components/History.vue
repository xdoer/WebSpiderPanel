<template>
  <div class="history">
    <div v-html="content"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import { fetchHistoryMd } from '@/http/md'
  export default {
    name: 'History',
    data () {
      return {
        content: ''
      }
    },
    activated () {
      fetchHistoryMd()
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
.history{
  width 80%
  height 100%
  margin 0 auto
}
</style>