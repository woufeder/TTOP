<script setup>
import { RouterLink } from 'vue-router'
import { useSiteI18n } from '../../composables/useSiteI18n'
import { withBase } from '../../utils/assets'
import BaseLightbox from './BaseLightbox.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  point: {
    type: Object,
    default: null,
  },
  region: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])
const { localeRoute, messages } = useSiteI18n()
</script>

<template>
  <BaseLightbox
    :model-value="modelValue"
    :title="point ? `${point.name} · ${region?.name || messages.map.pointTitle}` : messages.map.pointTitle"
    size="wide"
    width-mode="fit"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div v-if="point" class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
      <div class="overflow-hidden rounded-[24px] border border-[rgba(84,46,23,0.12)] bg-[rgba(16,18,28,0.88)]">
        <img
          :src="withBase(point.image || region?.mapImage)"
          :alt="point.name"
          class="h-full min-h-[18rem] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="space-y-5">
        <div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-wine/60">
          <span>{{ point.type }}</span>
          <span class="keep-round h-1 w-1 rounded-full bg-oldGold/70" />
          <span>{{ region?.subtitle || region?.name }}</span>
        </div>

        <p class="text-lg leading-8 text-ink/85">
          {{ point.summary }}
        </p>

        <p class="leading-8 text-ink/75">
          {{ point.description }}
        </p>

        <div class="rounded-[22px] border border-[rgba(84,46,23,0.12)] bg-white/40 p-5">
          <p class="text-xs uppercase tracking-[0.32em] text-wine/55">{{ messages.map.excerptKicker }}</p>
          <ul class="mt-4 space-y-3  leading-7 text-ink/75">
            <li v-for="fact in point.facts || []" :key="fact" class="flex gap-3">
              <span class="keep-round mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oldGold" />
              <span>{{ fact }}</span>
            </li>
          </ul>
        </div>

        <RouterLink
          v-if="point.targetRegionSlug"
          :to="localeRoute('region-map', { regionSlug: point.targetRegionSlug })"
          class="inline-flex rounded-full bg-wine px-5 py-3  tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
        >
          {{ messages.map.openRegionMap }}
        </RouterLink>
      </div>
    </div>
  </BaseLightbox>
</template>