<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'

const route = useRoute()
const { locale, localeRoute, messages } = useSiteI18n()
const characters = computed(() => getContent('characters', locale.value))

const character = computed(() =>
  characters.value.find((item) => item.slug === String(route.params.slug || '')),
)
</script>

<template>
  <AppShell>
    <ParchmentPanel
      v-if="character"
      variant="wide"
      :eyebrow="messages.characterDetail.eyebrow"
      :title="character.name"
      :description="character.summary"
    >
      <div class="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section class="paper-card rounded-[26px] p-5 sm:p-6">
          <div class="flex items-center gap-4">
            <span class="keep-round flex h-20 w-20 items-center justify-center rounded-full border border-oldGold/30 bg-white/35 font-display text-4xl text-wine">
              {{ character.name.slice(0, 1) }}
            </span>
            <div>
              <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ character.faction }}</p>
              <h2 class="mt-2 font-display text-4xl text-ink">{{ character.title }}</h2>
            </div>
          </div>

          <blockquote class="mt-6 border-l-2 border-oldGold/50 pl-4 font-display text-2xl leading-relaxed text-wine">
            {{ character.quote }}
          </blockquote>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="trait in character.traits"
              :key="trait"
              class="rounded-full border border-[rgba(84,46,23,0.1)] bg-white/35 px-3 py-1 text-xs tracking-[0.14em] text-wine/80"
            >
              {{ trait }}
            </span>
          </div>
        </section>

        <section class="space-y-4">
          <article class="paper-card rounded-[26px] p-5 sm:p-6">
            <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ messages.characterDetail.profileKicker }}</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-3">
              <div
                v-for="connection in character.connections"
                :key="connection.label"
                class="rounded-[18px] border border-[rgba(84,46,23,0.08)] bg-white/35 p-4"
              >
                <p class="text-xs uppercase tracking-[0.28em] text-wine/55">{{ connection.label }}</p>
                <p class="mt-2 text-sm leading-7 text-ink/76">{{ connection.value }}</p>
              </div>
            </div>
          </article>

          <article class="paper-card rounded-[26px] p-5 sm:p-6">
            <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ messages.characterDetail.dossierKicker }}</p>
            <div class="mt-4 space-y-4 text-sm leading-8 text-ink/76 sm:text-base">
              <p v-for="paragraph in character.body" :key="paragraph">{{ paragraph }}</p>
            </div>
          </article>

          <RouterLink
            :to="localeRoute('characters')"
            class="inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
          >
            {{ messages.characterDetail.backToList }}
          </RouterLink>
        </section>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      :eyebrow="messages.characterDetail.missingEyebrow"
      :title="messages.characterDetail.missingTitle"
      :description="messages.characterDetail.missingDescription"
    >
      <RouterLink
        :to="localeRoute('characters')"
        class="inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
      >
        {{ messages.characterDetail.backToList }}
      </RouterLink>
    </ParchmentPanel>
  </AppShell>
</template>