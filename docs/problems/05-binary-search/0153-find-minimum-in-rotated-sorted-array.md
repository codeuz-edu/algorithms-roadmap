---
title: Find Minimum in Rotated Sorted Array
description: "Find Minimum in Rotated Sorted Array in Python: binary search that compares the middle element with the right end to find where the order breaks."
---

# Find Minimum in Rotated Sorted Array

<ProblemMeta />

## Problem

A list of distinct integers was sorted from smallest to largest and then rotated: some number of elements were moved from the front to the back, keeping their order. You are given the result as `nums`. Return its smallest element in `O(log n)` time. The list may also be rotated by zero, which leaves it fully sorted.

| Input | Output |
| --- | --- |
| `[6, 8, 9, 1, 3]` | `1` |
| `[2, 1]` | `1` |
| `[11, 13, 15, 17]` | `11` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def findMin(self, nums: list[int]) -> int:
        pass


print(Solution().findMin([6, 8, 9, 1, 3]))
print(Solution().findMin([4, 5, 6, 7, 0, 1, 2]))
print(Solution().findMin([2, 1]))
print(Solution().findMin([11, 13, 15, 17]))
print(Solution().findMin([1]))
```

::: details Solution
**Idea.** A rotated sorted list is two rising runs, and every value in the first run is larger than every value in the second. The minimum is the first element of the second run.

Compare the middle element with the last element of the current range. If `nums[mid] > nums[right]`, the order breaks somewhere after `mid`, so `mid` is in the first run and the minimum is strictly to its right. Otherwise the stretch from `mid` to `right` is rising, so the minimum is `mid` itself or something to its left. In that case `mid` has to stay in the range, which is why the code sets `right = mid` and not `mid - 1`.

Comparing with the right end, not the left, is what handles a list that is not rotated at all: there `nums[mid] <= nums[right]` every time, and the range shrinks down to index `0`.

The loop runs while `left < right`. Because `mid` rounds down it is always less than `right`, so both updates shrink the range, and the loop ends with one index left.

```python
class Solution:
    def findMin(self, nums: list[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]


print(Solution().findMin([6, 8, 9, 1, 3]))
print(Solution().findMin([4, 5, 6, 7, 0, 1, 2]))
print(Solution().findMin([2, 1]))
print(Solution().findMin([11, 13, 15, 17]))
print(Solution().findMin([1]))
```

**Time** `O(log n)`, **space** `O(1)`.
:::
