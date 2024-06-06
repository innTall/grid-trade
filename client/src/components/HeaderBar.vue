<script setup>
import { QueueListIcon, ArrowTrendingUpIcon, TableCellsIcon, ShoppingCartIcon, } from "@heroicons/vue/24/outline";
import LogoItem from './layouts/LogoItem.vue';
const headerItems = ['watchlist', 'chart', 'table', 'trade'];
</script>

<template>
	<LogoItem />
	<ul class="flex items-center gap-5">
		<li v-for="page in headerItems" :key="page" class="flex-1">
			<a :href="`/${page}`" class="flex flex-col text-xs capitalize items-center">
				<QueueListIcon v-if="page === 'watchlist'" class="h-6 w-6" />
				<ArrowTrendingUpIcon v-else-if="page === 'chart'" class="h-6 w-6" />
				<TableCellsIcon v-else-if="page === 'table'" class="h-6 w-6" />
				<ShoppingCartIcon v-else class="h-6 w-6" /> {{ page }}
			</a>
		</li>
	</ul>
</template>