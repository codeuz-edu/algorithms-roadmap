---
title: Non-overlapping Intervals
description: "Non-overlapping Intervals in Python: sort by end and greedily keep the interval that finishes first, which leaves the most room for the rest."
---

# Non-overlapping Intervals

<ProblemMeta />

## Problem

You are given a list of `[start, end]` intervals. Return the smallest number of intervals that must be removed so that no two of the remaining ones overlap. Intervals that only touch at an endpoint, such as `[1, 2]` and `[2, 3]`, do not overlap.

| Input | Output | Why |
| --- | --- | --- |
| `[[1, 4], [2, 3], [3, 5], [6, 7]]` | `1` | remove `[1, 4]` |
| `[[1, 2], [1, 2], [1, 2]]` | `2` | only one copy can stay |
| `[[1, 2], [2, 3]]` | `0` | touching is allowed |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        pass


print(Solution().eraseOverlapIntervals([[1, 4], [2, 3], [3, 5], [6, 7]]))
print(Solution().eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
print(Solution().eraseOverlapIntervals([[1, 2], [2, 3]]))
print(Solution().eraseOverlapIntervals([[1, 10], [2, 3], [4, 5], [6, 7]]))
print(Solution().eraseOverlapIntervals([[0, 5], [1, 6], [2, 7]]))
print(Solution().eraseOverlapIntervals([[-3, -1]]))
```

::: details Solution
**Idea.** Removing as few intervals as possible is the same as keeping as many as possible. So the question becomes: what is the largest set of intervals that do not overlap?

Among all the intervals, look at the one that ends first. Some best answer keeps it. Take any best answer and look at its earliest-ending interval: swapping that one for the overall earliest-ending interval cannot create an overlap, because the replacement ends no later and so leaves at least as much room for everything after it. The count stays the same, so keeping the earliest finisher is always safe.

Apply that repeatedly. Sort by end. Walk through the intervals and keep each one that starts at or after the end of the last interval kept. Everything else overlaps a kept interval and is removed.

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        kept = 0
        last_end = float("-inf")
        for start, end in sorted(intervals, key=lambda interval: interval[1]):
            if start >= last_end:
                kept += 1
                last_end = end
        return len(intervals) - kept


print(Solution().eraseOverlapIntervals([[1, 4], [2, 3], [3, 5], [6, 7]]))
print(Solution().eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
print(Solution().eraseOverlapIntervals([[1, 2], [2, 3]]))
print(Solution().eraseOverlapIntervals([[1, 10], [2, 3], [4, 5], [6, 7]]))
print(Solution().eraseOverlapIntervals([[0, 5], [1, 6], [2, 7]]))
print(Solution().eraseOverlapIntervals([[-3, -1]]))
```

**Time** `O(n log n)`, **space** `O(n)` for the sorted copy.

**Sorted by start.** The same greedy choice can be made in start order, counting removals directly. When the next interval overlaps the last one kept, one of the two has to go. Remove the one that ends later, because the one that ends earlier blocks less of what is still to come. In code that means keeping the smaller end.

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        removed = 0
        last_end = float("-inf")
        for start, end in sorted(intervals):
            if start < last_end:
                removed += 1
                last_end = min(last_end, end)
            else:
                last_end = end
        return removed


print(Solution().eraseOverlapIntervals([[1, 4], [2, 3], [3, 5], [6, 7]]))
print(Solution().eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
print(Solution().eraseOverlapIntervals([[1, 2], [2, 3]]))
print(Solution().eraseOverlapIntervals([[1, 10], [2, 3], [4, 5], [6, 7]]))
print(Solution().eraseOverlapIntervals([[0, 5], [1, 6], [2, 7]]))
print(Solution().eraseOverlapIntervals([[-3, -1]]))
```

**Time** `O(n log n)`, **space** `O(n)` for the sorted copy.
:::
