<!--
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-02-02 10:35:46
 * @LastEditTime: 2022-02-03 14:08:41
 * @FilePath: \src\components\shmapbox\PlaceDetail.vue
-->
<template>
  <transition name="el-fade-in-linear">
    <div
      id="place-detail"
      class="place-detail-container"
      v-show="isShowLeftContent"
    >
      <div v-if="!isMobile" class="pc">
        <div class="content-wrap flex-col">
          <div class="title-container"></div>
          <div class="detail-content">
            <p>
              <strong>{{ data.title[0] }}</strong>
            </p>
            <p>
              <strong>{{ data.title[1] }}</strong>
            </p>
            <p>{{ data.content[0] }}</p>
            <p>{{ data.content[1] }}</p>
            <a
              href="https://jinshuju.net/f/QXhWdR"
              target="_blank"
              class="content-link"
              >原文链接</a
            >
            <p>{{ data.content[2] }}</p>
            <p>{{ data.content[3] }}</p>
            <p>
              <strong>{{ data.title[2] }}</strong>
            </p>
            <p>{{ data.content[4] }}</p>
            <p>{{ data.content[5] }}</p>
            <p>
              <strong>{{ data.title[3] }}</strong>
            </p>
            <p>{{ data.content[6] }}</p>
            <p>{{ data.content[7] }}</p>
            <p>{{ data.content[8] }}</p>
            <p>
              <strong>{{ data.title[4] }}</strong>
            </p>
            <p>{{ data.content[9] }}</p>
            <p>
              <strong>{{ data.title[5] }}</strong>
            </p>
            <p>{{ data.content[10] }}</p>
            <p>
              <strong>{{ data.title[6] }}</strong>
            </p>
            <p>{{ data.content[11] }}</p>
            <p>
              <strong>{{ data.title[7] }}</strong>
            </p>
            <p>{{ data.content[12] }}</p>
          </div>
          <div class="panel-bottom">
            <button @click="handleJump" class="btn-close">表白</button>
            <button @click="handleClick" class="btn-close">退出</button>
          </div>
        </div>
      </div>
      <div v-else class="mobile">
        <div class="content-wrap flex-col">
          <div class="title-container"></div>
          <div class="detail-content">
            <p>
              <strong>{{ data.title[0] }}</strong>
            </p>
            <p>
              <strong>{{ data.title[1] }}</strong>
            </p>
            <p>{{ data.content[0] }}</p>
            <p>{{ data.content[1] }}</p>
            <a
              href="https://jinshuju.net/f/QXhWdR"
              target="_blank"
              class="content-link"
              >原文链接</a
            >
            <p>{{ data.content[2] }}</p>
            <p>{{ data.content[3] }}</p>
            <p>
              <strong>{{ data.title[2] }}</strong>
            </p>
            <p>{{ data.content[4] }}</p>
            <p>{{ data.content[5] }}</p>
            <p>
              <strong>{{ data.title[3] }}</strong>
            </p>
            <p>{{ data.content[6] }}</p>
            <p>{{ data.content[7] }}</p>
            <p>{{ data.content[8] }}</p>
            <p>
              <strong>{{ data.title[4] }}</strong>
            </p>
            <p>{{ data.content[9] }}</p>
            <p>
              <strong>{{ data.title[5] }}</strong>
            </p>
            <p>{{ data.content[10] }}</p>
            <p>
              <strong>{{ data.title[6] }}</strong>
            </p>
            <p>{{ data.content[11] }}</p>
            <p>
              <strong>{{ data.title[7] }}</strong>
            </p>
            <p>{{ data.content[12] }}</p>
          </div>
          <div class="panel-bottom">
            <button @click="handleJump" class="btn-close">表白</button>
            <button @click="handleClick" class="btn-close">退出</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Data from "./meeting.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: {},
      isMobile: false,
    };
  },
  computed: {
    ...mapGetters(["isShowLeftContent"]),
  },
  beforeMount() {
    this.data = Data;
    if (window.screen.availWidth <= 768) {
      this.isMobile = true;
    }
  },
  methods: {
    handleClick() {
      this.$store.commit("setLeftContentVisible", false);
      // const mapel = document.getElementById("map");
      // mapel.style.left = "0%";
      // mapel.style.width = "147%";
      // mapel.style.height = "111%";
      // console.log(this.description);
    },
    handleJump() {
      this.$store.commit("setLeftContentVisible", false);
      this.$router.push({
        name: "aipic",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.place-detail-container {
  ::-webkit-scrollbar {
    display: none;
  }
  .pc {
    background-color: #dddcdcd4;
    height: 90%;
    border-radius: 2rem;
    position: relative;
    z-index: 99;
    width: 21%;
    padding: 5% 3rem;
    .content-wrap {
      height: 100%;
      overflow: auto;
    }
    .title-container {
      font-size: 4rem;
      font-weight: 600;
    }
    .detail-content {
      font-size: 2rem;
      line-height: 3rem;
      text-indent: 4rem;
      flex: 1;
      overflow: auto;
      background: #c1baff59;
    }
  }
  .mobile {
    background-color: #dddcdcd4;
    height: 96%;
    border-radius: 2rem;
    position: relative;
    z-index: 99;
    width: 90%;
    padding: 5%;
    .content-wrap {
      height: 100%;
      overflow: auto;
    }
    .title-container {
      font-size: 4rem;
      font-weight: 600;
    }
    .detail-img {
      height: 35%;
      width: 100%;
      border-radius: 5rem;
    }
    .detail-content {
      font-size: 2rem;
      line-height: 3rem;
      text-indent: 4rem;
      flex: 1;
      overflow: auto;
      background: #c1baff6a;
      border-radius: 2rem;
      padding: 1rem;
    }
  }

  .panel-bottom {
    display: flex;
    justify-content: center;
    margin: 2rem 0px;
    .btn-close {
      font-size: 2rem;
      background-color: red;
      border-radius: 1.5rem;
      padding: 0.5rem;
      color: whitesmoke;
      width: 12rem;
      border: 0px;
      float: right;
      margin-top: 1rem;
      cursor: pointer;
      &:nth-child(1) {
        background-color: rgb(255, 255, 255);
        color: #000000;
        margin-right: 2rem;
      }
    }
  }
  .content-link {
    margin-left: 4rem;
    color: cornflowerblue;
    text-decoration: underline;
  }
}
</style>
