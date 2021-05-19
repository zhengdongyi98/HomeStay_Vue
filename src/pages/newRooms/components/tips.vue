<template>
  <div class="tips">
    <div>
      <div style="margin-left: 25px;margin-top: 30px;margin-bottom: 30px;">
        <div>
          <Icon :type="'tips'"></Icon>
        </div>
        <div v-if="divName==='categoryDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">房源类别选择</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">选择准确的房源类别有助于房客了解隐私保障程度、住房风格和服务水平。</span></div>
        </div>

        <div v-else-if="divName==='locationDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">房源位置</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">选择准确的房源位置有助于房客了解周边环境，出行路线。</span></div>
        </div>

        <div v-else-if="divName==='roomNameDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">房源名称示例</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">"皖町-【昨日青空】绿地紫峰、安庆置地滨江中心、秦潭湖公园、苏宁广场、油罐艺术中心、滨江公园、安庆之星"</span></div>
        </div>

        <div v-else-if="divName==='descriptionDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">房源描述示例</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">"民宿距离巨石山景区200米，足不出户即可欣赏到美丽的风景。民宿的第一原则是“干净卫生”，床品保证一客一换，民宿用品(拖鞋、水杯等)都经过消毒处理，您可以放心入住。"</span></div>
        </div>

        <div v-else-if="divName==='bedDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">卧室信息</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">准确的卧室信息有助于客户快速了解房源并增加预订的成功率</span></div>
        </div>

        <div v-else-if="divName==='sheShiDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">添加无线网络</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">希望能在旅行期间与外界保持联系的房客增加了 400%。如果您的房源提供稳定的无线网络，请明确说明。这有助于您获得预订。</span></div>
        </div>

        <div v-else-if="divName==='ruleDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">房屋守则</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">客户必须同意您的房屋守则才可入住。寻找允许儿童、婴幼儿和宠物入住的房源的旅行者增加了 171%。如果您愿意的话，请标明房源适合这些房客入住，以获得更多预订。</span></div>
        </div>

        <div v-else-if="divName==='imageDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">上传房源的图片</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">请总共添加至少 6 张横版照片，照片需大于 50KB，小于 50MB。</span></div>
        </div>

        <div v-else-if="divName==='priceDiv'">
          <div style="margin-top: 10px;"><span style="font-size: 16px;">设定价格</span></div>
          <div style="margin-top: 10px;width: 90%"><span
                  style="font-size: 14px;">请您务必及时更新房源价格，平台也会根据情况为您进行价格控制。</span></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Icon from "../../roomDetail/components/IconRender"

  export default {
    name: "tips",
    props: {
      divName: {
        type: String
      }
    },
    components: {
      Icon
    }
  }
</script>

<style scoped>
  .tips {

    /*border: 1px solid red!important;*/
  }

  .tips > div {
    width: 300px;

    border: 1px solid #C0C4CC;
    position: fixed;
    margin-top: 80px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    margin-left: 20px;
  }
</style>
