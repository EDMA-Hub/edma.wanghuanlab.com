<script setup>
import { useRoute, useRouter } from 'vue-router'
import { openCatalog } from '../catalog.js'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <footer class="footer page-width">
    <div>
      <p class="footer-mark">EDMA</p>
      <p>Enterprise Digital Management Applications</p>
    </div>
    <div class="footer-meta">
      <button type="button" @click="openCatalog(router, route)">产品目录</button>
      <router-link to="/demo">预约演示</router-link>
      <span>© 2026</span>
    </div>
  </footer>
</template>
