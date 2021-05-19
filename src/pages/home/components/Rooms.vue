<template>
  <div class="card-container">
    <img
      style="border-radius: 4px; cursor: pointer"
      :src="cardData.roomImages[0]"
      class="image"
      width="100%"
      height="60%"
    />
    <div class="text-container">
      <span class="category">
        {{ cardData.category }}·{{ cardData.type }}·{{ cardData.capacity }}张床
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
        {{ cardData.roomName }}
      </div>
      <div class="price">¥{{ cardData.basePrice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rooms",
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
  methods: {},
};
</script>

<style scoped>
.card-container {
  height: 380px;
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
  font-size: 16px;
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
