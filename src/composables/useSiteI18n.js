import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DEFAULT_LOCALE, LOCALES, normalizeLocale } from '../i18n/config'
import { siteMessages } from '../i18n/messages'

export function useSiteI18n() {
  const route = useRoute()
  const locale = computed(() => normalizeLocale(route.params.locale))
  const messages = computed(() => siteMessages[locale.value] || siteMessages[DEFAULT_LOCALE])
  const localeOptions = computed(() =>
    LOCALES.map((code) => ({ code, label: messages.value.localeNames[code] || code })),
  )

  function localeRoute(routeName, params = {}, options = {}) {
    return {
      name: routeName,
      params: { ...route.params, ...params, locale: params.locale || locale.value },
      query: options.query,
      hash: options.hash,
    }
  }

  function switchLocaleRoute(targetLocale) {
    return {
      name: route.name || 'enter',
      params: { ...route.params, locale: targetLocale },
      query: route.query,
      hash: route.hash,
    }
  }

  return { defaultLocale: DEFAULT_LOCALE, locale, localeOptions, localeRoute, messages, switchLocaleRoute }
}