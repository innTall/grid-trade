import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/auth/:pathMatch(.*)*",
      name: "Auth",
      component: () => import("../auth/views/AuthView.vue"),
    },
    {
      path: "/favorit",
      name: "Favorit",
      component: () => import("@/views/FavoritList.vue"),
    },
    {
      path: "/watchlist",
      name: "Watch",
      component: () => import("@/views/WatchList.vue"),
    },
    {
      path: "/chart/:symbol",
      name: "Chart",
      component: () => import("@/views/ChartPage.vue"),
    },
    {
      path: "/table/:symbol",
      name: "Table",
      component: () => import("@/views/TablePage.vue"),
    },
    {
      path: "/trade",
      name: "Trade",
      component: () => import("@/views/TradePage.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/:catchAll(.*)",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
export default router;
