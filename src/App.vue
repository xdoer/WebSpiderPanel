<template>
  <div id="app">
    <mainComp/>
    <left/>
    <login-or-signup/>
    <share/>
    <span @click="istate=!istate" class="manage" v-if="user">管理页面</span>    
    <transition name="fade">
      <manage v-if="istate&&user"/>
    </transition>
  </div>
</template>

<script>
import mainComp from './components/main.vue'
import left from './components/left.vue'
import loginOrSignup from './components/loginOrSignup.vue'
import share from './components/share.vue'
import manage from './components/manage.vue'


export default {
  name: 'app',
  data(){
    return {
      istate:false
    }
  },
  components: {
    mainComp,
    left,
    loginOrSignup,
    share,
    manage
  },
  computed:{
      user(){
          return this.$store.state.user
      }
  },
}
</script>

<style>
.manage{
  /* display: block; */
  width: 30px;
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
