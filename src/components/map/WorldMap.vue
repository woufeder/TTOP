<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useLightbox } from '../../composables/useLightbox'
import BaseLightbox from '../lightbox/BaseLightbox.vue'
import MapHotspot from './MapHotspot.vue'

const MapPointModal = defineAsyncComponent(() => import('../lightbox/MapPointModal.vue'))

const props = defineProps({
  region: {
    type: Object,
    required: true,
  },
})

const { isOpen, payload, open, close } = useLightbox()
const imageOpen = ref(false)

const points = computed(() => props.region.hotspots || [])
const selectedPoint = computed(() => payload.value)

function selectPoint(point) {
  open(point)
}
</script>

<template>
  <div class="grid min-h-0 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
    <div class="relative min-h-[22rem] overflow-hidden rounded-[28px] border border-[rgba(84,46,23,0.12)] bg-[rgba(10,14,22,0.88)] shadow-paper">
      <img
        :src="region.mapImage"
        :alt="region.name"
        class="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <MapHotspot v-for="point in points" :key="point.slug" :point="point" @select="selectPoint" />

      <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-[rgba(7,9,14,0.88)] to-transparent px-4 pb-4 pt-12 text-parchment">
        <div>
          <p class="text-xs uppercase tracking-[0.38em] text-parchment/60">interactive map</p>
          <h3 class="mt-2 font-display text-2xl text-parchment">{{ region.name }}</h3>
        </div>

        <button
          type="button"
          class="rounded-full border border-parchment/20 bg-white/10 px-4 py-2 text-sm tracking-[0.18em] transition hover:bg-white/15"
          @click="imageOpen = true"
        >
          檢視全圖
        </button>
      </div>
    </div>

    <aside class="paper-card paper-scroll rounded-[26px] p-5">
      <p class="text-xs uppercase tracking-[0.36em] text-wine/55">hotspots</p>
      <div class="mt-4 space-y-3">
        <button
          v-for="point in points"
          :key="point.slug"
          type="button"
          class="w-full rounded-[20px] border border-[rgba(84,46,23,0.1)] bg-white/40 px-4 py-4 text-left transition hover:border-oldGold/35 hover:bg-white/70"
          @click="selectPoint(point)"
        >
          <p class="font-display text-xl text-ink">{{ point.name }}</p>
          <p class="mt-1 text-xs uppercase tracking-[0.3em] text-oldGold">{{ point.type }}</p>
          <p class="mt-3 text-sm leading-7 text-ink/72">{{ point.summary }}</p>
        </button>
      </div>
    </aside>
  </div>

  <BaseLightbox v-model="imageOpen" :title="`${region.name} 全圖`" size="wide">
    <img
      :src="region.mapImage"
      :alt="`${region.name} 全圖`"
      class="w-full rounded-[22px] border border-[rgba(84,46,23,0.12)]"
      loading="lazy"
      decoding="async"
    />
  </BaseLightbox>

  <MapPointModal
    v-if="selectedPoint"
    :model-value="isOpen"
    :point="selectedPoint"
    :region="region"
    @update:modelValue="close"
  />
</template>