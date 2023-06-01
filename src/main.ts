import "./assets/styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
