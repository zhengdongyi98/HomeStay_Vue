<template>
  <div>
    <NavMenu></NavMenu>
    <div style="margin-top: 110px;width: 50%;margin-left: 25%">
      <div>
        <span style="font-size: 32px;font-weight: bolder;">个人信息修改</span>
      </div>

      <div style="margin-top: 40px;font-size: 18px;font-weight: bolder;display: flex;width: 100%">
        <div style="width: 85%"><span>用户名：
        </span><span v-show="!uFlag" style="padding-left: 40px;font-size: 22px">{{userInfo['userName']}}</span>
          <el-input style="width: 50%" v-model="userName" placeholder="" v-show="uFlag">{{userName}}</el-input>
          <el-button type="primary" v-show="uFlag" @click="changeUserName" style="margin-left: 10px">保存</el-button>
          <el-button type="primary" v-show="uFlag" @click="uFlag=false;flag=false" style="margin-left: 10px">取消
          </el-button>
        </div>
        <div style="">
          <el-button type="text" :disabled="flag" @click="changeFlag(1)">编辑</el-button>
        </div>

      </div>
      <el-divider></el-divider>
      <div style="margin-top: 40px;font-size: 18px;font-weight: bolder;display: flex;">
        <div style="width: 85%"><span>性别：
        </span><span v-show="!gFlag" style="padding-left: 60px;font-size: 22px">{{userInfo['gender']==1?'男':'女'}}</span>
          <el-select style="margin-left: 30px" v-model="gender" placeholder="请选择" v-show="gFlag">
            <el-option
                    v-for="item in ['男','女']"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
          </el-select>
          <el-button type="primary" v-show="gFlag" @click="changeGender" style="margin-left: 10px">保存</el-button>
          <el-button type="primary" v-show="gFlag" @click="gFlag=false;flag=false" style="margin-left: 10px">取消
          </el-button>
        </div>
        <div style="">
          <el-button type="text" :disabled="flag" @click="changeFlag(2)">编辑</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 40px;font-size: 18px;font-weight: bolder;display: flex;">
        <div style="width: 85%"><span>邮箱地址：
        </span><span v-show="!eFlag" style="padding-left: 25px;font-size: 22px">{{userInfo['email']}}</span>
          <el-input style="width: 50%" v-model="email" placeholder="" v-show="eFlag">{{email}}</el-input>
          <el-button type="primary" v-show="eFlag" @click="changeEmail" style="margin-left: 10px">保存</el-button>
          <el-button type="primary" v-show="eFlag" @click="eFlag=false;flag=false" style="margin-left: 10px">取消
          </el-button>
        </div>
        <div style="">
          <el-button type="text" :disabled="flag" @click="changeFlag(3)">编辑</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 40px;font-size: 18px;font-weight: bolder;display: flex;">
        <div style="width: 85%"><span>手机号：
        </span><span v-show="!pFlag" style="padding-left: 40px;font-size: 22px">{{userInfo['phone']}}</span>
          <el-input style="width: 50%" v-model="phone" placeholder="" v-show="pFlag">{{phone}}</el-input>
          <el-button type="primary" v-show="pFlag" @click="changePhone" style="margin-left: 10px">保存</el-button>
          <el-button type="primary" v-show="pFlag" @click="pFlag=false;flag=false" style="margin-left: 10px">取消
          </el-button>
        </div>
        <div style="">
          <el-button type="text" :disabled="flag" @click="changeFlag(4)">编辑</el-button>
        </div>
      </div>
      <el-divider></el-divider>

      <div style="margin-top: 40px;font-size: 18px;font-weight: bolder;display: flex;">
        <div style="width: 85%"><span>密码</span></div>
        <div style="">
          <el-button type="text" :disabled="flag" @click="changeFlag(5)">编辑</el-button>
        </div>
      </div>
      <div style="margin-top: 20px;font-size: 18px;font-weight: bolder;margin-right: 40%;">
        <el-form v-show="pwdFlag" :model="passwordForm" status-icon :rules="rules" ref="passwordForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="原密码" prop="passOrigin">
            <el-input type="password" v-model="passwordForm.passOrigin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="passwordForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  :plain="true" type="primary" @click="submitForm('passwordForm')">提交</el-button>
            <el-button type="primary" @click="resetForm('passwordForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
    </div>
  </div>

</template>

