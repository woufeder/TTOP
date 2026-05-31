<script setup>
import { computed } from 'vue'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import RecordsTable from '../components/world/RecordsTable.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'

const { locale, messages } = useSiteI18n()
const records = computed(() => getContent('records', locale.value))
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      :eyebrow="messages.records.eyebrow"
      :title="messages.records.title"
      :description="messages.records.description"
    >
      <section class="paper-card rounded-[26px] p-5 sm:p-6">
        <p class="text-xs uppercase tracking-[0.36em] text-wine/55">{{ messages.records.introKicker }}</p>
        <h2 class="mt-3 font-display text-3xl text-ink">{{ messages.records.introTitle }}</h2>
        <p class="mt-4 max-w-3xl text-sm leading-8 text-ink/76 sm:text-base">
          {{ messages.records.introBody }}
        </p>
      </section>

      <div class="mt-6">
        <RecordsTable :records="records" :labels="messages.records.table" />
      </div>
    </ParchmentPanel>
  </AppShell>
</template>