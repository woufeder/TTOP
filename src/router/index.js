import { createRouter, createWebHistory } from 'vue-router'
import { DEFAULT_LOCALE, normalizeLocale } from '../i18n/config'

const localeParam = ':locale(zh-TW|en|it)?'

function localized(path = '') {
  return `/${localeParam}${path}`.replace(/\/+/g, '/')
}

const routes = [
  {
    path: localized(),
    name: 'enter',
    component: () => import('../pages/EnterPage.vue'),
  },
  {
    path: localized('/world'),
    name: 'world',
    component: () => import('../pages/WorldPage.vue'),
  },
  {
    path: localized('/world/history'),
    name: 'history',
    component: () => import('../pages/TimelinePage.vue'),
  },
  {
    path: localized('/world/records'),
    name: 'records',
    component: () => import('../pages/RecordsPage.vue'),
  },
  {
    path: localized('/world/terms'),
    name: 'terms',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'terms' },
  },
  {
    path: localized('/world/religions'),
    name: 'religions',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'religions' },
  },
  {
    path: localized('/world/organizations'),
    name: 'organizations',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'organizations' },
  },
  {
    path: localized('/map'),
    name: 'map',
    component: () => import('../pages/MapPage.vue'),
  },
  {
    path: localized('/map/:regionSlug'),
    name: 'region-map',
    component: () => import('../pages/RegionMapPage.vue'),
  },
  {
    path: localized('/races'),
    name: 'races',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'races' },
  },
  {
    path: localized('/races/:raceSlug'),
    name: 'race-detail',
    component: () => import('../pages/RaceDetailPage.vue'),
  },
  {
    path: localized('/powers'),
    redirect: (to) => ({
      name: 'organizations',
      params: {
        locale: to.params.locale,
      },
      query: to.query,
      hash: to.hash,
    }),
  },
  {
    path: localized('/characters'),
    name: 'characters',
    component: () => import('../pages/CharactersPage.vue'),
  },
  {
    path: localized('/characters/:slug'),
    name: 'character-detail',
    component: () => import('../pages/CharacterDetailPage.vue'),
  },
  {
    path: localized('/articles'),
    name: 'articles',
    component: () => import('../pages/ArticlesIndexPage.vue'),
    meta: { articleLine: 'lore' },
  },
  {
    path: localized('/articles/tags/:tag'),
    name: 'articles-tag',
    component: () => import('../pages/ArticlesIndexPage.vue'),
    meta: { articleLine: 'lore' },
  },
  {
    path: localized('/articles/:slug'),
    name: 'article-detail',
    component: () => import('../pages/ArticleDetailPage.vue'),
    meta: { articleLine: 'lore' },
  },
  {
    path: localized('/stories'),
    name: 'stories',
    component: () => import('../pages/ArticlesIndexPage.vue'),
    meta: { articleLine: 'story' },
  },
  {
    path: localized('/stories/tags/:tag'),
    name: 'stories-tag',
    component: () => import('../pages/ArticlesIndexPage.vue'),
    meta: { articleLine: 'story' },
  },
  {
    path: localized('/stories/:slug'),
    name: 'story-detail',
    component: () => import('../pages/ArticleDetailPage.vue'),
    meta: { articleLine: 'story' },
  },
  {
    path: localized('/credits'),
    name: 'credits',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'credits' },
  },
  {
    path: localized('/:pathMatch(.*)*'),
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  if (!to.name) {
    return true
  }

  const targetLocale = normalizeLocale(to.params.locale || from.params.locale || DEFAULT_LOCALE)

  if (to.params.locale === targetLocale) {
    return true
  }

  return {
    name: to.name,
    params: {
      ...to.params,
      locale: targetLocale,
    },
    query: to.query,
    hash: to.hash,
    replace: true,
  }
})

export default router