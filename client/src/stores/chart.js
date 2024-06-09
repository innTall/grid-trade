import { defineStore } from "pinia";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export const useChartStore = defineStore(
  "chart",
  () => {
    let data = reactive({});
    const router = useRouter();
    const route = useRoute();
    
    async function getKlinesData() {
      const uri = `https://api.binance.com/api/v3/klines?interval=1d&symbol=${route.params.id}`;
      try {
        const response = await fetch(uri ); //{mode: 'no-cors'}
        const result = await response.json();
        const candleStick = result.map((candles) => ({
          date: candles[0],
          open: candles[1],
          high: candles[2],
          low: candles[3],
          close: candles[4],
          volume: candles[5],
        }));
        console.log(candleStick);

        data.value = candleStick.map((a) => {
          a.open = +a.open;
          a.high = +a.high;
          a.low = +a.low;
          a.close = +a.close;
          a.volume = +a.volume;
          return a;
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      getKlinesData();
    });
    return { data, route, router, getKlinesData };
  },
  { persist: false }
);
