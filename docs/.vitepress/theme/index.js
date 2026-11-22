import { h, watch } from 'vue'
import { inBrowser, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Playground from './Playground.vue'
import Difficulty from './Difficulty.vue'
import Mark from './Mark.vue'
import CodeEnhancer from './CodeEnhancer.vue'
import RoadmapHome from './RoadmapHome.vue'
import ProblemMeta from './ProblemMeta.vue'
import './style.css'

export default {
 extends: DefaultTheme,
 // CodeEnhancer adds Run buttons to code blocks and a Check editor to each problem.
 Layout: () => h(DefaultTheme.Layout, null, { 'doc-after': () => h(CodeEnhancer) }),
 // Remember every problem opened so far, so the roadmap can show progress.
 // This stays in the visitor's browser.
 setup() {
  const route = useRoute()
  if (!inBrowser) return
  watch(() => route.path, path => {
   const problem = path.match(/\/problems\/([a-z0-9-]+)/)
   if (!problem) return
   try {
    const opened = new Set(JSON.parse(localStorage.getItem('algorithms-roadmap:opened') || '[]'))
    localStorage.setItem('algorithms-roadmap:opened', JSON.stringify([...opened.add(problem[1])]))
   } catch { /* storage is blocked */ }
  }, { immediate: true })
 },
 enhanceApp({ app }) {
  app.component('PythonPlayground', Playground)
  app.component('Difficulty', Difficulty)
  app.component('RoadmapHome', RoadmapHome)
  app.component('ProblemMeta', ProblemMeta)
  app.component('Yes', { render: () => h(Mark, { ok: true }) })
  app.component('No', { render: () => h(Mark, { ok: false }) })
 }
}
