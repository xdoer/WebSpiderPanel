    <template>
        <div id="login">
            <table>
                <tr>
                    <td>用户名</td>
                    <td>
                        <input type="text" v-model="login_user">
                    </td>
                </tr>
                <tr>
                    <td>密码</td>
                    <td>
                        <input type="password" v-model="login_password">
                    </td>
                </tr>
                <tr>
                    <td>
                        <button @click="tologin" minlength="6" maxlength="12" >登录</button>
                    </td>
                    <td>
                        <p v-if="login_confirm">认证失败</p>
                    </td>
                </tr>
            </table>
        </div>
    </template>

<script>
import CONF from '../config'
import axios from 'axios'

export default {
        name:'login',
        data() {
            return {
                login_user: "",
                login_password: "",
                login_confirm: false,

            }
        },
        methods: {
            tologin() {
                let that = this;
                axios.get(`${CONF.BASEURL}/login`, {
                        params: {
                            login_user: that.login_user,
                            login_password: that.login_password,
                        }
                    })
                    .then(function(response) {
                        if (response.data.state) {
                            that.$store.commit('set_user', that.login_user);
                        } else{
                            that.login_confirm = true;
                        }
                    })
                    .catch(function(error) {
                        that.login_confirm = true;
                    });
            }
        }
}
</script>


<style scoped>

</style>
    
    