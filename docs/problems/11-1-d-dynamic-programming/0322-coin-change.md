---
title: Coin Change
description: "Coin Change in Python: bottom-up DP over every amount up to the target, plus a breadth-first search over reachable totals."
---

# Coin Change

<ProblemMeta />

## Problem

You have an unlimited supply of coins in each of the denominations listed in `coins`. Return the smallest number of coins that add up to exactly `amount`, or `-1` if no combination does.

| Input | Output | Why |
| --- | --- | --- |
| `coins = [1, 2, 5]`, `amount = 11` | `3` | `5 + 5 + 1` |
| `coins = [1, 3, 4]`, `amount = 6` | `2` | `3 + 3` |
| `coins = [2]`, `amount = 3` | `-1` | only even totals are possible |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        pass


print(Solution().coinChange([1, 2, 5], 11))
print(Solution().coinChange([1, 3, 4], 6))
print(Solution().coinChange([2], 3))
print(Solution().coinChange([1], 0))
print(Solution().coinChange([5, 10], 30))
```

::: details Solution
**Idea.** Taking the largest coin first does not work. With coins `[1, 3, 4]` and amount 6 it gives `4 + 1 + 1`, three coins, while `3 + 3` needs two. Every coin has to be considered as the possible last coin.

Let `dp[a]` be the fewest coins that add up to exactly `a`. If the last coin used is `coin`, the coins before it add up to `a - coin`, and the best way to do that is `dp[a - coin]`. So

`dp[a] = 1 + min(dp[a - coin])` over every coin that is not larger than `a`.

`dp[0] = 0`, since amount 0 needs no coins. Every other entry starts at `amount + 1`, which stands for "impossible": no real answer can use more than `amount` coins, because the smallest coin is worth at least 1. If `dp[amount]` still holds that value at the end, the amount cannot be made.

```python
class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        impossible = amount + 1
        dp = [0] + [impossible] * amount

        for a in range(1, amount + 1):
            for coin in coins:
                if coin <= a:
                    dp[a] = min(dp[a], dp[a - coin] + 1)
        return dp[amount] if dp[amount] != impossible else -1


print(Solution().coinChange([1, 2, 5], 11))
print(Solution().coinChange([1, 3, 4], 6))
print(Solution().coinChange([2], 3))
print(Solution().coinChange([1], 0))
print(Solution().coinChange([5, 10], 30))
```

**Time** `O(amount · n)` for `n` coin denominations, **space** `O(amount)`.

**Breadth-first search.** Think of each total from 0 to `amount` as a node, and of adding one coin as an edge. The fewest coins is then the shortest path from 0 to `amount`. Explore level by level: level `k` holds the totals reachable with exactly `k` coins and not with fewer. The first level that reaches `amount` is the answer. It visits only totals that can actually be made, at the cost of a set and a queue.

```python
class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        if amount == 0:
            return 0

        seen = {0}
        level = [0]
        used = 0
        while level:
            used += 1
            next_level = []
            for total in level:
                for coin in coins:
                    new_total = total + coin
                    if new_total == amount:
                        return used
                    if new_total < amount and new_total not in seen:
                        seen.add(new_total)
                        next_level.append(new_total)
            level = next_level
        return -1


print(Solution().coinChange([1, 2, 5], 11))
print(Solution().coinChange([1, 3, 4], 6))
print(Solution().coinChange([2], 3))
print(Solution().coinChange([1], 0))
print(Solution().coinChange([5, 10], 30))
```

**Time** `O(amount · n)`, **space** `O(amount)`.
:::
