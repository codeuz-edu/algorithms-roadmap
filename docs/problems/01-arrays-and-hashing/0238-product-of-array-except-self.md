---
title: Product of Array Except Self
description: "Product of Array Except Self in Python: prefix and suffix products in O(n) time without division."
---

# Product of Array Except Self

<ProblemMeta />

## Problem

You are given a list of integers `nums`. Return a list `answer` where `answer[i]` is the product of every element of `nums` except `nums[i]`. It must run in `O(n)` time and must not use division.

| Input | Output |
| --- | --- |
| `[1, 2, 3, 4]` | `[24, 12, 8, 6]` |
| `[-1, 1, 0, -3, 3]` | `[0, 0, 9, 0, 0]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        pass


print(Solution().productExceptSelf([1, 2, 3, 4]))
print(Solution().productExceptSelf([-1, 1, 0, -3, 3]))
print(Solution().productExceptSelf([5, 2]))
```

::: details Solution
**Idea.** The product of everything except `nums[i]` is the product of everything to its left times the product of everything to its right. Both can be built with a running product: `prefix[i]` going left to right, and `suffix[i]` going right to left.

For `[1, 2, 3, 4]` the prefix products are `[1, 1, 2, 6]` and the suffix products are `[24, 12, 4, 1]`. Multiplying them position by position gives `[24, 12, 8, 6]`.

```python
class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        prefix = [1] * n
        suffix = [1] * n

        for i in range(1, n):
            prefix[i] = prefix[i - 1] * nums[i - 1]
        for i in range(n - 2, -1, -1):
            suffix[i] = suffix[i + 1] * nums[i + 1]

        return [prefix[i] * suffix[i] for i in range(n)]


print(Solution().productExceptSelf([1, 2, 3, 4]))
print(Solution().productExceptSelf([-1, 1, 0, -3, 3]))
print(Solution().productExceptSelf([5, 2]))
```

**Time** `O(n)`, **space** `O(n)`.

**Constant extra space.** The follow-up asks for `O(1)` space besides the answer. Write the prefix products straight into the answer, then walk back from the right carrying the suffix product in one variable.

```python
class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        answer = [1] * n

        for i in range(1, n):
            answer[i] = answer[i - 1] * nums[i - 1]

        right = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= right
            right *= nums[i]
        return answer


print(Solution().productExceptSelf([1, 2, 3, 4]))
print(Solution().productExceptSelf([-1, 1, 0, -3, 3]))
print(Solution().productExceptSelf([5, 2]))
```

**Time** `O(n)`, **space** `O(1)` besides the answer.
:::
