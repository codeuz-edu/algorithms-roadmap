---
title: Two Sum
description: "Two Sum in Python: find two numbers that add up to a target in one pass with a dictionary."
---

# Two Sum

<ProblemMeta />

## Problem

You are given a list of integers `nums` and an integer `target`. Return the indices of the two numbers that add up to `target`. Exactly one such pair exists, and you may not use the same element twice.

| Input | Output |
| --- | --- |
| `nums = [2, 7, 11, 15]`, `target = 9` | `[0, 1]` |
| `nums = [3, 2, 4]`, `target = 6` | `[1, 2]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below. Return the smaller index first.

```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        pass


print(Solution().twoSum([2, 7, 11, 15], 9))
print(Solution().twoSum([3, 2, 4], 6))
print(Solution().twoSum([3, 3], 6))
```

::: details Solution
**Idea.** For each number, the partner it needs is `target - num`. Keep a dictionary from every value seen so far to its index. If the partner is already in the dictionary, the pair is found. If not, store the current number and move on.

Looking up the partner before storing the current number is what stops an element from being paired with itself.

```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            if target - num in seen:
                return [seen[target - num], i]
            seen[num] = i


print(Solution().twoSum([2, 7, 11, 15], 9))
print(Solution().twoSum([3, 2, 4], 6))
print(Solution().twoSum([3, 3], 6))
```

**Time** `O(n)`, **space** `O(n)`.

**Brute force.** Try every pair. It needs no extra memory, and it is the version to mention first in an interview before improving on it.

```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]


print(Solution().twoSum([2, 7, 11, 15], 9))
print(Solution().twoSum([3, 2, 4], 6))
print(Solution().twoSum([3, 3], 6))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
