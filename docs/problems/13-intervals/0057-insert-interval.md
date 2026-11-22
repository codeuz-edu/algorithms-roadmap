---
title: Insert Interval
description: "Insert Interval in Python: copy the intervals that end before the new one, merge the ones that overlap it, then copy the rest, in a single pass."
---

# Insert Interval

<ProblemMeta />

## Problem

`intervals` is a list of `[start, end]` pairs that is sorted by start and has no overlaps. Add `newInterval` to it and return a list that is still sorted and still free of overlaps, merging the new interval with everything it overlaps. Two intervals that share only an endpoint, such as `[1, 2]` and `[2, 3]`, count as overlapping.

| Input | Output |
| --- | --- |
| `intervals = [[1, 2], [4, 6], [9, 10]]`, `newInterval = [5, 9]` | `[[1, 2], [4, 10]]` |
| `intervals = [[3, 5]]`, `newInterval = [0, 1]` | `[[0, 1], [3, 5]]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        pass


print(Solution().insert([[1, 2], [4, 6], [9, 10]], [5, 9]))
print(Solution().insert([[3, 5]], [0, 1]))
print(Solution().insert([[2, 3], [7, 8]], [4, 5]))
print(Solution().insert([[1, 2], [3, 4]], [2, 3]))
print(Solution().insert([], [5, 7]))
```

::: details Solution
**Idea.** Because the list is sorted and has no overlaps, the existing intervals fall into three groups, in this order:

1. Intervals that end before the new one starts. They are untouched, so copy them.
2. Intervals that overlap the new one. Having passed group 1, an interval overlaps as long as it starts at or before the new interval's end. Absorb each one by widening the new interval: take the smaller start and the larger end.
3. Intervals that start after the widened interval ends. Copy them too.

Write the widened interval between groups 1 and 3. If group 2 is empty, it is written unchanged in the right position, so inserting at the front, in a gap or at the end needs no special handling.

```python
class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        start, end = newInterval
        result = []
        i = 0

        while i < len(intervals) and intervals[i][1] < start:
            result.append(intervals[i])
            i += 1

        while i < len(intervals) and intervals[i][0] <= end:
            start = min(start, intervals[i][0])
            end = max(end, intervals[i][1])
            i += 1
        result.append([start, end])

        result.extend(intervals[i:])
        return result


print(Solution().insert([[1, 2], [4, 6], [9, 10]], [5, 9]))
print(Solution().insert([[3, 5]], [0, 1]))
print(Solution().insert([[2, 3], [7, 8]], [4, 5]))
print(Solution().insert([[1, 2], [3, 4]], [2, 3]))
print(Solution().insert([], [5, 7]))
```

**Time** `O(n)`, **space** `O(n)` for the output.

**Sort and merge.** Add the new interval to the list, sort by start, and merge neighbours exactly as in [Merge Intervals](/problems/merge-intervals). It ignores the fact that the input was already sorted, so it pays for a sort, but it reuses code you may already have.

```python
class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        merged = []
        for start, end in sorted(intervals + [newInterval]):
            if merged and start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])
        return merged


print(Solution().insert([[1, 2], [4, 6], [9, 10]], [5, 9]))
print(Solution().insert([[3, 5]], [0, 1]))
print(Solution().insert([[2, 3], [7, 8]], [4, 5]))
print(Solution().insert([[1, 2], [3, 4]], [2, 3]))
print(Solution().insert([], [5, 7]))
```

**Time** `O(n log n)`, **space** `O(n)`.
:::
