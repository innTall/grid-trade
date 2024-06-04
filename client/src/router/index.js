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
      path: "/watch",
      name: "Watch",
      component: () => import("../views/WatchList.vue"),
    },
    {
      path: "/chart",
      name: "Chart",
      component: () => import("../views/ChartPage.vue"),
    },
  ],
});
export default router;
