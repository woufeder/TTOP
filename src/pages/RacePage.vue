<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'

const route = useRoute()
const { locale, localeRoute, messages } = useSiteI18n()

const sections = computed(() => getContent('sections', locale.value))
const races = computed(() => sections.value.races?.items || [])
const race = computed(() => races.value.find((item) => item.slug === route.params.raceSlug))
const otherRaces = computed(() => races.value.filter((item) => item.slug !== route.params.raceSlug))
</script>

<template>
  <AppShell>
    <ParchmentPanel
      v-if="race"
      variant="wide"
      :eyebrow="sections.races?.eyebrow"
      :title="race.title"
      :description="race.subtitle"
    >
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(84,46,23,0.1)] pb-5  tracking-[0.18em] text-wine/70">
        <RouterLink :to="localeRoute('races')" class="transition hover:text-wine">
          {{ messages.raceDetail.backToList }}
        </RouterLink>
        <span>{{ race.subtitle }}</span>
      </div>

      <div class="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.7fr)]">
        <div>
          <p class="text-lg leading-9 text-ink/84">{{ race.summary }}</p>
          <div class="mt-6 space-y-5 text-base leading-9 text-ink/78">
            <p v-for="paragraph in race.paragraphs || []" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>

        <aside class="paper-card rounded-[24px] p-5 sm:p-6">
          <p class="text-xs uppercase tracking-[0.36em] text-wine/55">{{ messages.raceDetail.otherRaces }}</p>
          <div class="mt-4 space-y-4">
            <RouterLink
              v-for="entry in otherRaces"
              :key="entry.slug"
              :to="localeRoute('race-detail', { raceSlug: entry.slug })"
              class="block border-b border-dashed border-[rgba(84,46,23,0.12)] pb-4 transition hover:text-wine"
            >
              <p class="font-display text-2xl text-ink">{{ entry.title }}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.28em] text-oldGold">{{ entry.subtitle }}</p>
              <p class="mt-3  leading-7 text-ink/72">{{ entry.summary }}</p>
            </RouterLink>
          </div>
        </aside>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      :eyebrow="messages.raceDetail.missingEyebrow"
      :title="messages.raceDetail.missingTitle"
      :description="messages.raceDetail.missingDescription"
    >
      <RouterLink
        :to="localeRoute('races')"
        class="inline-flex rounded-full bg-wine px-5 py-3  tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
      >
        {{ messages.raceDetail.backToList }}
      </RouterLink>
    </ParchmentPanel>
  </AppShell>
</template>