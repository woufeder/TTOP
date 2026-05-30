<script setup>
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
</script>

<template>
  <BaseLightbox
    :model-value="modelValue"
    :title="point ? `${point.name} · ${region?.name || '地圖點位'}` : '地圖點位'"
    size="wide"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div v-if="point" class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
      <div class="overflow-hidden rounded-[24px] border border-[rgba(84,46,23,0.12)] bg-[rgba(16,18,28,0.88)]">
        <img
          :src="point.image || region?.mapImage"
          :alt="point.name"
          class="h-full min-h-[18rem] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="space-y-5">
        <div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-wine/60">
          <span>{{ point.type }}</span>
          <span class="h-1 w-1 rounded-full bg-oldGold/70" />
          <span>{{ region?.subtitle || region?.name }}</span>
        </div>

        <p class="text-lg leading-8 text-ink/85">
          {{ point.summary }}
        </p>

        <p class="leading-8 text-ink/75">
          {{ point.description }}
        </p>

        <div class="rounded-[22px] border border-[rgba(84,46,23,0.12)] bg-white/40 p-5">
          <p class="text-xs uppercase tracking-[0.32em] text-wine/55">摘錄</p>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-ink/75">
            <li v-for="fact in point.facts || []" :key="fact" class="flex gap-3">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oldGold" />
              <span>{{ fact }}</span>
            </li>
          </ul>
        </div>

        <RouterLink
          v-if="point.targetRegionSlug"
          :to="`/map/${point.targetRegionSlug}`"
          class="inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
        >
          查看區域地圖
        </RouterLink>
      </div>
    </div>
  </BaseLightbox>
</template>