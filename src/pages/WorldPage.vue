<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import SectionPager from '../components/layout/SectionPager.vue'
import VerticalText from '../components/world/VerticalText.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getContent } from '../utils/data'
import { getArticles } from '../utils/articles'

const { locale, localeRoute, messages } = useSiteI18n()
const pageCopy = computed(() => messages.value.world)
const regions = computed(() => getContent('regions', locale.value))
const characters = computed(() => getContent('characters', locale.value))

const activeIndex = ref(0)

const currentSlide = computed(() => pageCopy.value.slides[activeIndex.value] || pageCopy.value.slides[0])
const featuredRegions = computed(() => regions.value.filter((region) => region.slug !== 'world-overview').slice(0, 2))
const featuredCharacters = computed(() => characters.value.slice(0, 2))
const featuredArticles = computed(() => getArticles(locale.value, { line: 'lore' }).slice(0, 2))
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      :eyebrow="pageCopy.eyebrow"
      :title="pageCopy.title"
      :description="pageCopy.description"
    >
      <div class="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div class="space-y-6">
          <section class="paper-card rounded-[26px] p-5 sm:p-6">
            <p class="text-xs uppercase tracking-[0.38em] text-wine/55">{{ pageCopy.portalKicker }}</p>
            <h2 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {{ pageCopy.portalTitle }}
            </h2>
            <p class="mt-4 text-sm leading-8 text-ink/76 sm:text-base">
              {{ pageCopy.portalBody }}
            </p>
          </section>

          <VerticalText :title="pageCopy.introTitle" :paragraphs="pageCopy.introColumns" :columns="3" max-height="24rem" />

          <div class="grid gap-4 sm:grid-cols-3">
            <RouterLink
              v-for="link in pageCopy.quickLinks"
              :key="link.routeName"
              :to="localeRoute(link.routeName)"
              class="paper-card flex h-full flex-col rounded-[24px] p-5 transition hover:-translate-y-1 hover:border-oldGold/35 hover:bg-white/70"
            >
              <p class="text-xs uppercase tracking-[0.34em] text-wine/55">{{ pageCopy.quickPathKicker }}</p>
              <h3 class="mt-3 font-display text-2xl text-ink">{{ link.label }}</h3>
              <p class="mt-3 text-sm leading-7 text-ink/72">{{ link.summary }}</p>
            </RouterLink>
          </div>
        </div>

        <div class="space-y-6">
          <section class="paper-card rounded-[28px] p-5 sm:p-6">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="max-w-2xl">
                <p class="text-xs uppercase tracking-[0.38em] text-wine/55">{{ currentSlide.eyebrow }}</p>
                <h2 class="mt-3 font-display text-3xl text-ink sm:text-4xl">{{ currentSlide.title }}</h2>
                <p class="mt-4 text-sm leading-8 text-ink/76 sm:text-base">
                  {{ currentSlide.summary }}
                </p>
              </div>

              <SectionPager v-model="activeIndex" :items="pageCopy.slides" />
            </div>

            <div class="mt-6 grid gap-3 sm:grid-cols-3">
              <article
                v-for="stat in currentSlide.stats"
                :key="stat.label"
                class="rounded-[20px] border border-[rgba(84,46,23,0.1)] bg-white/45 px-4 py-4"
              >
                <p class="text-xs uppercase tracking-[0.32em] text-wine/55">{{ stat.label }}</p>
                <p class="mt-2 font-display text-2xl text-ink">{{ stat.value }}</p>
              </article>
            </div>

            <RouterLink
              :to="localeRoute(currentSlide.routeName)"
              class="mt-6 inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
            >
              {{ currentSlide.cta }}
            </RouterLink>
          </section>

          <section class="grid gap-4 lg:grid-cols-2">
            <article
              v-for="region in featuredRegions"
              :key="region.slug"
              class="paper-card flex h-full flex-col rounded-[24px] p-5"
            >
              <p class="text-xs uppercase tracking-[0.32em] text-wine/55">{{ pageCopy.regionKicker }}</p>
              <h3 class="mt-3 font-display text-2xl text-ink">{{ region.name }}</h3>
              <p class="mt-2 text-xs uppercase tracking-[0.28em] text-oldGold">{{ region.subtitle }}</p>
              <p class="mt-4 text-sm leading-7 text-ink/74">{{ region.summary }}</p>
              <RouterLink
                :to="localeRoute('region-map', { regionSlug: region.slug })"
                class="mt-auto pt-5 inline-flex text-sm tracking-[0.18em] text-wine transition hover:text-[#6f1a1f]"
              >
                {{ pageCopy.openRegionMap }}
              </RouterLink>
            </article>
          </section>

          <section class="grid gap-4 lg:grid-cols-2">
            <article
              v-for="article in featuredArticles"
              :key="article.slug"
              class="paper-card flex h-full flex-col overflow-hidden rounded-[24px]"
            >
              <img
                :src="article.cover"
                :alt="article.title"
                class="h-40 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div class="flex flex-1 flex-col p-5">
                <p class="text-xs uppercase tracking-[0.32em] text-wine/55">{{ pageCopy.articleKicker }}</p>
                <h3 class="mt-3 font-display text-2xl text-ink">{{ article.title }}</h3>
                <p class="mt-4 text-sm leading-7 text-ink/74">{{ article.summary }}</p>
                <RouterLink
                  :to="localeRoute('article-detail', { slug: article.slug })"
                  class="mt-auto pt-5 inline-flex text-sm tracking-[0.18em] text-wine transition hover:text-[#6f1a1f]"
                >
                  {{ pageCopy.readArticle }}
                </RouterLink>
              </div>
            </article>
          </section>

          <section class="grid gap-4 md:grid-cols-2">
            <article
              v-for="character in featuredCharacters"
              :key="character.slug"
              class="paper-card flex h-full flex-col rounded-[24px] p-5"
            >
              <p class="text-xs uppercase tracking-[0.32em] text-wine/55">{{ pageCopy.characterKicker }}</p>
              <h3 class="mt-3 font-display text-2xl text-ink">{{ character.name }}</h3>
              <p class="mt-2 text-sm uppercase tracking-[0.28em] text-oldGold">{{ character.title }}</p>
              <p class="mt-4 text-sm leading-7 text-ink/74">{{ character.summary }}</p>
              <RouterLink
                :to="localeRoute('character-detail', { slug: character.slug })"
                class="mt-auto pt-5 inline-flex text-sm tracking-[0.18em] text-wine transition hover:text-[#6f1a1f]"
              >
                {{ pageCopy.openCharacter }}
              </RouterLink>
            </article>
          </section>
        </div>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>