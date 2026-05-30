<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { getArticles, getArticleTags } from '../utils/articles'

const route = useRoute()

const allArticles = getArticles()
const tags = getArticleTags()

const activeTag = computed(() => (route.params.tag ? String(route.params.tag) : ''))

const filteredArticles = computed(() => {
  if (!activeTag.value) {
    return allArticles
  }

  return allArticles.filter((article) => article.tags?.includes(activeTag.value))
})

const heading = computed(() => (activeTag.value ? `標籤：${activeTag.value}` : '世界文庫'))

function formatDate(date) {
  return new Intl.DateTimeFormat('zh-TW', {
    dateStyle: 'medium',
  }).format(new Date(date))
}
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      eyebrow="Articles"
      :title="heading"
      description="文章由 src/content/articles 內的 Markdown 檔案自動生成列表與詳細頁。新增文章時不需修改 Vue 元件。"
    >
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/articles"
          class="rounded-full border px-4 py-2 text-sm tracking-[0.18em] transition"
          :class="activeTag ? 'border-[rgba(84,46,23,0.12)] bg-white/35 text-wine/80' : 'border-wine bg-wine text-parchment'"
        >
          全部
        </RouterLink>
        <RouterLink
          v-for="tag in tags"
          :key="tag"
          :to="`/articles/tags/${tag}`"
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
          v-for="article in filteredArticles"
          :key="article.slug"
          class="paper-card overflow-hidden rounded-[26px]"
        >
          <img
            :src="article.cover"
            :alt="article.title"
            class="h-52 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="p-5 sm:p-6">
            <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-wine/55">
              <span>{{ formatDate(article.date) }}</span>
              <span class="h-1 w-1 rounded-full bg-oldGold/70" />
              <span>{{ article.tags?.join(' / ') }}</span>
            </div>

            <h2 class="mt-4 font-display text-3xl text-ink">{{ article.title }}</h2>
            <p class="mt-4 text-sm leading-8 text-ink/74">{{ article.summary }}</p>

            <RouterLink
              :to="`/articles/${article.slug}`"
              class="mt-6 inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
            >
              閱讀文章
            </RouterLink>
          </div>
        </article>
      </div>

      <section v-if="!filteredArticles.length" class="paper-card mt-6 rounded-[24px] p-6 text-center">
        <p class="font-display text-3xl text-ink">這個標籤目前沒有文章</p>
        <p class="mt-3 text-sm leading-7 text-ink/72">請新增 Markdown 檔案或切回全部文章列表。</p>
      </section>
    </ParchmentPanel>
  </AppShell>
</template>