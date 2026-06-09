<script setup>
import { RouterLink } from 'vue-router'
import { useSiteI18n } from '../composables/useSiteI18n'

const { localeRoute, messages } = useSiteI18n()
</script>

<template>
  <section class="site-background relative isolate flex min-h-dvh overflow-hidden text-parchment">
    <div class="site-background__image" />
    <div class="site-background__overlay" />

    <div class="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p class="animate-fadeRise  uppercase tracking-[0.48em] text-parchment/70 sm:text-base">
        {{ messages.enter.kicker }}
      </p>
      <h1 class="animate-fadeRise text-shadow-soft mt-6 max-w-5xl font-display text-[clamp(3.75rem,10vw,8rem)] leading-[0.94] text-parchment">
        {{ messages.enter.title }}
      </h1>
      <p class="animate-fadeRise mt-6 max-w-2xl text-base leading-8 text-parchment/78 sm:text-lg">
        {{ messages.enter.summary }}
      </p>

      <RouterLink :to="localeRoute('world')" class="group mt-14 inline-flex flex-col items-center gap-4">
        <span class="keep-round relative flex h-28 w-28 items-center justify-center rounded-full border border-oldGold/45 bg-white/5 text-oldGold animate-pulseRune transition duration-500 group-hover:rotate-6 group-hover:scale-105">
          <span class="keep-round absolute inset-3 rounded-full border border-oldGold/30" />
          <span class="text-xs uppercase tracking-[0.55em]">{{ messages.enter.enter }}</span>
        </span>
        <span class="text-xs uppercase tracking-[0.46em] text-parchment/72 sm:">
          {{ messages.enter.enterPrompt }}
        </span>
      </RouterLink>
    </div>
  </section>
</template>
