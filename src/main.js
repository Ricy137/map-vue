/*
 * @Author: ysy
 * @LastEditors: ysy
 * @Date: 2022-01-30 13:17:48
 * @LastEditTime: 2022-02-01 09:52:49
 * @FilePath: \src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./style/index.scss";
import DragPanel from "./components/shmapbox/DragPanel";
import mapboxgl from "mapbox-gl";
import store from "./store/index.js";

import VueI18n from "vue-i18n";

Vue.config.productionTip = false;
Vue.prototype.mapboxgl = mapboxgl;
Vue.prototype.$store = store;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh", // 语言标识
  messages: {
    zh: require("./data/lang/zh"), // 中文语言包
    en: require("./data/lang/en"), // 英文语言包
  },
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

new Vue({
  render: (h) => h(App),
  i18n,
  store,
  router,
  components: {
    DragPanel,
  },
}).$mount("#app");
