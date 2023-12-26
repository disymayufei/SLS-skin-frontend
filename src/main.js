import { createApp } from 'vue'
import App from './App.vue'

import router from "@/js/router";
import ArcoVue from '@arco-design/web-vue';

function initVueApp() {
    const app = createApp(App);

    app.use(router);
    app.use(ArcoVue);

    app.mount('#main-container');

    window.addEventListener("load", () => {
       document.body.setAttribute("arco-theme", "dark")
    });
}

initVueApp();