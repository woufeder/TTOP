<script setup>
import SiteHeader from './SiteHeader.vue'
</script>

<template>
  <div class="site-background relative flex h-dvh flex-col overflow-hidden text-ink">
    <div class="site-background__image" />
    <div class="site-background__overlay" />

    <SiteHeader />

    <main class="relative z-10 flex min-h-0 flex-1 pb-4 pt-24">
      <div class="container flex min-h-0 w-full">
        <slot />
      </div>
    </main>
  </div>
</template>
