<template>
  <div class="notFound">
    <div class="header-bg"></div>
    <div class="scenes">路径错误，请检查网址拼写，三秒后跳转到首页</div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: "coopList_pc",
      });
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.notFound {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fffae9;
}
.scenes {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: absolute;
}
.header-bg {
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 288px;
}
</style>
