<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  paragraphs: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    default: 3,
  },
  gap: {
    type: String,
    default: '1rem',
  },
  maxHeight: {
    type: String,
    default: '24rem',
  },
})
</script>

<template>
  <section class="paper-card rounded-[26px] p-4 sm:p-6">
    <div class="flex items-center justify-between gap-4">
      <p class="text-xs uppercase tracking-[0.36em] text-wine/55">
        {{ title }}
      </p>
      <p class="text-xs tracking-[0.24em] text-wine/45">vertical text</p>
    </div>

    <div class="mt-5 space-y-3 lg:hidden">
      <p
        v-for="paragraph in paragraphs"
        :key="paragraph"
        class="rounded-[18px] border border-[rgba(84,46,23,0.08)] bg-white/35 p-4 text-sm leading-7 text-ink/80"
      >
        {{ paragraph }}
      </p>
    </div>

    <div
      class="paper-scroll mt-5 hidden lg:grid"
      :style="{
        gridTemplateColumns: `repeat(${columns}, minmax(3.5rem, 1fr))`,
        gap,
        maxHeight,
      }"
    >
      <p
        v-for="paragraph in paragraphs"
        :key="paragraph"
        class="writing-vertical rounded-[18px] border border-[rgba(84,46,23,0.08)] bg-white/35 p-3 text-sm leading-7 tracking-[0.12em] text-wine/85"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>