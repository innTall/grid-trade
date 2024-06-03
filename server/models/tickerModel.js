import { Schema, model } from "mongoose";
const tickerSchema = new Schema({
  symbol: String,
  lastPrice: Number,
  quoteVolume: Number,
});
const Ticker = model("Ticker", tickerSchema);
export default Ticker;
