<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
          <!-- 左侧图标 -->
        <i @click="isCollapse=!isCollapse" class="el-icon-s-fold"></i>
        <img src="../../assets/index-logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userIcon" alt />
        <span class="name">{{$store.state.username}},你好</span>
        <el-button @click="logout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <el-menu  router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
         :collapse="isCollapse"
        >
        
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
          
        </el-menu>
      </el-aside>
      <el-main class="my-main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//获取用户信息接口
import { logout } from "../../api/index";
// 用户退出移除token
import { removeToken} from "../../utils/token";
export default {
  name: "index",
  data() {
    return {
      // 用户名
    //   username: "",
      // 用户头像
    //   userIcon: "",
    //   定义是否折叠
    isCollapse:false,
    };
  },
//   beforeCreate() {
//     //   token 非空判断
//       if (getToken() == undefined) {
//         //   提示用户登录
//         this.$message.warning('请先登录')
//         // 打回登录页
//         this.$router.push('/login')
//       }
//   },
  methods: {
    logout() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "继续看看",
        type: "warning"
      })
        .then(() => {
          logout({}).then(res => {
            //点击确定之后的逻辑
            window.console.log(res);
            if (res.data.code == 200) {
              // 调用退出接口成功
              // 移除token
              removeToken();
            //   删除Vuex中用户信息
            this.$store.commit('changeIcon','')
            this.$store.commit('changeName','')
              //跳转登录页
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
//   created() {
//     //   获取用户信息
//     info().then(res => {
//       window.console.log(res);
//     //   判断 token 的真假，如果 错误，删除token，打首页
//      if (res.data.code===206) {
//          this.$message.warning('登录状态错误请先登录')
//          removeToken();
//          this.$router.push('/login')
//      }else if (res.data.code===200) {   
//       (this.username = res.data.data.username),
//         (this.userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar);
//          }
//     });
//   }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      span.name {
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    background-color: #ffffff;
  }
  .my-main {
    background-color: #e9e9e9;
  }
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>