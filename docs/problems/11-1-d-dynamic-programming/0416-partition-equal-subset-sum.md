---
title: Partition Equal Subset Sum
description: "Partition Equal Subset Sum in Python: a 0/1 knapsack DP over reachable sums in one array, then the same table packed into a single integer."
---

# Partition Equal Subset Sum

<ProblemMeta />

## Problem

Given a list of positive integers `nums`, decide whether its elements can be divided into two groups with the same sum. Every element must go into exactly one group.

| Input | Output | Why |
| --- | --- | --- |
| `[1, 5, 11, 5]` | `True` | `1 + 5 + 5` and `11` |
| `[3, 3, 3, 4, 5]` | `True` | `3 + 3 + 3` and `4 + 5` |
| `[1, 2, 5]` | `False` | the total is 8, and no group adds up to 4 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        pass


print(Solution().canPartition([1, 5, 11, 5]))
print(Solution().canPartition([3, 3, 3, 4, 5]))
print(Solution().canPartition([1, 2, 5]))
print(Solution().canPartition([1, 2, 3, 5]))
print(Solution().canPartition([4]))
```

::: details Solution
**Idea.** If the two groups have equal sums, each one adds up to half of the total. So an odd total is an immediate `False`, and otherwise the question becomes: is there a subset that adds up to `target = total // 2`? The elements left over form the other group automatically.

Let `dp[t]` be `True` when some subset of the numbers processed so far adds up to exactly `t`. At the start only `dp[0]` is `True`, the empty subset. Each new number `num` can be added to any subset found earlier, so `dp[t]` becomes `True` whenever `dp[t - num]` was already `True`.

The inner loop runs from `target` downwards on purpose. Going down, `dp[t - num]` has not been touched yet in this round, so it still describes subsets without `num`, and each number is used at most once. Going up would let the same number be added again and again.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 == 1:
            return False

        target = total // 2
        dp = [True] + [False] * target
        for num in nums:
            for t in range(target, num - 1, -1):
                if dp[t - num]:
                    dp[t] = True
        return dp[target]


print(Solution().canPartition([1, 5, 11, 5]))
print(Solution().canPartition([3, 3, 3, 4, 5]))
print(Solution().canPartition([1, 2, 5]))
print(Solution().canPartition([1, 2, 3, 5]))
print(Solution().canPartition([4]))
```

**Time** `O(n · target)`, **space** `O(target)`.

**The table as one integer.** A list of booleans is a row of bits, and a Python integer can hold as many bits as needed. Let bit `t` of `reachable` be 1 when sum `t` can be made. Adding `num` to every reachable sum moves every bit up by `num` places, which is a left shift. Combining it with the old value keeps the subsets that skip `num`. The shift reads the old bits and writes the new ones in one step, so no number is used twice.

```python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 == 1:
            return False

        reachable = 1
        for num in nums:
            reachable |= reachable << num
        return (reachable >> (total // 2)) & 1 == 1


print(Solution().canPartition([1, 5, 11, 5]))
print(Solution().canPartition([3, 3, 3, 4, 5]))
print(Solution().canPartition([1, 2, 5]))
print(Solution().canPartition([1, 2, 3, 5]))
print(Solution().canPartition([4]))
```

**Time** `O(n · total)` bit operations, carried out a machine word at a time, **space** `O(total)` bits.
:::
