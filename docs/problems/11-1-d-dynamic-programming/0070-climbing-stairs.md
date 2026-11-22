---
title: Climbing Stairs
description: "Climbing Stairs in Python: count the ways with a one-dimensional DP table, then shrink it to two variables."
---

# Climbing Stairs

<ProblemMeta />

## Problem

A staircase has `n` steps. Each move takes you up either one step or two steps. Return the number of different sequences of moves that end exactly on step `n`.

| Input | Output | Why |
| --- | --- | --- |
| `n = 2` | `2` | `1 + 1` or `2` |
| `n = 4` | `5` | `1+1+1+1`, `1+1+2`, `1+2+1`, `2+1+1`, `2+2` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        pass


print(Solution().climbStairs(2))
print(Solution().climbStairs(4))
print(Solution().climbStairs(1))
print(Solution().climbStairs(10))
```

::: details Solution
**Idea.** Look at the last move. To land on step `i` you either took one step from `i - 1` or two steps from `i - 2`. These two groups of routes never overlap, because they end with a different move, and together they cover every route. So the count for step `i` is the sum of the counts for the two steps below it.

Let `dp[i]` be the number of ways to reach step `i`. There is one way to be on the ground (do nothing) and one way to reach step 1, so `dp[0] = dp[1] = 1`. Every later entry is `dp[i - 1] + dp[i - 2]`, and the answer is `dp[n]`.

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        dp = [1] * (n + 1)
        for i in range(2, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        return dp[n]


print(Solution().climbStairs(2))
print(Solution().climbStairs(4))
print(Solution().climbStairs(1))
print(Solution().climbStairs(10))
```

**Time** `O(n)`, **space** `O(n)`.

**Constant space.** Each entry only reads the two entries before it, so the rest of the table is never needed again. Keep those two values in variables and slide them forward.

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        prev, cur = 1, 1
        for _ in range(2, n + 1):
            prev, cur = cur, prev + cur
        return cur


print(Solution().climbStairs(2))
print(Solution().climbStairs(4))
print(Solution().climbStairs(1))
print(Solution().climbStairs(10))
```

**Time** `O(n)`, **space** `O(1)`.
:::
