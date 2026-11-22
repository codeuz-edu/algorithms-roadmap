---
title: Target Sum
description: "Target Sum in Python: count sign assignments with a table over index and running sum, then reduce it to counting subsets."
---

# Target Sum

<ProblemMeta />

## Problem

You are given a list of non-negative integers `nums` and an integer `target`. Put a `+` or a `-` in front of every number and add them all up. Count the sign assignments whose total equals `target`.

| Input | Output | Why |
| --- | --- | --- |
| `nums = [1, 2, 3]`, `target = 0` | `2` | `+1 +2 -3` and `-1 -2 +3` |
| `nums = [1, 1, 1, 1, 1]`, `target = 3` | `5` | choose which single `1` gets the minus |
| `nums = [0, 0, 1]`, `target = 1` | `4` | each zero can take either sign |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        pass


print(Solution().findTargetSumWays([1, 2, 3], 0))
print(Solution().findTargetSumWays([1, 1, 1, 1, 1], 3))
print(Solution().findTargetSumWays([0, 0, 1], 1))
print(Solution().findTargetSumWays([1, 2], -3))
print(Solution().findTargetSumWays([1], 2))
```

::: details Solution
**Idea.** Trying every assignment costs `2ⁿ`, but many assignments reach the same running total after the same number of elements, and from there they behave identically. So count them together.

Let `dp[i][s]` be the number of ways to give signs to the first `i` numbers so that they add up to `s`. Before any number is used, the only reachable sum is 0, in one way. Each way of reaching `s` with `i` numbers continues to `s + nums[i]` and to `s - nums[i]`.

Sums can be negative and most of them are never reached, so each row is stored as a dictionary from sum to count instead of a list. Only the latest row is needed to build the next one.

```python
class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        ways = {0: 1}
        for num in nums:
            nxt = {}
            for total, count in ways.items():
                nxt[total + num] = nxt.get(total + num, 0) + count
                nxt[total - num] = nxt.get(total - num, 0) + count
            ways = nxt
        return ways.get(target, 0)


print(Solution().findTargetSumWays([1, 2, 3], 0))
print(Solution().findTargetSumWays([1, 1, 1, 1, 1], 3))
print(Solution().findTargetSumWays([0, 0, 1], 1))
print(Solution().findTargetSumWays([1, 2], -3))
print(Solution().findTargetSumWays([1], 2))
```

**Time** `O(n · S)` where `S` is the sum of `nums`, **space** `O(S)`.

**As a subset count.** Call the numbers that get a plus `P` and the ones that get a minus `N`. Then `sum(P) - sum(N) = target` and `sum(P) + sum(N) = total`. Adding the two equations gives `sum(P) = (total + target) / 2`.

So the question becomes: how many subsets of `nums` add up to that value? If `total + target` is odd, or `target` is further from zero than `total`, there are none. Otherwise this is the counting version of [Partition Equal Subset Sum](/problems/partition-equal-subset-sum): `dp[a]` is the number of subsets seen so far with sum `a`. Go through the sums from high to low so that each number is used at most once. A zero doubles every count, which is right, because it can go on either side.

```python
class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        total = sum(nums)
        if abs(target) > total or (total + target) % 2 == 1:
            return 0
        goal = (total + target) // 2
        dp = [0] * (goal + 1)
        dp[0] = 1
        for num in nums:
            for a in range(goal, num - 1, -1):
                dp[a] += dp[a - num]
        return dp[goal]


print(Solution().findTargetSumWays([1, 2, 3], 0))
print(Solution().findTargetSumWays([1, 1, 1, 1, 1], 3))
print(Solution().findTargetSumWays([0, 0, 1], 1))
print(Solution().findTargetSumWays([1, 2], -3))
print(Solution().findTargetSumWays([1], 2))
```

**Time** `O(n · S)`, **space** `O(S)`.
:::
