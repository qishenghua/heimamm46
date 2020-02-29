<template>
<!-- 大盒子 -->
 <div class="container">
     <!-- 左边盒子 -->
     
     <div class="left">
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
       background-color: #fff;
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