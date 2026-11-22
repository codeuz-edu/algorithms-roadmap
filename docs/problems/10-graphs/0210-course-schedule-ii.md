---
title: Course Schedule II
description: "Course Schedule II in Python: topological sort of the prerequisite graph with Kahn's algorithm or depth-first search."
---

# Course Schedule II

<ProblemMeta />

## Problem

There are `numCourses` courses, numbered `0` to `numCourses - 1`. Each pair `[a, b]` in `prerequisites` means course `b` must be finished before course `a`. Return an order in which all the courses can be taken. If several orders work, return any of them. If no order works, return an empty list.

| Input | Output |
| --- | --- |
| `numCourses = 4`, `prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]` | `[0, 1, 2, 3]` or `[0, 2, 1, 3]` |
| `numCourses = 2`, `prerequisites = [[1, 0], [0, 1]]` | `[]` |

## Try it yourself

Fill in the method, then press **Check**. Because several orders can be correct, the tests do not print your order. `valid` checks that it contains every course once and respects every prerequisite, and prints `True` or `False`. The fourth test has no valid order, so it prints the returned list, which should be `[]`.

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        pass


def valid(order, numCourses, prerequisites):
    if sorted(order or []) != list(range(numCourses)):
        return False
    position = {course: i for i, course in enumerate(order)}
    return all(position[before] < position[course] for course, before in prerequisites)


tests = [
    (4, [[1, 0], [2, 0], [3, 1], [3, 2]]),
    (3, []),
    (6, [[0, 5], [1, 5], [3, 4], [2, 3], [5, 2]]),
]
for numCourses, prerequisites in tests:
    print(valid(Solution().findOrder(numCourses, prerequisites), numCourses, prerequisites))

print(Solution().findOrder(4, [[1, 0], [2, 1], [0, 2], [3, 0]]))
print(Solution().findOrder(1, []))
```

::: details Solution
**Idea.** This is [Course Schedule](/problems/course-schedule) where the order itself is the answer. Kahn's algorithm builds it directly, because it takes the courses one at a time.

For each course, count the prerequisites it is still waiting for. A course with a count of zero has nothing blocking it, so it can go next in the order. Once it is taken, every course that depends on it waits for one fewer, and any that reach zero join the queue. A course enters the order only after all of its prerequisites have, so every pair is respected.

If the prerequisites contain a cycle, the courses on it wait for each other and never reach zero. Then the order comes out shorter than `numCourses`, and the answer is an empty list.

```python
from collections import deque


class Solution:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        unlocks = [[] for _ in range(numCourses)]
        waiting = [0] * numCourses
        for course, before in prerequisites:
            unlocks[before].append(course)
            waiting[course] += 1

        queue = deque(course for course in range(numCourses) if waiting[course] == 0)
        order = []
        while queue:
            course = queue.popleft()
            order.append(course)
            for nxt in unlocks[course]:
                waiting[nxt] -= 1
                if waiting[nxt] == 0:
                    queue.append(nxt)

        return order if len(order) == numCourses else []


def valid(order, numCourses, prerequisites):
    if sorted(order or []) != list(range(numCourses)):
        return False
    position = {course: i for i, course in enumerate(order)}
    return all(position[before] < position[course] for course, before in prerequisites)


tests = [
    (4, [[1, 0], [2, 0], [3, 1], [3, 2]]),
    (3, []),
    (6, [[0, 5], [1, 5], [3, 4], [2, 3], [5, 2]]),
]
for numCourses, prerequisites in tests:
    print(valid(Solution().findOrder(numCourses, prerequisites), numCourses, prerequisites))

print(Solution().findOrder(4, [[1, 0], [2, 1], [0, 2], [3, 0]]))
print(Solution().findOrder(1, []))
```

**Time** `O(V + E)` for `V` courses and `E` prerequisite pairs, **space** `O(V + E)`.

**Depth-first search.** Before a course can be added to the order, everything it needs must already be there. So visit its prerequisites first, recursively, and append the course only after all of them have returned. The three states from Course Schedule detect a cycle: reaching a course that is still on the current path means no order exists.

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        needs = [[] for _ in range(numCourses)]
        for course, before in prerequisites:
            needs[course].append(before)

        state = [0] * numCourses
        order = []

        def visit(course):
            if state[course] == 1:
                return False
            if state[course] == 2:
                return True
            state[course] = 1
            for before in needs[course]:
                if not visit(before):
                    return False
            state[course] = 2
            order.append(course)
            return True

        for course in range(numCourses):
            if not visit(course):
                return []
        return order


def valid(order, numCourses, prerequisites):
    if sorted(order or []) != list(range(numCourses)):
        return False
    position = {course: i for i, course in enumerate(order)}
    return all(position[before] < position[course] for course, before in prerequisites)


tests = [
    (4, [[1, 0], [2, 0], [3, 1], [3, 2]]),
    (3, []),
    (6, [[0, 5], [1, 5], [3, 4], [2, 3], [5, 2]]),
]
for numCourses, prerequisites in tests:
    print(valid(Solution().findOrder(numCourses, prerequisites), numCourses, prerequisites))

print(Solution().findOrder(4, [[1, 0], [2, 1], [0, 2], [3, 0]]))
print(Solution().findOrder(1, []))
```

**Time** `O(V + E)`, **space** `O(V + E)`.
:::
