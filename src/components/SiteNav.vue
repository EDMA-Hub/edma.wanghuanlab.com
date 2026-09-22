<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { openCatalog } from '../catalog.js'
import { families, productsInFamily, searchProducts } from '../data/products.js'

const route = useRoute()
const router = useRouter()
const mobileOpen = ref(false)
const menuOpen = ref(false)
const commandOpen = ref(false)
const search = ref('')
const commandInput = ref()
const activeIndex = ref(0)
const isMac = ref(false)
const commandHint = computed(() => (isMac.value ? '⌘K' : 'Ctrl K'))
const filtered = computed(() => searchProducts(search.value))

watch(filtered, () => { activeIndex.value = 0 })
watch(() => route.fullPath, () => {
  mobileOpen.value = false
  menuOpen.value = false
  closeCommand()
})
watch(commandOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const openCommand = async () => {
  commandOpen.value = true
  mobileOpen.value = false
  menuOpen.value = false
  await nextTick()
  commandInput.value?.focus()
}

const closeCommand = () => {
  commandOpen.value = false
  search.value = ''
  activeIndex.value = 0
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    mobileOpen.value = false
    closeCommand()
  }
}

const goCatalog = () => {
  menuOpen.value = false
  mobileOpen.value = false
  openCatalog(router, route)
}

const goToProduct = (item) => {
  closeCommand()
  menuOpen.value = false
  router.push({ name: 'product', params: { slug: item.slug } })
}

const handleShortcut = (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    if (commandOpen.value) closeCommand()
    else openCommand()
  }
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
  }
}

const handleCommandKeys = (event) => {
  if (!commandOpen.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closeCommand()
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, Math.max(filtered.value.length - 1, 0))
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }
  if (event.key === 'Enter' && filtered.value[activeIndex.value]) {
    event.preventDefault()
    goToProduct(filtered.value[activeIndex.value])
  }
}

onMounted(() => {
  isMac.value = /Mac|iPhone|iPad/.test(navigator.platform)
  window.addEventListener('keydown', handleShortcut)
  window.addEventListener('keydown', handleCommandKeys)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleShortcut)
  window.removeEventListener('keydown', handleCommandKeys)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <router-link class="brand" to="/" aria-label="EDMA 首页">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-name">
          <strong>EDMA</strong>
          <small>Enterprise Digital Management Applications</small>
        </span>
      </router-link>

      <button class="search-pill" type="button" aria-label="搜索产品" @click="openCommand">
        <span>搜索产品</span>
        <kbd>{{ commandHint }}</kbd>
      </button>

      <nav class="nav-links" aria-label="主导航">
        <button class="nav-trigger" type="button" :aria-expanded="menuOpen" aria-controls="product-panel" @click="toggleMenu">产品</button>
        <button class="nav-trigger" type="button" @click="goCatalog">产品目录</button>
      </nav>

      <router-link class="btn btn-fill nav-cta" to="/demo">预约演示</router-link>
      <button class="nav-toggle" type="button" :aria-expanded="mobileOpen" aria-label="打开导航" @click="mobileOpen = !mobileOpen">
        <span></span><span></span>
      </button>
    </div>

    <div class="nav-sheet" :class="{ open: mobileOpen }">
      <button type="button" @click="toggleMenu">产品</button>
      <button type="button" @click="goCatalog">产品目录</button>
      <button type="button" @click="openCommand">搜索产品</button>
      <router-link class="btn btn-fill" to="/demo" @click="mobileOpen = false">预约演示</router-link>
    </div>
  </header>

  <Transition name="pop">
    <div v-if="menuOpen" class="product-layer">
      <div class="product-scrim" @click="menuOpen = false"></div>
      <div id="product-panel" class="product-pop" role="dialog" aria-label="产品">
        <section v-for="family in families" :key="family.id">
          <h2>{{ family.title }}</h2>
          <router-link v-for="item in productsInFamily(family.id)" :key="item.slug" :to="`/products/${item.slug}`">
            <b>{{ item.code }}</b>
            <span>{{ item.name }}</span>
          </router-link>
        </section>
      </div>
    </div>
  </Transition>

  <Transition name="cmd">
    <div v-if="commandOpen" class="cmdk" role="dialog" aria-modal="true" aria-label="搜索产品">
      <div class="cmdk-scrim" @click="closeCommand"></div>
      <div class="cmdk-panel">
        <div class="cmdk-field">
          <input ref="commandInput" v-model="search" placeholder="搜索产品名称、缩写或模块" aria-label="搜索产品" />
          <kbd>ESC</kbd>
        </div>
        <div class="cmdk-results">
          <button
            v-for="(item, index) in filtered"
            :key="item.slug"
            type="button"
            :class="{ active: index === activeIndex }"
            @click="goToProduct(item)"
          >
            <b>{{ item.code }}</b>
            <span>{{ item.name }}</span>
            <small>{{ item.fullName }}</small>
          </button>
          <p v-if="!filtered.length" class="cmdk-empty">没有匹配的产品。试试 CRM、MES 或文档。</p>
        </div>
      </div>
    </div>
  </Transition>
</template>
