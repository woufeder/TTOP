import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'enter',
    component: () => import('../pages/EnterPage.vue'),
  },
  {
    path: '/world',
    name: 'world',
    component: () => import('../pages/WorldPage.vue'),
  },
  {
    path: '/world/history',
    name: 'history',
    component: () => import('../pages/TimelinePage.vue'),
  },
  {
    path: '/world/records',
    name: 'records',
    component: () => import('../pages/RecordsPage.vue'),
  },
  {
    path: '/world/terms',
    name: 'terms',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'terms' },
  },
  {
    path: '/world/religions',
    name: 'religions',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'religions' },
  },
  {
    path: '/world/organizations',
    name: 'organizations',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'organizations' },
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../pages/MapPage.vue'),
  },
  {
    path: '/map/:regionSlug',
    name: 'region-map',
    component: () => import('../pages/RegionMapPage.vue'),
  },
  {
    path: '/races',
    name: 'races',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'races' },
  },
  {
    path: '/powers',
    name: 'powers',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'powers' },
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('../pages/CharactersPage.vue'),
  },
  {
    path: '/characters/:slug',
    name: 'character-detail',
    component: () => import('../pages/CharacterDetailPage.vue'),
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../pages/ArticlesIndexPage.vue'),
  },
  {
    path: '/articles/tags/:tag',
    name: 'articles-tag',
    component: () => import('../pages/ArticlesIndexPage.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'article-detail',
    component: () => import('../pages/ArticleDetailPage.vue'),
  },
  {
    path: '/credits',
    name: 'credits',
    component: () => import('../pages/InfoListPage.vue'),
    meta: { sectionKey: 'credits' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})