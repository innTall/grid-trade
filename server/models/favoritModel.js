import { Schema, model } from "mongoose";
const favoritSchema = new Schema({
  favorits: Object,
  //  symbol: String,
  // lastPrice: Number,
  //  quoteVolume: Number,
});
const Favorit = model("Favorit", favoritSchema);
export default Favorit;
