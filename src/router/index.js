/*
 * @Author: ricy
 * @LastEditors: ricy
 * @Date: 2022-01-30 15:08:43
 * @LastEditTime: 2022-02-03 14:28:09
 * @FilePath: \src\router\index.js
 */
import VueRouter from "vue-router";
import routes from "./routes";


const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: "history",
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath && from.fullPath && to.fullPath != from.fullPath) {
    next();
  } else {
    next({
      path: "/404",
    });
  }
});

export default router;
