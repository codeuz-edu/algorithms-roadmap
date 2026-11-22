---
title: Longest Consecutive Sequence
description: "Longest Consecutive Sequence in Python: use a set and only count from the start of each run, in O(n) time."
---

# Longest Consecutive Sequence

<ProblemMeta />

## Problem

You are given an unsorted list of integers `nums`. Return the length of the longest run of consecutive values, such as `1, 2, 3, 4`. The values of a run can sit anywhere in the list. It must run in `O(n)` time.

| Input | Output | Run |
| --- | --- | --- |
| `[100, 4, 200, 1, 3, 2]` | `4` | `1, 2, 3, 4` |
| `[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]` | `9` | `0` to `8` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        pass


print(Solution().longestConsecutive([100, 4, 200, 1, 3, 2]))
print(Solution().longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
print(Solution().longestConsecutive([]))
```

::: details Solution
**Idea.** Put every value in a set so that "is `x` in the list?" costs constant time. A value `num` starts a run only when `num - 1` is not in the set. From each start, count upward while the next value is present.

Skipping the values that are not starts is what keeps this linear. Every value is stepped over at most once by the inner loop, from the start of its own run, so the two loops together do `O(n)` work.

```python
class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        num_set = set(nums)
        longest = 0

        for num in num_set:
            if num - 1 not in num_set:
                length = 1
                while num + length in num_set:
                    length += 1
                longest = max(longest, length)
        return longest


print(Solution().longestConsecutive([100, 4, 200, 1, 3, 2]))
print(Solution().longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
print(Solution().longestConsecutive([]))
```

**Time** `O(n)`, **space** `O(n)`.

The outer loop goes over the set, not the list. A list such as `[1, 1, 1, ..., 2, 3, 4]` would otherwise start the same run once for every copy of `1`.

**Sorting.** Sorted values put each run side by side, so one pass can measure them. It is easier to get right, but the sort makes it `O(n log n)`, which the problem rules out.

```python
class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        longest = length = 0
        previous = None

        for num in sorted(set(nums)):
            length = length + 1 if previous is not None and num == previous + 1 else 1
            longest = max(longest, length)
            previous = num
        return longest


print(Solution().longestConsecutive([100, 4, 200, 1, 3, 2]))
print(Solution().longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
print(Solution().longestConsecutive([]))
```

**Time** `O(n log n)`, **space** `O(n)`.
:::
