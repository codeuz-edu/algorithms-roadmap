---
title: Burst Balloons
description: "Burst Balloons in Python: interval dynamic programming that chooses the last balloon to burst in each range."
---

# Burst Balloons

<ProblemMeta />

## Problem

A row of balloons each has a number painted on it. Bursting a balloon earns its number times the numbers on its current left and right neighbours, and then those two neighbours become adjacent. A missing neighbour at either end counts as `1`. Burst every balloon and return the largest total you can earn.

| Input | Output | Why |
| --- | --- | --- |
| `[3, 1, 5, 8]` | `167` | burst `1`, `5`, `3`, `8`: `15 + 120 + 24 + 8` |
| `[1, 5]` | `10` | burst `1` first for `5`, then `5` alone for `5` |
| `[7]` | `7` | `1 · 7 · 1` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        pass


print(Solution().maxCoins([3, 1, 5, 8]))
print(Solution().maxCoins([1, 5]))
print(Solution().maxCoins([4, 0, 2]))
print(Solution().maxCoins([7]))
```

::: details Solution
**Idea.** Choosing which balloon to burst first does not split the problem. The two sides become neighbours afterwards, so they keep affecting each other. Choosing which balloon to burst **last** does split it. If balloon `k` is the last one standing in a range, the balloons on its left and the balloons on its right never meet: `k` sits between them the whole time.

Put a `1` on each end of the list so that every balloon has two neighbours. Let `dp[left][right]` be the most coins you can earn by bursting every balloon strictly between positions `left` and `right`, with those two still in place. If `k` is the last balloon burst in that gap, its neighbours at that moment are exactly `left` and `right`, so it earns `vals[left] · vals[k] · vals[right]`. Before that, the gaps `(left, k)` and `(k, right)` were cleared independently. Try every `k` and keep the best:

`dp[left][right] = max(dp[left][k] + vals[left] · vals[k] · vals[right] + dp[k][right])`

A gap with no balloons in it is worth 0. The answer is the gap between the two added `1`s.

```python
from functools import cache


class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        vals = [1] + nums + [1]

        @cache
        def best(left: int, right: int) -> int:
            result = 0
            for k in range(left + 1, right):
                coins = vals[left] * vals[k] * vals[right]
                result = max(result, best(left, k) + coins + best(k, right))
            return result

        return best(0, len(vals) - 1)


print(Solution().maxCoins([3, 1, 5, 8]))
print(Solution().maxCoins([1, 5]))
print(Solution().maxCoins([4, 0, 2]))
print(Solution().maxCoins([7]))
```

**Time** `O(n³)`, **space** `O(n²)`.

**Bottom-up table.** The same recurrence without recursion. A gap depends only on narrower gaps, so fill the table by increasing width: first all gaps that hold one balloon, then two, and so on.

```python
class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        vals = [1] + nums + [1]
        n = len(vals)
        dp = [[0] * n for _ in range(n)]

        for width in range(2, n):
            for left in range(n - width):
                right = left + width
                for k in range(left + 1, right):
                    coins = vals[left] * vals[k] * vals[right]
                    dp[left][right] = max(dp[left][right], dp[left][k] + coins + dp[k][right])

        return dp[0][n - 1]


print(Solution().maxCoins([3, 1, 5, 8]))
print(Solution().maxCoins([1, 5]))
print(Solution().maxCoins([4, 0, 2]))
print(Solution().maxCoins([7]))
```

**Time** `O(n³)`, **space** `O(n²)`.
:::
