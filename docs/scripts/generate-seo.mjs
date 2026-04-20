import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://xjn2005.github.io/HZNU-Math-Guide'
const docsRoot = path.resolve('..', 'docs')
const publicRoot = path.join(docsRoot, 'public')

const ignoredDirs = new Set(['.vitepress', 'node_modules', 'public'])

function walkMarkdownFiles(dir) {
  const entries = readdirSync(dir)
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      if (!ignoredDirs.has(entry)) {
        files.push(...walkMarkdownFiles(fullPath))
      }
      continue
    }

    if (entry.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function toRoute(filePath) {
  const relative = path.relative(docsRoot, filePath).replace(/\\/g, '/')
  if (relative === 'index.md') {
    return ''
  }
  return `/${relative.replace(/\.md$/, '')}`
}

function encodeRoute(route) {
  if (!route) {
    return SITE_URL
  }

  const encoded = route
    .split('/')
    .map(segment => (segment ? encodeURIComponent(segment) : ''))
    .join('/')

  return `${SITE_URL}${encoded}`
}

function getLastmod(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const match = content.match(/^lastUpdated:\s*([0-9-]+)$/m)
  if (match) {
    return match[1]
  }

  const stats = statSync(filePath)
  return stats.mtime.toISOString().slice(0, 10)
}

const markdownFiles = walkMarkdownFiles(docsRoot)
const pages = markdownFiles
  .map(filePath => ({
    url: encodeRoute(toRoute(filePath)),
    lastmod: getLastmod(filePath)
  }))
  .sort((a, b) => a.url.localeCompare(b.url))

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    page => `  <url><loc>${page.url}</loc><lastmod>${page.lastmod}</lastmod></url>`
  ),
  '</urlset>',
  ''
].join('\n')

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  ''
].join('\n')

writeFileSync(path.join(publicRoot, 'sitemap.xml'), sitemap)
writeFileSync(path.join(publicRoot, 'robots.txt'), robots)

console.log(`Generated sitemap for ${pages.length} pages.`)
