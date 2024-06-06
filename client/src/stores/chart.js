import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
export const useChartStore = defineStore(
  "chart",
  () => {
    const klines = ref([]);
    
    async function getChartData() {
      let uri = "http://localhost:3000/watch";
      try {
        const response = await fetch(uri);
        const data = await response.json();
        klines.value = data;
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      getChartData();
    });
    return { klines, getChartData };
  },
  { persist: false }
);
