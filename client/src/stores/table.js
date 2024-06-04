import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMinmaxStore } from "@/stores/minmax.js";
import { useOptionsStore } from "@/stores/options.js";

//* ------------------
//* <<< input data >>>
//* ------------------
const { minPrice, maxPrice, gridSize } = useMinmaxStore();
const {
  minFirstOrder,
  gridOrders,
  firstBuyLevel,
  orderRiseCoef,
  buyLevelsCoef,
  priceRound,
  amountRound,
} = useOptionsStore();

export const useTableStore = defineStore(
  "Table",
  () => {
    //* ----------------------------------
    //* <<< base level coef and values >>>
    //* ----------------------------------
    const gridFrequence = computed(() => (gridSize / gridOrders).toFixed(2));
    const minGridDeposit = computed(() =>
      Math.ceil(
        (minFirstOrder * (1 - orderRiseCoef ** gridOrders)) /
          (1 - orderRiseCoef)
      )
    );
    const firstBuyLevelTicks = computed(() =>
      (maxPrice - minPrice - (maxPrice - minPrice) * firstBuyLevel).toFixed(
        priceRound
      )
    );
    const buyFirstLevel = computed(() =>
      (maxPrice - firstBuyLevelTicks.value).toFixed(priceRound)
    );
    const tradeMinPrice = computed(() =>
      (minPrice - (minPrice * gridFrequence.value) / 100).toFixed(priceRound)
    );
    const gridSizeTick = computed(() =>
      (maxPrice - minPrice).toFixed(priceRound)
    );
    const buyLevelsDiffCoef = computed(() =>
      (
        (tradeMinPrice.value / buyFirstLevel.value) **
        (1 / (gridOrders - 1))
      ).toFixed(4)
    );
    //* ----------------------
    //* <<< buy order keys >>>
    //* ----------------------
    const gridOrdersKeys = computed(() =>
      Array.from({ length: gridOrders }, (_, index) => index + 1)
    );
    //* --------------------------------------------
    //* <<< difference entre buy levels in ticks >>>
    //* --------------------------------------------
    let startCoefBuyLevels;
    let endCoefBuyLevels;
    if (gridOrders == 3) {
      (startCoefBuyLevels = 0.95), (endCoefBuyLevels = 1.05);
    }
    if (gridOrders == 4) {
      (startCoefBuyLevels = 0.9), (endCoefBuyLevels = 1.1);
    }
    if (gridOrders == 5) {
      (startCoefBuyLevels = 0.85), (endCoefBuyLevels = 1.15);
    }
    if (gridOrders == 6) {
      (startCoefBuyLevels = 0.8), (endCoefBuyLevels = 1.2);
    }
    if (gridOrders == 7) {
      (startCoefBuyLevels = 0.75), (endCoefBuyLevels = 1.25);
    }
    if (gridOrders == 8) {
      (startCoefBuyLevels = 0.7), (endCoefBuyLevels = 1.3);
    }
    if (gridOrders == 9) {
      (startCoefBuyLevels = 0.65), (endCoefBuyLevels = 1.35);
    }
    if (gridOrders == 10) {
      (startCoefBuyLevels = 0.6), (endCoefBuyLevels = 1.4);
    }
    if (gridOrders == 11) {
      (startCoefBuyLevels = 0.55), (endCoefBuyLevels = 1.45);
    }
    if (gridOrders == 12) {
      (startCoefBuyLevels = 0.5), (endCoefBuyLevels = 1.5);
    }
    if (gridOrders == 13) {
      (startCoefBuyLevels = 0.45), (endCoefBuyLevels = 1.55);
    }
    if (gridOrders == 14) {
      (startCoefBuyLevels = 0.4), (endCoefBuyLevels = 1.6);
    }
    if (gridOrders == 15) {
      (startCoefBuyLevels = 0.35), (endCoefBuyLevels = 1.65);
    }

    const getBaseBuyLevels = (
      end,
      start = buyFirstLevel.value,
      step = buyLevelsDiffCoef.value
    ) =>
      Array.from({
        length: Math.floor(Math.log(end / start) / Math.log(step)) + 2,
      }).map((_, i) => start * step ** i);
    const baseBuyLevels = getBaseBuyLevels(tradeMinPrice.value);

    let baseDiffDirect = [];
    let j; //! fixed bugs of number orders
    if (baseBuyLevels.length !== gridOrders) {
      j = 1;
    } else {
      j = 0;
    }
    for (let i = j; i < baseBuyLevels.length - 1; i++)
      baseDiffDirect[i] = (baseBuyLevels[i] - baseBuyLevels[i + 1]).toFixed(
        priceRound
      );

    let baseDiffReverce = baseDiffDirect.reverse();
    baseDiffDirect.push();

    const getCoefBuyLevelsArray = (start, stop, step) =>
      Array.from({ length: (stop - start) / step + 1 }, (value, index) =>
        (start + index * step).toFixed(2)
      );
    const coefBuyLevelsArray = getCoefBuyLevelsArray(
      startCoefBuyLevels,
      endCoefBuyLevels + 0.1,
      buyLevelsCoef
    );

    const finalDiffBuyLevels = baseDiffReverce.map(function (number, index) {
      return (number * Number(coefBuyLevelsArray[index])).toFixed(priceRound);
    });

    //* ---------------------------------
    //* <<< BUY-limit-LEVELS >>> RESULT[]
    //* ---------------------------------
    const x = finalDiffBuyLevels;
    const y = buyFirstLevel.value;
    let buyLimitLevels = [];
    function currentSubtr(x) {
      x.reduce((subtr, current, i) => {
        return (buyLimitLevels[i] = (subtr - current).toFixed(priceRound));
      }, y);
    }
    currentSubtr(x);
    buyLimitLevels.unshift(buyFirstLevel.value);

    //* -------------------------------
    //* <<< BUY-order-$ >>> BUYLIMIT []
    //* -------------------------------
    const buyOrderNext = (minFirstOrder * orderRiseCoef ** gridOrders).toFixed(
      2
    );

    const xBuyOrders = (end, start = minFirstOrder, step = orderRiseCoef) =>
      Array.from({
        length: Math.floor(Math.log(end / start) / Math.log(step)),
      }).map((_, gridOrders) => start * step ** gridOrders);
    let xBuyOrdersArray = xBuyOrders(buyOrderNext);
    xBuyOrdersArray = xBuyOrdersArray.map(function (each_element) {
      return Number(each_element.toFixed(2));
    });

    let k; //! fixed bugs of number orders
    if (xBuyOrdersArray.length !== gridOrders) {
      k = 1;
    } else {
      k = 0;
    }
    const buyOrders = (end, start = minFirstOrder, step = orderRiseCoef) =>
      Array.from({
        length: Math.floor(Math.log(end / start) / Math.log(step)) + k,
      }).map((_, gridOrders) => start * step ** gridOrders);
    let buyOrdersArray = buyOrders(buyOrderNext);
    buyOrdersArray = buyOrdersArray.map(function (each_element) {
      return Number((each_element * 1.001).toFixed(2)); //! * 1.001 ??
    });

    //* ------------------------------------
    //* <<< BUY-order-$ SUM $ >>> Buy$SUM []
    //* ------------------------------------
    const s = buyOrdersArray;
    let sumBuyOrders;
    let sumBuyOrdersList;
    function currentSum(s) {
      sumBuyOrders = [];
      s.reduce((sum, current, i) => {
        return (sumBuyOrders[i] = sum + current);
      }, 0);
      sumBuyOrders = sumBuyOrders.map(function (each_element) {
        return Number(each_element.toFixed(2));
      });
      sumBuyOrdersList = sumBuyOrders.join(" ");
    }
    currentSum(s);

    //* ----------------------------------
    //* <<< amountOrder >>> AMOUNTORDER []
    //* ----------------------------------
    const amountBuyOrders = buyOrdersArray.map(function (number, index) {
      return +(number / Number(buyLimitLevels[index])).toFixed(amountRound);
    });

    //* -------------------------------------
    //* <<< Amount orders SUM >>> Amnt SUM []
    //* -------------------------------------
    const a = amountBuyOrders;
    let sumAmountOrders;
    function amountSum(a) {
      sumAmountOrders = [];
      a.reduce((sum, current, i) => {
        return (sumAmountOrders[i] = sum + current);
      }, 0);
      sumAmountOrders = sumAmountOrders.map(function (each_element) {
        return Number(each_element.toFixed(3));
      });
    }
    amountSum(a);

    //* -------------------------------
    //* <<< Buy Zero levels >>> Zero []
    //* -------------------------------
    const buyZeroLevels = sumBuyOrders.map(function (number, index) {
      return +(number / sumAmountOrders[index]).toFixed(priceRound);
    });

    //* -------------------------------------
    //* <<< SELL-order-levels >>> LEVELFIX []
    //* -------------------------------------
    let sellLevels = [];
    for (let i = 0; i < gridOrders; i++) {
      sellLevels.push(buyZeroLevels[i] * (gridSize / 100));
    }
    let sellLevelsArray = buyZeroLevels.map(function (number, index) {
      return +(number + sellLevels[index]).toFixed(priceRound);
    });

    //* -----------------------------------
    //* <<< Take profit - $ >>> PROFIT $ []
    //* -----------------------------------
    const totalSellOrders = sellLevelsArray.map(function (number, index) {
      return (number * Number(sumAmountOrders[index])).toFixed(2);
    });

    const totalProfit = totalSellOrders.map(function (number, index) {
      return +(number - Number(sumBuyOrders[index])).toFixed(2);
    });

    return {
      gridFrequence,
      minGridDeposit,
      firstBuyLevelTicks,
      buyFirstLevel,
      tradeMinPrice,
      gridSizeTick,
      buyLevelsDiffCoef,
      gridOrdersKeys,
      baseBuyLevels,
      baseDiffDirect,
      baseDiffReverce,
      coefBuyLevelsArray,
      finalDiffBuyLevels,
      buyLimitLevels,
      buyOrderNext,
      xBuyOrdersArray,
      buyOrdersArray,
      sumBuyOrders,
      amountBuyOrders,
      sumAmountOrders,
      buyZeroLevels,
      sellLevelsArray,
      totalSellOrders,
      totalProfit,
    };
  },
  { persist: true }
);
