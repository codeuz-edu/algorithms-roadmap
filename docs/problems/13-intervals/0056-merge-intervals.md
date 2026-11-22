---
title: Merge Intervals
description: "Merge Intervals in Python: sort by start, then extend the last merged interval or open a new one in a single pass."
---

# Merge Intervals

<ProblemMeta />

## Problem

You are given a list of `[start, end]` intervals in no particular order. Combine every group of overlapping intervals into one, and return the resulting intervals, which cover the same ranges without overlapping each other. Intervals that share only an endpoint, such as `[1, 3]` and `[3, 5]`, count as overlapping.

| Input | Output |
| --- | --- |
| `[[6, 8], [1, 4], [3, 5], [10, 12]]` | `[[1, 5], [6, 8], [10, 12]]` |
| `[[1, 3], [3, 5]]` | `[[1, 5]]` |
| `[[1, 9], [2, 3]]` | `[[1, 9]]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts the intervals before printing.

```python
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        pass


def show(intervals):
    print(sorted(Solution().merge(intervals)))


show([[6, 8], [1, 4], [3, 5], [10, 12]])
show([[1, 3], [3, 5]])
show([[1, 9], [2, 3], [4, 5]])
show([[2, 3], [5, 6], [1, 10]])
show([[4, 4]])
```

::: details Solution
**Idea.** In an unsorted list any two intervals might overlap, which suggests comparing all pairs. Sorting by start removes that problem. Once the intervals are in start order, everything that overlaps a given interval comes right after it, so a single pass can build the answer.

Keep a list of merged intervals and look only at the last one. The next interval starts no earlier than it, so there are two cases. If the next interval starts at or before the last one's end, they overlap and the last one is extended. Otherwise there is a gap, and since every later interval starts even further right, the last merged interval is final and a new one begins.

When extending, take the larger of the two ends. The next interval may lie completely inside the last one, as with `[1, 9]` and `[2, 3]`, and then the end must not shrink.

```python
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        merged = []
        for start, end in sorted(intervals):
            if merged and start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])
        return merged


def show(intervals):
    print(sorted(Solution().merge(intervals)))


show([[6, 8], [1, 4], [3, 5], [10, 12]])
show([[1, 3], [3, 5]])
show([[1, 9], [2, 3], [4, 5]])
show([[2, 3], [5, 6], [1, 10]])
show([[4, 4]])
```

**Time** `O(n log n)` for the sort, **space** `O(n)` for the output.
:::
