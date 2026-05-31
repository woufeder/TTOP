<script setup>
import { computed } from 'vue'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import Timeline from '../components/world/Timeline.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'

const { locale, messages } = useSiteI18n()
const timeline = computed(() => getContent('timeline', locale.value))
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      :eyebrow="messages.timeline.eyebrow"
      :title="messages.timeline.title"
      :description="messages.timeline.description"
    >
      <section class="border-b border-[rgba(84,46,23,0.1)] pb-5">
        <p class="text-xs uppercase tracking-[0.36em] text-wine/55">{{ messages.timeline.introKicker }}</p>
        <h2 class="mt-3 font-display text-3xl text-ink">{{ messages.timeline.introTitle }}</h2>
        <p class="mt-4 max-w-3xl text-sm leading-8 text-ink/76 sm:text-base">
          {{ messages.timeline.introBody }}
        </p>
      </section>

      <div class="mt-6">
        <Timeline :events="timeline" :messages="messages.timeline" />
      </div>
    </ParchmentPanel>
  </AppShell>
</template>