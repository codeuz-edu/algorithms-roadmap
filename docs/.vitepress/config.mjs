import { defineConfig } from 'vitepress'
import { createLogger } from 'vite'
import { readFileSync, existsSync } from 'node:fs'
import catppuccinLatte from '@shikijs/themes/catppuccin-latte'
import catppuccinMocha from '@shikijs/themes/catppuccin-mocha'
import { seo } from './seo.mjs'

// Catppuccin is drawn for its own background, not VitePress's, so several token colors land
// under the WCAG AA 4.5:1 contrast ratio on our code background (Latte comments reach only
// 2.4:1). Scale each failing color's luminance until it passes; multiplying the linear RGB
// channels keeps the hue, so the palette still looks like Catppuccin.
const channels = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
 .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b
const toHex = rgb => '#' + rgb.map(c => {
 const srgb = c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055
 return Math.round(Math.min(1, Math.max(0, srgb)) * 255).toString(16).padStart(2, '0')
}).join('')
const ratio = (a, b) => {
 const [hi, lo] = [luminance(channels(a)), luminance(channels(b))].sort((x, y) => y - x)
 return (hi + 0.05) / (lo + 0.05)
}
const readable = (color, background, min = 4.6) => {
 if (ratio(color, background) >= min) return color
 const backgroundLuminance = luminance(channels(background))
 const target = backgroundLuminance > 0.5
  ? (backgroundLuminance + 0.05) / min - 0.05
  : min * (backgroundLuminance + 0.05) - 0.05
 const rgb = channels(color)
 const scaled = toHex(rgb.map(c => c * (target / luminance(rgb))))
 if (ratio(scaled, background) >= min - 0.1) return scaled
 // Scaling up can clip a channel; mix toward white instead.
 for (let t = 0.02; t <= 1; t += 0.02) {
  const mixed = toHex(rgb.map(c => c + (1 - c) * t))
  if (ratio(mixed, background) >= min) return mixed
 }
 return color
}
const contrastSafe = (theme, background) => ({
 ...theme,
 tokenColors: theme.tokenColors.map(token => {
  const foreground = token.settings?.foreground
  if (!/^#[0-9a-f]{6}$/i.test(foreground || '')) return token
  return { ...token, settings: { ...token.settings, foreground: readable(foreground, background) } }
 })
})
// --vp-code-block-bg in each mode.
const codeThemes = {
 light: contrastSafe(catppuccinLatte, '#f6f6f7'),
 dark: contrastSafe(catppuccinMocha, '#161618')
}

// roadmap.json lists every problem of the roadmap by topic. A problem has a page when its file
// exists: problems/<topic folder>/<number>-<slug>.md, for example
// problems/01-arrays-and-hashing/0001-two-sum.md. `rewrites` keeps the URL short (/problems/two-sum).
const roadmap = JSON.parse(readFileSync(new URL('./roadmap.json', import.meta.url)))
const topicFolder = topic => `${topic.id}-${topic.name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
const fileOf = (topic, problem) => `${topicFolder(topic)}/${String(problem.number || 0).padStart(4, '0')}-${problem.slug}.md`
const isWritten = (topic, problem) => Boolean(problem.number) && existsSync(new URL(`../problems/${fileOf(topic, problem)}`, import.meta.url))

const written = roadmap.flatMap(topic => topic.problems.filter(problem => isWritten(topic, problem)).map(problem => problem.slug))
const rewrites = Object.fromEntries(roadmap.flatMap(topic => topic.problems
 .filter(problem => isWritten(topic, problem))
 .map(problem => [`problems/${fileOf(topic, problem)}`, `problems/${problem.slug}.md`])))

// The sidebar lists the topics that have at least one written problem.
const sidebar = [
 { text: 'Start Here', items: [{ text: 'Roadmap', link: '/' }, { text: 'Playground', link: '/playground' }] },
 { text: 'Problems', items: roadmap.map(topic => ({
  text: topic.name, collapsed: false,
  items: topic.problems.filter(problem => isWritten(topic, problem)).map(problem => ({ text: problem.title, link: `/problems/${problem.slug}` }))
 })).filter(topic => topic.items.length) }
]

const base = process.env.SITE_BASE || '/'

// Head tags for search engines, link previews and AI tools (seo.mjs).
const site = seo({
 url: 'https://codeuz-edu.github.io/algorithms-roadmap/',
 name: 'Algorithms Roadmap',
 image: { path: 'og-image.png', width: 1200, height: 600, alt: 'codeuz: Algorithms Roadmap' },
 languages: { en: '' },
 defaultLanguage: 'en',
 homes: { 'index.md': 'Algorithms Roadmap' }
})

// VitePress 1.x is written for Vite 5; this project runs it on Vite 6, which prints a warning
// about one line in VitePress's own search box ("Failed to resolve /@localSearchIndex") every time
// the dev server starts. Search works either way, so that one message is dropped. Every other
// warning still gets through.
const logger = createLogger()
const warn = logger.warn
logger.warn = (message, options) => { if (!String(message).includes('/@localSearchIndex')) warn(message, options) }

export default defineConfig({
 vite: { customLogger: logger },
 title: 'Algorithms Roadmap',
 description: 'Coding interview problems by topic, with explanations and Python solutions you can run in the browser.',
 lang: 'en',
 base, outDir: '../dist',
 sitemap: { hostname: 'https://codeuz-edu.github.io/algorithms-roadmap/', transformItems: site.sitemapItems },
 transformHead: site.transformHead,
 lastUpdated: true,
 rewrites,
 // Catppuccin Latte/Mocha, contrast-corrected above; the CodeMirror editor matches (--cm-* in theme/style.css).
 markdown: { theme: codeThemes },
 head: [
  ['link', { rel: 'icon', href: `${base}favicon.svg?v=2` }],
  ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@800&display=swap' }],
  ...site.head
 ],
 themeConfig: {
  // The site carries the name of the author's YouTube channel, codeuz, drawn as a logo (theme/style.css),
  // with the course name under it.
  siteTitle: '<span class="site-brand">code<span class="site-tld">uz</span><span class="site-cursor"></span></span><span class="site-course">Algorithms Roadmap</span>',
  nav: [{ text: 'Roadmap', link: '/' }, { text: 'Playground', link: '/playground' }, { text: 'Courses', items: [{ text: 'Python Foundations', link: 'https://codeuz-edu.github.io/python-tutorials/en/' }, { text: 'Advanced Python', link: 'https://codeuz-edu.github.io/python-advanced/en/' }, { text: 'Data Structures & Algorithms', link: 'https://codeuz-edu.github.io/data-structures-and-algorithms/' }, { text: 'Algorithms Roadmap', link: '/' }] }],
  sidebar,
  // Slugs of the problems that have a page; theme/RoadmapHome.vue and theme/ProblemMeta.vue read it.
  written,
  outline: { label: 'On this page', level: [2, 3] },
  docFooter: { prev: 'Previous problem', next: 'Next problem' },
  editLink: { pattern: 'https://github.com/codeuz-edu/algorithms-roadmap/edit/main/docs/:path', text: 'Suggest a change to this page' },
  lastUpdatedText: 'Last updated',
  socialLinks: [{ icon: 'youtube', link: 'https://youtube.com/codeuz', ariaLabel: 'YouTube' }, { icon: 'github', link: 'https://github.com/codeuz-edu/algorithms-roadmap', ariaLabel: 'GitHub' }],
  search: { provider: 'local' }
 }
})
