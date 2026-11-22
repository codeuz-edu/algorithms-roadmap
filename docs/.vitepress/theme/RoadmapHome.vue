<script setup>
// The landing page (index.md). The copy comes from the page's `home` frontmatter; the topics and
// problems come from roadmap.json. A problem with a page links to it; the others link to LeetCode.
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import roadmap from '../roadmap.json'

const { frontmatter, theme } = useData()
const home = computed(() => frontmatter.value.home || {})
const written = computed(() => new Set(theme.value.written || []))
const levels = { Easy: 1, Medium: 2, Hard: 3 }

const topics = computed(() => roadmap.map(topic => ({
 ...topic,
 problems: topic.problems.map(problem => ({
  ...problem,
  level: levels[problem.difficulty] || 1,
  href: written.value.has(problem.slug) ? withBase(`/problems/${problem.slug}`) : `https://leetcode.com/problems/${problem.slug}/`,
  written: written.value.has(problem.slug)
 }))
})))
const total = computed(() => roadmap.reduce((sum, topic) => sum + topic.problems.length, 0))
const first = computed(() => topics.value.flatMap(topic => topic.problems).find(problem => problem.written))
const stats = computed(() => {
 const labels = home.value.stats || {}
 return [[total.value, labels.problems], [roadmap.length, labels.topics], [written.value.size, labels.written]]
})

// Problems the visitor has opened in this browser (saved by theme/index.js): a check mark in the
// lists. Read after mounting, so the server-rendered page and the first client render stay identical.
const opened = ref(new Set())
onMounted(() => {
 try { opened.value = new Set(JSON.parse(localStorage.getItem('algorithms-roadmap:opened') || '[]')) }
 catch { /* storage is blocked or holds something else: the page works without it */ }
})
</script>

<template>
 <div class="roadmap-home">
  <section class="home-hero">
   <div class="home-wrap hero-grid">
    <div class="hero-copy">
     <h1>{{ home.title }}</h1>
     <p class="hero-lead">{{ home.lead }}</p>
     <div class="home-actions">
      <a v-if="first" class="home-button primary" :href="first.href">{{ home.start }}</a>
      <a class="home-button" href="#roadmap">{{ home.browse }}</a>
     </div>
     <dl class="hero-stats">
      <div v-for="[value, label] in stats" :key="label"><dt>{{ value }}</dt><dd>{{ label }}</dd></div>
     </dl>
    </div>
    <div class="hero-demo">
     <p class="demo-label">{{ home.demoLabel }}</p>
     <ClientOnly>
      <PythonPlayground :code="home.code" />
      <template #fallback><pre class="demo-fallback">{{ home.code }}</pre></template>
     </ClientOnly>
    </div>
   </div>
  </section>

  <section id="roadmap" class="home-section is-tinted">
   <div class="home-wrap">
    <h2>{{ home.roadmap?.title }}</h2>
    <p class="section-lead">{{ home.roadmap?.lead }}</p>
    <div class="topic-grid">
     <div v-for="topic in topics" :key="topic.id" class="topic-card">
      <h3>
       <span><span class="topic-number">{{ topic.id }}</span>{{ topic.name }}</span>
       <span class="topic-count">{{ topic.problems.filter(problem => problem.written).length }} / {{ topic.problems.length }}</span>
      </h3>
      <ul>
       <li v-for="problem in topic.problems" :key="problem.slug" :class="{ 'is-pending': !problem.written }">
        <a v-if="problem.written" :href="problem.href">{{ problem.title }}<span v-if="opened.has(problem.slug)" class="visually-hidden"> ({{ home.roadmap?.opened }})</span></a>
        <a v-else :href="problem.href" target="_blank" rel="noreferrer" :title="home.roadmap?.pending">{{ problem.title }}<span class="visually-hidden"> ({{ home.roadmap?.pending }})</span></a>
        <svg v-if="opened.has(problem.slug)" class="problem-opened" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        <Difficulty :level="problem.level" />
       </li>
      </ul>
     </div>
    </div>
   </div>
  </section>

  <section class="home-section is-closing">
   <div class="home-wrap closing">
    <div>
     <h2>{{ home.closing?.title }}</h2>
     <p class="section-lead">{{ home.closing?.text }}</p>
    </div>
    <div class="home-actions">
     <a v-if="first" class="home-button primary" :href="first.href">{{ home.start }}</a>
     <a class="home-button" :href="withBase('/playground')">{{ home.closing?.playground }}</a>
    </div>
   </div>
  </section>
 </div>
</template>

<style scoped>
/* Spacing sits on an 8px grid (4px inside components). Three text sizes carry the copy:
   16px for the main paragraphs, 14px for lists and cards, 12px for small labels. */
.roadmap-home { --home-max: 1152px; color: var(--vp-c-text-1); }
.home-wrap { max-width: var(--home-max); margin: 0 auto; padding: 0 24px; }
h1, h2, h3, p, ol, ul, dl, dd { margin: 0; padding: 0; }
ul, ol { list-style: none; }
a { text-decoration: none; }

