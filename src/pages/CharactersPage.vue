<script setup>
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import characters from '../content/data/characters.json'
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      eyebrow="Characters"
      title="人物志"
      description="角色資料來自 characters.json，後續可以延伸出關係網、陣營篩選與交叉引用。"
    >
      <div class="grid gap-5 lg:grid-cols-3">
        <RouterLink
          v-for="character in characters"
          :key="character.slug"
          :to="`/characters/${character.slug}`"
          class="paper-card rounded-[26px] p-5 transition hover:-translate-y-1 hover:bg-white/70 sm:p-6"
        >
          <div class="flex items-center gap-4">
            <span class="flex h-14 w-14 items-center justify-center rounded-full border border-oldGold/30 bg-white/35 font-display text-2xl text-wine">
              {{ character.name.slice(0, 1) }}
            </span>
            <div>
              <h2 class="font-display text-3xl text-ink">{{ character.name }}</h2>
              <p class="text-xs uppercase tracking-[0.28em] text-oldGold">{{ character.title }}</p>
            </div>
          </div>

          <p class="mt-5 text-sm leading-8 text-ink/74">{{ character.summary }}</p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="trait in character.traits"
              :key="trait"
              class="rounded-full border border-[rgba(84,46,23,0.1)] bg-white/35 px-3 py-1 text-xs tracking-[0.14em] text-wine/80"
            >
              {{ trait }}
            </span>
          </div>
        </RouterLink>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>