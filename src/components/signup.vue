    <template>
        <div>
            <table>
                <tr>
                    <td>用户名</td>
                    <td>
                        <input type="text" v-model="register_user">
                    </td>
                </tr>
                <tr>
                    <td>密码</td>
                    <td>
                        <input type="password" v-model="register_password" minlength="6" maxlength="12">
                    </td>
                </tr>
                <tr>
                    <td>确认密码</td>
                    <td>
                        <input type="password"  v-model="register_repeat_password" minlength="6" maxlength="12">
                    </td>
                </tr>
                <tr>
                    <td>
                        <button  @click="toregister">注册</button>
                    </td>
                    <td>
                        <p v-if="reg_confirm">用户名已存在</p>
                    </td>
                </tr>
            </table>
        </div>
    </template>

    <script>
    import CONF from '../config'
    import axios from 'axios'

    export default {
        name:'signup',
        data() {
                    return {
                        register_user: "",
                        register_password: "",
                        register_repeat_password: "",
                        reg_confirm: false
                    }
                },
        methods: {
            toregister() {
                let that = this;
                axios.get(`${CONF.BASEURL}/register`, {
                        params: {
                            register_user: that.register_user,
                            register_password: that.register_password,
                            register_repeat_password: that.register_repeat_password
                        }
                    })
                    .then(function(response) {
                        if (response.data.state) {
                            $.store.commit('set_user', that.register_user);
                        } else {
                            that.reg_confirm = true;
                        }
                    })
                    .catch(function(error) {
                        that.reg_confirm = true;
                    });

            }
        }
    }
    </script>
    
    <style>
    
    </style>
    
