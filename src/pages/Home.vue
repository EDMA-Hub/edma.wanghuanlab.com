<script setup>
import { useRoute, useRouter } from 'vue-router'
import { openCatalog } from '../catalog.js'
import { families, productsInFamily, allProducts } from '../data/products.js'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <main>
    <section class="hero page-width">
      <div class="hero-copy">
        <p class="eyebrow">Enterprise Digital Management Applications</p>
        <h1>EDMA</h1>
        <p class="hero-lede">
          <span>面向企业数字化管理的应用家族。</span>
          <span>客户、计划、制造、仓储与协同可单独上线，也可按同一套身份和主数据组合使用。</span>
        </p>
        <div class="hero-actions">
          <button class="btn btn-fill" type="button" @click="openCatalog(router, route)">浏览产品目录</button>
          <router-link class="btn btn-ghost" to="/demo">预约演示</router-link>
        </div>
      </div>
      <ul class="hero-count">
        <li><strong>{{ allProducts.length }}</strong><span>款产品</span></li>
        <li><strong>3</strong><span>个产品家族</span></li>
        <li><strong>底座</strong><span>身份、主数据、集成</span></li>
      </ul>
    </section>

    <section id="catalog" class="catalog">
      <nav class="catalog-rail page-width" aria-label="产品家族">
        <a v-for="family in families" :key="family.id" :href="`#${family.id}`">{{ family.title }}</a>
      </nav>

      <section v-for="family in families" :id="family.id" :key="family.id" class="family page-width">
        <header class="section-head">
          <h2>{{ family.title }}</h2>
          <p>{{ family.summary }}</p>
        </header>
        <div class="product-grid">
          <article v-for="item in productsInFamily(family.id)" :key="item.slug" class="product-card">
            <p class="card-code">{{ item.code }}</p>
            <h3>{{ item.name }}</h3>
            <p>{{ item.tagline }}</p>
            <ul class="module-brief">
              <li v-for="module in item.modules.slice(0, 6)" :key="module.name">{{ module.name }}</li>
            </ul>
            <router-link class="card-link" :to="`/products/${item.slug}`">查看 {{ item.code }}</router-link>
          </article>
        </div>
      </section>
    </section>

    <section class="closing page-width">
      <div>
        <h2>从一款产品开始，或按经营现场组合。</h2>
        <p>告诉我们当前卡在客户、计划、车间还是协同，我们按对应产品准备演示。</p>
      </div>
      <router-link class="btn btn-fill" to="/demo">预约演示</router-link>
    </section>
  </main>
</template>
