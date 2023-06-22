import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserLogin from "../views/auth/UserLogin.vue";
import UserRegister from "../views/auth/UserRegister.vue";
import EmailConfirmation from '../views/auth/EmailConfirmation.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister,
  },
  {
    path: "/confirm",
    name: "confirm",
    component: EmailConfirmation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
