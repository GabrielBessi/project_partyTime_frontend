import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresAuth: false,
    },
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requiresAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/DashboardView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/newparty",
    name: "NewParty",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NewParty" */ "../views/NewPartyView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/editparty/:id",
    name: "EditParty",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "editparty" */ "../views/EditPartyView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/party/:id",
    name: "Party",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "party" */ "../views/PartyView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.authenticated === false) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