<script>
  import NavMenu from "../../components/TopNav/NavMenu";
  import {getUser, updateUser,logout} from "../../service/user";
  import Icon from "../roomDetail/components/IconRender";
  import {getRoomByUId} from "../../service/room";

  export default {
    name: "Account",
    data() {
      let validatePassOrigin = (rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入原密码'));
        }
        callback();
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userInfo: {},
        userName: "",
        gender: "男",
        email: "",
        phone: "",
        flag: false,
        uFlag: false,
        gFlag: false,
        eFlag: false,
        pFlag: false,
        pwdFlag: false,
        passwordForm: {
          passOrigin: "",
          pass: '',
          checkPass: '',
        },
        rules: {
          passOrigin:[
            {validator: validatePassOrigin, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },

      };
    },
    methods: {
      changeFlag(index) {
        this.flag = true;
        switch (index) {
          case 1:
             this.userName = this.userInfo['userName'];
             this.uFlag = true;
             break;
          case 2:
            this.gender = this.userInfo['gender']==='1'?'男':'女';
            return this.gFlag = true;
          case 3:
              this.email = this.userInfo['email'];
              this.eFlag = true;
              break;
          case 4:
              this.phone = this.userInfo['phone'];
              this.pFlag = true;
              break;
          case 5:
            return this.pwdFlag = true;
        }
      },
      async changeUserName() {
        const data = await updateUser({'userName': this.userName});
        if (data.data === '1') {
          this.getUserInfo(this.$store.state.user['uId'])
        }
        //修改用户名。用户名不重复
        this.uFlag = false;
        this.flag = false;
      },
      async changeGender() {
        const data = await updateUser({'gender': this.gender});
        if (data.data === '1') {
          this.getUserInfo(this.$store.state.user['uId'])
        }
        this.gFlag = false;
        this.flag = false;
      },
      async changeEmail() {
        const data = await updateUser({'email': this.email});
        if (data.data === '1') {
          this.getUserInfo(this.$store.state.user['uId'])
        }
        this.eFlag = false;
        this.flag = false;
      },
      async changePhone() {
        const data = await updateUser({'phone': this.phone});
        if (data.data === '1') {
          this.getUserInfo(this.$store.state.user['uId'])
        }
        this.pFlag = false;
        this.flag = false;
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const passOrigin = this.$getRsaCode(this.passwordForm.passOrigin);
            const pass = this.$getRsaCode(this.passwordForm.pass);
            const data = await updateUser({"passOrigin":passOrigin,"pass":pass});
            //修改失败，则提示修改失败；修改成功，则提示请重新登录，退出，返回主页
            if (data.data==='1'){
              this.$message.success('密码修改成功，请重新登录');
              this.Logout()
            }
            this.pwdFlag = false;
            this.flag = false;
          } else {
            // console.log('error submit!!');
            // this.$message.error('两次密码不一致,请重新输入');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.flag = false
        this.pwdFlag = false
      },
      async Logout() {
        //注销，重置token
        const data = await logout();
        if (data) {
          this.$store.commit("del_token");
          this.$store.commit("del_user");
          this.$router.push("/");
        }
      },
      // async updatePass(passOrigin,pass){
      //   const data = await updateUser({"passOrigin":passOrigin,"pass":pass});
      //   //修改失败，则提示修改失败；修改成功，则提示请重新登录，退出，返回主页
      //   console.log("xxxx");
      //   console.log(data.data+"111111111111111111");
      //   if (data.data!=='1'&&data.data!==null){
      //     return false
      //   }
      // },

      async getUserInfo(uId) {
        console.log(uId);
        const data = await getUser(uId);
        this.userInfo = data.data;
        this.userName = data.data['userName'];
        this.email = data.data['email'];
        this.phone = data.data['phone'];
      }
    },
    components: {
      NavMenu, Icon
    },
    created() {
      this.getUserInfo(this.$store.state.user['uId']);
    }
  }
</script>

<style scoped>
  .navRoot {
    border-bottom: 1px solid rgba(168, 168, 168, 0.4);
    position: fixed !important;
    top: 0;
    z-index: 999;
    background-color: white;
  }

  .navRoot >>> .el-menu-item,
  .el-submenu {
    color: black !important;
  }

  .navRoot >>> .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    color: black !important;
  }

  .navRoot >>> #rightDiv > .el-menu-item:hover {
    border-bottom-color: black !important;
  }

  .navRoot >>> .el-button {
    color: black;
  }

  .navRoot >>> .el-submenu > .el-submenu__title {
    color: black;
    background-color: white;
    font-size: 18px;
  }
</style>
