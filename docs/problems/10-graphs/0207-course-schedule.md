---
title: Course Schedule
description: "Course Schedule in Python: detect a cycle in the prerequisite graph with three-state depth-first search or with Kahn's algorithm."
---

# Course Schedule

<ProblemMeta />

## Problem

There are `numCourses` courses, numbered `0` to `numCourses - 1`. Each pair `[a, b]` in `prerequisites` means course `b` must be finished before course `a` can be taken. Return `True` if all the courses can be finished in some order, and `False` otherwise.

| Input | Output | Why |
| --- | --- | --- |
| `numCourses = 3`, `prerequisites = [[1, 0], [2, 1]]` | `True` | take 0, then 1, then 2 |
| `numCourses = 2`, `prerequisites = [[1, 0], [0, 1]]` | `False` | each course waits for the other |

## Try it yourself

Fill in the method, then press **Check**.

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        pass


print(Solution().canFinish(3, [[1, 0], [2, 1]]))
print(Solution().canFinish(2, [[1, 0], [0, 1]]))
print(Solution().canFinish(5, [[1, 0], [2, 0], [3, 1], [3, 2]]))
print(Solution().canFinish(5, [[0, 1], [2, 3], [3, 4], [4, 2]]))
print(Solution().canFinish(1, []))
```

::: details Solution
**Idea.** Treat each course as a node with an arrow to every course it needs first. The courses can all be finished unless some course ends up needing itself through a chain of prerequisites. In graph terms, the answer is `True` exactly when the graph has no cycle.

Depth-first search finds a cycle if it remembers which nodes are on the path it is currently walking. Give each course one of three states:

- `0`: not visited yet.
- `1`: on the current path. The search entered it and has not finished its prerequisites.
- `2`: finished. Everything it needs has been checked and no cycle was found.

Meeting a course in state `1` means the path has come back to itself, which is a cycle. Meeting a course in state `2` is harmless, and returning at once keeps the search linear. Two states are not enough: with only "visited" and "not visited", two courses sharing a prerequisite would be reported as a cycle.

The outer loop starts a search from every course, because the graph may be split into parts that are not connected.

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        needs = [[] for _ in range(numCourses)]
        for course, before in prerequisites:
            needs[course].append(before)

        state = [0] * numCourses

        def has_cycle(course):
            if state[course] == 1:
                return True
            if state[course] == 2:
                return False
            state[course] = 1
            for before in needs[course]:
                if has_cycle(before):
                    return True
            state[course] = 2
            return False

        return not any(has_cycle(course) for course in range(numCourses))


print(Solution().canFinish(3, [[1, 0], [2, 1]]))
print(Solution().canFinish(2, [[1, 0], [0, 1]]))
print(Solution().canFinish(5, [[1, 0], [2, 0], [3, 1], [3, 2]]))
print(Solution().canFinish(5, [[0, 1], [2, 3], [3, 4], [4, 2]]))
print(Solution().canFinish(1, []))
```

**Time** `O(V + E)` for `V` courses and `E` prerequisite pairs, **space** `O(V + E)`.

**Kahn's algorithm.** Simulate actually taking the courses. Count how many prerequisites each course is still waiting for. Any course with a count of zero can be taken now. Taking it lowers the count of every course that depends on it, and those that drop to zero become available. If every course gets taken, the schedule works. Courses on a cycle never reach zero, so if some are left over, the answer is `False`. This version uses no recursion.

```python
from collections import deque


class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        unlocks = [[] for _ in range(numCourses)]
        waiting = [0] * numCourses
        for course, before in prerequisites:
            unlocks[before].append(course)
            waiting[course] += 1

        queue = deque(course for course in range(numCourses) if waiting[course] == 0)
        taken = 0
        while queue:
            course = queue.popleft()
            taken += 1
            for nxt in unlocks[course]:
                waiting[nxt] -= 1
                if waiting[nxt] == 0:
                    queue.append(nxt)

        return taken == numCourses


print(Solution().canFinish(3, [[1, 0], [2, 1]]))
print(Solution().canFinish(2, [[1, 0], [0, 1]]))
print(Solution().canFinish(5, [[1, 0], [2, 0], [3, 1], [3, 2]]))
print(Solution().canFinish(5, [[0, 1], [2, 3], [3, 4], [4, 2]]))
print(Solution().canFinish(1, []))
```

**Time** `O(V + E)`, **space** `O(V + E)`.
:::
