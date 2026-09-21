<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { ArrowRight, Close, Menu, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const menuOpen = ref(false)
const mobileOpen = ref(false)
const commandOpen = ref(false)
const demoOpen = ref(false)
const search = ref('')
const commandInput = ref()
const demoForm = reactive({ name: '', company: '', phone: '' })
const demoFormRef = ref()

const groups = [
  { key: 'customer', code: '01', title: '客户与商业运营', description: '从客户洞察到渠道履约', products: [
    ['CRM', '客户关系管理'], ['CDP', '客户数据平台'], ['OMS', '订单管理'], ['POS', '门店销售'], ['DMS', '渠道管理'],
  ] },
  { key: 'product', code: '02', title: '研发、供应链与制造', description: '从产品定义到生产交付', products: [
    ['PLM', '产品生命周期'], ['ERP', '企业资源计划'], ['MRP', '物料需求计划'], ['APS', '高级计划排程'], ['SRM', '供应商协同'], ['MES', '制造执行'], ['WMS', '仓储管理'], ['TMS', '运输管理'], ['QMS', '质量管理'], ['EAM', '资产管理'],
  ] },
  { key: 'foundation', code: '03', title: '企业经营与协同底座', description: '让组织、流程和数据可靠流动', products: [
    ['HRM', '人力资源'], ['OA', '协同办公'], ['BPM', '业务流程'], ['BI', '经营分析'], ['MDM', '主数据管理'], ['iPaaS', '集成平台'], ['DMS', '文档管理'], ['IAM', '统一认证'],
  ] },
]

const allProducts = groups.flatMap(group => group.products.map(([code, label]) => ({ code, label, group: group.title })))
const filteredCommands = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  return keyword ? allProducts.filter(item => `${item.code}${item.label}${item.group}`.toLowerCase().includes(keyword)) : allProducts
})

const openCommand = async () => {
  commandOpen.value = true
  await nextTick()
  commandInput.value?.focus()
}

const handleShortcut = (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    openCommand()
  }
}

const reveal = () => {
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

const submitDemo = async () => {
  await demoFormRef.value?.validate((valid) => {
    if (!valid) return
    ElMessage.success('预约信息已记录，我们将尽快与您联系。')
    demoOpen.value = false
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleShortcut)
  reveal()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleShortcut)
  observer.disconnect()
})
</script>