.home-hero { padding: 64px 0; background: linear-gradient(180deg, var(--vp-c-brand-soft), transparent); }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: start; }
h1 { font-size: 48px; line-height: 1.1; font-weight: 700; letter-spacing: -.035em; text-wrap: balance; }
.hero-lead { margin-top: 24px; font-size: 18px; line-height: 1.6; color: var(--vp-c-text-2); max-width: 34em; }
.home-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-copy .home-actions { margin-top: 32px; }
.home-button { display: inline-flex; align-items: center; min-height: 44px; padding: 8px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; line-height: 1.4; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); background: var(--vp-c-bg); transition: border-color .2s, background-color .2s; }
.home-button:hover { border-color: var(--vp-c-brand-1); }
.home-button.primary { border-color: transparent; background: var(--vp-c-brand-3); color: #fff; }
.home-button.primary:hover { background: #1d4ed8; }
.hero-stats { display: flex; flex-wrap: wrap; gap: 16px 32px; margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--vp-c-divider); }
.hero-stats dt { font-size: 24px; font-weight: 700; letter-spacing: -.02em; line-height: 1.2; font-variant-numeric: tabular-nums; }
.hero-stats dd { margin-top: 4px; font-size: 14px; line-height: 1.5; color: var(--vp-c-text-2); }
.demo-label { margin-bottom: 8px; font-size: 14px; line-height: 1.5; font-weight: 600; color: var(--vp-c-text-2); }
.hero-demo { min-width: 0; }
/* The editor keeps one size in the hero: the code, the result and the status line each reserve
   their space, so pressing Run fills it without moving the rest of the page. */
.hero-demo :deep(.python-editor) { margin: 0; }
.hero-demo :deep(.cm-scroller) { height: 260px; min-height: 0; }
.hero-demo :deep(.editor-output) { box-sizing: border-box; height: 110px; overflow: auto; }
.hero-demo :deep(.python-output) { max-height: none; overflow: visible; }
.hero-demo :deep(.editor-status), .hero-demo :deep(.editor-status:empty) { display: block; box-sizing: border-box; min-height: 30px; }
.demo-fallback { margin: 0; padding: 24px; min-height: 465px; box-sizing: border-box; border-radius: 8px; background: var(--vp-code-block-bg); font-family: var(--vp-font-family-mono); font-size: 14px; line-height: 1.7; overflow-x: auto; }

.home-section { padding: 64px 0; }
.home-section.is-tinted { background: var(--vp-c-bg-soft); }
h2 { font-size: 30px; line-height: 1.2; font-weight: 700; letter-spacing: -.025em; text-wrap: balance; }
.section-lead { margin-top: 16px; font-size: 16px; line-height: 1.6; color: var(--vp-c-text-2); max-width: 65ch; }
h3 { font-size: 16px; line-height: 1.4; font-weight: 600; }

.topic-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 40px; }
.topic-card { padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); }
.topic-card h3 { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--vp-c-divider); }
.topic-number { margin-right: 8px; color: var(--vp-c-brand-1); font-variant-numeric: tabular-nums; }
.topic-count { flex: none; font-size: 12px; font-weight: 400; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.topic-card ul { margin-top: 8px; }
.topic-card li { display: flex; align-items: baseline; gap: 8px; font-size: 14px; line-height: 1.5; }
.topic-card li a { flex: 1; padding: 6px 0; color: var(--vp-c-text-1); font-weight: 600; }
.topic-card li a:hover { color: var(--vp-c-brand-1); }
/* Problems without a page yet: lighter, and they open LeetCode. */
.topic-card li.is-pending a { color: var(--vp-c-text-2); font-weight: 400; }
.topic-card li.is-pending a:hover { color: var(--vp-c-brand-1); }
.topic-card li :deep(.difficulty) { flex: none; margin-left: 0; font-size: 12px; }
.problem-opened { flex: none; align-self: center; width: 16px; height: 16px; fill: none; stroke: var(--vp-c-green-1); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }

.home-section.is-closing { background: var(--vp-c-brand-3); }
.is-closing h2, .is-closing .section-lead { color: #fff; }
.is-closing .home-button { border-color: rgba(255, 255, 255, .7); background: transparent; color: #fff; }
.is-closing .home-button:hover { border-color: #fff; background: rgba(255, 255, 255, .12); }
.is-closing .home-button.primary { border-color: transparent; background: #fff; color: #1d4ed8; }
.is-closing .home-button.primary:hover { background: #e8efff; }
.is-closing a:focus-visible { outline-color: #fff; }
.closing { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px 48px; }
.closing > div:first-child { flex: 1 1 28em; }

a:focus-visible, button:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 2px; }

@media (max-width: 960px) {
 .hero-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; }
 .topic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 h1 { font-size: 40px; }
}
@media (max-width: 600px) {
 .home-wrap { padding: 0 16px; }
 .home-hero { padding: 40px 0; }
 .home-section { padding: 48px 0; }
 .topic-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
 .topic-card { padding: 16px; }
 h1 { font-size: 32px; }
 h2 { font-size: 24px; }
 /* Finger-sized rows for the problem links. */
 .topic-card li a { padding: 12px 0; }
}
@media (prefers-reduced-motion: reduce) {
 .home-button { transition: none; }
}
</style>
