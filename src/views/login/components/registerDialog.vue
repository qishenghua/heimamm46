<template>
  <el-dialog  class="register-Dialog"  width="600px"  center title="用户注册" :visible.sync="dialogFormVisible">
  <el-form :model="form" status-icon  :rules="rules" ref="registerForm">
    <el-form-item label="头像" prop="avatar">
      <el-upload  
  class="avatar-uploader"
  :action="uploadUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  name='image'
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-form-item>
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
      <el-form-item label="图形码" prop="code" :label-width="formLabelWidth">
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
      <el-form-item label="验证码"  prop="rcode" :label-width="formLabelWidth">
      <el-input v-model="form.rcode" autocomplete="off"></el-input>
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
    <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
// 导入抽取的接口
import {sendsms,register} from '../../../api/register'

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
            code:'',
            // 定义头像图片
            avatar:'',
            // 定义短信验证码
            rcode:''
        
        },
        formLabelWidth: '62px'  , //文本的长度
        // 图片验证码
        imgCode:process.env.VUE_APP_URL+'/captcha?type=sendsms',
        // 定义倒计时
        delay:'',
        // 定义头像预览地址
        imageUrl:'',
        // 定义上传接口地址
        uploadUrl:process.env.VUE_APP_URL+'/uploads',
         rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 6, max: 12, message: '用户名长度在 6 到 12 个字符', trigger: 'change' }
           
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
             { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'change' }
          ],
          avatar: [
            { required: true, message: '头像不能为空', trigger: 'blur' },
           
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
      //提交表单
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          //  this.$message.success('验证成功')
          // 验证成功调用接口
          register({
            username:this.form.username,
            password:this.form.password,
            email:this.form.email,
            phone:this.form.phone,
            avatar:this.form.avatar,
            rcode:this.form.rcode,
          }).then(res=>{
            window.console.log(res);
            if (res.data.code===200) {
              this.$message.success('恭喜，注册成功')
              // 注册成功之后关闭对话框
              this.dialogFormVisible= false
              // 关闭之后重置表单
             this.$refs[formName].resetFields();
              // 表单之外的人为清空
              this.imageUrl=""
            }else if (res.data.code===201) {
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
        this.imgCode= process.env.VUE_APP_URL+'/captcha?type=sendsms&t='+Date.now();
      },
        handleAvatarSuccess(res, file) {
          // 临时本地存储
          window.console.log('服务器',res,file);
        this.imageUrl = URL.createObjectURL(file.raw);
        // 保存服务器返回的图片地址
        this.form.avatar=res.data.file_path
        // 表单外的字段人为验证
        this.$refs.registerForm.validateField('avatar')
      },
      beforeAvatarUpload(file) {
       window.console.log(file);
        const isJPG = file.type === 'image/jpeg'||'image/png'||'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      gsm(){
        //手机号校验
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (reg.test(this.form.phone)!=true) {
          return this.$message.error('手机号码的格式不正确哦')
        }
        // 验证码校验
        if (this.form.code.length!=4) {
          return this.$message.error('验证码的长度不对哦')
          
        }
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
          
        sendsms({
          code:this.form.code,
            phone:this.form.phone
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
      .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-dialog--center .el-dialog__body {
    text-align: center;
    padding: 25px 25px 30px;
}
}
</style>