import { defineStore } from "pinia";
import { ref, onMounted, isProxy, toRaw } from "vue";
export const useTickerStore = defineStore(
  "ticker",
  () => {
    const tickers = ref([]);
    let favorits = ref([]);

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

    console.log(favorits);
    async function postFavorits() {
      const uri = "http://localhost:3000";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favorits: favorits.value,
          //symbol: symbol.value,
          //lastPrice: lastPrice.value,
          //quoteVolume: quoteVolume.value,
        }),
      };
      try {
        const response = await fetch(uri, options);
        const data = await response.json();
        favorits = data;
        //symbol.value = data.symbol;
        //lastPrice.value = data.lastPrice;
        //quoteVolume.value = data.quoteVolume;
      } catch (error) {
        console.log(error);
      }
    }

    async function getFavorits() {
      let uri = "http://localhost:3000";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        favorits = data;
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      postFavorits();
      //getFavorits();
    });

    async function deleteFavorits() {
      let uri = "http://localhost:3000/:id";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        favorits = data;
      } catch (error) {
        console.log(error);
      }
    }
    console.log();
    return { tickers, favorits, getTickers, getFavorits, postFavorits, deleteFavorits };
  },
  { persist: true }
);
