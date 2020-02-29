<template>
<!-- 大盒子 -->
 <div class="container">
     <!-- 左边盒子 -->
     
     <div class="left">
       <div class="top-title">
             <img src="../../assets/login-small.png" alt="">
             <span>黑马面面</span>
             <span class="line">|</span>
             <span>用户登录</span>
    </div>
        
         <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
 
   
    <el-checkbox v-model="form.type">
   
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox>
  </el-form-item>
 
 
 
</el-form> -->
     </div>
     <!-- 右边盒子 -->
     <div class="right">
         <img src="../../assets/login-logo.png" alt="">
     </div>

 </div>
</template>

<script>
export default {
    name:'login',
    //  data() {
    //   return {
    //     form: {
    //       name: '',
         
    //     }
    //   }
    // },
}
</script>

<style lang="less">
.container{
    height: 100%;
    background: linear-gradient(to right,#1592f5,#05c1f5);
    // 开启弹性布局
    display: flex;
    // 上下居中
    align-items: center;
    // 左右均分
    justify-content: space-around;
   .left{
       width: 478px;
       height: 550px;
       background-color:#f7f5f6;
       .top-title{
          // 开启弹性布局
       display: flex;
      // 上下居中
      align-items: center;
      margin-top: 44px;
      img{
          width:22px;
        height:17px;
    margin-left: 48px;
    margin-right: 13px;
      }
      span{
          font-size: 24px;
          color:#1c191a;
      }
      .line{
          margin-left: 14px;
          margin-right: 12px;
      }

       }
   }
   .right{
       width: 633px;
       height: 435px;
       img{
           width: 100%;
       }
   }
}
</style>