<script setup>
defineProps({
  events: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div>
    <div class="hidden md:block">
      <div class="paper-scroll pb-4">
        <ol class="flex min-w-max gap-5 pr-8">
          <li v-for="(event, index) in events" :key="event.detailSlug" class="relative w-72 shrink-0 pt-10">
            <span class="absolute left-5 top-4 h-3 w-3 rounded-full bg-oldGold shadow-[0_0_0_5px_rgba(176,138,66,0.12)]" />
            <span
              v-if="index < events.length - 1"
              class="absolute left-8 top-[1.1rem] h-px w-[calc(100%+1.5rem)] bg-oldGold/35"
            />

            <article class="paper-card h-full rounded-[24px] p-5">
              <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ event.era }}</p>
              <h3 class="mt-3 font-display text-2xl text-ink">{{ event.label }}</h3>
              <p class="mt-2 text-sm uppercase tracking-[0.28em] text-oldGold">{{ event.year }}</p>
              <p class="mt-5 text-sm leading-7 text-ink/76">{{ event.summary }}</p>
            </article>
          </li>
        </ol>
      </div>
    </div>

    <ol class="space-y-4 md:hidden">
      <li v-for="event in events" :key="event.detailSlug" class="relative pl-8">
        <span class="absolute left-0 top-3 h-full w-px bg-oldGold/30" />
        <span class="absolute left-[-0.35rem] top-2 h-3 w-3 rounded-full bg-oldGold" />

        <article class="paper-card rounded-[22px] p-5">
          <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ event.era }}</p>
          <h3 class="mt-2 font-display text-2xl text-ink">{{ event.label }}</h3>
          <p class="mt-2 text-sm uppercase tracking-[0.28em] text-oldGold">{{ event.year }}</p>
          <p class="mt-4 text-sm leading-7 text-ink/76">{{ event.summary }}</p>
        </article>
      </li>
    </ol>
  </div>
</template>