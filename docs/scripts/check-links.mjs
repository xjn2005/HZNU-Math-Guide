import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(scriptDir, '..')

const ignoredDirs = new Set(['.vitepress', 'node_modules', 'public'])
const markdownExtensions = new Set(['.md'])

const errors = []
const headingIndex = new Map()

function walkMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...walkMarkdownFiles(fullPath))
      }
      continue
    }

    if (markdownExtensions.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

function stripQueryAndHash(target) {
  return target.replace(/[?#].*$/, '')
}

function extractHash(target) {
  const hashIndex = target.indexOf('#')
  return hashIndex >= 0 ? target.slice(hashIndex + 1).trim() : ''
}

function isExternalTarget(target) {
  return /^(?:[a-z]+:)?\/\//i.test(target) || /^(mailto|tel|data):/i.test(target)
}

function decodePathname(target) {
  try {
    return decodeURIComponent(target)
  } catch {
    return target
  }
}

function fileExists(candidatePath) {
  try {
    return statSync(candidatePath).isFile()
  } catch {
    return false
  }
}

function createSlugger() {
  const seen = new Map()

  return text => {
    const base = text
      .trim()
      .toLowerCase()
      .replace(/[`~!@#$%^&*()+=<[{\]}\\|;:'",.<>/?]+/g, '')
      .replace(/\s+/g, '-')

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)

    return count === 0 ? base : `${base}-${count}`
  }
}

function collectHeadingIds(filePath, content) {
  const slugify = createSlugger()
  const headingIds = new Set()
  const lines = content.split(/\r?\n/)

  let inFence = false

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence
      continue
    }

    if (inFence) {
      continue
    }

    const explicitIdMatch = line.match(/\{#([^}]+)\}\s*$/)
    if (explicitIdMatch) {
      headingIds.add(explicitIdMatch[1].trim())
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (!headingMatch) {
      continue
    }

    const rawHeading = headingMatch[2]
      .replace(/\{#([^}]+)\}\s*$/, '')
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .trim()

    if (!rawHeading) {
      continue
    }

    headingIds.add(slugify(rawHeading))
  }

  headingIndex.set(filePath, headingIds)
}

function resolveDocRouteTarget(targetPath) {
  const normalized = targetPath.replace(/\\/g, '/')

  if (normalized === '' || normalized === '/') {
    return [path.join(docsRoot, 'index.md')]
  }

  const relativePath = normalized.replace(/^\/+/, '')
  return [
    path.join(docsRoot, `${relativePath}.md`),
    path.join(docsRoot, relativePath, 'index.md'),
    path.join(docsRoot, relativePath)
  ]
}

function resolveFileTarget(sourceFile, targetPath) {
  const normalized = targetPath.replace(/\\/g, '/')
  const sourceDir = path.dirname(sourceFile)

  if (normalized.startsWith('/')) {
    return resolveDocRouteTarget(normalized)
  }

  if (normalized.startsWith('public/')) {
    return [path.join(docsRoot, normalized)]
  }

  return [path.resolve(sourceDir, normalized)]
}

function ensureHeadingIndex(filePath) {
  if (headingIndex.has(filePath)) {
    return
  }

  const content = readFileSync(filePath, 'utf8')
  collectHeadingIds(filePath, content)
}

function validateAnchor(sourceFile, targetFile, rawTarget) {
  const rawAnchor = extractHash(rawTarget)

  if (!rawAnchor) {
    return
  }

  const decodedAnchor = decodePathname(rawAnchor)
  ensureHeadingIndex(targetFile)

  if (headingIndex.get(targetFile)?.has(decodedAnchor)) {
    return
  }

  const relativeSource = path.relative(docsRoot, sourceFile).replace(/\\/g, '/')
  const relativeTarget = path.relative(docsRoot, targetFile).replace(/\\/g, '/')
  errors.push(
    `${relativeSource}: unresolved anchor "#${rawAnchor}" in "${relativeTarget}"`
  )
}

function validateTarget(sourceFile, rawTarget) {
  const target = rawTarget.trim()

  if (!target) {
    const relativeSource = path.relative(docsRoot, sourceFile).replace(/\\/g, '/')
    errors.push(`${relativeSource}: empty link target`)
    return
  }

  if (target === '#') {
    const relativeSource = path.relative(docsRoot, sourceFile).replace(/\\/g, '/')
    errors.push(`${relativeSource}: placeholder "#" link target`)
    return
  }

  if (isExternalTarget(target)) {
    return
  }

  if (target.startsWith('#')) {
    validateAnchor(sourceFile, sourceFile, target)
    return
  }

  const decodedTarget = decodePathname(stripQueryAndHash(target).trim())
  const candidates = resolveFileTarget(sourceFile, decodedTarget)
  const matchedFile = candidates.find(fileExists)

  if (!matchedFile) {
    const relativeSource = path.relative(docsRoot, sourceFile).replace(/\\/g, '/')
    const joinedCandidates = candidates
      .map(candidate => path.relative(docsRoot, candidate).replace(/\\/g, '/'))
      .join(', ')

    errors.push(
      `${relativeSource}: unresolved link target "${rawTarget}" (checked: ${joinedCandidates})`
    )
    return
  }

  if (path.extname(matchedFile) === '.md' && target.includes('#')) {
    validateAnchor(sourceFile, matchedFile, target)
  }
}

function collectMarkdownLinks(content) {
  const targets = []
  const markdownLinkPattern = /!?\[[^\]]*]\(([^)]*)\)/g
  const htmlAttributePattern = /\b(?:src|href)=["']([^"']*)["']/g

  for (const match of content.matchAll(markdownLinkPattern)) {
    const target = match[1].replace(/\s+"[^"]*"$/, '')
    targets.push(target)
  }

  for (const match of content.matchAll(htmlAttributePattern)) {
    targets.push(match[1])
  }

  return targets
}

const markdownFiles = walkMarkdownFiles(docsRoot)

for (const filePath of markdownFiles) {
  const content = readFileSync(filePath, 'utf8')
  collectHeadingIds(filePath, content)
}

for (const filePath of markdownFiles) {
  const content = readFileSync(filePath, 'utf8')
  const targets = collectMarkdownLinks(content)

  for (const target of targets) {
    validateTarget(filePath, target)
  }
}

if (errors.length > 0) {
  console.error('Link check failed:\n')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(`Checked ${markdownFiles.length} Markdown files with no broken internal links or anchors.`)
