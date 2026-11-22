---
title: Maximum Product Subarray
description: "Maximum Product Subarray in Python: track both the largest and the smallest product ending at each index, since a negative number swaps them."
---

# Maximum Product Subarray

<ProblemMeta />

## Problem

Given a list of integers `nums`, find the run of one or more consecutive elements whose product is as large as possible, and return that product.

| Input | Output | Why |
| --- | --- | --- |
| `[2, 3, -2, 4]` | `6` | `2 * 3` |
| `[-2, 3, -4]` | `24` | the whole list, two negatives cancel |
| `[-2, 0, -1]` | `0` | any run with two elements includes the zero |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        pass


print(Solution().maxProduct([2, 3, -2, 4]))
print(Solution().maxProduct([-2, 3, -4]))
print(Solution().maxProduct([-2, 0, -1]))
print(Solution().maxProduct([-3]))
print(Solution().maxProduct([2, -5, -2, -4, 3]))
```

::: details Solution
**Idea.** In [Maximum Subarray](/problems/maximum-subarray) it is enough to carry the best sum that ends at the current index. With products that fails, because a negative number turns the best product into the worst one, and the worst into the best. A very negative product is worth keeping: the next negative number may flip it into the answer.

So carry two values. Let `high` be the largest product of a run that ends at the current index, and `low` the smallest. A run ending at `num` is either `num` alone or `num` attached to a run ending just before it. Multiplying by `num` keeps the order of products when `num` is positive and reverses it when `num` is negative, so the new extremes always come from these three candidates:

`num`, `high * num`, `low * num`

Take their maximum as the new `high` and their minimum as the new `low`. A zero needs no special case: both products become 0, and the next number starts a new run through the `num` candidate. The answer is the largest `high` seen.

```python
class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        best = nums[0]
        high, low = 1, 1
        for num in nums:
            candidates = (num, high * num, low * num)
            high, low = max(candidates), min(candidates)
            best = max(best, high)
        return best


print(Solution().maxProduct([2, 3, -2, 4]))
print(Solution().maxProduct([-2, 3, -4]))
print(Solution().maxProduct([-2, 0, -1]))
print(Solution().maxProduct([-3]))
print(Solution().maxProduct([2, -5, -2, -4, 3]))
```

**Time** `O(n)`, **space** `O(1)`.

**Prefix and suffix products.** Split the list at its zeros. Inside one zero-free block every element has absolute value at least 1, so making a run longer never shrinks the size of its product. Only the sign matters. With an even number of negatives the whole block is best. With an odd number, one negative has to go, and the cheapest way is to cut everything up to and including the first negative, or everything from the last negative on. Either way the best run touches the left end or the right end of its block.

So it is enough to look at every running product from the left and every running product from the right, restarting at 1 after a zero.

```python
class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        n = len(nums)
        best = nums[0]
        prefix, suffix = 1, 1
        for i in range(n):
            if prefix == 0:
                prefix = 1
            if suffix == 0:
                suffix = 1
            prefix *= nums[i]
            suffix *= nums[n - 1 - i]
            best = max(best, prefix, suffix)
        return best


print(Solution().maxProduct([2, 3, -2, 4]))
print(Solution().maxProduct([-2, 3, -4]))
print(Solution().maxProduct([-2, 0, -1]))
print(Solution().maxProduct([-3]))
print(Solution().maxProduct([2, -5, -2, -4, 3]))
```

**Time** `O(n)`, **space** `O(1)`.
:::
