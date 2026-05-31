<script setup>
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { useSiteI18n } from '../composables/useSiteI18n'

const { localeRoute, messages } = useSiteI18n()
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="compact"
      :eyebrow="messages.notFound.eyebrow"
      :title="messages.notFound.title"
      :description="messages.notFound.description"
    >
      <div class="flex flex-wrap gap-3">
        <RouterLink
          :to="localeRoute('world')"
          class="rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
        >
          {{ messages.notFound.backToWorld }}
        </RouterLink>
        <RouterLink
          :to="localeRoute('stories')"
          class="rounded-full border border-[rgba(84,46,23,0.12)] bg-white/35 px-5 py-3 text-sm tracking-[0.18em] text-wine/85 transition hover:bg-white/60"
        >
          {{ messages.notFound.goArticles }}
        </RouterLink>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>