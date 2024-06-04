<script setup>
import { ref } from 'vue';
import { useOptionsStore } from '@/stores/options.js';
import { useTableStore } from '@/stores/table.js';
const { minFirstOrder, gridOrders } = useOptionsStore();
const { minGridDeposit, buyFirstLevel } = useTableStore();
const openConfirm = ref(false);
</script>

<template>
	<div>
		<button @click="openConfirm = true" class="text-sm p-2 rounded-lg border hover:bg-gray-700">Confirm</button>
		<Teleport to="body">
			<div v-show="openConfirm"
				class="container fixed top-20 left-10 bg-gray-800 text-white z-10 border rounded-3xl p-2 w-1/2">
				<p class="text-center">Grid to Trade</p>
				<form @submit="submitForm">
					<div>
						<div class="text-right">
							<div type="number">First order, $ - <strong>{{ minFirstOrder }}</strong></div>
							<div type="number">Orders - <strong>{{ gridOrders }}</strong></div>
							<div type="number">Grid cost, $ - <strong>{{ minGridDeposit }}</strong></div>
							<div type="number">First level - <strong>{{ buyFirstLevel }}</strong></div>
						</div>
					</div>
					<p class="text-green-700 bg-yellow-300 font-bold text-center">! Grid data is OK?</p>
					<div class="flex justify-between pt-1">
						<button @click="openConfirm = false" class="bg-red-700 p-1 border rounded-md">Cancel</button>
						<button @click="openConfirm = false" type="submit"
							class="bg-green-700 p-1 border rounded-md">Submit</button>
					</div>
				</form>
			</div>
		</Teleport>
	</div>
</template>

<style scoped></style>