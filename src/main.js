// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

//引入 Vant
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
//在main.js引入
import Web3 from "web3";
Vue.prototype.Web3 = Web3;
import { Dialog, Popup } from "vant";
Vue.use(Dialog);
Vue.use(Popup);
// 导入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
Vue.use(ElementUI);
import BNB from "./api/BNB/bnb";
Vue.use(BNB);
import "@/assets/less/index.less";

import commonMixin from "@/mixins/index.js";
Vue.mixin(commonMixin);
// 公用顶部
import TopSide from "../src/public/index.vue";
Vue.component("TopSide", TopSide);
// 复制
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
  }
});
