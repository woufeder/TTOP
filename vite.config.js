import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoName =
  process.env.GITHUB_PAGES_REPO || path.basename(fileURLToPath(new URL('.', import.meta.url)))
const isUserPage = process.env.GITHUB_PAGES_USER === 'true'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base:
    process.env.NODE_ENV === 'production'
      ? isUserPage
        ? '/'
        : `/${repoName}/`
      : '/',
})
