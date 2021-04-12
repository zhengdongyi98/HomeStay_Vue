<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    :before-close="handleUserDialogShow"
    width="30%"
  >
    <div slot="title" class="dialog-title" style="text-align: start">
      <span>{{
        containerState === "login" ? "登录民宿预订平台" : "注册"
      }}</span>
    </div>
    <!-- 登陆 -->
    <div v-if="containerState === `login`">
      <div class="input-container">
        <el-input v-model="userName" placeholder="用户名"></el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          show-password
          style="margin-top: 20px"
        ></el-input>
        <el-button
          @click="userLogin"
          type="primary"
          style="width: 100%; margin-top: 20px"
          >登陆</el-button
        >
        <el-divider>或</el-divider>
        <el-button @click="containerState = `register`" style="width: 100%"
          >立即注册</el-button
        >
      </div>
    </div>
    <!-- 注册 -->
    <div v-if="containerState === `register`">
      <div class="input-container">
        <!-- userName password email phone  -->
        <el-input v-model="userName" placeholder="用户名"></el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          show-password
          style="margin-top: 20px"
        ></el-input>
        <el-input
          v-model="email"
          placeholder="邮箱"
          style="margin-top: 20px"
        ></el-input>
        <el-input
          v-model="phone"
          placeholder="手机"
          style="margin-top: 20px"
        ></el-input>
        <el-button
          @click="handleUserDialogShow"
          type="primary"
          style="width: 100%; margin-top: 20px"
          >注册</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { login, register } from "../../service/user";
import * as qs from "qs";
export default {
  name: "UserDialog",
  data() {
    return {
      containerState: "login", // login为登陆，register为注册
      userName: "",
      password: "",
      email: "",
      phone: "",
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    handleUserDialogShow: {
      type: Function,
    },
  },
  methods: {
    async userLogin() {
      const { userName, password } = this;
      const data = await login({ userName,password});
      if (data) {
        console.log(data)
        this.handleUserDialogShow();
      }
    },
    async userRegister() {
      const { userName, password, email, phone } = this;
      const data = await register({ userName, password, email, phone });
      if (data) {
        this.$message({
          showClose: true,
          message: "注册成功，请前往电子邮箱进行激活",
          type: "success",
        });
        this.handleUserDialogShow();
      }
    },
  },
  watch: {
    dialogVisible: function (newVal, oldVal) {
      if (!this.dialogVisible) {
        setTimeout(() => {
          this.containerState = "login";
        }, 500);
      }
    },
  },
};
</script>
