<script setup>
import {
	QuestionMarkCircleIcon, WrenchScrewdriverIcon, CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
const footerItems = ['about', 'settings', 'info'];
</script>

<template>
	<ul class="flex justify-around p-2 border-t border-green-600">
		<li v-for="page in footerItems" :key="page" class="flex">
			<a :href="`#${page}`" class="flex flex-col text-xs items-center">
				<QuestionMarkCircleIcon v-if="page === 'about'" class="h-6 w-6" />
				<WrenchScrewdriverIcon v-else-if="page === 'settings'" class="h-6 w-6" />
				<CurrencyDollarIcon v-else class="h-6 w-6" /> {{ page }}
			</a>
		</li>
	</ul>
</template>