import { createRouter, createWebHistory } from "vue-router";
import FavoritList from "../views/FavoritList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Favorit",
      component: FavoritList,
    },
    {
      path: "/watchlist",
      name: "Watch",
      component: () => import("../views/WatchList.vue"),
    },
    {
      path: "/chart/:symbol",
      name: "Chart",
      component: () => import("../views/ChartPage.vue"),
    },
    {
      path: "/table",
      name: "Table",
      component: () => import("../views/TablePage.vue"),
    },
    {
      path: "/trade",
      name: "Trade",
      component: () => import("../views/TradePage.vue"),
    },
  ],
});
export default router;
