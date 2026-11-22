---
layout: page
sidebar: false
title: Algorithms Roadmap
description: "Coding interview problems by topic, with explanations and Python solutions you can run in the browser."
home:
  title: Interview problems, one topic at a time
  lead: The NeetCode roadmap, worked through in Python. Each problem has a short statement, an editor to try it in, and a solution with its time and space cost.
  start: Start with the first problem
  browse: See the roadmap
  demoLabel: Every solution runs on the page. Change the code and press Run.
  code: |
    def two_sum(nums, target):
        seen = {}
        for i, num in enumerate(nums):
            if target - num in seen:
                return [seen[target - num], i]
            seen[num] = i

    print(two_sum([2, 7, 11, 15], 9))
    print(two_sum([3, 2, 4], 6))
  stats:
    problems: problems
    topics: topics
    written: with a solution
  roadmap:
    title: The roadmap
    lead: Sixteen topics, in the order they build on each other. Inside a topic the problems go from easier to harder. A check mark shows the ones you have opened.
    opened: opened
    pending: not written yet, opens LeetCode
  closing:
    title: Try a problem before you read its solution
    text: Each page opens with an editor and a Check button. The solution stays folded until you ask for it.
    playground: Open the playground
---

<RoadmapHome />
