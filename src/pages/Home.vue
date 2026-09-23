<script setup>
import { useRoute, useRouter } from 'vue-router'
import { openCatalog } from '../catalog.js'
import { families, productsInFamily, allProducts } from '../data/products.js'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <main>
    <section class="hero-shell">
      <div class="hero page-width">
        <div class="hero-copy">
          <p class="eyebrow">EDMA · {{ allProducts.length }} 款应用</p>
          <h1>面向企业<br>数字化管理的<span>应用家族</span></h1>
          <p class="hero-lede">
            一个平台连接客户、产品、制造、供应链与经营决策。23 款应用既能独立上线，也能沿真实业务链路组合生长。
          </p>
          <div class="hero-actions">
            <button class="btn btn-fill" type="button" @click="openCatalog(router, route)">浏览产品目录</button>
            <router-link class="btn btn-ghost" to="/demo">预约演示</router-link>
          </div>
        </div>
        <ol class="contents">
          <li v-for="(family, index) in families" :key="family.id">
            <a :href="`#${family.id}`">
              <b>{{ String(index + 1).padStart(2, '0') }}</b>
              <span>{{ family.title }}</span>
              <em>{{ productsInFamily(family.id).length }}</em>
            </a>
          </li>
        </ol>
      </div>
    </section>

    <section id="catalog" class="catalog">
      <section v-for="(family, familyIndex) in families" :id="family.id" :key="family.id" class="family page-width" :class="`family--${family.id}`">
        <header class="section-head suite-chapter">
          <span>{{ String(familyIndex + 1).padStart(2, '0') }}</span>
          <div>
            <h2>{{ family.title }}</h2>
            <p>{{ family.summary }}</p>
          </div>
        </header>
        <div class="ledger-grid">
          <router-link v-for="item in productsInFamily(family.id)" :key="item.slug" class="ledger-card" :to="`/products/${item.slug}`">
            <b>{{ item.code }}</b>
            <strong>{{ item.name }}</strong>
            <span>{{ item.tagline }}</span>
            <small>{{ item.modules.slice(0, 3).map((module) => module.name).join(' / ') }}</small>
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
