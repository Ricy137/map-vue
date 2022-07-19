<template>
  <div class="view-live">
    <div :class="['aspect-ratio', isLarge ? 'large' : '']" id="frame">
      <iframe
        :class="['live-frame', isLarge ? 'large-frame' : '']"
        src="https://player.bilibili.com/player.html?aid=56850347&cid=99299213&page=1&high_quality=1&danmaku=0"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        width="100%"
        height="500"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      screenWidth: 0,
      isLarge: false,
    };
  },
  beforeMount() {
    this.adjust();
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
  },
};
</script>

<style lang="scss" scoped>
.view-live {
  display: flex;
  justify-content: center;
  margin-top:7rem;
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
.large {
  width: 90% !important;
}
.large-frame {
  height: 60% !important;
}
</style>
