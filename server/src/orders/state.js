class OrderState {
  constructor() {
    _initiated = false;
    _step = undefined;
    _tickSize = undefined;
    _stepSize = undefined;
    _buyOrderId = undefined;
    _sellOrderId = undefined;
  }

  get initiated() {
    return _initiated;
  }

  set initiated(value) {
    _initiated = value;
  }

  initiate() {
    _initiated = true;
  }

  get step() {
    return _step;
  }

  set step(value) {
    _step = value;
  }

  setStep() {
    _step++;
  }

  get tickSize() {
    return _tickSize;
  }

  set tickSize(value) {
    _tickSize = value;
  }

  get stepSize() {
    return _stepSize;
  }

  set stepSize(value) {
    _stepSize = value;
  }

  get buyOrderId() {
    return _buyOrderId;
  }

  set buyOrderId(value) {
    _buyOrderId = value;
  }

  get sellOrderId() {
    return _sellOrderId;
  }

  set sellOrderId(value) {
    _sellOrderId = value;
  }
}
