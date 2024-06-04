<script setup></script>

<template>
	<header>
		<RouterLink :to="{ name: 'Favorit' }"> Favorit |</RouterLink>
		<RouterLink :to="{ name: 'Watch' }"> Watch |</RouterLink>
		<RouterLink :to="{ name: 'Chart' }"> Chart |</RouterLink>
		<RouterLink :to="{ name: 'Trade' }"> Trade |</RouterLink>
	</header>
</template>