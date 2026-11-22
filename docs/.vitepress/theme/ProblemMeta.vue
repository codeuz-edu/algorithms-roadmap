<script setup>
// The line under a problem's title: its LeetCode number and link, its topic and its difficulty.
// Everything comes from roadmap.json, found by the page's slug.
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import roadmap from '../roadmap.json'

const route = useRoute()
const found = computed(() => {
 const slug = route.path.match(/\/problems\/([a-z0-9-]+)/)?.[1]
 for (const topic of roadmap) {
  const problem = topic.problems.find(item => item.slug === slug)
  if (problem) return { topic, problem }
 }
 return null
})
</script>

<template>
 <p v-if="found" class="problem-meta">
  <a :href="`https://leetcode.com/problems/${found.problem.slug}/`" target="_blank" rel="noreferrer">LeetCode {{ found.problem.number }}</a>
  <span aria-hidden="true">·</span>
  <span>{{ found.topic.name }}</span>
  <span aria-hidden="true">·</span>
  <span :class="['problem-level', `is-${found.problem.difficulty.toLowerCase()}`]">{{ found.problem.difficulty }}</span>
 </p>
</template>
