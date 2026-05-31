<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSiteI18n } from '../../composables/useSiteI18n'

const route = useRoute()
const { locale, localeOptions, localeRoute, messages, switchLocaleRoute } = useSiteI18n()

const navItems = computed(() => messages.value.header.nav)

function isActive(item) {
  return item.routeName === route.name || item.children?.some((child) => child.routeName === route.name)
}

const mobileItems = computed(() => navItems.value)
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-40 pt-4">
    <div class="pointer-events-auto w-full border-y border-white/10 bg-[rgba(10,12,20,0.64)] text-parchment shadow-halo backdrop-blur-xl">
      <div class="container flex items-center justify-between gap-3 px-3 py-2">
        <RouterLink
          :to="localeRoute('world')"
          class="flex items-center gap-3 rounded px-3 py-2 transition hover:bg-white/5"
        >
          <span class="flex h-10 w-10 items-center justify-center rounded border border-oldGold/35 bg-white/5 font-display text-lg text-oldGold">
            T
          </span>
          <div>
            <p class="font-display text-lg tracking-[0.22em] text-parchment">{{ messages.header.brand }}</p>
            <p class="text-[0.65rem] uppercase tracking-[0.42em] text-parchment/60">{{ messages.header.subtitle }}</p>
          </div>
        </RouterLink>

        <nav class="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          <div v-for="item in navItems" :key="item.routeName" class="group relative">
            <RouterLink
              :to="localeRoute(item.routeName)"
              class="rounded px-4 py-2 text-sm tracking-[0.18em] transition"
              :class="
                isActive(item)
                  ? 'bg-white/10 text-parchment'
                  : 'text-parchment/70 hover:bg-white/5 hover:text-parchment'
              "
            >
              {{ item.label }}
            </RouterLink>

            <div
              v-if="item.children"
              class="invisible absolute left-1/2 top-[calc(100%-1px)] w-60 -translate-x-1/2 rounded border border-[rgba(234,212,175,0.18)] bg-[rgba(244,230,205,0.94)] p-2 pt-3 opacity-0 shadow-paper transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              <RouterLink
                v-for="child in item.children"
                :key="child.routeName"
                :to="localeRoute(child.routeName)"
                class="block rounded px-4 py-3 text-sm text-ink transition hover:bg-[rgba(79,31,18,0.08)]"
              >
                <span class="block font-display text-base tracking-[0.08em]">{{ child.label }}</span>
                <span class="mt-1 block text-xs uppercase tracking-[0.28em] text-wine/60">
                  {{ child.routeName }}
                </span>
              </RouterLink>
            </div>
          </div>
        </nav>

        <div class="hidden items-center gap-1 rounded border border-white/10 bg-black/10 p-1 lg:flex">
          <span class="px-2 text-[0.65rem] uppercase tracking-[0.28em] text-parchment/55">{{ messages.header.languageLabel }}</span>
          <RouterLink
            v-for="option in localeOptions"
            :key="option.code"
            :to="switchLocaleRoute(option.code)"
            class="rounded px-2.5 py-1 text-xs uppercase tracking-[0.18em] transition"
            :class="option.code === locale ? 'bg-white/10 text-parchment' : 'text-parchment/60 hover:bg-white/5 hover:text-parchment'"
          >
            {{ option.label }}
          </RouterLink>
        </div>

        <RouterLink
          :to="localeRoute('stories')"
          class="flex h-11 w-11 items-center justify-center rounded border border-oldGold/30 bg-white/5 font-display text-lg text-oldGold transition hover:bg-white/10"
          :aria-label="messages.header.archiveAria"
          :title="messages.header.archiveAria"
        >
          卷
        </RouterLink>
      </div>
    </div>

    <nav class="pointer-events-auto mt-3 overflow-x-auto lg:hidden">
      <div
        class="w-full border-y border-white/10 bg-[rgba(10,12,20,0.56)] shadow-halo backdrop-blur-xl"
      >
        <div class="container flex min-w-max gap-2 p-2 text-sm text-parchment/85">
          <RouterLink
            v-for="item in mobileItems"
            :key="item.routeName"
            :to="localeRoute(item.routeName)"
            class="rounded px-4 py-2 whitespace-nowrap transition"
            :class="
              isActive(item)
                ? 'bg-white/10 text-parchment'
                : 'text-parchment/70 hover:bg-white/5 hover:text-parchment'
            "
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </nav>

    <nav class="pointer-events-auto mt-2 lg:hidden">
      <div class="w-full border-y border-white/10 bg-[rgba(10,12,20,0.56)] shadow-halo backdrop-blur-xl">
        <div class="container flex items-center gap-2 p-2 text-parchment/85">
          <span class="px-1 text-[0.65rem] uppercase tracking-[0.28em] text-parchment/55">{{ messages.header.languageLabel }}</span>
          <RouterLink
            v-for="option in localeOptions"
            :key="option.code"
            :to="switchLocaleRoute(option.code)"
            class="rounded px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition"
            :class="option.code === locale ? 'bg-white/10 text-parchment' : 'text-parchment/60 hover:bg-white/5 hover:text-parchment'"
          >
            {{ option.label }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>