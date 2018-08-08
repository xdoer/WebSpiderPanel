<template>
<div>
    <div id="loginOrgister">
        <div class="wrap">
            <div class="login_success" v-if="user">
                <p>欢迎{{user}}登录</p>
            </div>
            <div class="to_login" v-else>
                <router-link to="/login">登录</router-link>
                <router-link to="/register">注册</router-link>
                <router-view></router-view>
            </div>
        </div>   
    </div>   
</div>

</template>

<script>
import CONF from '../config'

export default {
    name : 'loginOrSignup',
    computed:{
        user(){
            return this.$store.state.user
        }
    }

}
</script>


<style>
#loginOrgister {
     width: 20%;
     float: left;
     margin-left: 5%;
     z-index: 200;
     margin-top: 2%;
 }
</style>
