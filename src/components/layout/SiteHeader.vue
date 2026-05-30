<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import navItems from '../../content/data/nav.json'

const route = useRoute()

function isActive(path) {
  return path === route.path || route.path.startsWith(`${path}/`)
}

const mobileItems = computed(() => navItems)
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
    <div
      class="pointer-events-auto mx-auto flex max-w-shell items-center justify-between gap-3 rounded-full border border-white/10 bg-[rgba(10,12,20,0.64)] px-3 py-2 text-parchment shadow-halo backdrop-blur-xl"
    >
      <RouterLink
        to="/world"
        class="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-white/5"
      >
        <span class="flex h-10 w-10 items-center justify-center rounded-full border border-oldGold/35 bg-white/5 font-display text-lg text-oldGold">
          T
        </span>
        <div>
          <p class="font-display text-lg tracking-[0.22em] text-parchment">TTOP</p>
          <p class="text-[0.65rem] uppercase tracking-[0.42em] text-parchment/60">Fantasy Archive</p>
        </div>
      </RouterLink>

      <nav class="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
        <div v-for="item in navItems" :key="item.path" class="group relative">
          <RouterLink
            :to="item.path"
            class="rounded-full px-4 py-2 text-sm tracking-[0.18em] transition"
            :class="
              isActive(item.path)
                ? 'bg-white/10 text-parchment'
                : 'text-parchment/70 hover:bg-white/5 hover:text-parchment'
            "
          >
            {{ item.label }}
          </RouterLink>

          <div
            v-if="item.children"
            class="invisible absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 rounded-[24px] border border-[rgba(234,212,175,0.18)] bg-[rgba(244,230,205,0.94)] p-2 opacity-0 shadow-paper transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
          >
            <RouterLink
              v-for="child in item.children"
              :key="child.path"
              :to="child.path"
              class="block rounded-[18px] px-4 py-3 text-sm text-ink transition hover:bg-[rgba(79,31,18,0.08)]"
            >
              <span class="block font-display text-base tracking-[0.08em]">{{ child.label }}</span>
              <span class="mt-1 block text-xs uppercase tracking-[0.28em] text-wine/60">
                {{ child.path.replace('/world/', '') }}
              </span>
            </RouterLink>
          </div>
        </div>
      </nav>

      <RouterLink
        to="/world"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-oldGold/30 bg-white/5 font-display text-lg text-oldGold transition hover:rotate-6 hover:bg-white/10"
        aria-label="回到世界觀總覽"
      >
        卷
      </RouterLink>
    </div>

    <nav class="pointer-events-auto mt-3 overflow-x-auto lg:hidden">
      <div
        class="mx-auto flex min-w-max gap-2 rounded-full border border-white/10 bg-[rgba(10,12,20,0.56)] p-2 text-sm text-parchment/85 shadow-halo backdrop-blur-xl"
      >
        <RouterLink
          v-for="item in mobileItems"
          :key="item.path"
          :to="item.path"
          class="rounded-full px-4 py-2 whitespace-nowrap transition"
          :class="
            isActive(item.path)
              ? 'bg-white/10 text-parchment'
              : 'text-parchment/70 hover:bg-white/5 hover:text-parchment'
          "
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>