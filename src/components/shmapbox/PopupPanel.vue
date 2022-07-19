<!--
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-02-02 09:25:12
 * @LastEditTime: 2022-02-03 14:09:02
 * @FilePath: \src\components\shmapbox\PopupPanel.vue
-->
<template>
  <div>
    <div>
      {{ description }}
    </div>
    <div class="flex-row">
      <button
        v-show="isSquare"
        @click="handleMeeting"
        style="
          cursor: pointer;
          font-size: 2rem;
          background-color: red;
          border-radius: 1.5rem;
          padding: 0.5rem;
          color: whitesmoke;
          width: 14rem;
          border: 0px;
          float: right;
          margin: 1rem 1rem 0 0;
        "
      >
        相亲角活动
      </button>
      <button
        @click="handleClick"
        style="
          cursor: pointer;
          font-size: 2rem;
          background-color: red;
          border-radius: 1.5rem;
          padding: 0.5rem;
          color: whitesmoke;
          width: 12rem;
          border: 0px;
          float: right;
          margin-top: 1rem;
        "
      >
        进入看看
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["description"],
  beforeMount() {
    if (this.description == "上海人民广场") {
      this.isSquare = true;
    }
  },
  data() {
    return {
      isSquare: false,
    };
  },
  methods: {
    handleMeeting() {
      
      // const mapel = document.getElementById("map");
      this.$store.commit("setLeftContentVisible", true);
    },
    handleClick() {
      // console.log(this.descript);
      if (this.description == "上海城隍庙") {
        window.open(
          "https://www.cryptovoxels.com/play?coords=NW@691W,311N,14F"
        );
      } else {
        window.open("https://www.cryptovoxels.com/play?coords=N@780W,44S");
      }
    },
  },
};
</script>
<style scoped></style>
