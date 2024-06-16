import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import Passwordless from "supertokens-web-js/recipe/passwordless";
import { API_BASE_PATH, API_DOMAIN, APP_NAME } from "./config.js";

SuperTokens.init({
  appInfo: {
    apiDomain: API_DOMAIN,
    apiBasePath: API_BASE_PATH,
    appName: APP_NAME,
  },
  recipeList: [Passwordless.init(), Session.init()],
});
