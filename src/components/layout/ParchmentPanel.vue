<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'normal',
  },
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})

const variantClass = computed(() => {
  const classes = {
    normal: 'max-w-5xl',
    wide: 'max-w-6xl',
    map: 'max-w-[min(82rem,100%)]',
    compact: 'max-w-3xl',
  }

  return classes[props.variant] || classes.normal
})
</script>

<template>
  <section
    :class="[
      'paper-panel ornate-border relative mx-auto flex min-h-0 w-full flex-col overflow-hidden rounded-[30px] text-ink',
      variantClass,
    ]"
  >
    <header
      v-if="eyebrow || title || description"
      class="relative z-10 border-b border-[rgba(84,46,23,0.1)] px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-7"
    >
      <p v-if="eyebrow" class="text-xs uppercase tracking-[0.42em] text-wine/60">
        {{ eyebrow }}
      </p>
      <h1 v-if="title" class="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-3 max-w-3xl text-sm leading-7 text-ink/78 sm:text-base">
        {{ description }}
      </p>
    </header>

    <div class="paper-scroll relative z-10 min-h-0 flex-1 px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
      <slot />
    </div>
  </section>
</template>