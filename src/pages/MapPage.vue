<script setup>
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import WorldMap from '../components/map/WorldMap.vue'
import regions from '../content/data/regions.json'

const worldOverview = regions.find((region) => region.slug === 'world-overview')
const regionMaps = regions.filter((region) => region.slug !== 'world-overview')
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="map"
      eyebrow="Atlas"
      title="世界總圖與區域入口"
      description="總圖負責導覽與快速理解政權位置，個別區域再承接更細的 hotspot 與地誌說明。"
    >
      <WorldMap :region="worldOverview" />

      <div class="mt-6 grid gap-4 lg:grid-cols-2">
        <RouterLink
          v-for="region in regionMaps"
          :key="region.slug"
          :to="`/map/${region.slug}`"
          class="paper-card rounded-[24px] overflow-hidden transition hover:-translate-y-1 hover:bg-white/70"
        >
          <img
            :src="region.mapImage"
            :alt="region.name"
            class="h-44 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="p-5">
            <p class="text-xs uppercase tracking-[0.32em] text-wine/55">regional map</p>
            <h2 class="mt-3 font-display text-3xl text-ink">{{ region.name }}</h2>
            <p class="mt-2 text-xs uppercase tracking-[0.28em] text-oldGold">{{ region.subtitle }}</p>
            <p class="mt-4 text-sm leading-7 text-ink/74">{{ region.summary }}</p>
          </div>
        </RouterLink>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>