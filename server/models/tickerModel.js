import { Schema, model } from "mongoose";
const tickerSchema = new Schema({
  symbol: String,
  lastPrice: String,
  quoteVolume: String,
});
const Ticker = model("Ticker", tickerSchema);
export default Ticker;
