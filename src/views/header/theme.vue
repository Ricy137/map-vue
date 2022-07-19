<!--
@description: theme主题颜色切换
@author: fc
@createtime: 2021年12月22日 15:33:56
-->

<template>
  <div class="theme-change">
    <div
      :class="[
        'theme-ele',
        theme == 'light' ? 'theme-light-active' : 'theme-light',
      ]"
      @click="changeTheme('light')"
    ></div>
    <span class="theme-divide">|</span>
    <div
      :class="[
        'theme-ele',
        theme == 'dark' ? 'theme-dark-active' : 'theme-dark',
      ]"
      @click="changeTheme('dark')"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    ...mapMutations(["setTheme"]),
    changeTheme(theme) {
      this.theme = theme;
      this.setTheme(theme);
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-change {
  display: flex;
  width: 8rem;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 20rem;
  padding: 1rem 2rem;
  .theme-ele {
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    background-image: url("../../assets/theme.png");
    cursor: pointer;
  }
  .theme-divide {
    width: 2rem;
    text-align: center;
  }
  .theme-light {
    background-position: 0px 0px;
  }
  .theme-light-active {
    background-position: 75px 0px;
  }
  .theme-dark {
    background-position: 25px 0px;
  }
  .theme-dark-active {
    background-position: 50px 0px;
  }
}
</style>
