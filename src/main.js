import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store/store.js";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "./assets/styles/styles.sass";
import vueCountryRegionSelect from "vue-country-region-select";
import VueAnalytics from "vue-analytics";

// The below declaration is where to set the server address that is to be used in conjunction with this front end
Vue.prototype.$BaseURI =
    "https://webhook.site/e8c214e7-725b-4b97-bfe5-28372fa1e41c";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios, axios);
Vue.use(vueCountryRegionSelect);

// Google Analytics tracking
Vue.use(VueAnalytics, {
    id: "UA-206693788-1",
    router
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
