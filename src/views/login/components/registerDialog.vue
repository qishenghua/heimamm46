<template>
  <el-dialog  class="register-Dialog"  width="600px"  center title="用户注册" :visible.sync="dialogFormVisible">
  <el-form :model="form" status-icon  :rules="rules" ref="registerForm">
    <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop='phone' :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 图形码 -->
    <el-row>
  <el-col :span="17">
      <el-form-item label="图形码" :label-width="formLabelWidth">
      <el-input v-model="form.code" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
  <el-col  :offset="1" :span="6">
      <img  @click="changeCode" class="register-code" :src="imgCode" alt="">
  </el-col>
</el-row>
    <el-row>
        <!-- 短信验证码 -->
  <el-col :span="17">
      <el-form-item label="验证码" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
  <el-col  :offset="1" :span="6">
    <!-- 点击发送，获取短信 -->
      <el-button  :disabled="delay!=0" @click="gsm"  class="register-btn">
        {{this.delay==0?'点击获取验证码':`还有${delay}继续获取`}}
      </el-button>
  </el-col>
</el-row>
    
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
// 导入axios
import axios from 'axios'
// 定义校验规则-手机
const checkPhone = (rule,value,callback) =>{
    // 获取value
    // 定义正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if(reg.test(value)==true){
        callback();
    }else{
        callback(new Error('手机号码的格式不正确'))
    }
};
// 定义校验规则-邮箱
const checkEmail = (rule,value,callback) =>{
    // 获取value
    // 定义正则表达式
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if(reg.test(value)==true){
        callback();
    }else{
        callback(new Error('邮箱的格式不正确'))
    }
};
export default {
    data() {
        return {
            
             dialogFormVisible: false,   //是否显示对话框
        form: {
            // 定义昵称
          username: '',
        //   定义密码
          password:'',
        //   定义邮箱
            email:'',
            // 定义手机
            phone:'',
            // 定义图片验证码
            code:''
        
        },
        formLabelWidth: '62px'  , //文本的长度
        // 图片验证码
        imgCode:process.env.VUE_APP_URL+'/captcha?type=sendsms',
        // 定义倒计时
        delay:'',
         rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '用户名长度在 6 到 12 个字符', trigger: 'change' }
           
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
             { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'change' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机不能为空', trigger: 'blur' },
           
             { validator:  checkPhone, trigger: 'blur' }
          ],
         }
        }
    },
    methods: {
      changeCode(){
        this.imgCode= process.env.VUE_APP_URL+'/captcha?type=sendsms&t='+Date.now();
      },
      gsm(){
        if (this.delay==0) {
          //开启倒计时
          this.delay=60
          const  time = setInterval(()=>{
            // 设置一个定时器，时间递减
            this.delay--
            if (this.delay==0) {
              // 如果为0 ，清除倒计时
              clearInterval(time)
            }
          },100)
            axios({
          url:process.env.VUE_APP_URL+'/sendsms',
          method:'post',
          data: { 
            code:this.form.code,
            phone:this.form.phone
          },
         withCredentials:true  //是否携带跨域cookie  默认为false
        }).then(res=>{
          //成功回调
         window.console.log(res);
         if (res.data.code===200) {
           this.$message.success('获取成功'+res.data.data.captcha)
           
         }else if (res.data.code===0) {
           this.$message.error(res.data.message)
           
         }
         
        });
        }
      
      }
    },
}
</script>

<style  lang="less">
.register-Dialog{
    .el-dialog__header{
        height: 23px;
        background: linear-gradient(to right,#01c5fb,#1495fb);
        .el-dialog__title{
            color:#fff;
           line-height: 18px;
        }
    }
    .register-code{
        width: 100%;
        height: 40px;
    }
    .register-btn{
        width: 100%;
    }
}
</style>