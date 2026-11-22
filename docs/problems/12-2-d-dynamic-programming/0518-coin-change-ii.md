---
title: Coin Change II
description: "Coin Change II in Python: count coin combinations with a coins by amount table, then with a single row."
---

# Coin Change II

<ProblemMeta />

## Problem

You have an unlimited supply of coins of each value in `coins`. Count the different combinations of coins that add up to `amount`. Order does not matter: `1 + 2` and `2 + 1` are the same combination.

| Input | Output | Why |
| --- | --- | --- |
| `amount = 5`, `coins = [1, 2, 5]` | `4` | `5`, `2+2+1`, `2+1+1+1`, `1+1+1+1+1` |
| `amount = 3`, `coins = [2]` | `0` | an odd amount cannot be built from 2s |
| `amount = 0`, `coins = [7]` | `1` | use no coins at all |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        pass


print(Solution().change(5, [1, 2, 5]))
print(Solution().change(6, [1, 2, 3]))
print(Solution().change(3, [2]))
print(Solution().change(0, [7]))
```

::: details Solution
**Idea.** [Coin Change](/problems/coin-change) asks for the fewest coins. Here the question is how many combinations exist, and the danger is counting `1 + 2` and `2 + 1` twice. The fix is to decide the coins in a fixed order: first how many of coin 1 to use, then how many of coin 2, and so on. Each combination is then produced exactly once.

Let `dp[i][a]` be the number of ways to make amount `a` using only the first `i` coin types. For coin `i` there are two disjoint cases:

- Do not use it at all: `dp[i - 1][a]`.
- Use it at least once: take one out, and what is left is amount `a - coin`, still allowed to use this coin again: `dp[i][a - coin]`.

There is one way to make 0, which is to take nothing, so `dp[i][0] = 1`. With no coin types, no positive amount can be made.

```python
class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        n = len(coins)
        dp = [[0] * (amount + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            dp[i][0] = 1
        for i in range(1, n + 1):
            coin = coins[i - 1]
            for a in range(1, amount + 1):
                dp[i][a] = dp[i - 1][a]
                if a >= coin:
                    dp[i][a] += dp[i][a - coin]
        return dp[n][amount]


print(Solution().change(5, [1, 2, 5]))
print(Solution().change(6, [1, 2, 3]))
print(Solution().change(3, [2]))
print(Solution().change(0, [7]))
```

**Time** `O(n · amount)` for `n` coin types, **space** `O(n · amount)`.

**One row.** `dp[i][a]` reads the cell directly above it and a cell to its left in the same row. Keep one list and update it left to right: `dp[a]` still holds the value from the previous coin, and `dp[a - coin]` has already been updated for the current one.

The loop order matters. Coins must be the outer loop. With amounts on the outside, every amount would try every coin as its last coin, and that counts orderings instead of combinations.

```python
class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for coin in coins:
            for a in range(coin, amount + 1):
                dp[a] += dp[a - coin]
        return dp[amount]


print(Solution().change(5, [1, 2, 5]))
print(Solution().change(6, [1, 2, 3]))
print(Solution().change(3, [2]))
print(Solution().change(0, [7]))
```

**Time** `O(n · amount)`, **space** `O(amount)`.
:::
