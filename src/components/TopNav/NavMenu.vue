<template>
  <div class="navRoot">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      style="display: flex"
    >
      <div style="width: 70%;text-align: left" >
        <el-menu-item @click="restartIndex">
          <!--        点击后进主界面-->
          <el-button type="text">民宿预订平台</el-button>
        </el-menu-item>
        <el-menu-item index="maxSearch">
          <!--        最大搜索-->
          <el-input
            type="text"
            placeholder="按城市、地址、地标搜索"
            v-model="input"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-menu-item>
      </div>
      <div style="text-align: end;width: 30%" id="rightDiv">
        <el-menu-item index="1">出租房源</el-menu-item>
        <el-menu-item index="2">历史足迹</el-menu-item>
        <!-- <el-menu-item index="3" @click="handleUserDialogShow">注册</el-menu-item> -->
        <el-menu-item
          index="3"
          @click="handleUserDialogShow"
          v-if="getLocalStorage('token') === null"
          >登录</el-menu-item
        >
        <el-submenu index="4" mode="vertical" v-if="getLocalStorage('token') !== null">
          <template slot="title">我的</template>
          <el-menu-item index="4-1">个人资料</el-menu-item>
          <el-menu-item index="4-2" @click="Logout">注销</el-menu-item>
        </el-submenu>
      </div>
      <UserDialog
        :dialogVisible="dialogVisible"
        :handleUserDialogShow="handleUserDialogShow"
      />
    </el-menu>
  </div>
</template>

<script>
  import {fetchDataFromLocal, storeDataToLocal} from "../../utils/localStrogeHandler"
import UserDialog from "./UserDialog";
import { logout } from "../../service/user";
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      input: "",
      select: "",
      dialogVisible: false, // 控制登录注册弹框
    };
  },
  methods: {
    getLocalStorage(key){
      return fetchDataFromLocal(key)
    },
    setLocalStorage(key,value){
      return  storeDataToLocal(key,value)
    },
    handleSelect(key, keyPath) {
      //获取选择的位置
      console.log(key, keyPath);
    },
    handleUserDialogShow() {
      this.dialogVisible
        ? (this.dialogVisible = false)
        : (this.dialogVisible = true);
    },
    restartIndex() {
      this.$router.push("/");
    },
    async Logout() {
      //注销，重置token
      const data = await logout();
      if (data) {
        this.$store.commit("del_token");
        this.$router.go(0);
      }
    },
  },
  components: { UserDialog },

};
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  /*底部的线*/
  border-bottom: hidden;
}
/*设置进入的样式*/
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  color: white;
  background: rgba(0, 0, 0, 0);
}
.el-menu-demo {
  height: 80px;
  background-color: rgba(0, 0, 0, 0);
  /*padding: 0;*/
  /*margin: 0;*/
}
.el-menu-item,
.el-submenu {
  height: 79px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  display: inline-block;
  padding: 12px 20px 12px 12px;
  vertical-align: middle;
  /*border: 1px dashed white;*/
}

/*右边div的鼠标进入样式，！important覆盖其他样式，增加权重*/
#rightDiv > .el-menu-item:hover {
  border-bottom: 3px solid;
  border-bottom-color: white !important;
}
.el-menu-item.is-active {
  background: rgba(0, 0, 0, 0);
  color: white;
}
.navRoot >>> .el-submenu>.el-submenu__title {
  color: white;
  background: rgba(0, 0, 0, 0) ;
  font-size: 18px;
}
.el-input >>> .el-input__inner {
  /*vue组件编译后，会将 template 中的每个元素加入 [data-v-xxxx] 属性来确保 style scoped 仅本组件的元素而不会污染全局。
一般还是不建议去除scoped，避免污染全局的样式。那就需要采用深度作用选择器*/
  height: 48px;
  width: 480px;
  padding-left: 50px;
}
.el-input >>> .el-input__prefix {
  width: 50px;
  font-weight: bold;
}
.el-input >>> .el-input__icon {
  width: 25px;
  height: auto;
}
.el-button {
  background-color: rgba(0, 0, 0, 0);
  color: white;
  font-weight: bold;
  font-size: 20px;
}
</style>
