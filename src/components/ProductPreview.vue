<script setup>
import ProductIcon from './ProductIcon.vue'

defineProps({
  product: { type: Object, required: true },
  family: { type: Object, required: true },
})
</script>

<template>
  <figure class="product-preview" aria-label="产品界面视觉占位，后续替换为 3:2 产品截图">
    <div class="preview-chrome">
      <span class="preview-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>{{ product.code }} · {{ product.name }}</span>
      <span>1200 × 800</span>
    </div>
    <div class="preview-stage">
      <aside>
        <ProductIcon :code="product.code" :slug="product.slug" :family="family.id" size="sm" />
        <span v-for="module in product.modules.slice(0, 4)" :key="module.name"></span>
      </aside>
      <div class="preview-canvas">
        <header>
          <strong>{{ product.name }}</strong>
          <small>{{ family.title }}</small>
        </header>
        <div class="preview-metrics">
          <span v-for="module in product.modules.slice(0, 3)" :key="module.name">{{ module.name }}</span>
        </div>
        <div class="preview-chart" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>
    </div>
    <figcaption>展示 1200 × 800 · 源文件 2400 × 1600 · 比例 3:2</figcaption>
  </figure>
</template>
