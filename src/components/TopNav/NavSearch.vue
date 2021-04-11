<template>
  <div style="width: 1080px!important;height: 72px">
    <el-form>
      <el-form-item>
        <el-input prefix-icon="el-icon-search" placeholder="输入目的地、城市或景点" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="房源">
            <el-option label="房源" value="1"></el-option>
            <el-option label="体验" value="2"></el-option>
          </el-select>
          <div id="inside" slot="append" style="display: inline-block">
            <TimePicker slot="prepend"></TimePicker>
            <el-button type="primary" slot="append" icon="el-icon-search">搜索</el-button>
          </div>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import TimePicker from "../content/TimePicker"

  export default {
    name: "NavSearch",
    components: {
      TimePicker
    },
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        select: ''
      }
    }
  }
</script>

<style scoped>

</style>
