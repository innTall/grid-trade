<script setup>
import ChartSimple from '../components/ChartSimple.vue';
import SetPanel from '../components/SetPanel.vue';
import TableTrade from '../components/TableTrade.vue';
</script>

<template>
	<div class="h-max">
		<ChartSimple class="h-72" />
		<SetPanel />
		<TableTrade class="w-full bg-gray-900 left-0 bottom-10 fixed" />
	</div>
</template>

<style scoped></style>