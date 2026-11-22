---
title: Two Sum II - Input Array Is Sorted
description: "Two Sum II in Python: use the sorted order and two pointers to find the pair in O(n) time and O(1) space."
---

# Two Sum II - Input Array Is Sorted

<ProblemMeta />

## Problem

You are given a list of integers `numbers` sorted from smallest to largest, and an integer `target`. Return the positions of the two numbers that add up to `target`, counting from 1. Exactly one such pair exists, and the solution must use constant extra space.

| Input | Output |
| --- | --- |
| `numbers = [2, 7, 11, 15]`, `target = 9` | `[1, 2]` |
| `numbers = [2, 3, 4]`, `target = 6` | `[1, 3]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        pass


print(Solution().twoSum([2, 7, 11, 15], 9))
print(Solution().twoSum([2, 3, 4], 6))
print(Solution().twoSum([-1, 0], -1))
```

::: details Solution
**Idea.** The dictionary from [Two Sum](/problems/two-sum) would work, but it uses `O(n)` memory and ignores the fact that the list is sorted.

Start with one pointer on the smallest number and one on the largest, and look at their sum. If it is too big, the largest number cannot be part of any pair, because even the smallest partner makes it overshoot, so move the right pointer left. If it is too small, the smallest number is the one that cannot work, so move the left pointer right. Each step rules out one number, so the pointers meet the answer within `n` steps.

```python
class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]
            if total > target:
                right -= 1
            else:
                left += 1


print(Solution().twoSum([2, 7, 11, 15], 9))
print(Solution().twoSum([2, 3, 4], 6))
print(Solution().twoSum([-1, 0], -1))
```

**Time** `O(n)`, **space** `O(1)`.
:::
