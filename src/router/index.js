import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import HomeView from "../views/HomeView.vue";
import UserLogin from "../views/auth/UserLogin.vue";
import UserRegister from "../views/auth/UserRegister.vue";
import EmailConfirmation from '../views/auth/EmailConfirmation.vue';
import TheDashboard from '../views/TheDashboard.vue';
import TheUsers from '../views/users/TheUsers.vue';
import UserCard from '../views/users/UserCard.vue';

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
    meta: {requiresUnauth: true}
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
  {
    path: "/dashboard",
    name: "dashboard",
    component: TheDashboard,
    meta: {requiresAuth: true}
  },
  {
    path: "/users",
    name: "users",
    component: TheUsers,
    meta: {requiresAuth: true}
  },
  {
    path: "/users/:id",
    name: "user",
    component: UserCard,
    meta: {requiresAuth: true}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
     next('/login');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
     next('/')
  } else {
    next();
  }
});

export default router;
