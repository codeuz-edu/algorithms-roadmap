---
title: Search in Rotated Sorted Array
description: "Search in Rotated Sorted Array in Python: binary search that works out which half is still sorted and whether the target lies inside it."
---

# Search in Rotated Sorted Array

<ProblemMeta />

## Problem

A list of distinct integers was sorted from smallest to largest and then rotated, so that some elements from the front now sit at the back in the same order. You are given the result as `nums`, and an integer `target`. Return the index of `target` in `nums`, or `-1` if it is absent, in `O(log n)` time.

| Input | Output |
| --- | --- |
| `nums = [6, 8, 9, 1, 3]`, `target = 9` | `2` |
| `nums = [6, 8, 9, 1, 3]`, `target = 3` | `4` |
| `nums = [6, 8, 9, 1, 3]`, `target = 7` | `-1` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        pass


print(Solution().search([6, 8, 9, 1, 3], 9))
print(Solution().search([6, 8, 9, 1, 3], 3))
print(Solution().search([6, 8, 9, 1, 3], 7))
print(Solution().search([3, 1], 1))
print(Solution().search([5], 4))
```

::: details Solution
**Idea.** Cut a rotated sorted range at any point and at least one of the two pieces is plainly sorted, because the break in the order can only be in one of them. Which piece it is can be read from the ends: if `nums[left] <= nums[mid]`, the left piece is sorted, otherwise the right piece is.

A sorted piece is easy to reason about. The target is inside it exactly when it lies between the piece's first and last values. If it does, search that piece. If it does not, the target can only be in the other piece. Either way half of the range is discarded, just as in plain [Binary Search](/problems/binary-search).

The `<=` in `nums[left] <= nums[mid]` covers the case `left == mid`, which happens when the range has one or two elements. The left piece is then a single element and counts as sorted.

```python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1


print(Solution().search([6, 8, 9, 1, 3], 9))
print(Solution().search([6, 8, 9, 1, 3], 3))
print(Solution().search([6, 8, 9, 1, 3], 7))
print(Solution().search([3, 1], 1))
print(Solution().search([5], 4))
```

**Time** `O(log n)`, **space** `O(1)`.

**Two searches.** Split the work into two familiar steps. First find the index of the smallest element, as in [Find Minimum in Rotated Sorted Array](/problems/find-minimum-in-rotated-sorted-array). That index divides the list into two sorted runs. Comparing the target with the last element tells you which run can hold it, and an ordinary binary search on that run finishes the job. It is longer, but each loop is one you already know.

```python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        pivot = left

        if target <= nums[-1]:
            left, right = pivot, len(nums) - 1
        else:
            left, right = 0, pivot - 1

        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1


print(Solution().search([6, 8, 9, 1, 3], 9))
print(Solution().search([6, 8, 9, 1, 3], 3))
print(Solution().search([6, 8, 9, 1, 3], 7))
print(Solution().search([3, 1], 1))
print(Solution().search([5], 4))
```

**Time** `O(log n)`, **space** `O(1)`.
:::
