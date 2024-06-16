<script setup>
import { QueueListIcon, ArrowTrendingUpIcon, TableCellsIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import LogoItem from './layouts/LogoItem.vue';
</script>

<template>
	<div class="container flex justify-between items-center">
		<div>
			<LogoItem />
		</div>
		<div class="flex gap-5 text-xs text-gray-300">
			<RouterLink :to="{ name: 'Favorit' }">
				<QueueListIcon class="h-6 w-6" />Favorit
			</RouterLink>
			<RouterLink :to="{ name: 'Watch' }">
				<QueueListIcon class="h-6 w-6" />Watch
			</RouterLink>
			<RouterLink to="/chart/:symbol">
				<ArrowTrendingUpIcon class="h-6 w-6" />Chart
			</RouterLink>
			<RouterLink to="/table/:symbol">
				<TableCellsIcon class="h-6 w-6" />Table
			</RouterLink>
			<RouterLink :to="{ name: 'Trade' }">
				<ShoppingCartIcon class="h-6 w-6" />Trade
			</RouterLink>
		</div>
	</div>
</template>

<style scoped></style>