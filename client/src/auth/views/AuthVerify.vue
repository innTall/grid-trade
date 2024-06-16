<script setup>
import { consumeCode } from 'supertokens-web-js/recipe/passwordless';
import { API_BASE_PATH, APP_BASE_PATH } from '../config.js';

const consume = async () => {
	try {
		const { status } = await consumeCode({})
		if (!status) return
		switch (status) {
			case 'OK':
				window.location.href = APP_BASE_PATH
				break

			case 'INCORRECT_USER_INPUT_CODE_ERROR':
				console.log(status)
				window.location.href = API_BASE_PATH
				break

			case 'EXPIRED_USER_INPUT_CODE_ERROR':
				console.log(status)
				window.location.href = API_BASE_PATH
				break

			case 'RESTART_FLOW_ERROR':
				console.log(status)
				window.location.href = API_BASE_PATH
				break

			default:
				console.log('default')
				break
		}
	} catch (e) {
		console.error(e)
	}
}

consume()
</script>

<template>
	<h1>Verifying...</h1>
</template>