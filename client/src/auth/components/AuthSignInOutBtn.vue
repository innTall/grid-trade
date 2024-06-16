<script setup lang="ts">
import { ref } from 'vue';
import Session from 'supertokens-web-js/recipe/session';
import { API_BASE_PATH, APP_BASE_PATH } from '../config.js'

const isSessionExists = ref(false);

const updateSessuionStatus = async () => {
	isSessionExists.value = await Session.doesSessionExist()
	console.log(isSessionExists.value)
}

updateSessuionStatus();

const signIn = () => {
	window.location.href = API_BASE_PATH
}

const signOut = async () => {
	await Session.signOut()
	window.location.href = APP_BASE_PATH
}
</script>

<template>
	<button v-show="!isSessionExists" @click="signIn">Sign In</button>
	<button v-show="isSessionExists" @click="signOut">Sign Out</button>
</template>