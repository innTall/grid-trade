<script setup>
import { ref } from 'vue'
import AuthSignInOutBtn from '@/auth/components/AuthSignInOutBtn.vue'

const data = ref('')
const submit = async () => {
	const a = await fetch('http://localhost:3000/test', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: data.value }),
	})
	console.log(await a.json())
}
</script>

<template>
	<div class="container fixed top-48 items-center text-center -30">
		<h1 class="font-bold text-lg text-green-600">
			Grid Trade
		</h1>
		<div class="flex justify-center">
			<img class="flex h-24 w-24 text-center" src="/start-512.png" >
		</div>
		<div class="w-1/3 flex flex-col ml-32 mt-10">
			<input v-model="data" type="text" placeholder="your data" />
			<div class="w-full flex justify-between">
				<AuthSignInOutBtn />
				<button @click="submit" class="border-2 border-green-600 px-2">Send</button>
			</div>
		</div>
	</div>	
</template>