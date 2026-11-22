---
title: Best Time to Buy and Sell Stock with Cooldown
description: "Best Time to Buy and Sell Stock with Cooldown in Python: a day by holding table, then a three-state machine in constant space."
---

# Best Time to Buy and Sell Stock with Cooldown

<ProblemMeta />

## Problem

`prices[i]` is the price of a stock on day `i`. You may buy and sell as many times as you like, but you can hold at most one share, and after selling you must sit out the next day before buying again. Return the largest profit you can make.

| Input | Output | Why |
| --- | --- | --- |
| `[1, 2, 3, 0, 2]` | `3` | buy at 1, sell at 2, wait, buy at 0, sell at 2 |
| `[1, 4, 2, 7]` | `6` | buy at 1 and sell at 7; selling at 4 would block the buy at 2 |
| `[5, 4, 3]` | `0` | prices only fall, so never buy |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass


print(Solution().maxProfit([1, 2, 3, 0, 2]))
print(Solution().maxProfit([1, 4, 2, 7]))
print(Solution().maxProfit([2, 1, 4, 5, 2, 9, 7]))
print(Solution().maxProfit([5, 4, 3]))
print(Solution().maxProfit([1]))
```

::: details Solution
**Idea.** What you can do on a given day depends on two things only: which day it is, and whether you hold a share. That gives a table with two columns. Let `dp[i][0]` be the best profit you can still make from day `i` to the end if you start day `i` holding nothing and free to buy. Let `dp[i][1]` be the same when you start day `i` holding a share.

On each day you either do nothing or trade:

- Holding nothing: skip the day, `dp[i + 1][0]`, or buy, `dp[i + 1][1] - prices[i]`.
- Holding a share: keep it, `dp[i + 1][1]`, or sell, `prices[i] + dp[i + 2][0]`.

The cooldown is the `i + 2` in the last line: after a sale, the next day you are free to buy again is two days later. Fill the table from the last day backwards, with two extra rows of zeros so that `i + 2` never falls off the end.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        n = len(prices)
        dp = [[0, 0] for _ in range(n + 2)]
        for i in range(n - 1, -1, -1):
            dp[i][0] = max(dp[i + 1][0], dp[i + 1][1] - prices[i])
            dp[i][1] = max(dp[i + 1][1], prices[i] + dp[i + 2][0])
        return dp[0][0]


print(Solution().maxProfit([1, 2, 3, 0, 2]))
print(Solution().maxProfit([1, 4, 2, 7]))
print(Solution().maxProfit([2, 1, 4, 5, 2, 9, 7]))
print(Solution().maxProfit([5, 4, 3]))
print(Solution().maxProfit([1]))
```

**Time** `O(n)`, **space** `O(n)`.

**Three states, constant space.** Walk forward and track the best profit at the end of each day in three situations: `held` (you own a share), `sold` (you sold today, so tomorrow is the cooldown), and `rest` (you own nothing and are free to buy).

You reach `held` by keeping a share or by buying from `rest`. You reach `sold` only by selling a held share. You reach `rest` by staying in it or by waking up after a `sold` day. Buying is only allowed from `rest`, never straight from `sold`, and that is the whole cooldown rule.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        held = float("-inf")
        sold = 0
        rest = 0
        for price in prices:
            held, sold, rest = max(held, rest - price), held + price, max(rest, sold)
        return max(sold, rest)


print(Solution().maxProfit([1, 2, 3, 0, 2]))
print(Solution().maxProfit([1, 4, 2, 7]))
print(Solution().maxProfit([2, 1, 4, 5, 2, 9, 7]))
print(Solution().maxProfit([5, 4, 3]))
print(Solution().maxProfit([1]))
```

**Time** `O(n)`, **space** `O(1)`.
:::
