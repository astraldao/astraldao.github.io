import { defineConfig } from 'vite'

const repoName = process.env.GITHUB_PAGES_REPO || 'REPO_NAME'
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProduction ? `/${repoName}/` : '/',
  esbuild: {
    jsx: 'automatic',
  },
})
