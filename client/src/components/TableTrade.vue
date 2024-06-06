<script setup>
import { useTableStore } from '@/stores/table.js';

const { gridOrdersKeys, buyLimitLevels, buyOrdersArray,
	sumBuyOrders, amountBuyOrders, sumAmountOrders, buyZeroLevels,
	sellLevelsArray, totalProfit } = useTableStore();

const nums = gridOrdersKeys;
const levels = buyLimitLevels;
const amounts = amountBuyOrders;
const summa = sumAmountOrders;
const zero = buyZeroLevels;
const sell = sellLevelsArray;
const buy = buyOrdersArray;
const total = sumBuyOrders;
const profit = totalProfit;
</script>

<template>
	<div class="flex justify-between text-xs text-center gap-2">
		<div class="container">
			<p class="font-bold underline">N</p>
			<div v-for="(num, index) in nums" :key="index" class="">
				{{ num }}
			</div>
		</div>
		<div class="container text-green-400">
			<p class="font-bold underline">Level</p>
			<div v-for="(level, index) in levels" :key="index" class="">
				{{ level }}
			</div>
		</div>
		<div class="container">
			<p class="font-bold underline">Amt</p>
			<div v-for="(amt, index) in amounts" :key="index" class="">
				{{ amt }}
			</div>
		</div>
		<div class="container font-bold">
			<p class="underline">Sum</p>
			<div v-for="(sum, index) in summa" :key="index" class="">
				{{ sum }}
			</div>
		</div>
		<div class="container text-blue-400">
			<p class="font-bold underline">Zero</p>
			<div v-for="(zer, index) in zero" :key="index" class="">
				{{ zer }}
			</div>
		</div>
		<div class="container text-red-400">
			<p class="font-bold underline">Sell</p>
			<div v-for="(fix, index) in sell" :key="index" class="">
				{{ fix }}
			</div>
		</div>
		<div class="container">
			<p class="font-bold underline">Buy</p>
			<div v-for="(order, index) in buy" :key="index" class="">
				{{ order }}
			</div>
		</div>
		<div class="container font-bold">
			<p class="underline">total</p>
			<div v-for="(tot, index) in total" :key="index" class="">
				{{ tot }}
			</div>
		</div>
		<div class="container bg-green-800">
			<p class="font-bold underline">TP</p>
			<div v-for="(prof, index) in profit" :key="index" class="">
				{{ prof }}
			</div>
		</div>
	</div>
</template>
<style scoped></style>