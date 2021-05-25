<template>
  <div>
    <NavMenu></NavMenu>
    <div style="margin-top: 120px!important;">
      <div style="display: flex">
        <div class="userLeft">
          <div class="circleLeft">
            <div style="width: 100%;height: 180px!important;text-align: center;">
              <div class="demo-basic--circle" style="padding-top: 8%!important;">
                <div class="block">
                  <el-avatar :size="120" :src="userInfo['icon']"></el-avatar>
                </div>
                <div>
                  <el-upload
                          class="upload-demo"
                          action="http://localhost/homestay/user/updateIcon"
                          :auto-upload="true"
                          :data="updateIconData"
                          :limit="1"
                          :show-file-list="false"
                          :on-success="updateIcon"
                  >
                    <el-button size="mini" type="primary">更改头像</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px;font-weight: bolder;
            height: 40px;font-size: 16px!important;margin-left: 20px">
              <div style="display: flex">
                <Icon :type="`userState`"></Icon>
                <span v-text="userInfo['state']===1?'已验证身份':'暂未验证身份'"></span>
              </div>
            </div>
            <el-divider></el-divider>
            <div style="margin-left: 20px;">
              <div v-if="userInfo['state']===1">
                <div>
                  <span style="font-size:24px!important;font-weight: bolder;line-height: 26px !important">{{userInfo['userName']}}已确认</span>
                </div>
                <div style="margin-top: 20px;display: flex;">
                  <Icon :type="`yes`" style="margin-top: 5px;"></Icon>
                  <span style="font-size:16px!important;font-weight: bolder;line-height: 26px !important">身份验证</span>
                </div>
                <div style="margin-top: 20px;display: flex">
                  <Icon :type="`yes`" style="margin-top: 5px;"></Icon>
                  <span style="font-size:16px!important;font-weight: bolder;line-height: 26px !important">电子邮箱验证</span>
                </div>
                <div style="margin-top: 20px;display: flex">
                  <Icon :type="`yes`" style="margin-top: 5px;"></Icon>
                  <span style="font-size:16px!important;font-weight: bolder;line-height: 26px !important">手机号</span>
                </div>
              </div>
              <div v-if="userInfo['state']!==1">
                <span style="font-size:22px!important;font-weight: bolder;line-height: 26px !important">{{userInfo['userName']}}未确认，点击此处前往邮箱验证</span>
              </div>
            </div>

          </div>
        </div>
        <div class="userRight">
          <div style="margin-left: 10%;">
            <div>
                <span style="font-size:32px!important;font-weight: bolder!important;line-height: inherit!important;">
                  您好，我叫{{userInfo['userName']}}</span>
            </div>
            <div style="margin-right: 15%">
              <el-button @click="changeMyself" :disabled="myselfButton" type="text">编辑个人资料</el-button>
              <div style="margin-top: 30px;"><span style="font-size: 18px;font-weight: bolder">关于</span></div>
              <div v-show="!myselfButton">
                <div style="margin-top: 15px;"><span style="font-size: 16px">{{myself}}</span></div>
                <div style="margin-top: 30px;display: flex">
                  <Icon :type="`country`"></Icon>
                  <span style="margin-left: 10px;">住在{{country}}</span></div>
              </div>
              <div v-show="myselfButton">
                <div>
                  <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder=""
                          v-model="myself">
                  </el-input>
                </div>
                <div style="">
                  <span>地点</span>
                  <CityPicker ref="citypicker"></CityPicker>
                </div>
                <div style="margin-top: 20px;">
                  <el-button type="primary" @click="submitMyself">保存</el-button>
                </div>
              </div>

            </div>
            <el-divider></el-divider>
            <div class="roomDiv">
              <span style="font-size: 18px;font-weight: bolder">{{userInfo['userName']}}的房源(共{{roomList.length}}个)</span>

              <div style="margin-top: 20px;display: flex;overflow-x: scroll;width: 85%;height: 250px">
                  <div
                          :span="8"
                          v-for="(item, i) in roomList"
                          :key="i"
                  >
                    <div style="width: 200px" @click="jumpToRoomDetail(item.rId)">
                      <Rooms :cardData="item"></Rooms>
                    </div>
                  </div>
              </div>

            </div>
            <el-divider></el-divider>
            <div class="commentDiv">
              <span>0条评价</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../../components/TopNav/NavMenu";
  import {getUser, getUserAbout, updateUserAbout} from "../../service/user";
  import Icon from "../roomDetail/components/IconRender";
  import CityPicker from "../../components/cityPicker/CityPicker";
  import {getRoomByUId} from "../../service/room";
  import Rooms from "../home/components/Rooms"
  export default {
    name: "PersonInfo",
    data() {
      return {
        userInfo: {},
        myselfButton: false,
        myself: "",
        country: "中国",
        roomList: [],
        updateIconData:{'uId':this.$store.state.user['uId']}
      }
    },
    methods: {
      changeMyself() {
        if (!this.myselfButton) {
          this.myselfButton = true
        }
      },
      async submitMyself() {
        this.myselfButton = false;
        const picker = this.$refs.citypicker.fullAddress;
        this.country = picker;
        const data = await updateUserAbout({
          'uId': this.$store.state.user['uId'],
          'myself': this.myself,
          'country': this.country
        })
        console.log(data.data);
        if (data.data === '1') {
          this.getUserInfo(this.$store.state.user['uId'])
        }
      },

      async getUserInfo(uId) {
        console.log(uId);
        const data = await getUser(uId);
        const userAbout = await getUserAbout(uId);

        this.userInfo = data.data;
        this.country = userAbout.data['country'];
        this.myself = userAbout.data['myself'];
      },
      async getRoom(uId) {
        console.log(uId);
        const data = await getRoomByUId(uId);
        this.roomList = data.data
      },
      jumpToRoomDetail(rId) {
        if (localStorage.getItem("token") === "null") {
          this.$message.error("请先登录");
        } else {
          console.log(rId);
          this.$router.push(`/roomDetail?id=${rId}`);
        }
      },
      updateIcon(){
        this.$router.go(0);
      },
    },

    components: {
      NavMenu, Icon, CityPicker,Rooms
    },
    created() {
      this.getUserInfo(this.$store.state.user['uId']);
      this.getRoom(this.$store.state.user['uId']);
    }

  }
</script>

<style scoped>

  .userLeft {
    /*border: 1px solid black;*/
    width: 40%;
  }

  .userRight {
    /*border: 1px solid red;*/
    width: 60%;
  }

  .circleLeft {
    margin-top: 10px;
    float: right;
    width: 70%;
    /*border: 1px solid seagreen;*/
    border-radius: 20px
  }

  >>>.card-container {
    height: 200px;
    width: 80%;
  }


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
