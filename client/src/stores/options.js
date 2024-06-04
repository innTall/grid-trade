import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
export const useOptionsStore = defineStore(
  "options",
  () => {
    const options = ref({});
    const minFirstOrder = ref();
    const gridOrders = ref();
    const firstBuyLevel = ref();
    const orderRiseCoef = ref();
    const buyLevelsCoef = ref();
    const priceRound = ref();
    const amountRound = ref();

    async function getOptions() {
      let uri = "http://localhost:3000/options";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        options.value = data;
      } catch (error) {
        console.log(error);
      }
    }

    async function postOptions() {
      const uri = "http://localhost:3000/options";
      const Options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //options: options.value,
          minFirstOrder: minFirstOrder.value,
          gridOrders: gridOrders.value,
          firstBuyLevel: firstBuyLevel.value,
          orderRiseCoef: orderRiseCoef.value,
          buyLevelsCoef: buyLevelsCoef.value,
          priceRound: priceRound.value,
          amountRound: amountRound.value,
        }),
      };
      try {
        const response = await fetch(uri, Options);
        const data = await response.json();
        minFirstOrder.value = data.minFirstOrder;
        gridOrders.value = data.gridOrders;
        firstBuyLevel.value = data.firstBuyLevel;
        orderRiseCoef.value = data.orderRiseCoef;
        buyLevelsCoef.value = data.buyLevelsCoef;
        priceRound.value = data.priceRound;
        amountRound.value = data.amountRound;
      } catch (error) {
        console.log(error);
      }
    }

    async function updateOptions() {
      let uri = "http://localhost:3000/options";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        minFirstOrder.value = data.minFirstOrder;
        gridOrders.value = data.gridOrders;
        firstBuyLevel.value = data.firstBuyLevel;
        orderRiseCoef.value = data.orderRiseCoef;
        buyLevelsCoef.value = data.buyLevelsCoef;
        priceRound.value = data.priceRound;
        amountRound.value = data.amountRound;
      } catch (error) {
        console.log(error);
      }
    }

    return {
      options,
      minFirstOrder,
      gridOrders,
      firstBuyLevel,
      orderRiseCoef,
      buyLevelsCoef,
      priceRound,
      amountRound,
      postOptions,
      updateOptions,
    };
  },
  {
    persist: true,
  }
);
