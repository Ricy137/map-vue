<!--
@description: 顶部导航栏 —— 导航 + 主题色 + 双语 + 登录
@author: ricy
@createtime: 2021年12月22日 15:19:14 
-->
<template>
  <div :class="isHideHeader ? 'layout-header is-header-hide' : 'layout-header'">
    <div v-if="!isMobile" class="pc">
      <h1 class="title">shanghai</h1>
      <div class="wrap flex-row">
        <Nav class="header-left header-nav"></Nav>
        <div class="header-right">
          <!-- <Theme class="header-theme"></Theme> -->
          <!-- <Language class="header-language"></Language> -->
        </div>
      </div>
    </div>

    <!--手机适配-->

    <div v-else class="mobile">
      <div class="header-nav_mobile">
        <i
          style="
            font-size: 3.2rem;
            z-index: 1;
            margin-top: 1rem;
            margin-right: 1rem;
          "
          :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          @click="isFold = !isFold"
        ></i>
        <el-collapse-transition>
          <div class="navs-wrap_mobile flex-col align-start" v-show="!isFold">
            <span class="nav-item" v-for="nav of navs" :key="nav.id">
              <a @click.stop="routerJump([nav.name])" :class="active">{{
                nav.label
              }}</a>
            </span>
            <span class="nav-item">
              <a
                :class="active"
                href="https://twitter.com/MaryChao21"
                target="blank"
                >联系我</a
              >
            </span>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./nav.vue";
import { _routerJump } from "@/utils/router.js";
// import Theme from "./theme.vue";
// import Language from "./language.vue";
export default {
  props: ["isHideHeader"],

  components: {
    Nav,
    // Theme,
    // Language,
  },
  beforeMount() {
    if (window.screen.availWidth <= 768) {
      this.isMobile = true;
    }
  },
  mounted() {},
  methods: {
    routerJump(params) {
      _routerJump([this, ...params]);
    },
  },
  data() {
    return {
      isMobile: false,
      isFold: true,
      navs: [
        {
          id: 1,
          name: "home",
          label: "主页",
        },
        {
          id: 2,
          name: "aipic",
          label: "生成艺术",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-header {
  $header-margin: 5rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99;
  transition: opacity 0.3s;
  opacity: 1;
  .pc {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .title {
      margin-left: 7rem;
    }
    .wrap {
      .header- {
        &left {
          flex: 2;
          margin-left: $header-margin;
        }
        &right {
          // flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: $header-margin;
          .header- {
            &theme {
              width: 7rem;
            }
            &language {
              margin: 0 2rem;
            }
          }
        }
        &nav {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .mobile {
    .navs-wrap_mobile {
      position: absolute;
      width: 100%;
      background: white;
      overflow: hidden;
      border: 0;
      padding-top: 5rem;
      .nav-item {
        font-family: "Noto Sans SC";
        font-weight: 400;
        font-size: 1.8rem;
        margin-left: 5rem;
        padding: 0px;
        width: 100%;
        text-align: left;
        margin-bottom: 2rem;

        &:hover,
        &.active {
          cursor: pointer;
          font-weight: 400;
          a {
            color: #4c81c8 !important;
          }
        }
      }
      .sub-menu {
        width: 100%;
        text-align: left;
        display: block;
        margin-top: 1.2rem;
        li {
          display: flex;
          &:nth-child(n + 2) {
            margin-top: 0.8rem;
          }
        }
      }
    }
    .header-nav_mobile {
      position: absolute;
      width: 100%;
      top: 0rem;
      left: 0rem;
      display: flex;
      flex-direction: column;
      text-align: right;
      a {
        font-size: 1.6rem;
        height: 4rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.is-header-hide {
  opacity: 0;
}
</style>
