import DOMPurify from 'dompurify'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

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

function getSlug(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

export function getArticles() {
  return Object.entries(files)
    .map(([path, raw]) => {
      const { data, content } = matter(raw)

      return {
        slug: getSlug(path),
        ...data,
        content,
      }
    })
    .filter((article) => article.status !== 'draft')
    .sort((left, right) => new Date(right.date) - new Date(left.date))
}

export function getArticleBySlug(slug) {
  return getArticles().find((article) => article.slug === slug)
}

export function getArticlesByTag(tag) {
  return getArticles().filter((article) => article.tags?.includes(tag))
}

export function getArticleTags() {
  return [...new Set(getArticles().flatMap((article) => article.tags || []))]
}

export function renderArticle(content) {
  return DOMPurify.sanitize(markdown.render(content || ''))
}