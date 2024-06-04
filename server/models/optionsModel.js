import { Schema, model } from "mongoose";
const optionsSchema = new Schema({
  minFirstOrder: {
    type: Number,
    default: 10,
    required: true,
  },
  gridOrders: {
    type: Number,
    default: 8,
    required: true,
  },
  firstBuyLevel: {
    type: Number,
    default: 0.5,
    required: true,
  },
  orderRiseCoef: {
    type: Number,
    default: 1.2,
    required: true,
  },
  buyLevelsCoef: {
    type: Number,
    default: 0.1,
    required: true,
  },
  priceRound: {
    type: Number,
    default: 4,
    required: true,
  },
  amountRound: {
    type: Number,
    default: 1,
    required: true,
  },
});
const Options = model("Options", optionsSchema);
export default Options;
