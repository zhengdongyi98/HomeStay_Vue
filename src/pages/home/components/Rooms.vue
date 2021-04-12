<template>
  <div class="card-container">
    <img
      style="border-radius: 4px; cursor: pointer"
      :src="cardData.roomImages[0]"
      class="image"
      width="100%"
    />
    <div class="text-container">
      <span class="category">
        {{ cardData.category }}·{{ cardData.type }}·{{ cardData.capacity }}张床
      </span>
      <div class="name">{{ cardData.roomName }}</div>
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
  color: rgb(57, 87, 106);
}
.name {
  font-size: 16px;
  color: rgb(72, 72, 72);
}
.price {
  cursor: default;
  font-size: 16px;
  color: rgb(72, 72, 72);
}
</style>
