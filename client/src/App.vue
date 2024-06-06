<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
</script>

<template>
  <div class="container flex min-h-screen flex-col bg-gray-900 text-white">
    <header class="sticky flex justify-between top-0 w-full p-2 z-20 items-center border-b border-green-600 bg-gray-900">
      <HeaderBar />
    </header>
    <main class="flex grow flex-col">
      <RouterView />
    </main>
    <footer class="sticky w-full left-0 bottom-0 bg-gray-900">
      <FooterBar />
    </footer>
  </div>
</template>

<style scoped></style>
