<!--
 * @Author: ricy
 * @LastEditors: ricy
 * @Date: 2022-02-03 14:19:30
 * @LastEditTime: 2022-02-03 14:42:53
 * @FilePath: \src\views\mint\mintNFT.vue
-->
<template>
  <div class="mint-container">
    <div class="mint-title">Mint倒计时:</div>
    <div class="mint-time">2Day19hr</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.mint-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("https://www.seedao.xyz/static/img/banner.ea80c906.png");
  .mint-title {
    border-style: solid;
    border-color: black;
    color: red;
    background-color: white;
    font-size: 4rem;
    width: 35rem;
    text-align: center;
    line-height: 8rem;
    height: 8rem;
    border-radius: 3rem;
    font-weight: 600;
    border-width: 5px;
    margin-bottom: 2rem;
  }
  .mint-time {
    border-style: solid;
    border-color: black;
    color: red;
    background-color: white;
    font-size: 4rem;
    width: 35rem;
    text-align: center;
    line-height: 5rem;
    height: 5rem;
    border-radius: 3rem;
    font-weight: 600;
    border-width: 5px;
  }
}
</style>
