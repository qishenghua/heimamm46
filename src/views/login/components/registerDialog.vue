<template>
  <el-dialog  class="register-Dialog"  width="600px"  center title="用户注册" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="昵称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 图形码 -->
    <el-row>
  <el-col :span="17">
      <el-form-item label="图形码" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="7">
      <img class="register-code" src="../../../assets/login_captcha.png" alt="">
  </el-col>
</el-row>
    <el-row>
        <!-- 验证码 -->
  <el-col :span="17">
      <el-form-item label="验证码" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="7">
      <el-button  class="register-btn">获取用户验证码</el-button>
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
export default {
    data() {
        return {
            
             dialogFormVisible: false,   //是否显示对话框
        form: {
          name: '',
        
        },
        formLabelWidth: '62px'   //文本的长度
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