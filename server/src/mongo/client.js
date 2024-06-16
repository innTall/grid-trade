import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../config.js";

class Mongo {
  static client = new MongoClient(MONGODB_URL);
  static db = Mongo.client.db("trading-bot");
  static orderCollection = Mongo.db.collection("orders");

  static async init() {
    await Mongo.client.connect();
    console.log("Connected successfully to MongoDB");
  }

  static async insertOne(params) {
    try {
      await Mongo.orderCollection.insertOne(params);
      console.log(`MONGO\t${params.symbol} added\n-------`);
    } catch (e) {
      console.error(e);
    }
  }

  static async updateOne(params) {
    try {
      await Mongo.orderCollection.updateOne(
        { _symbol: params.symbol },
        { $set: params }
      );
      console.log(`MONGO\t${params.symbol} updated\n-------`);
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteOne(symbol) {
    try {
      await Mongo.orderCollection.findOneAndDelete({ _symbol: symbol });
      console.log(`MONGO\t${symbol} deleted\n-------`);
    } catch (e) {
      console.error(e);
    }
  }

  static async getAll() {
    try {
      return await Mongo.orderCollection.find({}).project({ _id: 0 }).toArray();
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Mongo;
