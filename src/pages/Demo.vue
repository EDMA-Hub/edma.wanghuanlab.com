<script setup>
import DemoForm from '../components/DemoForm.vue'
</script>

<template>
  <main class="demo-page page-width">
    <div class="demo-board">
      <section class="demo-brief">
        <p class="eyebrow">预约演示</p>
        <h1>按你勾选的产品准备演示。</h1>
        <p class="demo-lead">不必一次看完全部产品。先标出当前要看的几款，我们只按这些模块安排路径。</p>
        <ol class="demo-steps">
          <li>
            <strong>选择产品</strong>
            <span>可跨家族多选。两个 DMS 分别是渠道协同和文档受控。</span>
          </li>
          <li>
            <strong>留下联系方式</strong>
            <span>姓名、企业和电话用于回访，确认演示时间和参与人。</span>
          </li>
          <li>
            <strong>按模块准备</strong>
            <span>演示围绕勾选的产品展开，不把无关系统一起讲完。</span>
          </li>
        </ol>
      </section>
      <DemoForm picker />
    </div>
  </main>
</template>
