---
title: Min Cost Climbing Stairs
description: "Min Cost Climbing Stairs in Python: a one-dimensional DP over the cheapest way to stand on each step, then two variables."
---

# Min Cost Climbing Stairs

<ProblemMeta />

## Problem

`cost[i]` is the fee you pay when you leave step `i`. After paying it you may go up one step or two steps. You may begin on step 0 or on step 1 for free. Return the smallest total fee needed to get past the last step.

| Input | Output | Why |
| --- | --- | --- |
| `[10, 15, 20]` | `15` | start on step 1, pay 15, jump two steps to the top |
| `[4, 1, 9, 2]` | `3` | start on step 1, pay 1, land on step 3, pay 2 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def minCostClimbingStairs(self, cost: list[int]) -> int:
        pass


print(Solution().minCostClimbingStairs([10, 15, 20]))
print(Solution().minCostClimbingStairs([4, 1, 9, 2]))
print(Solution().minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
print(Solution().minCostClimbingStairs([5, 3]))
```

::: details Solution
**Idea.** Treat the top as one more step, at index `n = len(cost)`. Let `dp[i]` be the smallest fee paid so far when you are standing on step `i` and have not yet paid for leaving it.

You can stand on step 0 or step 1 for free, so `dp[0] = dp[1] = 0`. Any other step is reached from the step below, after paying that step's fee, or from two steps below, after paying that one's fee. Take the cheaper of the two:

`dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])`

The answer is `dp[n]`. This is the same shape as [Climbing Stairs](/problems/climbing-stairs), with `min` in place of `+`.

```python
class Solution:
    def minCostClimbingStairs(self, cost: list[int]) -> int:
        n = len(cost)
        dp = [0] * (n + 1)
        for i in range(2, n + 1):
            dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
        return dp[n]


print(Solution().minCostClimbingStairs([10, 15, 20]))
print(Solution().minCostClimbingStairs([4, 1, 9, 2]))
print(Solution().minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
print(Solution().minCostClimbingStairs([5, 3]))
```

**Time** `O(n)`, **space** `O(n)`.

**Constant space.** Only the last two entries are ever read, so two variables are enough.

```python
class Solution:
    def minCostClimbingStairs(self, cost: list[int]) -> int:
        prev, cur = 0, 0
        for i in range(2, len(cost) + 1):
            prev, cur = cur, min(cur + cost[i - 1], prev + cost[i - 2])
        return cur


print(Solution().minCostClimbingStairs([10, 15, 20]))
print(Solution().minCostClimbingStairs([4, 1, 9, 2]))
print(Solution().minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
print(Solution().minCostClimbingStairs([5, 3]))
```

**Time** `O(n)`, **space** `O(1)`.
:::
