<template>

  <div>
    <el-cascader
            :options="CityInfo"
            v-model="selectedOptions"
            :checkStrictly="true"
            :clearable="true"
            @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
  import {CityInfo} from "../../components/cityPicker/plugins/city-picker/city-data"

  export default {
    name: "CityPicker",
    data() {
      return {
        CityInfo: CityInfo,//地区数据
        city: '',
        erae: '',
        minerae: '',
        selectedOptions: [],//地区筛选数组
        fullAddress:''
      }
    },
    methods: {
      handleChange(value) {
        for (let y in this.CityInfo) {
          if (this.CityInfo[y].value === value[0]) {
            console.log(this.CityInfo[y].label);
            this.selectedOptions.push(this.CityInfo[y].label)
          }
          for (let z in this.CityInfo[y].children) {
            if (this.CityInfo[y].children[z].value === value[1] && value[1] !== undefined) {
              console.log(this.CityInfo[y].children[z].label);
              this.selectedOptions.push(this.CityInfo[y].children[z].label);
            }
            for (let i in this.CityInfo[y].children[z].children) {
              if (this.CityInfo[y].children[z].children[i].value === value[2] && value[2] !== undefined) {
                console.log(this.CityInfo[y].children[z].children[i].label);
                this.selectedOptions.push(this.CityInfo[y].children[z].children[i].label);
              }
            }
          }

        }
        this.city = this.selectedOptions[3];
        this.erae = this.selectedOptions[4];
        this.minerae = this.selectedOptions[5];
        if (this.city===''&&this.erae===''&&this.minerae===''){
          this.fullAddress = '中国'
        } else {
          this.fullAddress = this.city+this.erae+this.minerae;
        }
        this.$store.state.roomInfo['location'] = this.fullAddress;//存入省市区信息
      },

    }


  }
</script>

<style scoped>
  .el-cascader {
    margin-top: 20px;
    width: 400px !important;
  }
</style>
