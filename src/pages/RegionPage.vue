<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import WorldMap from '../components/map/WorldMap.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'

const route = useRoute()
const { locale, localeRoute, messages } = useSiteI18n()
const regions = computed(() => getContent('regions', locale.value))

const region = computed(() =>
  regions.value.find((item) => item.slug === route.params.regionSlug && item.slug !== 'world-overview'),
)
</script>

<template>
  <AppShell>
    <ParchmentPanel
      v-if="region"
      variant="map"
      :eyebrow="messages.regionMap.eyebrow"
      :title="region.name"
      :description="region.summary"
    >
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <WorldMap :region="region" />

        <aside class="space-y-4">
          <section class="paper-card rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ messages.regionMap.overviewKicker }}</p>
            <h2 class="mt-3 font-display text-3xl text-ink">{{ region.subtitle }}</h2>
            <p class="mt-4  leading-8 text-ink/74">{{ region.summary }}</p>
          </section>

          <section class="paper-card rounded-[24px] p-5">
            <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ messages.regionMap.routeNotesKicker }}</p>
            <ul class="mt-4 space-y-3  leading-7 text-ink/74">
              <li v-for="point in region.hotspots" :key="point.slug" class="flex gap-3">
                <span class="keep-round mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oldGold" />
                <span>{{ point.name }}：{{ point.summary }}</span>
              </li>
            </ul>
          </section>

          <RouterLink
            :to="localeRoute('map')"
            class="inline-flex rounded-full bg-wine px-5 py-3  tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
          >
            {{ messages.regionMap.backToMap }}
          </RouterLink>
        </aside>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      :eyebrow="messages.regionMap.missingEyebrow"
      :title="messages.regionMap.missingTitle"
      :description="messages.regionMap.missingDescription"
    >
      <RouterLink
        :to="localeRoute('map')"
        class="inline-flex rounded-full bg-wine px-5 py-3  tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
      >
        {{ messages.regionMap.backToMapList }}
      </RouterLink>
    </ParchmentPanel>
  </AppShell>
</template>