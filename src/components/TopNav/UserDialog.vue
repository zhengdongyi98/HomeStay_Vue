<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    :before-close="handleUserDialogShow"
    width="30%"
    @close="resetData"
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
          >登录</el-button
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
        ></el-input>{{checkPwd()}}
        <el-input
          v-model="email"
          placeholder="邮箱"
          style="margin-top: 20px"
        ></el-input>{{checkEmail()}}
        <el-input
          v-model="phone"
          placeholder="手机"
          style="margin-top: 20px"
        ></el-input>{{checkPhone()}}
        <el-radio-group style="margin-top: 20px" v-model="gender">
          <el-radio v-model="gender" :label=1>男</el-radio>
          <el-radio v-model="gender" :label=0>女</el-radio>
        </el-radio-group>
        <el-button
          @click="userRegister"
          type="primary"
          :disabled="checkFormat1()"
          style="width: 100%; margin-top: 20px"
          >注册</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import {getPubKey, login, register} from "../../service/user";
  import JSEncrypt from 'jsencrypt';
  import { Message } from 'element-ui';
  export default {
  name: "UserDialog",
  data() {
    return {
      containerState: "login", // login为登陆，register为注册
      userName: "",
      password: "",
      email: "",
      phone: "",
      gender: 1,
      checkFormat: true
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
      // const { userName, password } = this;
      const userName = this.userName;
      const password = this.$getRsaCode(this.password);
      console.log(password);
      const data = await login({ userName, password });
      if (data) {
        console.log(data.data);
        let token = data.data;
        //写入token
        this.$store.commit('set_token', token);
        if (this.$store.state.token){
          this.$router.go(0);//写入token，跳转回首页
        }else {
          this.$router.push("/");//未登录暂时不处理
        }
        this.handleUserDialogShow();
      }
    },
    // userName: "",
    // password: "",
    // email: "",
    // phone: "",

    checkEmail(){
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(!myreg.test(this.email)&&this.email.length!==0){
        return "邮箱格式有误"
      }
      if (this.phone.length!==0&&this.password.length!==0&&this.email.length!==0){
        this.checkFormat = false;
      }
    },
    checkPhone(){
      var mobile=/^((13[0-9]{1})|159|153)+\d{8}$/;
      if (!mobile.test(this.phone)&&this.phone.length!==0){
        return "电话号码格式有误"
      }
      if (this.phone.length!==0&&this.password.length!==0&&this.email.length!==0){
        this.checkFormat = false;
      }
    },
    checkPwd(){
      if (this.password.length<6&&this.password.length!==0){
        return "密码不能小于6"
      }
    },
    checkFormat1(){
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var mobile=/^((13[0-9]{1})|159|153)+\d{8}$/;
      if (this.password.length>=6&&this.phone.length!==0&&this.password.length!==0&&this.email.length!==0&&mobile.test(this.phone)&&myreg.test(this.email)){
        this.checkFormat = false;
      }else
        return true;
    },
    async userRegister() {
      const { userName, password, email, phone, gender } = this;
      const data = await register({ userName, password, email, phone, gender });
      Message.success({
        showClose: true,
        message: "注册成功，请前往电子邮箱进行激活",
      });
      this.handleUserDialogShow();
    },
    resetData(){
      this.userName= ""
      this.password= ""
      this.email= ""
      this.phone= ""
      this.gender= 1
      this.checkFormat = true
    }
  },
  watch: {
    dialogVisible: function (newVal, oldVal) {
      if (!this.dialogVisible) {
        setTimeout(() => {
          this.containerState = "login";
        }, 500);
        // TODO 关闭弹窗清除输入框数据
      }
    },
  },
};
</script>
