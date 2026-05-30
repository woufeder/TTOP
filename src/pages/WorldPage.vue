<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppShell from '../components/layout/AppShell.vue'
import ParchmentPanel from '../components/layout/ParchmentPanel.vue'
import SectionPager from '../components/layout/SectionPager.vue'
import VerticalTextBlock from '../components/world/VerticalTextBlock.vue'
import characters from '../content/data/characters.json'
import regions from '../content/data/regions.json'
import { getArticles } from '../utils/articles'

const introColumns = [
  '這裡收納世界的疆界、王權、宗教與人物。每一項內容都應該能從資料檔擴充，而不是把描述寫死在元件裡。',
  '首頁之後的主站維持固定視窗式 layout，背景鋪滿 viewport，羊皮紙 panel 與地圖在內容區局部捲動。',
  '第一階段先確保世界總覽、地圖、年表、列王記與文章頁都能獨立運作，再逐步補上多語系與交叉引用。',
]

const featuredSlides = [
  {
    eyebrow: 'worldbuilding',
    title: '資料驅動的世界觀入口',
    summary: '首頁、年表、列王記與文庫都由 JSON 或 Markdown 驅動，後續新增內容不需要再改頁面骨架。',
    path: '/articles',
    cta: '前往文庫',
    stats: [
      { label: '內容來源', value: 'JSON / MD' },
      { label: '互動方式', value: 'Lightbox / Router' },
      { label: '部署形式', value: 'GitHub Pages' },
    ],
  },
  {
    eyebrow: 'map archive',
    title: '世界總圖與區域地圖分流',
    summary: '世界總圖保留作概覽與導航，實際區域頁再承接 hotspot、地點說明與更細的資料卡。',
    path: '/map',
    cta: '查看地圖',
    stats: [
      { label: '總圖入口', value: '/map' },
      { label: '區域子頁', value: '/map/:slug' },
      { label: '圖片策略', value: 'Lazy + Full Size' },
    ],
  },
  {
    eyebrow: 'records and lore',
    title: '列王記與編年史共用風格',
    summary: '資料密集頁統一放進局部捲動容器，避免整個 body 捲動，同時維持桌機與手機版都易讀。',
    path: '/world/records',
    cta: '查看列王記',
    stats: [
      { label: '表格', value: 'Sticky Header' },
      { label: '時間線', value: 'Desktop / Mobile' },
      { label: 'RWD', value: '1366 至 Mobile' },
    ],
  },
]

const activeIndex = ref(0)

const currentSlide = computed(() => featuredSlides[activeIndex.value] || featuredSlides[0])
const featuredRegions = regions.filter((region) => region.slug !== 'world-overview').slice(0, 2)
const featuredCharacters = characters.slice(0, 2)
const featuredArticles = getArticles().slice(0, 2)

const quickLinks = [
  { label: '編年史', path: '/world/history', summary: '水平與垂直雙版型時間線。' },
  { label: '列王記', path: '/world/records', summary: 'JSON 驅動王表與政體備註。' },
  { label: '地圖總覽', path: '/map', summary: '手繪地圖與 hotspot lightbox。' },
]
</script>

<template>
  <AppShell>
    <ParchmentPanel
      variant="wide"
      eyebrow="World Overview"
      title="以紙卷、地圖與資料卡鋪出世界觀主站"
      description="這個總覽頁先承接整站精神與快速入口，再把文章、區域地圖與角色資料導向各自的內容頁。"
    >
      <div class="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div class="space-y-6">
          <section class="paper-card rounded-[26px] p-5 sm:p-6">
            <p class="text-xs uppercase tracking-[0.38em] text-wine/55">portal</p>
            <h2 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              在固定視窗內管理整個奇幻世界的資訊架構
            </h2>
            <p class="mt-4 text-sm leading-8 text-ink/76 sm:text-base">
              內頁主體盡量避免 body scroll，將閱讀與探索集中在紙張容器、表格容器與 lightbox。
              這樣能讓背景氛圍穩定，同時保留未來更多資訊密度。
            </p>
          </section>

          <VerticalTextBlock title="序文抄錄" :paragraphs="introColumns" :columns="3" max-height="24rem" />

          <div class="grid gap-4 sm:grid-cols-3">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="paper-card rounded-[24px] p-5 transition hover:-translate-y-1 hover:border-oldGold/35 hover:bg-white/70"
            >
              <p class="text-xs uppercase tracking-[0.34em] text-wine/55">Quick Path</p>
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

              <SectionPager v-model="activeIndex" :items="featuredSlides" />
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
              :to="currentSlide.path"
              class="mt-6 inline-flex rounded-full bg-wine px-5 py-3 text-sm tracking-[0.18em] text-parchment transition hover:bg-[#5e171d]"
            >
              {{ currentSlide.cta }}
            </RouterLink>
          </section>

          <section class="grid gap-4 lg:grid-cols-2">
            <article
              v-for="region in featuredRegions"
              :key="region.slug"
              class="paper-card rounded-[24px] p-5"
            >
              <p class="text-xs uppercase tracking-[0.32em] text-wine/55">region</p>
              <h3 class="mt-3 font-display text-2xl text-ink">{{ region.name }}</h3>
              <p class="mt-2 text-xs uppercase tracking-[0.28em] text-oldGold">{{ region.subtitle }}</p>
              <p class="mt-4 text-sm leading-7 text-ink/74">{{ region.summary }}</p>
              <RouterLink
                :to="`/map/${region.slug}`"
                class="mt-5 inline-flex text-sm tracking-[0.18em] text-wine transition hover:text-[#6f1a1f]"
              >
                打開區域地圖 →
              </RouterLink>
            </article>
          </section>

          <section class="grid gap-4 lg:grid-cols-2">
            <article
              v-for="article in featuredArticles"
              :key="article.slug"
              class="paper-card overflow-hidden rounded-[24px]"
            >
              <img
                :src="article.cover"
                :alt="article.title"
                class="h-40 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div class="p-5">
                <p class="text-xs uppercase tracking-[0.32em] text-wine/55">article</p>
                <h3 class="mt-3 font-display text-2xl text-ink">{{ article.title }}</h3>
                <p class="mt-4 text-sm leading-7 text-ink/74">{{ article.summary }}</p>
                <RouterLink
                  :to="`/articles/${article.slug}`"
                  class="mt-5 inline-flex text-sm tracking-[0.18em] text-wine transition hover:text-[#6f1a1f]"
                >
                  閱讀文章 →
                </RouterLink>
              </div>
            </article>
          </section>

          <section class="grid gap-4 md:grid-cols-2">
            <article
              v-for="character in featuredCharacters"
              :key="character.slug"
              class="paper-card rounded-[24px] p-5"
            >
              <p class="text-xs uppercase tracking-[0.32em] text-wine/55">character</p>
              <h3 class="mt-3 font-display text-2xl text-ink">{{ character.name }}</h3>
              <p class="mt-2 text-sm uppercase tracking-[0.28em] text-oldGold">{{ character.title }}</p>
              <p class="mt-4 text-sm leading-7 text-ink/74">{{ character.summary }}</p>
              <RouterLink
                :to="`/characters/${character.slug}`"
                class="mt-5 inline-flex text-sm tracking-[0.18em] text-wine transition hover:text-[#6f1a1f]"
              >
                展開人物志 →
              </RouterLink>
            </article>
          </section>
        </div>
      </div>
    </ParchmentPanel>
  </AppShell>
</template>