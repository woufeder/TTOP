<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { useSiteI18n } from '../composables/useSiteI18n'
import { getArticle, getArticleTags, getArticles, renderArticle } from '../utils/articles'

const route = useRoute()
const { locale, localeRoute, messages } = useSiteI18n()
const articleLine = computed(() => route.meta.articleLine || 'lore')
const lineCopy = computed(() => messages.value.library[articleLine.value])
const tagRoute = computed(() => (articleLine.value === 'story' ? 'stories-tag' : 'articles-tag'))
const listRoute = computed(() => (articleLine.value === 'story' ? 'stories' : 'articles'))
const isStoryLine = computed(() => articleLine.value === 'story')

const article = computed(() => getArticle(String(route.params.slug || ''), locale.value, { line: articleLine.value }))
const allTags = computed(() => getArticleTags(locale.value, { line: articleLine.value }))
const allItems = computed(() => getArticles(locale.value, { line: articleLine.value }))
const rendered = computed(() => (article.value ? renderArticle(article.value.content) : ''))

function formatDate(date) {
  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'medium',
  }).format(new Date(date))
}
</script>

<template>
  <AppShell>
    <section v-if="article && isStoryLine" class="w-full min-h-0">
      <div class="grid min-h-0 gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div class="min-h-0 rounded-[4px] border border-white/10 bg-[rgba(7,10,24,0.42)] px-6 py-6 text-parchment shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:px-8">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-white/12 pb-4  tracking-[0.18em] text-parchment/62">
            <RouterLink :to="localeRoute(listRoute)" class="transition hover:text-parchment">
              {{ lineCopy.backToList }}
            </RouterLink>
            <span>{{ formatDate(article.date) }}</span>
          </div>

          <header class="border-b border-dashed border-white/12 py-8">
            <p class="text-xs uppercase tracking-[0.42em] text-parchment/55">{{ lineCopy.eyebrow }}</p>
            <h1 class="mt-4 font-display text-5xl leading-tight text-parchment">{{ article.title }}</h1>
            <p class="mt-5 max-w-4xl text-lg leading-10 text-parchment/82">{{ article.summary }}</p>
            <p class="mt-6  tracking-[0.18em] text-parchment/55">{{ article.tags?.join(' ｜ ') }}</p>
          </header>

          <article
            class="story-prose prose prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:text-parchment prose-p:text-parchment/84 prose-p:leading-10 prose-strong:text-[#f6d89b] prose-a:text-[#f6d89b]"
            v-html="rendered"
          />
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
                <span class="text-parchment/55">({{ allItems.length }})</span>
              </RouterLink>

              <RouterLink
                v-for="tag in allTags"
                :key="tag"
                :to="localeRoute(tagRoute, { tag })"
                class="flex items-center justify-between gap-4 border-b border-dashed border-white/12 pb-3 text-base transition"
                :class="article.tags?.includes(tag) ? 'text-parchment' : 'text-parchment/78 hover:text-parchment'"
              >
                <span>{{ tag }}</span>
                <span class="text-parchment/55">({{ allItems.filter((entry) => entry.tags?.includes(tag)).length }})</span>
              </RouterLink>
            </div>
          </section>
        </aside>
      </div>
    </section>

    <ParchmentPanel
      v-else-if="article"
      variant="wide"
      :eyebrow="lineCopy.eyebrow"
      :title="article.title"
      :description="article.summary"
    >
      <img
        :src="article.cover"
        :alt="article.title"
        class="h-[22rem] w-full rounded-[28px] border border-[rgba(84,46,23,0.12)] object-cover"
        loading="lazy"
        decoding="async"
      />

      <div class="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-wine/55">
        <span>{{ formatDate(article.date) }}</span>
        <span class="keep-round h-1 w-1 rounded-full bg-oldGold/70" />
        <span>{{ article.tags?.join(' / ') }}</span>
      </div>

      <article
        class="prose prose-stone mt-8 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink/80 prose-p:leading-8 prose-strong:text-wine prose-a:text-wine"
        v-html="rendered"
      />

      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink
          v-for="tag in article.tags || []"
          :key="tag"
          :to="localeRoute(tagRoute, { tag })"
          class="rounded-full border border-[rgba(84,46,23,0.12)] bg-white/35 px-4 py-2  tracking-[0.18em] text-wine/80 transition hover:bg-white/60"
        >
          {{ tag }}
        </RouterLink>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      :eyebrow="lineCopy.missingEyebrow"
      :title="lineCopy.missingTitle"
      :description="lineCopy.missingDescription"
    >
      <RouterLink
        :to="localeRoute(listRoute)"
        class="inline-flex rounded-full bg-wine px-5 py-3  tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
      >
        {{ lineCopy.backToList }}
      </RouterLink>
    </ParchmentPanel>
  </AppShell>
</template>