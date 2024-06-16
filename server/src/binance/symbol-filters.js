import { binance } from "./client.js";
import { OrderStorage } from "../orders/storage.js";

const getSymbolFilters = async () => {
  try {
    const data = await binance.exchangeInfo();
    const usdtSymbols = data.symbols.filter(({ status, quoteAsset }) => {
      return status === "TRADING" && quoteAsset === "USDT";
    });

    for (const { symbol, filters } of usdtSymbols) {
      const symbolInfo = {
        tickSize: null,
        stepSize: null,
      };

      for (const { filterType, tickSize, stepSize } of filters) {
        switch (filterType) {
          case "PRICE_FILTER":
            symbolInfo.tickSize = tickSize;
            break;
          case "LOT_SIZE":
            symbolInfo.stepSize = stepSize;
            break;
        }
      }
      await OrderStorage.setFilters(
        "filters",
        symbol,
        JSON.stringify(symbolInfo)
      );
    }
    console.log("Symbol filters updated");
  } catch (e) {
    console.error(e);
  }
};
