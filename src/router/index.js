import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/view/index/index"),
      meta: {
        title: "首页"
      }
    },
    {
      path: "/invite",
      name: "invite",
      component: () => import("@/view/invite/index.vue"),
      meta: {
        title: "邀请"
      }
    }
  ]
});
