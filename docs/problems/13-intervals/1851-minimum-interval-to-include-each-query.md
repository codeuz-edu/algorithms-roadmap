---
title: Minimum Interval to Include Each Query
description: "Minimum Interval to Include Each Query in Python: answer the queries in sorted order while a min-heap keeps the smallest interval that still covers the current query."
---

# Minimum Interval to Include Each Query

<ProblemMeta />

## Problem

Each interval `[left, right]` covers the integers from `left` to `right` inclusive, and its size is `right - left + 1`. For every number in `queries`, find the size of the smallest interval that covers it, or `-1` if no interval does. Return the answers in the same order as the queries.

| Input | Output |
| --- | --- |
| `intervals = [[1, 8], [2, 5], [4, 4], [10, 12]]`, `queries = [4, 1, 9, 5]` | `[1, 8, -1, 4]` |

The query `4` is inside three intervals, and the smallest is `[4, 4]` with size 1. The query `9` is inside none.

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:
        pass


print(Solution().minInterval([[1, 8], [2, 5], [4, 4], [10, 12]], [4, 1, 9, 5, 11, 2]))
print(Solution().minInterval([[1, 10], [1, 2]], [2, 3, 10, 11]))
print(Solution().minInterval([[1, 3], [2, 4]], [3, 3, 0]))
print(Solution().minInterval([[5, 5]], [5, 4, 6]))
```

::: details Solution
**Idea.** Checking every interval for every query is too slow when both lists are large. The queries are all known in advance, so they can be answered in any order as long as the answers are put back in the original order. Answer them from smallest to largest.

An interval can cover a query only if it starts at or before the query. Sort the intervals by start. As the queries grow, more and more intervals qualify and none ever stops qualifying on that side, so one index moving through the sorted intervals adds each of them exactly once.

The intervals added so far go into a min-heap ordered by size, stored as `(size, right)`. The top is the smallest candidate, but it may end before the current query. If so, pop it: the remaining queries are even larger, so it can never be useful again. Keep popping until the top reaches the query. That top started early enough, ends late enough and is the smallest such interval, so its size is the answer. An empty heap means `-1`.

Expired intervals deeper in the heap are left alone. They do no harm until they reach the top, and then they are popped. Answers are stored in a dictionary keyed by the query value, which also handles repeated queries.

```python
import heapq


class Solution:
    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:
        intervals = sorted(intervals)
        heap = []
        answers = {}
        i = 0

        for query in sorted(queries):
            while i < len(intervals) and intervals[i][0] <= query:
                left, right = intervals[i]
                heapq.heappush(heap, (right - left + 1, right))
                i += 1
            while heap and heap[0][1] < query:
                heapq.heappop(heap)
            answers[query] = heap[0][0] if heap else -1

        return [answers[query] for query in queries]


print(Solution().minInterval([[1, 8], [2, 5], [4, 4], [10, 12]], [4, 1, 9, 5, 11, 2]))
print(Solution().minInterval([[1, 10], [1, 2]], [2, 3, 10, 11]))
print(Solution().minInterval([[1, 3], [2, 4]], [3, 3, 0]))
print(Solution().minInterval([[5, 5]], [5, 4, 6]))
```

**Time** `O(n log n + q log q)` for `n` intervals and `q` queries, **space** `O(n + q)`.

**Brute force.** For each query, scan all the intervals and keep the smallest one that covers it. It is the definition written as code, and a good reference to test the faster version against.

```python
class Solution:
    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:
        answers = []
        for query in queries:
            best = -1
            for left, right in intervals:
                size = right - left + 1
                if left <= query <= right and (best == -1 or size < best):
                    best = size
            answers.append(best)
        return answers


print(Solution().minInterval([[1, 8], [2, 5], [4, 4], [10, 12]], [4, 1, 9, 5, 11, 2]))
print(Solution().minInterval([[1, 10], [1, 2]], [2, 3, 10, 11]))
print(Solution().minInterval([[1, 3], [2, 4]], [3, 3, 0]))
print(Solution().minInterval([[5, 5]], [5, 4, 6]))
```

**Time** `O(n · q)`, **space** `O(1)` besides the output.
:::
