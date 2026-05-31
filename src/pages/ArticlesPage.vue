<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getArticles, getArticleTags } from '../utils/articles'

const route = useRoute()
const { locale, localeRoute, messages } = useSiteI18n()
const articleLine = computed(() => route.meta.articleLine || 'lore')
const lineCopy = computed(() => messages.value.library[articleLine.value])

const articles = computed(() => getArticles(locale.value, { line: articleLine.value }))
const tags = computed(() => getArticleTags(locale.value, { line: articleLine.value }))

const activeTag = computed(() => (route.params.tag ? String(route.params.tag) : ''))

const filtered = computed(() => {
  if (!activeTag.value) {
    return articles.value
  }

  return articles.value.filter((article) => article.tags?.includes(activeTag.value))
})

const heading = computed(() =>
  activeTag.value ? `${lineCopy.value.tagPrefix}${activeTag.value}` : lineCopy.value.heading,
)

const listRoute = computed(() => (articleLine.value === 'story' ? 'stories' : 'articles'))
const tagRoute = computed(() => (articleLine.value === 'story' ? 'stories-tag' : 'articles-tag'))
const detailRoute = computed(() => (articleLine.value === 'story' ? 'story-detail' : 'article-detail'))
const isStoryLine = computed(() => articleLine.value === 'story')
const tagCounts = computed(() =>
  tags.value.map((tag) => ({
    tag,
    count: articles.value.filter((article) => article.tags?.includes(tag)).length,
  })),
)

function formatDate(date) {
  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'medium',
  }).format(new Date(date))
}
</script>

<template>
  <AppShell>
    <section v-if="isStoryLine" class="w-full min-h-0">
      <div class="grid min-h-0 gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div class="min-h-0 rounded-[4px] border border-white/10 bg-[rgba(7,10,24,0.42)] px-6 py-6 text-parchment shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:px-8">
          <header class="border-b border-dashed border-white/12 pb-5">
            <p class="text-xs uppercase tracking-[0.42em] text-parchment/55">{{ lineCopy.eyebrow }}</p>
            <h1 class="mt-3 font-display text-4xl text-parchment">{{ heading }}</h1>
            <p class="mt-4 max-w-3xl text-sm leading-8 text-parchment/72">{{ lineCopy.description }}</p>
          </header>

          <div v-if="filtered.length" class="divide-y divide-dashed divide-white/12">
            <article v-for="article in filtered" :key="article.slug" class="py-8 first:pt-7">
              <div class="flex flex-wrap items-start justify-between gap-4 text-sm text-parchment/55">
                <p class="tracking-[0.18em]">{{ formatDate(article.date) }}</p>
                <p class="text-right tracking-[0.18em]">{{ article.tags?.join(' ｜ ') }}</p>
              </div>

              <h2 class="mt-4 font-display text-4xl leading-tight text-parchment">{{ article.title }}</h2>
              <p class="mt-6 max-w-4xl text-lg leading-10 text-parchment/84">{{ article.summary }}</p>

              <RouterLink
                :to="localeRoute(detailRoute, { slug: article.slug })"
                class="mt-8 inline-flex rounded-[4px] border border-white/18 px-5 py-3 text-sm tracking-[0.22em] text-parchment/90 transition hover:bg-white/8"
              >
                {{ lineCopy.read }}
              </RouterLink>
            </article>
          </div>

          <section v-else class="py-8 text-center">
            <p class="font-display text-3xl text-parchment">{{ lineCopy.emptyTitle }}</p>
            <p class="mt-3 text-sm leading-8 text-parchment/68">{{ lineCopy.emptyDescription }}</p>
          </section>
        </div>

        <aside class="space-y-6">
          <section class="rounded-[4px] border border-white/10 bg-[rgba(7,10,24,0.5)] px-5 py-5 text-parchment shadow-[0_24px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <p class="text-xs uppercase tracking-[0.42em] text-parchment/55">{{ lineCopy.sidebarTitle }}</p>
            <div class="mt-4 space-y-3">
              <RouterLink
                :to="localeRoute(listRoute)"
                class="flex items-center justify-between gap-4 border-b border-dashed border-white/12 pb-3 text-base text-parchment/88 transition hover:text-parchment"
              >
                <span>{{ lineCopy.all }}</span>
                <span class="text-parchment/55">({{ articles.length }})</span>
              </RouterLink>

              <RouterLink
                v-for="item in tagCounts"
                :key="item.tag"
                :to="localeRoute(tagRoute, { tag: item.tag })"
                class="flex items-center justify-between gap-4 border-b border-dashed border-white/12 pb-3 text-base transition"
                :class="activeTag === item.tag ? 'text-parchment' : 'text-parchment/78 hover:text-parchment'"
              >
                <span>{{ item.tag }}</span>
                <span class="text-parchment/55">({{ item.count }})</span>
              </RouterLink>
            </div>
          </section>
        </aside>
      </div>
    </section>

    <ParchmentPanel
      v-else
      variant="wide"
      :eyebrow="lineCopy.eyebrow"
      :title="heading"
      :description="lineCopy.description"
    >
      <div class="flex flex-wrap gap-3">
        <RouterLink
          :to="localeRoute(listRoute)"
          class="rounded-full border px-4 py-2 text-sm tracking-[0.18em] transition"
          :class="activeTag ? 'border-[rgba(84,46,23,0.12)] bg-white/35 text-wine/80' : 'border-wine bg-wine text-parchment'"
        >
          {{ lineCopy.all }}
        </RouterLink>
        <RouterLink
          v-for="tag in tags"
          :key="tag"
          :to="localeRoute(tagRoute, { tag })"
          class="rounded-full border px-4 py-2 text-sm tracking-[0.18em] transition"
          :class="
            activeTag === tag
              ? 'border-wine bg-wine text-parchment'
              : 'border-[rgba(84,46,23,0.12)] bg-white/35 text-wine/80 hover:bg-white/60'
          "
        >
          {{ tag }}
        </RouterLink>
      </div>

      <div class="mt-6 grid gap-5 lg:grid-cols-2">
        <article
          v-for="article in filtered"
          :key="article.slug"
          class="paper-card flex h-full flex-col overflow-hidden rounded-[26px]"
        >
          <img
            :src="article.cover"
            :alt="article.title"
            class="h-52 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-wine/55">
              <span>{{ formatDate(article.date) }}</span>
              <span class="keep-round h-1 w-1 rounded-full bg-oldGold/70" />
              <span>{{ article.tags?.join(' / ') }}</span>
            </div>

            <h2 class="mt-4 font-display text-3xl text-ink">{{ article.title }}</h2>
            <p class="mt-4 text-sm leading-8 text-ink/74">{{ article.summary }}</p>

            <RouterLink
              :to="localeRoute(detailRoute, { slug: article.slug })"
              class="mt-auto inline-flex rounded-full bg-wine px-5 py-3 pt-6 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
            >
              {{ lineCopy.read }}
            </RouterLink>
          </div>
        </article>
      </div>

      <section v-if="!filtered.length" class="paper-card mt-6 rounded-[24px] p-6 text-center">
        <p class="font-display text-3xl text-ink">{{ lineCopy.emptyTitle }}</p>
        <p class="mt-3 text-sm leading-7 text-ink/72">{{ lineCopy.emptyDescription }}</p>
      </section>
    </ParchmentPanel>
  </AppShell>
</template>