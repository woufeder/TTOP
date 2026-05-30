<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import WorldMap from '../components/map/WorldMap.vue'
import regions from '../content/data/regions.json'

const route = useRoute()

const region = computed(() =>
  regions.find((item) => item.slug === route.params.regionSlug && item.slug !== 'world-overview'),
)
</script>

<template>
  <AppShell>
    <ParchmentPanel
      v-if="region"
      variant="map"
      eyebrow="Regional Atlas"
      :title="region.name"
      :description="region.summary"
    >
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <WorldMap :region="region" />

        <aside class="space-y-4">
          <section class="paper-card rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.34em] text-wine/55">overview</p>
            <h2 class="mt-3 font-display text-3xl text-ink">{{ region.subtitle }}</h2>
            <p class="mt-4 text-sm leading-8 text-ink/74">{{ region.summary }}</p>
          </section>

          <section class="paper-card rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.34em] text-wine/55">route notes</p>
            <ul class="mt-4 space-y-3 text-sm leading-7 text-ink/74">
              <li v-for="point in region.hotspots" :key="point.slug" class="flex gap-3">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oldGold" />
                <span>{{ point.name }}：{{ point.summary }}</span>
              </li>
            </ul>
          </section>

          <RouterLink
            to="/map"
            class="inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
          >
            回到世界總圖
          </RouterLink>
        </aside>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      eyebrow="Missing Region"
      title="找不到這張地圖"
      description="目前 regions.json 中沒有對應的區域 slug，可以稍後補資料再重新建置。"
    >
      <RouterLink
        to="/map"
        class="inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
      >
        返回地圖總覽
      </RouterLink>
    </ParchmentPanel>
  </AppShell>
</template>