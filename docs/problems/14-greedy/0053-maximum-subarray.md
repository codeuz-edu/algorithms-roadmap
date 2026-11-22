---
title: Maximum Subarray
description: "Maximum Subarray in Python: Kadane's algorithm drops a running sum as soon as it turns negative, replacing the O(n²) scan of every subarray."
---

# Maximum Subarray

<ProblemMeta />

## Problem

Given a list of integers `nums`, find the run of one or more consecutive elements with the largest sum, and return that sum.

| Input | Output | Why |
| --- | --- | --- |
| `[3, -4, 5, -1, 2]` | `6` | `5 - 1 + 2` |
| `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` | `6` | `4 - 1 + 2 + 1` |
| `[-3, -1, -2]` | `-1` | the run cannot be empty, so take the least bad element |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        pass


print(Solution().maxSubArray([3, -4, 5, -1, 2]))
print(Solution().maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
print(Solution().maxSubArray([-3, -1, -2]))
print(Solution().maxSubArray([7]))
```

::: details Solution
**Idea.** Let `current` be the largest sum of a run that ends exactly at the current element. Such a run is either the element alone or the element attached to the best run that ends just before it. Attaching helps only when that earlier sum is positive.

That is the greedy choice: when the running sum drops below zero, throw it away and start again at the next element. It is safe because a negative prefix makes every run that includes it smaller than the same run without it, so no best answer ever begins with one. Nothing useful is lost by forgetting it.

The best run overall ends somewhere, so the answer is the largest `current` seen. Starting both variables at `nums[0]`, not at 0, keeps the answer right when every number is negative.

```python
class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        best = current = nums[0]
        for i in range(1, len(nums)):
            current = max(nums[i], current + nums[i])
            best = max(best, current)
        return best


print(Solution().maxSubArray([3, -4, 5, -1, 2]))
print(Solution().maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
print(Solution().maxSubArray([-3, -1, -2]))
print(Solution().maxSubArray([7]))
```

**Time** `O(n)`, **space** `O(1)`. This is known as Kadane's algorithm.

**Brute force.** Fix a start index and extend the run one element at a time, keeping a running sum so each extension costs `O(1)`. This checks every run, and it is the version the greedy pass replaces.

```python
class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        best = nums[0]
        for start in range(len(nums)):
            total = 0
            for end in range(start, len(nums)):
                total += nums[end]
                best = max(best, total)
        return best


print(Solution().maxSubArray([3, -4, 5, -1, 2]))
print(Solution().maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
print(Solution().maxSubArray([-3, -1, -2]))
print(Solution().maxSubArray([7]))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
