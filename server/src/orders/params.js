import { binance } from "../binance/client.js";
import { OrderState } from "./state.js";

class OrderParams extends OrderState {
  constructor() {
    super();
    _symbol = "";
    _amount = 0;
    _cumulativeAmount = 0;
    _buyPrice = 0;
    _sellPrice = 0;
    _buyQty = 0;
    _sellQty = 0;
    _coefQuote = 0;
    _coefFix = 0;
    _steps = 0;
  }

  get symbol() {
    return _symbol;
  }

  set symbol(value) {
    _symbol = value;
  }

  get amount() {
    return _amount;
  }

  set amount(value) {
    _amount = value;
  }

  setAmount() {
    _amount = amount * _coefQuote;
  }

  get cumulativeAmount() {
    return _cumulativeAmount;
  }

  set cumulativeAmount(value) {
    _cumulativeAmount = value;
  }

  setCumulativeAmount() {
    _cumulativeAmount = _cumulativeAmount + _amount;
  }

  get buyPrice() {
    return binance.roundStep(_buyPrice, tickSize);
  }

  set buyPrice(value) {
    _buyPrice = value;
  }

  setBuyPrice() {
    _buyPrice = buyPrice - buyPrice * coefGrow;
  }

  get sellPrice() {
    return binance.roundStep(_sellPrice, tickSize);
  }

  set sellPrice(value) {
    _sellPrice = value;
  }

  setSellPrice() {
    _sellPrice =
      (cumulativeAmount + (cumulativeAmount * coefFix) / 100) /
      sellQty;
  }

  get buyQty() {
    return binance.roundStep(_buyQty, stepSize);
  }

  set buyQty(value) {
    _buyQty = value;
  }

  setBuyQty() {
    _buyQty = amount / buyPrice;
  }

  get sellQty() {
    return _sellQty;
  }

  set sellQty(value) {
    _sellQty = value;
  }

  setSellQty() {
    _sellQty = sellQty + buyQty;
  }

  get steps() {
    return _steps;
  }

  set steps(value) {
    _steps = value;
  }

  get coefQuote() {
    return _coefQuote;
  }

  set coefQuote(value) {
    _coefQuote = value;
  }

  get coefFix() {
    return _coefFix;
  }

  set coefFix(value) {
    _coefFix = value;
  }

  get coefBase() {
    return coefFix / (steps - 1);
  }

  get coefGrow() {
    return (coefBase / 100) * (1 + step / 10);
  }

  setParams() {
    if (!initiated) {
      setBuyQty();
      initiate();
    } else {
      setCumulativeAmount();
      setAmount();
      setBuyPrice();
      setSellQty();
      setSellPrice();
      setStep();
      setBuyQty();
    }
  }
}

module.exports = { OrderParams };
