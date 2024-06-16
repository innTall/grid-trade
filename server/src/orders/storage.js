import redis from "redis";
import { REDIS_URL } from "../config.js";

class OrderStorage {
  static client = redis.createClient({
    url: REDIS_URL,
  });

  static init() {
    client.on("error", (error) => {
      console.error(error);
    });

    client.on("connect", () => {
      console.log("Redis Connected!");
    });
  }

  static set(symbol, params, update) {
    OrderStorage.client.HMSET("params", symbol, params, (_err, reply) => {
      if (!update) {
        console.log(`STORAGE\t${reply} ${symbol} added\n-------`);
      } else {
        console.log(`STORAGE\t${reply} ${symbol} updated\n-------`);
      }
    });
  }

  static setFilters(collection, key, value) {
    return new Promise((resolve, reject) => {
      OrderStorage.client.HSET(collection, key, value, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }

  static get(collection, key) {
    return new Promise((resolve, reject) => {
      OrderStorage.client.HGET(collection, key, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }

  static getAllFilters(collection) {
    return new Promise((resolve, reject) => {
      OrderStorage.client.HGETALL(collection, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }

  static delete(symbol) {
    OrderStorage.client.HDEL("params", symbol, (_err, reply) => {
      console.log(`STORAGE\t${reply} ${symbol} removed\n-------`);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      OrderStorage.client.HGETALL("params", (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }
}

module.exports = OrderStorage;
