<!--
@description: layout of pc
@author: ricy
@createtime: 2021年12月22日 14:46:14
-->
<template>
  <div class="layout-pc">
    <Header :isHideHeader="isHideHeader"></Header>
    <div class="router-container">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/views/header/index.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      isHideHeader: false,
      i: 125,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * 处理页面滚动时顶部的隐藏
     */
    handleScroll() {
      var scrollTop = document.querySelector(".router-container").scrollTop;
      var scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scroll > 0) {
        this.isHideHeader = true;
      } else {
        this.isHideHeader = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-pc {
  position: relative;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  .router-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
