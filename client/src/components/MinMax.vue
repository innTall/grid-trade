<script setup>
import { storeToRefs } from "pinia";
import { useMinmaxStore } from '@/stores/minmax.js';
const { minPrice, maxPrice, gridSize, errorMessage } = storeToRefs(useMinmaxStore());
const { getProfit } = useMinmaxStore();
</script>

<template>
	<div class="w-full">
		<p class="w-20 border border-red-700 text-red-700 font-bold text-center bg-red-200 rounded-md">{{ errorMessage }}
		</p>
		<div class="flex pl-2 pr-2 text-center flex-row text-sm justify-around gap-2">
			<div class="">
				<label name="min" class="">Min:<br>
					<input id="min" type="number" name="min" v-model="minPrice" step="0.001" required
						class="w-20 bg-green-800 text-center border rounded-md">
				</label>
			</div>
			<div class="">
				<label name="max" class="">Max:<br>
					<input id="max" type="number" name="max" v-model="maxPrice" step="0.001" required
						class="w-20 bg-green-800 text-center border rounded-md ">
				</label>
			</div>
			<div class="">
				<p class="">TP,%:<br>
				<div :="getProfit()" type="number" class="font-bold">{{ gridSize }}</div>
				</p>
			</div>
		</div>
	</div>
</template>
<style scoped></style>