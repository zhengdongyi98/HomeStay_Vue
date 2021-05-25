<template>
  <div>
    <el-container>
      <el-header>
        <el-steps :active="active" finish-status="success" simple style="margin-top: 15px">
          <el-step @click.native="go(0)" title="基本信息"></el-step>
          <el-step @click.native="go(1)" title="详细信息"></el-step>
          <el-step @click.native="go(2)" title="图片信息"></el-step>
          <el-step @click.native="go(3)" title="价格信息"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <keep-alive><router-view></router-view></keep-alive>

      </el-main>
      <el-footer>
        <div class="footer">
          <el-button class="goBackButton" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
          <el-button class="nextButton" @click="next" v-if="this.active<3">下一步</el-button>
          <el-button class="nextButton" v-loading.fullscreen.lock="fullscreenLoading" @click="submitRoom" :plain="true" v-if="this.active===3">完成</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
  import AddBaseRoom from "./components/AddBaseRoom";
  import AddPrice from "./components/AddPrice";
  import AddImages from "./components/AddImages";
  import AddDetail from "./components/AddDetail";
  import {addRoom,uploadImage} from "../../service/room";
  export default {
    name: "newRoom",
    data() {
      return {
        active: 0,
        fullscreenLoading: false
      };
    },
    methods: {
      go(index){
        this.active = index;
        if (index===0){
          this.$router.push("/addBaseRoom")
        }
        if (index===1){
          this.$router.push("/addDetail")
        }
        if (index===2){
          this.$router.push("/addImages")
        }
        if (index===3){
          this.$router.push("/addPrice")
        }

      },
      next() {
        console.log(this.active);
        this.active++;
        if (this.active === 0 ){
          this.$router.push("/addBaseRoom")
        }
        if (this.active===1){
          this.$router.push("/addDetail")
        }
        if (this.active===2){
          this.$router.push("/addImages")
        }
        if (this.active===3){
          this.$router.push("/addPrice")
        }

      },
      goBack() {
        if (this.active === 0 ){
          this.$router.push("/")
        }
        if (this.active===1){
          this.active--;
          this.$router.push("/addBaseRoom")
        }
        if (this.active===2){
          this.active--;
          this.$router.push("/addDetail")
        }
        if (this.active===3){
          this.active--;
          this.$router.push("/addImages")
        }
      },
      async submitRoom(){
        console.log(this.$store.state.roomInfo);
        let roomInfo = this.$store.state.roomInfo;
        console.log(this.$store.state);
        console.log(this.$store.state);
        roomInfo['uId']=this.$store.state.user['uId'];

        let fileLists = this.$store.state.fileLists;
        let files = new FormData();
        fileLists.List1.map((val,index)=>{
          files.append("main",val.raw);
        }) ;
        fileLists.List2.map((val,index)=>{
          files.append("other",val.raw);
        }) ;
        fileLists.List3.map((val,index)=>{
          files.append("other",val.raw);
        }) ;
        fileLists.List4.map((val,index)=>{
          files.append("other",val.raw);
        }) ;
        fileLists.List5.map((val,index)=>{
          files.append("other",val.raw);
        }) ;
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$message.success({
            message: '新增房源成功，等待管理员审核',
          });
          this.$router.push("/");
        }, 3000);
        const result = await addRoom(roomInfo);
        if (result.data!==null){
          files.append("rId",result.data)
          const imageResult = await uploadImage(files);

        }

      }
    },
    components: {
      AddBaseRoom, AddDetail, AddImages, AddPrice
    },
    created() {
      if (this.active === 0 ){
        this.$router.push("/addBaseRoom")
      }
      console.log(this.$store.state.user);
    }
  }
</script>
<style scoped>
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    z-index: 200;
    width: 100%;
    background-color: white!important;
    position: fixed!important;
    height: 74px !important;
  }

  .el-main {
    margin-top: 75px!important;
    width: 100%;
  }

  .el-footer{
    /*border: 1px solid black;*/
    height: 75px !important;
    width: 60%;
    bottom: 0!important;
    position: fixed!important;
    background-color: white!important;
    z-index: 200;
  }

  .goBackButton {
    margin-top: 12px !important;
    margin-left: 15%;

    display: table-cell !important;
    vertical-align: middle !important;
    color: var(--color-text-link, #008489) !important;
    font-family: var(--font-font_family, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif) !important;
    text-decoration: var(--font-link-text-decoration, none) !important;
    font-size: 16px !important;
    font-weight: bolder !important;
    border: none !important;
    width: 92px !important;
    height: 50px !important;
    text-align: left !important;

  }

  .goBackButton:hover {
    background-color: white !important;
  }

  .nextButton {
    margin-top: 12px !important;
    display: table-cell !important;
    vertical-align: middle !important;
    color: white !important;
    font-family: var(--font-font_family, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif) !important;
    text-decoration: var(--font-link-text-decoration, none) !important;
    font-size: 16px !important;
    font-weight: bolder !important;
    padding: 10px 22px !important;
    width: 96px !important;
    height: 48px !important;
    float: right !important;
    margin-right: 50px !important;
    background-color: var(--color-buttons-default-color, #008489) !important;
  }

  .nextButton:hover {
    color: white !important;
    background-color: var(--color-buttons-default-color, #008489) !important;;
  }


</style>
