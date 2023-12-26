import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/page/Home.vue";
import Login from "@/page/Login.vue";
import Main from "@/page/Main.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/main",
        name: "main",
        component: Main
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;