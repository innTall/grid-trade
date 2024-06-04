<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <HeaderBar />
  <main>
    <RouterView />
  </main>
  <FooterBar />
</template>

<style scoped></style>
