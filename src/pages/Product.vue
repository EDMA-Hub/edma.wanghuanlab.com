<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { familyById, products, relatedProducts } from '../data/products.js'
import DemoForm from '../components/DemoForm.vue'
import ProductIcon from '../components/ProductIcon.vue'
import ProductPreview from '../components/ProductPreview.vue'

const route = useRoute()
const product = computed(() => products[route.params.slug])
const family = computed(() => product.value && familyById(product.value.family))
const related = computed(() => product.value ? relatedProducts(product.value.slug) : [])
</script>

<template>
  <main v-if="product" class="product-page">
    <section class="product-hero page-width">
      <div class="product-hero-copy">
        <nav class="crumbs" aria-label="面包屑">
        <router-link to="/">首页</router-link>
        <router-link :to="{ path: '/', hash: '#catalog' }">产品目录</router-link>
        <span>{{ product.code }}</span>
      </nav>
      <div class="product-title-lockup">
        <ProductIcon :code="product.code" :slug="product.slug" :family="family.id" size="xl" />
        <div><p class="card-code">{{ product.code }} · {{ family.title }}</p><h1>{{ product.fullName }}</h1></div>
      </div>
      <p class="lede">{{ product.tagline }}</p>
      <p>{{ product.summary }}</p>
      <p class="audience">适用：{{ product.audience }}</p>
      <div class="hero-actions">
        <a class="btn btn-fill" href="#book">预约 {{ product.code }} 演示</a>
        <router-link class="btn btn-ghost" :to="{ path: '/', hash: '#catalog' }">返回目录</router-link>
      </div>
      </div>
      <ProductPreview :product="product" :family="family" />
    </section>

    <section class="modules page-width">
      <h2>核心模块</h2>
      <ul class="module-grid">
        <li v-for="module in product.modules" :key="module.name">
          <h3>{{ module.name }}</h3>
          <p>{{ module.desc }}</p>
        </li>
      </ul>
    </section>

    <section class="capabilities page-width">
      <h2>产品能力</h2>
      <article v-for="item in product.capabilities" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.body }}</p>
      </article>
    </section>

    <section v-if="related.length" class="related page-width">
      <h2>相关产品</h2>
      <div class="related-grid">
        <router-link v-for="item in related" :key="item.slug" :to="`/products/${item.slug}`">
          <ProductIcon :code="item.code" :slug="item.slug" :family="item.family" size="sm" />
          <b>{{ item.code }}</b>
          <span>{{ item.name }}</span>
          <small>{{ item.tagline }}</small>
        </router-link>
      </div>
    </section>

    <section id="book" class="product-book page-width">
      <div>
        <h2>预约 {{ product.code }} 演示</h2>
        <p>说明你们当前的断点，我们按 {{ product.fullName }} 的模块准备演示路径。</p>
      </div>
      <DemoForm :product-label="`${product.code} ${product.name}`" />
    </section>
  </main>

  <main v-else class="page-width missing">
    <h1>未找到该产品</h1>
    <p>请从产品目录进入。</p>
    <router-link class="btn btn-fill" :to="{ path: '/', hash: '#catalog' }">查看产品目录</router-link>
  </main>
</template>
