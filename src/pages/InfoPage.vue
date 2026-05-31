<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'

const route = useRoute()
const { locale, localeRoute, messages } = useSiteI18n()

const sectionsMap = computed(() => getContent('sections', locale.value))
const section = computed(() => sectionsMap.value[route.meta.sectionKey])
const isRaceSection = computed(() => route.meta.sectionKey === 'races')
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
        <component
          :is="isRaceSection ? RouterLink : 'article'"
          v-for="item in section.items"
          :key="item.slug || item.title"
          :to="isRaceSection ? localeRoute('race-detail', { raceSlug: item.slug }) : undefined"
          class="paper-card rounded-[26px] p-5 sm:p-6"
          :class="isRaceSection ? 'flex h-full flex-col transition hover:-translate-y-1 hover:border-oldGold/35 hover:bg-white/70' : ''"
        >
          <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ messages.infoList.entryKicker }}</p>
          <h2 class="mt-3 font-display text-3xl text-ink">{{ item.title }}</h2>
          <p class="mt-2 text-xs uppercase tracking-[0.28em] text-oldGold">{{ item.subtitle }}</p>
          <p class="mt-4 text-sm leading-8 text-ink/74">{{ item.summary }}</p>
          <p v-if="isRaceSection" class="mt-auto pt-6 text-sm tracking-[0.18em] text-wine/80">
            {{ messages.raceDetail.openDetail }}
          </p>
        </component>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      :eyebrow="messages.infoList.missingEyebrow"
      :title="messages.infoList.missingTitle"
      :description="messages.infoList.missingDescription"
    />
  </AppShell>
</template>