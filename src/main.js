import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/apis";
import axios from "axios";
import VueAxios from "vue-axios";
import vueEsign from "vue-esign";

Vue.use(vueEsign);
Vue.use(VueAxios, axios);

// all(建議放套件Css下層)
import "../src/assets/all.scss";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
