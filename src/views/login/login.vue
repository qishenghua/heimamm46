<template>
  <!-- 大盒子 -->
  <div class="container">
    <!-- 左边盒子 -->

    <div class="left">
      <div class="top-title">
        <img src="../../assets/login-small.png" alt />
        <span>黑马面面</span>
        <span class="line">|</span>
        <span>用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form"   :rules="rules">
        <el-form-item prop="phone">
          <el-input  v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user" class="phone"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input v-model="form.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-row>
  <el-col :span="17">
       <el-form-item  prop="logoCode">
          <el-input v-model="form.logoCode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
        </el-form-item>

  </el-col>
 
  <el-col   :span="7">
      <img   @click="changeCode" class="img" :src="codeUrl" alt="">
  </el-col>
  
</el-row>
       
        <el-form-item  >
          <el-checkbox-group v-model="form.check" class="tip">
            <el-checkbox name="type">
              <span>我已同意并阅读</span>
              <el-link type="primary">用户协议</el-link>
              <span>和</span>
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn" @click="submitForm('form')">登录</el-button>
      <el-button type="primary" class="btn"  @click="registterDialog">注册</el-button>
    </div>
    <!-- 右边盒子 -->
    <div class="right">
        <!-- 右边图片 -->
      <img  src="../../assets/login-logo.png" alt />
    </div>
    <registterDialog ref="registterDialog"></registterDialog>
  </div>
</template>

<script> 
// 导入手机的校验方法
import {checkPhone} from '../../utils/validator'
// 测试环境变量基地址
window.console.log(process.env.VUE_APP_URL);
// 导入注册对话框
import registterDialog from './components/registerDialog.vue'
// 导入登录接口
import {login}  from '../../api/login'
export default {
    // 注册组件
    components:{
        registterDialog
    },
  name: "login",
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
           if (valid) {
          //  this.$message.success('验证成功')
          //  判断用户是否勾选协议
           if (this.form.check!=true) {
             return this.$message.warning('请勾用户协议')
           }
          //  勾选之后凋登录接口
          login({
            phone:this.form.phone,
            password:this.form.password,
            code:this.form.logoCode
          }).then(res=>{
            window.console.log(res);
            if (res.data.code===200) {
              // 提示登录成功
              this.$message.success('欢迎来到王者农药')
              // 成功之后跳转首页
              this.$router.push('/index')
              // 保存token
              window.localStorage.setItem('heimamm',res.data.data.token)
            }else if (res.data.code===202) {
              this.$message.error(res.data.message)
            }
          })
          } else {
            this.$message.error('验证失败')
            return false;
          }
        });
      },
      changeCode(){
          this.codeUrl=process.env.VUE_APP_URL+'/captcha?type=login&t='+Date.now();
        },
      registterDialog(){
          this.$refs.registterDialog. dialogFormVisible=true
      }
    },
   data() {
    return {
      form: {
      phone:'',
      password:'',
      logoCode:'',
     
      // 是否勾选
  check:false
      },
      // 定义登录验证码
      codeUrl:process.env.VUE_APP_URL+'/captcha?type=login',
      rules: {
          phone: [
            { required: true, message: '手机号格式不正确', trigger: 'blur' },
            { validator: checkPhone, trigger: 'change' }
          
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            
          ],
           logoCode: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
            
          ],
      }
    }
  },
};
</script>

<style lang="less">
.container {
  height: 100%;
  background: linear-gradient(to right, #1592f5, #05c1f5);
  // 开启弹性布局
  display: flex;
  // 上下居中
  align-items: center;
  // 左右均分
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f7f5f6;
    padding-left: 43px;
    padding-right: 41px;
     box-sizing: border-box;
     .el-button+.el-button {
    margin-left: 0px;
}
.el-col-17 {
    width: 70.83333%;
    height: 40px
}
    .btn{
        width: 100%;
        margin-bottom: 26px;
    }
    .phone{
        margin-top: 31px;
    }
    .img{
        width: 100%;
        height: 40px;
        
    }
    .top-title {
      // 开启弹性布局
      display: flex;
      // 上下居中
      align-items: center;
      margin-top: 44px;
      img {
        width: 22px;
        height: 17px;
        margin-left: 5px;
        margin-right: 13px;
      }
      span {
        font-size: 24px;
        color: #1c191a;
      }
      .line {
        margin-left: 14px;
        margin-right: 12px;
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
    img {
      width: 100%;
    }
  }
}
</style>