<template>
  <!-- <Info> </Info> -->
  <div class="view-algo flex-col items-center justify-center">
    <div class="view-top flex-col justify-start">
      <h3 class="slogan">一句话创建你自己的AI艺术图，向你心意的对象表白吧！</h3>
      <button class="btn-create" @click="openAlgo">立即创作</button>
      <h6 class="tech-support flex-row items-center">
        <img
          src="https://algolet.com/_nuxt/img/logo2.a70f8c3.png"
          alt="logo"
          class="algolet-logo"
        />algolet提供技术支持
      </h6>
    </div>
    <div class="view-list">
      <el-skeleton :loading="loading" animated :count="20" :throttle="500">
        <template slot="template">
          <div class="flex-row justify-between items-center item-top">
            <div class="item-user flex-row items-center">
              <el-skeleton-item
                variant="image"
                style="width: 50px; height: 50px; display: contents"
              />
              <el-skeleton-item variant="text" class="user-name" />
            </div>
          </div>
          <div class="flex-row justify-center relative overflow-hidden">
            <div
              class="bgc-img absolute w-full h-full"
              style="background-color: rgb(247, 247, 247)"
            ></div>
            <div class="relative flex-row items-center">
              <el-skeleton-item
                variant="image"
                style="width: 380px; height: 380px; max-width: 100%"
              />
            </div>
          </div>
          <div class="item-title flex-row justify-center items-center">
            <el-skeleton-item
              variant="text"
              class="font-bold"
              style="margin-top: 2rem"
            />
          </div>
        </template>
        <template>
          <div v-for="item of aiList" :key="item.id" class="item-container">
            <div class="flex-row justify-between items-center item-top">
              <div class="item-user flex-row items-center">
                <img :src="item.user.avatar" alt="" class="user-avatar" />
                <div class="user-name">{{ item.user.name }}</div>
              </div>
            </div>
            <div class="flex-row justify-center relative overflow-hidden">
              <div
                class="bgc-img absolute w-full h-full"
                :style="`background-image: url('${item.outputImage}');
              `"
              ></div>
              <div class="relative flex-row items-center">
                <img
                  :src="item.outputImage"
                  alt=""
                  style="width: auto; height: auto; max-width: 100%"
                />
              </div>
            </div>
            <div class="item-title flex-row justify-center items-center">
              <h3 class="font-bold">{{ item.title }}</h3>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// import Info from "./info.vue";
export default {
  components: {
    // Info,
  },
  data() {
    return {
      screenWidth: 0,
      isLarge: false,
      aiList: [],
      loading: true,
    };
  },
  beforeMount() {
    this.adjust();
    this.getPublicList();
  },
  watch: {
    screenWidth() {
      this.adjust();
    },
  },
  mounted() {
    var _this = this;
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    };
  },
  methods: {
    adjust() {
      if (this.screenWidth >= 1230) {
        this.isLarge = true;
      } else {
        this.isLarge = false;
      }
    },
    openAlgo() {
      window.open(
        "https://www.algolet.com/applications/art_image?accessSource=dao"
      );
    },
    getPublicList() {
      try {
        axios
          .post("/algolet/getPublishList", {
            pageNum: 1,
            pageSize: 20,
            tabType: "new",
          })
          .then((res) => {
            if (res.status == 200) {
              this.aiList = res.data.data.list;
              this.loading = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.view-algo {
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  .view-top {
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-bottom: 5rem;
    .slogan {
      margin-bottom: 2rem;
    }

    .btn-create {
      width: 20rem;
      font-size: 2rem;
      background-color: red;
      color: white;
      height: 5rem;
      border-radius: 3rem;
      border-width: 0px;
      cursor: pointer;
    }
    .tech-support {
      margin-top: 2rem;
      margin-left: 1rem;
      color: rgb(163, 163, 163);
      .algolet-logo {
        width: 2rem;
        margin-right: 6px;
      }
    }
  }
  .view-list {
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 1rem;
    padding-left: 1rem;
    .item-container {
      position: relative;
      border-radius: 0.25rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .bgc-img {
        background-size: cover;
        transform: scale(4);
        filter: blur(20px);
        background-position: 50%;
        transform-origin: center;
        background-repeat: no-repeat;
      }
      .item-top {
        padding: 0.75rem;
      }
      .user-avatar {
        width: 5rem;
        height: 5rem;
        border-radius: 2.5rem;
      }
      .user-name {
        margin-left: 1rem;
      }
      .item-title {
        padding: 2rem;
      }
    }
  }
  .aspect-ratio {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%;

    .live-frame {
      position: absolute;
      width: 100%;
      height: 90%;
      left: 0;
      top: 0;
    }
  }
}
@media screen and(max-width:768px) {
  .view-algo {
    .view-top {
      width: 70%;
    }
    .view-list {
      width: 85%;
    }
  }
}
.large {
  width: 90% !important;
}
.large-frame {
  height: 60% !important;
}
</style>
