<script setup>
import { useRoute, useRouter } from 'vue-router'
import { openCatalog } from '../catalog.js'
import { families, productsInFamily, allProducts } from '../data/products.js'
import ProductIcon from '../components/ProductIcon.vue'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <main>
    <section class="hero-shell">
      <div class="hero page-width">
        <p class="eyebrow">Enterprise Digital Management Applications</p>
        <h1>面向企业<br>数字化管理的<span>应用家族</span></h1>
        <p class="hero-lede">
          一个平台连接客户、产品、制造、供应链与经营决策。23 款应用既能独立上线，也能沿真实业务链路组合生长。
        </p>
        <div class="hero-actions">
          <button class="btn btn-fill" type="button" @click="openCatalog(router, route)">浏览产品目录</button>
          <router-link class="btn btn-ghost" to="/demo">预约演示</router-link>
        </div>
        <dl class="hero-facts">
          <div><dt>业务应用</dt><dd>{{ allProducts.length }}</dd></div>
          <div><dt>产品套件</dt><dd>{{ families.length }}</dd></div>
        </dl>
      </div>
    </section>

    <section id="catalog" class="catalog">
      <nav class="catalog-rail page-width" aria-label="产品套件">
        <a v-for="(family, index) in families" :key="family.id" :href="`#${family.id}`">
          {{ String(index + 1).padStart(2, '0') }} {{ family.title }}
        </a>
      </nav>

      <section v-for="(family, familyIndex) in families" :id="family.id" :key="family.id" class="family page-width" :class="`family--${family.id}`">
        <header class="section-head suite-chapter">
          <span>套件 {{ String(familyIndex + 1).padStart(2, '0') }}</span>
          <h2>{{ family.title }}</h2>
          <p>{{ family.summary }}</p>
        </header>
        <div class="product-index">
          <router-link v-for="item in productsInFamily(family.id)" :key="item.slug" class="product-row" :to="`/products/${item.slug}`">
            <ProductIcon :code="item.code" :slug="item.slug" :family="family.id" size="sm" />
            <b>{{ item.code }}</b>
            <strong>{{ item.name }}</strong>
            <span class="row-line">{{ item.tagline }}</span>
            <em>查看</em>
          </router-link>
        </div>
      </section>
    </section>

    <section class="closing page-width">
      <div>
        <h2>从一款应用开始，按业务链路逐步组合。</h2>
        <p>告诉我们当前卡在客户、计划、车间、供应链还是企业协同，我们按对应套件准备演示。</p>
      </div>
      <router-link class="btn btn-fill" to="/demo">预约演示</router-link>
    </section>
  </main>
</template>
