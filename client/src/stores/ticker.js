import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
export const useTickerStore = defineStore(
  "ticker",
  () => {
    const tickers = ref([]);
    const favorits = ref([]);

    async function getTickers() {
      let uri = "http://localhost:3000/watch";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        tickers.value = data;
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      getTickers();
    });
    return { tickers, favorits, getTickers };
  },
  { persist: true }
);
