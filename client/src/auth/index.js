import Session from "supertokens-web-js/recipe/session";
import Auth from "./views/AuthView.vue";
import AuthVerify from "./views/AuthVerify.vue";
import { API_BASE_PATH } from "./config.js";

export const authRoutes = [
  {
    path: API_BASE_PATH,
    async beforeEnter() {
      const isSessionExists = await Session.doesSessionExist();
      if (isSessionExists) return { name: "Home" };
    },
    children: [
      { path: "", name: "Auth", component: Auth },
      { path: "verify", component: AuthVerify },
    ],
  },
];
