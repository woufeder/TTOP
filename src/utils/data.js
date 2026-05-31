import { DEFAULT_LOCALE, normalizeLocale } from '../i18n/config'
import charactersZh from '../content/data/characters.json'
import charactersEn from '../content/data/characters.en.json'
import charactersIt from '../content/data/characters.it.json'
import regionsZh from '../content/data/regions.json'
import regionsEn from '../content/data/regions.en.json'
import regionsIt from '../content/data/regions.it.json'
import timelineZh from '../content/data/timeline.json'
import timelineEn from '../content/data/timeline.en.json'
import timelineIt from '../content/data/timeline.it.json'
import recordsZh from '../content/data/records.json'
import recordsEn from '../content/data/records.en.json'
import recordsIt from '../content/data/records.it.json'
import sectionsZh from '../content/data/sections.json'
import sectionsEn from '../content/data/sections.en.json'
import sectionsIt from '../content/data/sections.it.json'

const registry = {
  characters: {
    'zh-TW': charactersZh,
    en: charactersEn,
    it: charactersIt,
  },
  regions: {
    'zh-TW': regionsZh,
    en: regionsEn,
    it: regionsIt,
  },
  timeline: {
    'zh-TW': timelineZh,
    en: timelineEn,
    it: timelineIt,
  },
  records: {
    'zh-TW': recordsZh,
    en: recordsEn,
    it: recordsIt,
  },
  sections: {
    'zh-TW': sectionsZh,
    en: sectionsEn,
    it: sectionsIt,
  },
}

export function getContent(key, locale) {
  const normalizedLocale = normalizeLocale(locale)
  const dataset = registry[key]

  if (!dataset) {
    return []
  }

  return dataset[normalizedLocale] || dataset[DEFAULT_LOCALE] || []
}