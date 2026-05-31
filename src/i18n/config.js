export const LOCALES = ['zh-TW', 'en', 'it']

export const DEFAULT_LOCALE = 'zh-TW'

export function normalizeLocale(value) {
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE
}