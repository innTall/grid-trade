import { defineStore } from "pinia";
import { ref } from "vue";
export const useMinmaxStore = defineStore(
  "MinmaxStore",
  () => {
    const minPrice = ref({
      type: Number,
      default: 1.2345,
    });
    const maxPrice = ref({
      type: Number,
      default: 1.5678,
    });
    const gridSize = ref({
      type: Number,
    });
    const errorMessage = ref("");

    const getProfit = () => {
      if (minPrice.value < maxPrice.value) {
        gridSize.value = (
          ((Number(maxPrice.value / minPrice.value - 1) / 2 +
            (1 - minPrice.value / maxPrice.value) / 2) /
            2) *
          100
        ).toFixed(1);
        errorMessage.value = "";
      } else {
        errorMessage.value = "Price !";
      }
    };
    return { minPrice, maxPrice, gridSize, errorMessage, getProfit };
    //getProfit();
  },
  { persist: true }
);
