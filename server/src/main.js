import { OrderManager } from "./orders/manager.js";
import { OrderStorage } from "./orders/storage.js";
import { getSymbolFilters } from "./binance/symbol-filters.js";
import { Mongo } from "./mongo/client.js";
import { ExpressApp } from "./server.js";

class Main {
  constructor() {
    init();
  }

  initializeApp(manager) {
    new ExpressApp(manager);
  }

  async init() {
    try {
      await Mongo.init();
      const manager = new OrderManager();
      initializeApp(manager);
      OrderStorage.init();
      await getSymbolFilters();
      console.log("Ready to go");
    } catch (e) {
      console.log(e);
    }
  }
}

new Main();
