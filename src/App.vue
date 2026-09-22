<script setup>
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="site">
    <SiteNav />
    <router-view />
    <SiteFooter />
  </div>
</template>
