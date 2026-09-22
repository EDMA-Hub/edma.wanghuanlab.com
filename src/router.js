import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Demo from './pages/Demo.vue'
import { products } from './data/products.js'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, saved) {
    if (to.hash) {
      return { el: to.hash, top: 88, behavior: 'smooth' }
    }
    if (saved) return saved
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: Home, meta: { title: 'Enterprise Digital Management Applications' } },
    { path: '/products', redirect: { path: '/', hash: '#catalog' } },
    { path: '/products/:slug', name: 'product', component: Product },
    { path: '/demo', name: 'demo', component: Demo, meta: { title: '预约演示' } },
  ],
})

router.afterEach((to) => {
  const product = to.params.slug ? products[to.params.slug] : null
  const page = product ? `${product.code} ${product.name}` : to.meta.title
  document.title = page ? `${page}｜EDMA` : 'EDMA'
})

export default router
