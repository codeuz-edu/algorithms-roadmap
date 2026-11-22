---
title: Missing Number
description: "Missing Number in Python: XOR every index with every value so that only the missing number is left."
---

# Missing Number

<ProblemMeta />

## Problem

You are given a list `nums` of `n` different integers, each between `0` and `n` inclusive. That range has `n + 1` numbers, so exactly one is absent from the list. Return it.

| Input | Output |
| --- | --- |
| `[3, 0, 1]` | `2` |
| `[0, 1]` | `2` |
| `[9, 6, 4, 2, 3, 5, 7, 0, 1]` | `8` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        pass


print(Solution().missingNumber([3, 0, 1]))
print(Solution().missingNumber([0, 1]))
print(Solution().missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))
print(Solution().missingNumber([1]))
print(Solution().missingNumber([0]))
```

::: details Solution
**Idea.** XOR cancels equal values: `a ^ a == 0`, and the order of the operations does not matter. This is the same tool as in [Single Number](/problems/single-number), and the problem can be turned into that one.

Put two collections side by side: the full range `0` to `n`, and the list. Every number that is present appears in both, so it appears twice in total. The missing number appears only in the full range, so it appears once. XOR everything together and the pairs cancel.

The indices of the list are `0` to `n - 1`, which is the full range except for `n`. So start the result at `n` and XOR in each index together with its value.

```python
class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        result = len(nums)
        for i, num in enumerate(nums):
            result ^= i ^ num
        return result


print(Solution().missingNumber([3, 0, 1]))
print(Solution().missingNumber([0, 1]))
print(Solution().missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))
print(Solution().missingNumber([1]))
print(Solution().missingNumber([0]))
```

**Time** `O(n)`, **space** `O(1)`.

**With a sum.** The numbers `0` to `n` add up to `n * (n + 1) / 2`. Subtract the sum of the list and what remains is the number that was left out. In Python this is safe for any size. In a language with fixed-width integers the sum can overflow, which is one reason the XOR version is worth knowing.

```python
class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)


print(Solution().missingNumber([3, 0, 1]))
print(Solution().missingNumber([0, 1]))
print(Solution().missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))
print(Solution().missingNumber([1]))
print(Solution().missingNumber([0]))
```

**Time** `O(n)`, **space** `O(1)`.
:::
