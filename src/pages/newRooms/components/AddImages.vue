<template>
  <div style="display: flex;margin-bottom: 90px">
    <div class="main-info-outside">
      <div class="main-info-inside">
        <div>
          <span style="font-size: 26px !important;font-weight: 600 !important;line-height: 40px !important;">添加照片</span>
        </div>
        <div style="margin-top: 30px;">
          <div><span style="font-size: 22px !important;line-height: 34px !important;">房源外观</span></div>
          <div><span style="font-size: 14px !important;line-height: 20px !important;">至少上传2张</span></div>
          <div style="margin-top: 20px">
            <el-upload
                    action="http://localhost/homestay/room/uploadFile"
                    list-type="picture-card"
                    :auto-upload="false"
                    :multiple="true"
                    :on-change="handleFileChange1"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 30px;">
          <div><span style="font-size: 22px !important;line-height: 34px !important;">卧室区域</span></div>
          <div><span style="font-size: 14px !important;line-height: 20px !important;">至少上传1张</span></div>
          <div style="margin-top: 20px">
            <el-upload
                    action="http://localhost/homestay/room/uploadFile"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="handleFileChange2"
                    :multiple="true"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove2">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 30px;">
          <div><span style="font-size: 22px !important;line-height: 34px !important;">起居区</span></div>
          <div><span style="font-size: 14px !important;line-height: 20px !important;">至少上传1张</span></div>
          <div style="margin-top: 20px">
            <el-upload
                    action="http://localhost/homestay/room/uploadFile"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="handleFileChange3"
                    :multiple="true"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove3">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 30px;">
          <div><span style="font-size: 22px !important;line-height: 34px !important;">卫生间</span></div>
          <div><span style="font-size: 14px !important;line-height: 20px !important;">至少上传1张</span></div>
          <div style="margin-top: 20px">
            <el-upload
                    action="http://localhost/homestay/room/uploadFile"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="handleFileChange4"
                    :multiple="true"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove4">

              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 30px;">
          <div><span style="font-size: 22px !important;line-height: 34px !important;">其他</span></div>
          <div><span style="font-size: 14px !important;line-height: 20px !important;">至少上传1张</span></div>
          <div style="margin-top: 20px">
            <el-upload
                    action="http://localhost/homestay/room/uploadFile"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="handleFileChange5"
                    :multiple="true"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove5">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <el-divider></el-divider>

      </div>
    </div>
    <tips :divName="divName"></tips>
  </div>
</template>

<script>
  import tips from "./tips";

  export default {
    name: "addImages",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        divName: "imageDiv",
        fileLists: { 'List1':[],'List2':[],'List3':[],'List4':[],'List5':[]},
        // param: new FormData(),
      }
    },
    components: {
      tips
    },
    methods: {
      // handleFileChange1(file, fileList) {
      //   fileList.forEach(
      //       (val, index) => {
      //         this.param.append("main-"+index, val.raw);
      //       }
      //   );
      //   this.$store.state.roomInfo['fileList']=this.param;
      //   console.log(this.param.get("main-0"));
      //   console.log(this.$store.state.roomInfo['fileList'].get("main-0"));
      // },
      haha(){
        this.param = new FormData();
        this.$store.state.fileList = new FormData();
        for(let i=0;i<this.fileLists.List1.length;i++){
          this.param.append("main-"+i,this.fileLists.List1[i].raw);
        }
        for(let i=0;i<this.fileLists.List2.length;i++){
          this.param.append("bed-"+i,this.fileLists.List2[i].raw);
        }
        for(let i=0;i<this.fileLists.List3.length;i++){
          this.param.append("wash-"+i,this.fileLists.List3[i].raw);
        }
        for(let i=0;i<this.fileLists.List4.length;i++){
          this.param.append("toilet-"+i,this.fileLists.List4[i].raw);
        }
        for(let i=0;i<this.fileLists.List5.length;i++){
          this.param.append("other-"+i,this.fileLists.List5[i].raw);
        }
        this.$store.state.fileList = this.param;
      },
      handleFileChange1(file,fileList){
        this.fileLists['List1'] = fileList;
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleFileChange2(file, fileList) {
        this.fileLists['List2'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleFileChange3(file, fileList) {
        this.fileLists['List3'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleFileChange4(file, fileList) {
        this.fileLists['List4'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleFileChange5(file, fileList) {
        this.fileLists['List5'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },

      handleRemove1(file, fileList) {
        this.fileLists['List1'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleRemove2(file, fileList) {
        this.fileLists['List2'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleRemove3(file, fileList) {
        this.fileLists['List3'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleRemove4(file, fileList) {
        this.fileLists['List4'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handleRemove5(file, fileList) {
        this.fileLists['List5'] = fileList
        this.$store.state.fileLists = this.fileLists
        // this.haha()
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        console.log(file.size);
        const isLt2M = file.size / 1024 / 1024 < 50;
        const isLt50K = file.size / 1024 > 50;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 50MB!');
        }
        // if (!isLt50K) {
        //   this.$message.error('上传图片大小不能小于 50K!');
        // }
        // return isJPG && isLt2M && isLt50K;

        return isJPG && isLt2M;
      },
      created() {
      }
    }
  }
</script>

<style scoped>
  @import "../addInfo.css";

  >>> .el-upload-list__item {
    width: 45% !important;
    height: 200px !important;
  }

  >>> .el-upload-list__item-thumbnail {
    width: 100% !important;
    height: 200px;
  }

  /*>>>.el-upload--picture-card{*/
  /*  width: 200px!important;*/
  /*  height: 200px!important;*/
  /*  line-height: 200px!important;*/
  /*}*/
</style>
