<script setup>
import { computed, ref } from 'vue'
import BaseLightbox from '../lightbox/BaseLightbox.vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
  messages: {
    type: Object,
    default: () => ({}),
  },
})

const activeEvent = ref(null)
const isOpen = ref(false)

const desktopEvents = computed(() =>
  props.events.map((event, index) => ({
    ...event,
    lane: index % 2 === 0 ? 'top' : 'bottom',
    accent: index % 3 === 1,
  })),
)

function openEvent(event) {
  activeEvent.value = event
  isOpen.value = true
}
</script>

<template>
  <div>
    <div class="hidden lg:block">
      <div class="paper-scroll pb-4">
        <div class="relative min-w-[72rem] px-6 py-6">
          <div class="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-[rgba(84,46,23,0.35)]" />

          <ol class="relative flex justify-between gap-8">
            <li
              v-for="event in desktopEvents"
              :key="event.detailSlug"
              class="relative h-[30rem] min-w-[8rem] flex-1"
            >
              <button
                type="button"
                class="absolute left-1/2 w-44 -translate-x-1/2 rounded-[4px] border border-dashed bg-white/40 px-4 py-3 text-center transition hover:bg-white/70"
                :class="[
                  event.lane === 'top' ? 'top-2' : 'bottom-2',
                  event.accent ? 'border-wine/45 text-wine' : 'border-[rgba(84,46,23,0.28)] text-ink/88',
                ]"
                @click="openEvent(event)"
              >
                <p class="text-[0.68rem] uppercase tracking-[0.22em] opacity-70">{{ event.era }}</p>
                <p class="mt-2 font-display text-xl leading-tight">{{ event.label }}</p>
              </button>

              <span
                class="absolute left-1/2 w-px -translate-x-1/2"
                :class="[
                  event.lane === 'top' ? 'top-[4.9rem] h-[9rem]' : 'top-1/2 h-[9rem]',
                  event.accent ? 'bg-wine/45' : 'bg-[rgba(84,46,23,0.35)]',
                ]"
              />

              <button
                type="button"
                class="keep-round absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-parchment shadow-[0_0_0_6px_rgba(255,248,236,0.68)] transition hover:scale-110"
                :class="event.accent ? 'bg-wine' : 'bg-ink/85'"
                @click="openEvent(event)"
              />

              <p
                class="absolute left-1/2 -translate-x-1/2 text-center font-display text-3xl whitespace-nowrap text-ink/88"
                :class="event.lane === 'top' ? 'top-[13.9rem]' : 'top-[11rem]'"
              >
                {{ event.year }}
              </p>

              <p
                class="absolute left-1/2 max-w-[11rem] -translate-x-1/2 text-center text-sm leading-7 text-ink/70"
                :class="event.lane === 'top' ? 'top-[18rem]' : 'top-[5.5rem]'"
              >
                {{ event.summary }}
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <ol class="space-y-5 lg:hidden">
      <li v-for="event in events" :key="event.detailSlug" class="relative pl-10">
        <span class="absolute left-2 top-0 h-full w-px bg-[rgba(84,46,23,0.28)]" />
        <button
          type="button"
          class="keep-round absolute left-0 top-5 h-5 w-5 rounded-full border-2 border-parchment bg-wine shadow-[0_0_0_6px_rgba(255,248,236,0.68)]"
          @click="openEvent(event)"
        />

        <button
          type="button"
          class="w-full rounded-[4px] border border-dashed border-[rgba(84,46,23,0.28)] bg-white/42 px-4 py-4 text-left transition hover:bg-white/70"
          @click="openEvent(event)"
        >
          <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-wine/60">
            <span>{{ event.era }}</span>
            <span>{{ event.year }}</span>
          </div>
          <h3 class="mt-3 font-display text-2xl text-ink">{{ event.label }}</h3>
          <p class="mt-3 text-sm leading-7 text-ink/74">{{ event.summary }}</p>
        </button>
      </li>
    </ol>

    <BaseLightbox v-model="isOpen" :title="activeEvent?.label || ''" size="normal">
      <div v-if="activeEvent" class="space-y-6">
        <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-wine/55">
          <span>{{ activeEvent.era }}</span>
          <span class="keep-round h-1 w-1 rounded-full bg-oldGold/70" />
          <span>{{ activeEvent.year }}</span>
        </div>

        <p class="text-lg leading-9 text-ink/84">{{ activeEvent.summary }}</p>

        <div class="space-y-4 text-base leading-9 text-ink/78">
          <p v-for="paragraph in activeEvent.details || [activeEvent.summary]" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>

        <p class="text-sm tracking-[0.18em] text-wine/70">{{ messages.openHint }}</p>
      </div>
    </BaseLightbox>
  </div>
</template>