import express from "express";
import { PORT } from "./config.js";
import { binance } from "./binance/client.js";
import { OrderManager } from "./orders/manager.js";

class ExpressApp {
  constructor(manager) {
    manager = manager;
    const app = express();
    init();
  }

  async init() {
    setupMiddlewares();
    setupRoutes();

    app.listen(PORT);
    console.log("App is listening on port:", PORT);
  }

  setupMiddlewares() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    app.post("/send-config", ({ body }, res) => {
      manager.handleConfig(body);
      res.status(200).send("Success");
    });

    app.post("/cancel-orders", async ({ body }, res) => {
      const { symbol } = body;
      try {
        await binance.cancelAll(symbol);
        res.status(200).send(`Orders cancelled for ${symbol}`);
      } catch (e) {
        res.status(405).send(`Order Cancelation. Something wrong..`);
      }
    });

    app.post("/queue/remove-order", ({ body }, res) => {
      const { symbol } = body;
      manager.removeOrder(symbol);
      res.status(200).send(`${symbol} removed from the queue`);
    });

    app.get("/queue", (_req, res) => {
      const queueObj = {};
      for (const { symbol, step } of manager.queue) {
        queueObj[symbol] = {
          step,
        };
      }
      res.status(200).send(queueObj);
    });
  }
}

module.exports = { ExpressApp };
