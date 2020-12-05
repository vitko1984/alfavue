import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import {store} from "@/store";

import './index.scss';

import vuetify from '@/plugins/vuetify';
//import '@/plugins/bootstrap_vue';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");