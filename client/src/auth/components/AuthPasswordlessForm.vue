<script setup>
import { ref } from 'vue';
import { createCode, resendCode } from 'supertokens-web-js/recipe/passwordless';

const email = ref('');
const isValidEmail = ref(true);
const isEmailVerificationSendt = ref(false);

const create = async () => {
	try {
		const { status } = await createCode({ email: email.value })
		if (!status) return
		switch (status) {
			case 'OK':
				console.log(status)
				isEmailVerificationSendt.value = true
				break

			default:
				console.log('default')
				break
		}
	} catch (e) {
		console.error(e)
	}
}

const resend = async () => {
	try {
		const { status } = await resendCode({})
		if (!status) return
		switch (status) {
			case 'OK':
				console.log(status)
				break

			case 'RESTART_FLOW_ERROR':
				console.log(status)
				break

			default:
				console.log('default')
				break
		}
	} catch (e) {
		console.error(e)
	}
}
</script>

<template>
	<div v-show="!isEmailVerificationSendt">
		<h1>Sign in</h1>
		<label for="email">Email</label>
		<input id="email" v-model="email" type="email" />
		<button @click="create">Sumbit</button>
		<p v-show="!isValidEmail">Please enter valid email</p>
	</div>
	<div v-show="isEmailVerificationSendt">
		<h1>Check your email to continue</h1>
		<p>Didn't get an email?</p>
		<button @click="resend">Resend</button>
	</div>
</template>