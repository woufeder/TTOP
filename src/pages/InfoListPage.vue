<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import sections from '../content/data/sections.json'

const route = useRoute()

const section = computed(() => sections[route.meta.sectionKey])
</script>

<template>
  <AppShell>
    <ParchmentPanel
      v-if="section"
      variant="wide"
      :eyebrow="section.eyebrow"
      :title="section.title"
      :description="section.intro"
    >
      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="item in section.items"
          :key="item.title"
          class="paper-card rounded-[26px] p-5 sm:p-6"
        >
          <p class="text-xs uppercase tracking-[0.34em] text-wine/55">entry</p>
          <h2 class="mt-3 font-display text-3xl text-ink">{{ item.title }}</h2>
          <p class="mt-2 text-xs uppercase tracking-[0.28em] text-oldGold">{{ item.subtitle }}</p>
          <p class="mt-4 text-sm leading-8 text-ink/74">{{ item.summary }}</p>
        </article>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      eyebrow="Missing Section"
      title="這個資料頁尚未設定"
      description="請在 sections.json 補上對應 sectionKey。"
    />
  </AppShell>
</template>