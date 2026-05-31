<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import WorldMap from '../components/map/WorldMap.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getLocalizedContent } from '../utils/content'
import { withBase } from '../utils/assets'

const { locale, localeRoute, messages } = useSiteI18n()
const regions = computed(() => getLocalizedContent('regions', locale.value))
const worldOverview = computed(() => regions.value.find((region) => region.slug === 'world-overview'))
const regionMaps = computed(() => regions.value.filter((region) => region.slug !== 'world-overview'))
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="map"
      :eyebrow="messages.map.eyebrow"
      :title="messages.map.title"
      :description="messages.map.description"
    >
      <WorldMap :region="worldOverview" />

      <div class="mt-6 grid gap-4 lg:grid-cols-2">
        <RouterLink
          v-for="region in regionMaps"
          :key="region.slug"
          :to="localeRoute('region-map', { regionSlug: region.slug })"
          class="paper-card flex h-full flex-col overflow-hidden rounded-[24px] transition hover:-translate-y-1 hover:bg-white/70"
        >
          <img
            :src="withBase(region.mapImage)"
            :alt="region.name"
            class="h-44 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="flex flex-1 flex-col p-5">
            <p class="text-xs uppercase tracking-[0.32em] text-wine/55">{{ messages.map.regionKicker }}</p>
            <h2 class="mt-3 font-display text-3xl text-ink">{{ region.name }}</h2>
            <p class="mt-2 text-xs uppercase tracking-[0.28em] text-oldGold">{{ region.subtitle }}</p>
            <p class="mt-4 text-sm leading-7 text-ink/74">{{ region.summary }}</p>
          </div>
        </RouterLink>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>