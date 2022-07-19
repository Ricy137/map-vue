<!--
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-01-30 15:08:43
 * @LastEditTime: 2022-02-03 14:28:47
 * @FilePath: \src\views\header\nav.vue
-->
<!--
@description: 导航
@author: fc
@createtime: 2021年12月22日 16:06:38 
-->
<template>
  <div class="header-nav">
    <a class="nav-item" @click="routerJump(['home'])">{{ $t("lang.home") }}</a>
    <!-- <a class="nav-item" @click="routerJump(['live'])">{{
      $t("lang.bilibili video")
    }}</a> -->
    <!-- <a class="nav-item" @click="routerJump(['mint'])">{{
      $t("lang.mint nft")
    }}</a> -->
    <a class="nav-item" @click="routerJump(['aipic'])">{{ $t("lang.aipic") }}</a>
    <a class="nav-item join-container" href="https://twitter.com/MaryChao21" target="blank">{{
      $t("lang.join us")
    }}</a>
  </div>
</template>

<script>
import { _routerJump } from "@/utils/router.js";

export default {
  data() {
    return {
      isShowDropdown: false,
    };
  },
  methods: {
    routerJump(params) {
      _routerJump([this, ...params]);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-nav {
  .nav-item {
    cursor: pointer;
    width: auto;
    text-align: center;
    font-weight: 500;
    font-size: 2rem;
    &:nth-child(n + 2) {
      margin-left: 6rem;
    }
  }
  .join-container {
    display: flex;
    width: 20rem;
    background-color: red;
    align-items: center;
    justify-content: center;
    color: white;
    height: 5rem;
    border-radius: 3rem;
  }
}
</style>
