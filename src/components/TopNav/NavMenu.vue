<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <div style="float: left">
      <el-menu-item>
        <el-button type="text">民宿预订平台</el-button>
      </el-menu-item>
      <el-menu-item>
        <el-input
          type="text"
          placeholder="按城市、地址、地标搜索"
          v-model="input"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-menu-item>
    </div>
    <div style="float: right" id="rightDiv">
      <el-menu-item index="1">出租房源</el-menu-item>
      <el-menu-item index="2">历史足迹</el-menu-item>
      <!-- <el-menu-item index="3" @click="handleUserDialogShow">注册</el-menu-item> -->
      <el-menu-item index="4" @click="handleUserDialogShow">登录</el-menu-item>
    </div>
    <UserDialog
      :dialogVisible="dialogVisible"
      :handleUserDialogShow="handleUserDialogShow"
    />
  </el-menu>
</template>

<script>
import UserDialog from "./UserDialog";
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleUserDialogShow() {
      this.dialogVisible
        ? (this.dialogVisible = false)
        : (this.dialogVisible = true);
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
.el-menu-item {
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
