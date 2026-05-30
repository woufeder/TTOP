<script setup>
import SiteHeader from './SiteHeader.vue'
</script>

<template>
  <div class="relative flex h-dvh flex-col overflow-hidden bg-dusk text-ink">
    <div class="absolute inset-0 bg-starlit-sky" />
    <div
      class="absolute inset-0 opacity-75"
      style="background-image: linear-gradient(180deg, rgba(10, 13, 22, 0.18), rgba(7, 9, 14, 0.78));"
    />
    <div
      class="absolute inset-0 animate-drift opacity-40"
      style="background-image: radial-gradient(circle at 16% 21%, rgba(255, 242, 202, 0.18), transparent 0 12%), radial-gradient(circle at 74% 14%, rgba(215, 226, 255, 0.2), transparent 0 9%), radial-gradient(circle at 82% 38%, rgba(255, 244, 214, 0.16), transparent 0 10%), radial-gradient(circle at 22% 72%, rgba(186, 205, 255, 0.1), transparent 0 12%);"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-[38%]"
      style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(6, 7, 10, 0.9)), radial-gradient(circle at 50% 120%, rgba(19, 14, 18, 0.95), rgba(8, 10, 14, 0.98) 64%);"
    />

    <SiteHeader />

    <main class="relative z-10 flex min-h-0 flex-1 px-4 pb-4 pt-24 sm:px-6 lg:px-8">
      <div class="mx-auto flex min-h-0 w-full max-w-shell">
        <slot />
      </div>
    </main>
  </div>
</template>