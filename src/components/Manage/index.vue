<template>
  <div class="enter_wrap">
    <div class="enter_position">
      <div class="box-card-enter">
        <el-card class="box-card-enter-header">
          <h2>WebSpider后台管理系统</h2>
        </el-card>
        <el-tabs type="border-card">
          <el-tab-pane label="登录" >
            <el-form label-position="left" label-width="80px" :model="login" :rules="rules" ref="login" status-icon>
              <el-form-item label="昵称" prop="name">
                  <el-input v-model="login.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input v-model="login.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login_submit('login')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <el-form label-position="left" label-width="80px" :model="register" :rules="rules" ref="register" status-icon>
              <el-form-item label="昵称" prop="name">
                <el-input v-model="register.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="register.password"  type="password"></el-input>
              </el-form-item>
              <el-form-item label="验证密码" prop="repassword">
                <el-input v-model="register.repassword"  type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register_submit('register')">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>    
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister } from '@/http/user'

export default {
  name: "Enter",
  data () {
    return {
      login: {
        name: "",
        password: "",
      },
      register:{
        name: "",
        password: "",
        repassword: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入验证密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  methods:{
    login_submit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                userLogin({
                    name: this.login.name,
                    password: this.login.password
                }).then(res => {
                    if(res.data.state){
                        console.log("登录成功",res.data.data);
                        this.$router.push("manage");
                    }else{
                        console.log(res.data.msg);
                        this.$message.error(res.data.msg);
                    }
                }).catch(e => {
                    this.$message.error(e);
                })
            } else {
                return false;
            }
        });
    },
    register_submit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.password === this.repassword){
                    userRegister({
                        name: this.register.name,
                        password: this.register.password,
                        repeatPassword:this.register.repassword
                    })
                    .then(res => {
                        if(res.data.state){
                            console.log("注册成功",res.data.data);
                            this.$router.push("manage");
                        }else{
                            this.$message.error(res.data.data);
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }else{
                    console.error("两次密码输的不一致");
                    this.$message.error("两次密码输的不一致");
                }
            }else{
                return false;
            }
        })
    },
  },
    activated () {
        if(this.$store.state.user){
            this.$router.push("manage");
        }else{
            this.$store.dispatch('setUser').then(()=>{
                this.$router.push("manage");
            }).catch(()=>{
                console.error("未登录");
            })
        }
    }
}
</script>

<style>
.enter_wrap{
    width: 100%;
    height: 100%; 
    background-size: cover;
    position: relative; 
}
.enter_position{
    position: absolute;
    top:50%;
    left: 50%;
}
.box-card-enter{
    width: 400px;
    height: 600px;
    position: absolute;
    left: -200px;
    top:-300px;
}
</style>
