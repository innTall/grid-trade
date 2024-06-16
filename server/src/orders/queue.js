import { OrderParams } from "./params.js";
import { Mongo } from "../mongo/client.js";

export class OrderQueue {
  constructor() {
    queue = [];
  }

  symbolsInQueue() {
    return queue.map((el) => {
      return el.symbol;
    });
  }

  async addOrder(params) {
    this.queue.push(params);
    await Mongo.insertOne(params);
    console.log(
      `Order list: ${JSON.stringify(symbolsInQueue())}\n-------`
    );
  }

  async updateOrder(params) {
    await Mongo.updateOne(params);
  }

  async removeOrder(symbol) {
    const newArray = queue.filter((order) => order.symbol !== symbol);
    queue = [...newArray];
    await Mongo.deleteOne(symbol);
    console.log(
      `Order list: ${JSON.stringify(symbolsInQueue())}\n-------`
    );
  }

  orderExists(symbol) {
    return queue.some((order) => order.symbol === symbol);
  }

  findOrder(symbol) {
    return queue.find((order) => {
      return order.symbol === symbol;
    });
  }

  async getOrderParamsFromStorage() {
    try {
      const paramsArray = await Mongo.getAll();
      if (typeof paramsArray != "undefined" && paramsArray.length > 0) {
        const orderParamsArray = paramsArray.map((obj) => {
          const orderParams = new OrderParams();
          return Object.assign(orderParams, obj);
        });
        queue = [...orderParamsArray];
        console.info("Orders from the storage added to the queue");
      } else {
        console.info("There in no orders in the storage");
      }
    } catch (e) {
      console.log(e);
    }
  }
}
