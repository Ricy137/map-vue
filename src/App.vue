<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",
  mounted() {
    if (this._isMobile()) {
      this.setIsMobile(true);
    } else {
      this.setIsMobile(false);
    }
  },
  methods: {
    ...mapMutations(["setIsMobile"]),
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>

<style>
html,
body {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  overflow: hidden;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 62.5%;
}
#app {
  height: 100%;
  overflow: auto;
  font-size: 1.6rem;
}
</style>
