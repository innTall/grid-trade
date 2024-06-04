import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
export const useTickerStore = defineStore(
  "ticker",
  () => {
    const tickers = ref({});
    const favorit = ref([]);
    //const symbol = ref();
    //const lastPrice = ref();
    //const quoteVolume = ref();
    async function getTickers() {
      let uri = "http://localhost:3000/watch";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        console.log(data);
        tickers.value = data;
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      getTickers();
    });
    
    return {
      tickers,
      favorit,
      //symbol,
      //lastPrice,
      //quoteVolume,
      getTickers,
    };
  },
  { persist: false }
);
