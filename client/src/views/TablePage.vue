<script setup>
import ChartSimple from '@/components/ChartSimple.vue';
import SetPanel from '@/components/SetPanel.vue';
import TableTrade from '@/components/TableTrade.vue';
</script>

<template>
	<div class="">
		<ChartSimple class="" />
		<div class="container space-2 fixed bottom-14">
			<SetPanel />
			<TableTrade class="py-2" />
		</div>
	</div>
</template>

<style scoped></style>