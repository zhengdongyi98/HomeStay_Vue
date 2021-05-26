<template>
  <div class="card-container">
    <img
            style="border-radius: 4px; cursor: pointer"
            :src="cardData.room.baseRoom.roomImages[0]"
            class="image"
            width="100%"
            height="60%"
    />
    <div class="text-container">
      <span class="category">
        {{ cardData.room.baseRoom.category }}·{{ cardData.room.baseRoom.type }}·{{ cardData.room.baseRoom.bedNumber }}张床
      </span>
      <div
              class="name"
              style="
          height: 36px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        "
      >
        {{ cardData.room.baseRoom.roomName }}
      </div>
      <div style="margin-top: 10px;">
        {{getOrderedTime}}
      </div>
      <div style="margin-top: 5px;">{{getOrderStatus}}</div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderRoom",
    data() {
      return {
        currentDate: new Date(),
      };
    },
    props: {
      cardData: {
        type: Object,
      },
    },
    methods: {

    },
    computed:{
      getOrderedTime(){
        let timeList = this.cardData.orderedTime.split(" ");
        let begin = timeList[0];
        let end = timeList[1];
        let num = timeList.length;
        if (num===1){
          return begin+"·  共"+num+"天"+num+"晚";
        } else {
          return begin+"/"+end+"   "+"·  共"+num+"天"+num+"晚";
        }
      },
      getOrderStatus(){
        switch (this.cardData.orderStatus) {
          case 0:
            return "状态：已支付，未完成"
          case 1:
            return "状态：支付超时,已取消"
          case 2:
            return "状态：待支付"
          case 3:
            return "状态：已完成，待评价"
          case 4:
            return "状态：已完成"
        }
      }
    }
  };
</script>

<style scoped>
  .card-container {
    height: 300px;
    width: 100%;
  }

  .text-container {
    cursor: pointer;
    word-wrap: break-word;
    font-family: Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC";
    vertical-align: middle;
    line-height: 1.33333em;
    font-weight: 500;
  }
  .category {

    font-size: 12px;
    font-weight: bolder;
    color: rgb(57, 87, 106);
  }
  .name {
    margin-top: 5px;
    height: 44px;
    font-size: 14px;
    font-weight: bolder;
    overflow: hidden;
    color: rgb(72, 72, 72);
  }
  .price {
    margin-top: 10px;
    cursor: default;
    font-size: 18px;
    font-weight: bolder;
    color: rgb(72, 72, 72);
  }
</style>
