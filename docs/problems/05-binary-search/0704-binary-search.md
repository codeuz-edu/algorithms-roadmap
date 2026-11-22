---
title: Binary Search
description: "Binary Search in Python: halve a sorted list on every step to find a target in O(log n)."
---

# Binary Search

<ProblemMeta />

## Problem

You are given a list of distinct integers `nums` sorted from smallest to largest, and an integer `target`. Return the index of `target`, or `-1` if it is not in the list. The search must take `O(log n)` time.

| Input | Output |
| --- | --- |
| `nums = [-4, 0, 3, 8, 15]`, `target = 8` | `3` |
| `nums = [-4, 0, 3, 8, 15]`, `target = 5` | `-1` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        pass


print(Solution().search([-4, 0, 3, 8, 15], 8))
print(Solution().search([-4, 0, 3, 8, 15], 5))
print(Solution().search([-4, 0, 3, 8, 15], -4))
print(Solution().search([-4, 0, 3, 8, 15], 20))
print(Solution().search([7], 7))
```

::: details Solution
**Idea.** Keep a range `left..right` of indices where the target could still be. Look at the middle element. If it is the target, return its index. If it is smaller than the target, then so is everything to its left, because the list is sorted, and that whole half can be thrown away. If it is larger, the right half goes instead.

Both pointers are inclusive, so the loop runs while `left <= right`: a range of one element still has to be checked. Moving to `mid + 1` or `mid - 1`, never to `mid` itself, guarantees the range shrinks on every step and the loop ends. When the range becomes empty, the target is not there.

```python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1


print(Solution().search([-4, 0, 3, 8, 15], 8))
print(Solution().search([-4, 0, 3, 8, 15], 5))
print(Solution().search([-4, 0, 3, 8, 15], -4))
print(Solution().search([-4, 0, 3, 8, 15], 20))
print(Solution().search([7], 7))
```

**Time** `O(log n)`, **space** `O(1)`.

**With the standard library.** Python ships binary search in the `bisect` module. `bisect_left` returns the first index where `target` could be inserted while keeping the list sorted. If the target is present, that is its index, so one check finishes the job. Write the loop by hand in an interview, and use `bisect` in real code.

```python
from bisect import bisect_left


class Solution:
    def search(self, nums: list[int], target: int) -> int:
        i = bisect_left(nums, target)
        if i < len(nums) and nums[i] == target:
            return i
        return -1


print(Solution().search([-4, 0, 3, 8, 15], 8))
print(Solution().search([-4, 0, 3, 8, 15], 5))
print(Solution().search([-4, 0, 3, 8, 15], -4))
print(Solution().search([-4, 0, 3, 8, 15], 20))
print(Solution().search([7], 7))
```

**Time** `O(log n)`, **space** `O(1)`.
:::
