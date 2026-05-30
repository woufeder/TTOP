<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import { getArticleBySlug, renderArticle } from '../utils/articles'

const route = useRoute()

const article = computed(() => getArticleBySlug(String(route.params.slug || '')))
const rendered = computed(() => (article.value ? renderArticle(article.value.content) : ''))

function formatDate(date) {
  return new Intl.DateTimeFormat('zh-TW', {
    dateStyle: 'medium',
  }).format(new Date(date))
}
</script>

<template>
  <AppShell>
    <ParchmentPanel
      v-if="article"
      variant="wide"
      eyebrow="Article Detail"
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
        <span class="h-1 w-1 rounded-full bg-oldGold/70" />
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
          :to="`/articles/tags/${tag}`"
          class="rounded-full border border-[rgba(84,46,23,0.12)] bg-white/35 px-4 py-2 text-sm tracking-[0.18em] text-wine/80 transition hover:bg-white/60"
        >
          {{ tag }}
        </RouterLink>
      </div>
    </ParchmentPanel>

    <ParchmentPanel
      v-else
      variant="compact"
      eyebrow="Missing Article"
      title="找不到這篇文章"
      description="請確認 Markdown 檔案存在且 frontmatter 設為 public。"
    >
      <RouterLink
        to="/articles"
        class="inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
      >
        返回文庫列表
      </RouterLink>
    </ParchmentPanel>
  </AppShell>
</template>