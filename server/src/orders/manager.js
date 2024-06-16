import { binance } from '../binance/client.js';
import { OrderParams } from './params.js';
import { OrderQueue } from './queue.js';
import { OrderStorage } from './storage.js';

export const Config = {
  symbol: String,
  amount: String,
  buy_price: String,
  coef_quote: String,
  coef_fix: String,
  steps: String,
  step: String,
};

export const SymbolFilters = {
  tickSize: String,
  stepSize: String
};

export class OrderManager extends OrderQueue {
  constructor() {
    super()
    init()
    getOrderParamsFromStorage()
  }

  modifyConfig(config = Config, symbolFilters = SymbolFilters) {
    const { symbol, amount, buy_price, coef_quote, coef_fix, steps, step } = config
    const { tickSize, stepSize } = symbolFilters
    return {
      symbol,
      amount: parseInt(amount),
      buyPrice: parseFloat(buy_price),
      coefQuote: parseFloat(coef_quote),
      coefFix: parseFloat(coef_fix),
      steps: parseInt(steps),
      step: parseInt(step),
      tickSize,
      stepSize,
    }
  }
	
  async handleConfig(config) {
    if (orderExists(config.symbol)) {
      console.log('Order for this symbol in the queue');
    } else {
      const filters = await OrderStorage.get('filters', config.symbol);
      const modifiedConfig = modifyConfig(config, JSON.parse(filters));
      const orderParams = Object.assign(new OrderParams(), modifiedConfig);
      orderParams.setParams();
      buyOrder(orderParams);
    }
  }

  async buyOrder(params) {
    try {
      const { orderId } = await binance.buy(params.symbol, params.buyQty, params.buyPrice, { type: 'LIMIT' });
      params.buyOrderId = orderId;
      if (params.step === 1) {
        addOrder(params);
      } else {
        updateOrder(params);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async sellOrder(params) {
    try {
      const { orderId } = await binance.sell(params.symbol, params.sellQty, params.sellPrice, { type: 'LIMIT' });
      params.sellOrderId = orderId;
    } catch (e) {
      console.log(e);
    }
  }

  async cancelOrder(symbol, orderId) {
    try {
      await binance.cancel(symbol, orderId);
    } catch (e) {
      console.log(e);
    }
  }

  balanceUpdate(data) {
    const { e: eventType, B: balancesArray } = data;
    if (eventType === 'executionReport') {
      this.executionUpdate(data);
    } else if (eventType === 'outboundAccountPosition') {
      console.log('Balance Update');
      for (const obj of balancesArray) {
        const { a: asset, f: available, l: onOrder } = obj;
        if (available == '0.00000000') continue;
        console.log(`${asset}\tavailable: ${available} (${onOrder} on order)`);
      }
      console.log(`-------`);
    } else {
      console.log(`Unhandled event: ${eventType}\n-------`);
    }
  }

  async executionUpdate(data) {
    const { s: symbol, p: price, q: quantity, S: side, X: orderStatus } = data;
    const orderParams = findOrder(symbol);
    if (orderParams != undefined) {
      const { step, steps, buyOrderId, sellOrderId } = orderParams;

      if (orderStatus === 'NEW') {
        console.log(`${symbol} side: ${side} type: ${orderStatus} step: ${step}`);
        console.log(`Price: ${price}, quantity: ${quantity}\n-------`);

        return;
      }

      if (orderStatus === 'FILLED') {
        if (side === 'SELL') {
          console.log(`${symbol} side: ${side} type: ${orderStatus} step: ${step}`);
          console.log(`Price: ${price}, quantity: ${quantity}\n-------`);

          await cancelOrder(symbol, buyOrderId);
          removeOrder(symbol);

          return;
        }

        if (side === 'BUY' && step <= steps) {
          orderParams.setParams();
          console.log(`${symbol} side: ${side} type: ${orderStatus} step: ${step}`);
          console.log(`Price: ${price}, quantity: ${quantity}\n-------`);

          if (sellOrderId != undefined) {
            await cancelOrder(symbol, sellOrderId);
            await sellOrder(orderParams);
          } else {
            await sellOrder(orderParams);
          }

          await buyOrder(orderParams);

          return;
        }
      }
    }
  }

  init() {
    binance.websockets.userData(balanceUpdate.bind(), true);
  }
}