<template>
  <div class="site-shell">
    <header class="site-nav" :class="{ 'is-menu-open': menuOpen }">
      <div class="nav-inner">
        <a class="brand" href="#top" aria-label="返回首页">
          <span class="brand-mark"><i></i><i></i><i></i></span>
          <span>品牌名称待定</span>
        </a>
        <nav class="desktop-links" aria-label="主导航">
          <button class="nav-trigger" :aria-expanded="menuOpen" aria-controls="product-menu" @click="menuOpen = !menuOpen">产品体系 <span>+</span></button>
          <a href="#architecture">架构</a>
          <a href="#foundation">协同底座</a>
        </nav>
        <div class="nav-actions">
          <button class="command-button" type="button" aria-label="搜索产品" @click="openCommand"><Search :size="15" /><span>搜索</span><kbd>⌘ K</kbd></button>
          <el-button type="primary" class="demo-button" @click="demoOpen = true">预约演示 <ArrowRight :size="15" /></el-button>
          <button class="mobile-menu" type="button" :aria-expanded="mobileOpen" aria-label="打开导航" @click="mobileOpen = !mobileOpen"><Menu v-if="!mobileOpen" :size="20" /><Close v-else :size="20" /></button>
        </div>
      </div>

      <div id="product-menu" class="mega-menu" :class="{ open: menuOpen }">
        <div class="mega-content">
          <section v-for="group in groups" :key="group.key" class="mega-column">
            <p>{{ group.title }}</p>
            <a v-for="([code, label]) in group.products.slice(0, 4)" :key="code + label" href="" @click.prevent><b>{{ code }}</b><span>{{ label }}</span></a>
          </section>
          <aside class="mega-feature">
            <span class="mono-label">PLATFORM MAP</span>
            <strong>以统一的数据和身份底座，串联每一条业务链路。</strong>
            <a href="#architecture" @click="menuOpen = false">查看系统地图 <ArrowRight :size="15" /></a>
          </aside>
        </div>
      </div>
    </header>

    <div v-if="menuOpen" class="menu-scrim" @click="menuOpen = false"></div>
    <aside class="mobile-drawer" :class="{ open: mobileOpen }" aria-label="移动导航">
      <a href="#products" @click="mobileOpen = false">产品矩阵</a>
      <a href="#architecture" @click="mobileOpen = false">系统地图</a>
      <a href="#foundation" @click="mobileOpen = false">协同底座</a>
      <button type="button" @click="mobileOpen = false; demoOpen = true">预约演示 <ArrowRight :size="16" /></button>
    </aside>

    <main id="top">
      <section class="hero page-width">
        <div class="hero-copy reveal is-in">
          <p class="mono-label"><span></span> ENTERPRISE OPERATIONS PLATFORM</p>
          <h1>让每一次经营决策，<br />都有<span>完整的业务现场</span>。</h1>
          <p class="hero-lede">覆盖客户、研发、供应链、制造、仓储与企业协同。以统一产品体系让数据、流程与组织持续协作。</p>
          <div class="hero-cta">
            <el-button type="primary" class="hero-primary" @click="demoOpen = true">预约演示 <ArrowRight :size="17" /></el-button>
            <a href="#products">浏览产品矩阵 <ArrowRight :size="16" /></a>
          </div>
        </div>
        <div class="system-console reveal is-in" aria-label="企业业务协同状态示意">
          <div class="console-top"><span>operation-flow / live</span><em>CONNECTED</em></div>
          <div class="console-body">
            <p><b>01</b><span class="code-key">DEMAND</span><span>CRM · OMS</span><strong>→</strong><span>订单已进入计划</span></p>
            <p><b>02</b><span class="code-key">PLAN</span><span>MRP · APS</span><strong>→</strong><span>资源计划已同步</span></p>
            <p><b>03</b><span class="code-key">EXECUTE</span><span>MES · QMS</span><strong>→</strong><span>现场执行可追溯</span></p>
            <p><b>04</b><span class="code-key">FULFILL</span><span>WMS · TMS</span><strong>→</strong><span>库存与交付已对齐</span></p>
          </div>
          <div class="console-foot"><span>DATA FABRIC / IAM / DOCUMENTS</span><span>● READY</span></div>
        </div>
      </section>

      <section id="products" class="product-intro page-width reveal">
        <p class="mono-label">PRODUCT PORTFOLIO</p>
        <div>
          <h2>从一项能力开始，<br />也能走向全域协同。</h2>
          <p>每个产品均可独立部署，并通过统一的数据、流程、文档与身份体系组合为完整的企业运营平台。</p>
        </div>
      </section>

      <section class="product-groups page-width">
        <article v-for="group in groups" :key="group.key" class="product-group reveal" :class="group.key">
          <header><span class="mono-label">{{ group.code }}</span><div><h3>{{ group.title }}</h3><p>{{ group.description }}</p></div></header>
          <div class="product-links">
            <a v-for="([code, label]) in group.products" :key="code + label" href="" @click.prevent><b>{{ code }}</b><span>{{ label }}</span><ArrowRight :size="15" /></a>
          </div>
        </article>
      </section>

      <section id="architecture" class="architecture-band">
        <div class="page-width reveal">
          <header class="band-heading"><p class="mono-label">SYSTEM MAP</p><h2>一张地图，理解企业运营。</h2><p>业务应用各司其职，统一底座让业务对象、流程事件与权限边界保持一致。</p></header>
          <div class="ecosystem-map">
            <div class="map-orbit orbit-one" aria-hidden="true"></div><div class="map-orbit orbit-two" aria-hidden="true"></div>
            <article class="map-node customer-node"><span>01 / FRONT</span><strong>客户与商业</strong><small>CRM · CDP · OMS · POS · DMS</small></article>
            <article class="map-node product-node"><span>02 / CORE</span><strong>研发与制造</strong><small>PLM · ERP · MRP · APS · MES · WMS</small></article>
            <article class="map-node foundation-node"><span>03 / FOUNDATION</span><strong>协同与数据</strong><small>OA · BPM · BI · MDM · 文档 · IAM</small></article>
            <div class="map-core"><i></i><span>UNIFIED<br />OPERATIONS</span></div>
          </div>
          <a class="band-link" href="#foundation">了解统一底座 <ArrowRight :size="16" /></a>
        </div>
      </section>

      <section id="foundation" class="foundation page-width reveal">
        <div class="foundation-copy"><p class="mono-label">FOUNDATION LAYER</p><h2>业务要流动，<br />先让底座一致。</h2><p>统一认证保障身份与权限边界；文档管理沉淀研发、质量与流程资料；主数据、流程和集成能力使各个产品协作而非割裂。</p></div>
        <div class="foundation-list">
          <div><span>01</span><h3>统一认证 · IAM</h3><p>单点登录、组织权限、角色与审计。</p></div>
          <div><span>02</span><h3>文档管理 · DMS</h3><p>文档版本、受控分发、归档与检索。</p></div>
          <div><span>03</span><h3>主数据与集成</h3><p>统一编码、事件连接、跨域数据治理。</p></div>
        </div>
      </section>

      <section class="closing page-width reveal"><p class="mono-label">START WITH A CONVERSATION</p><h2>为企业下一阶段的协同，<br />建立清晰的数字底座。</h2><el-button type="primary" class="hero-primary" @click="demoOpen = true">预约演示 <ArrowRight :size="17" /></el-button></section>
    </main>

    <footer class="site-footer"><div class="page-width"><p>让复杂经营，成为可被理解、协同与持续优化的系统。</p><div><span class="brand">品牌名称待定</span><span>© 2026 · Enterprise Operations Platform</span><a href="#top">回到顶部 ↑</a></div></div></footer>

    <el-dialog v-model="commandOpen" class="command-dialog" width="min(92vw, 42rem)" :show-close="false" @closed="search = ''">
      <div class="command-head"><Search :size="18" /><input ref="commandInput" v-model="search" placeholder="搜索产品名称或缩写" aria-label="搜索产品" /><kbd>ESC</kbd></div>
      <div class="command-results"><p class="mono-label">PRODUCTS</p><a v-for="item in filteredCommands" :key="item.code + item.label" href="" @click.prevent="commandOpen = false"><b>{{ item.code }}</b><span>{{ item.label }}</span><small>{{ item.group }}</small><ArrowRight :size="15" /></a><p v-if="!filteredCommands.length" class="empty-state">没有匹配的产品</p></div>
    </el-dialog>

    <el-dialog v-model="demoOpen" class="demo-dialog" width="min(92vw, 32rem)" title="预约产品演示" :close-on-click-modal="false">
      <p>留下联系方式，我们将根据企业所处阶段准备对应的产品演示。</p>
      <el-form ref="demoFormRef" :model="demoForm" label-position="top">
        <el-form-item label="您的姓名" prop="name" :rules="[{ required: true, message: '请填写您的姓名', trigger: 'blur' }]"><el-input v-model="demoForm.name" placeholder="请输入姓名" /></el-form-item>
        <el-form-item label="企业名称" prop="company" :rules="[{ required: true, message: '请填写企业名称', trigger: 'blur' }]"><el-input v-model="demoForm.company" placeholder="请输入企业名称" /></el-form-item>
        <el-form-item label="联系电话" prop="phone" :rules="[{ required: true, message: '请填写联系电话', trigger: 'blur' }]"><el-input v-model="demoForm.phone" placeholder="请输入联系电话" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="demoOpen = false">暂不提交</el-button><el-button type="primary" @click="submitDemo">提交预约 <ArrowRight :size="15" /></el-button></template>
    </el-dialog>
  </div>
</template>
