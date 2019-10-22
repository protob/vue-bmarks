import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import { authService } from "@/services/auth/AuthService";
import Callback from "@/components/auth/Callback.vue";
import SplashScreen from "@/views/SplashScreen.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "SplashScreen",
      component: SplashScreen
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: Home
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    // redirect to home
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login
  const publicPages = ["/", "/login", "/register", "/callback"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters["account/getUser"];

  if (authRequired && !loggedIn) {
    authService.setReturnUrl(to.fullPath);
    store.dispatch("account/login");
  }

  next();
});
