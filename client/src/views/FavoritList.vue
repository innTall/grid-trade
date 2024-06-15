<script setup>
import { storeToRefs } from "pinia";
import { useTickerStore } from '@/stores/ticker.js';
const { favorits } = storeToRefs(useTickerStore());
</script>

<template>
	<div class="container h-full">
		<article v-for="ticker in favorits" :key="ticker.symbol" class="flex mb-1 border border-green-700 rounded-2xl">
			<div class="flex items-center">
				<input type="checkbox" name="ticker.symbol" :value="ticker" v-model="favorits"
					class="form-check-input appearance-none h-6 w-4 border-2 hover:bg-gray-600 border-gray-600 rounded-lg bg-gray-900 checked:bg-green-600 checked:border-2 checked:border-green-600 focus:outline-none align-top ml-2">
			</div>
			<RouterLink :to="'/table/' + ticker.symbol" class="container flex justify-between hover:bg-gray-700">
				<!--div class="flex items-center"-->
				<div class="container flex justify-between hover:bg-gray-700">
					<div class="flex items-center">
						<figure class="">
							<img src="/pwa-64x64.png" class="h-10 w-10 ml-2 mr-2 rounded-full">
						</figure>
						<div class="">
							<p class="text-md">
								<strong>
									<span>{{ ticker.symbol }}</span>
								</strong>
								<br>
								<small>Symbol name</small>
							</p>
						</div>
					</div>
					<div class="mr-3">
						<p class="text-md text-right">
							<strong>
								<span>{{ ticker.lastPrice * 1 }}</span>
							</strong>
							<br>
							<small>{{ ticker.quoteVolume }}</small>
						</p>
					</div>
				</div>
			</RouterLink>
		</article>
	</div>
</template>

<style scoped></style>