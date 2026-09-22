<script setup>
import { computed, reactive, ref } from 'vue'
import { families, products, productsInFamily } from '../data/products.js'

const emit = defineEmits(['done'])
const props = defineProps({
  productLabel: { type: String, default: '' },
  picker: { type: Boolean, default: false },
})

const status = ref('idle')
const error = ref('')
const familyId = ref(families[0].id)
const selected = ref([])
const form = reactive({ name: '', company: '', phone: '', note: '' })

const familyProducts = computed(() => productsInFamily(familyId.value))
const chosen = computed(() => selected.value.map((slug) => products[slug]).filter(Boolean))

const toggleProduct = (slug) => {
  selected.value = selected.value.includes(slug)
    ? selected.value.filter((item) => item !== slug)
    : [...selected.value, slug]
}

const validate = () => {
  if (props.picker && !selected.value.length) return '请至少选择一款产品，我们按它准备演示。'
  if (!form.name.trim()) return '请填写姓名，方便我们称呼你。'
  if (!form.company.trim()) return '请填写企业名称，便于准备对应产品。'
  if (!form.phone.trim()) return '请填写联系电话，我们会据此回访。'
  if (!/^[\d+\-()\s]{8,20}$/.test(form.phone.trim())) return '电话格式不正确，请核对后重试。'
  return ''
}

const submit = async () => {
  error.value = validate()
  if (error.value) {
    status.value = 'error'
    return
  }
  status.value = 'loading'
  await new Promise((resolve) => setTimeout(resolve, 420))
  status.value = 'success'
  emit('done')
}
</script>

<template>
  <form class="book-form" :class="{ 'book-form-picker': picker }" :data-state="status" @submit.prevent="submit">
    <div v-if="status === 'success'" class="form-success" role="status">
      <p>预约已记下。</p>
      <p v-if="picker">我们会按 {{ chosen.map((item) => `${item.code} ${item.name}`).join('、') }} 准备演示。</p>
      <p v-else>我们会按你关注的产品准备演示。</p>
    </div>
    <template v-else>
      <fieldset v-if="picker" class="pick-set">
        <legend>关注的产品 <em>{{ selected.length ? `已选 ${selected.length}` : '至少一款' }}</em></legend>
        <div class="pick-families" role="tablist" aria-label="产品家族">
          <button
            v-for="family in families"
            :key="family.id"
            type="button"
            role="tab"
            :aria-selected="familyId === family.id"
            @click="familyId = family.id"
          >{{ family.title }}</button>
        </div>
        <div class="pick-grid">
          <button
            v-for="item in familyProducts"
            :key="item.slug"
            type="button"
            :aria-pressed="selected.includes(item.slug)"
            @click="toggleProduct(item.slug)"
          >
            <b>{{ item.code }}</b>
            <span>{{ item.name }}</span>
          </button>
        </div>
      </fieldset>
      <p v-else-if="productLabel" class="form-hint">当前产品：{{ productLabel }}</p>
      <label>
        姓名
        <input v-model="form.name" name="name" autocomplete="name" required placeholder="王工" />
      </label>
      <label>
        企业名称
        <input v-model="form.company" name="company" autocomplete="organization" required placeholder="示例制造" />
      </label>
      <label>
        联系电话
        <input v-model="form.phone" name="phone" type="tel" autocomplete="tel" required placeholder="11 位手机号" />
      </label>
      <label v-if="picker">
        当前断点
        <textarea v-model="form.note" name="note" rows="3" placeholder="例如：订单在各渠道各记一份，库存对不上"></textarea>
      </label>
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      <button class="btn btn-fill" type="submit" :disabled="status === 'loading'">
        {{ status === 'loading' ? '正在记录' : '发送预约' }}
      </button>
    </template>
  </form>
</template>
