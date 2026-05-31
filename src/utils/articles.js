import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import { DEFAULT_LOCALE, LOCALES, normalizeLocale } from '../i18n/config'
import { withBase } from './assets'

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const files = import.meta.glob('../content/articles/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function getArticleMeta(path) {
  const segments = path.split('/').filter(Boolean)
  const fileName = segments.at(-1)?.replace(/\.md$/, '') || ''
  const maybeLocale = segments.at(-2)

  return {
    slug: fileName,
    locale: LOCALES.includes(maybeLocale) ? maybeLocale : DEFAULT_LOCALE,
  }
}

function parseScalar(value) {
  const trimmed = value.trim()

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return trimmed.replace(/^['"]|['"]$/g, '')
}

function normalizeArticleLine(value) {
  return value === 'story' ? 'story' : 'lore'
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw }
  }

  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return { data: {}, content: raw }
  }

  const [, frontmatterBlock, content] = match
  const data = {}

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)

    if (!key) {
      continue
    }

    data[key] = parseScalar(value)
  }

  return { data, content }
}

function resolveArticleVariants(locale) {
  const normalizedLocale = normalizeLocale(locale)
  const grouped = new Map()

  for (const [path, raw] of Object.entries(files)) {
    const { slug, locale: articleLocale } = getArticleMeta(path)
    const variants = grouped.get(slug) || {}
    const { data, content } = parseFrontmatter(raw)

    variants[articleLocale] = {
      slug,
      ...data,
      line: normalizeArticleLine(data.line),
      cover: withBase(data.cover),
      content,
    }

    grouped.set(slug, variants)
  }

  return [...grouped.values()].map((variants) => variants[normalizedLocale] || variants[DEFAULT_LOCALE]).filter(Boolean)
}

export function getArticles(locale = DEFAULT_LOCALE, options = {}) {
  return resolveArticleVariants(locale)
    .filter((article) => !options.line || article.line === options.line)
    .filter((article) => article.status !== 'draft')
    .sort((left, right) => new Date(right.date) - new Date(left.date))
}

export function getArticleBySlug(slug, locale = DEFAULT_LOCALE, options = {}) {
  return getArticles(locale, options).find((article) => article.slug === slug)
}

export function getArticlesByTag(tag, locale = DEFAULT_LOCALE, options = {}) {
  return getArticles(locale, options).filter((article) => article.tags?.includes(tag))
}

export function getArticleTags(locale = DEFAULT_LOCALE, options = {}) {
  return [...new Set(getArticles(locale, options).flatMap((article) => article.tags || []))]
}

export function renderArticle(content) {
  return DOMPurify.sanitize(markdown.render(content || ''))
}