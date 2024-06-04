<script setup>
import GridOptions from './GridOptions.vue';
import MinMax from './MinMax.vue';
import ConfirmTrade from './ConfirmTrade.vue';
</script>

<template>
	<div class="container w-full flex justify-between p-2 gap-2 border-2 border-green-600 rounded-xl">
		<div>
			<GridOptions />
		</div>
		<div>
			<MinMax />
		</div>
		<div>
			<ConfirmTrade />
		</div>
	</div>
</template>