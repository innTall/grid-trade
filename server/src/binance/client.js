import Binance from "node-binance-api";
import { APIKEY, APISECRET } from "../config.js";

export const binance = new Binance().options({
  APIKEY,
  APISECRET,
});
