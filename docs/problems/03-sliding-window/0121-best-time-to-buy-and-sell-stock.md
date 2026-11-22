---
title: Best Time to Buy and Sell Stock
description: "Best Time to Buy and Sell Stock in Python: track the lowest price so far and the best profit in a single pass."
---

# Best Time to Buy and Sell Stock

<ProblemMeta />

## Problem

You are given a list `prices`, where `prices[i]` is the price of a stock on day `i`. You may buy once and sell once, on a later day. Return the largest profit you can make, or `0` if no trade makes money.

| Input | Output | Why |
| --- | --- | --- |
| `[4, 9, 2, 6, 8]` | `6` | buy at 2, sell at 8 |
| `[9, 7, 4]` | `0` | the price only falls |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass


print(Solution().maxProfit([4, 9, 2, 6, 8]))
print(Solution().maxProfit([7, 1, 5, 3, 6, 4]))
print(Solution().maxProfit([9, 7, 4]))
print(Solution().maxProfit([2, 4, 1]))
print(Solution().maxProfit([5]))
```

::: details Solution
**Idea.** Suppose you sell on day `i`. The best day to have bought is the cheapest day before it. So walk through the prices once and keep the lowest price seen so far. For each day, the best profit from selling today is `price - lowest`. The answer is the largest of those.

The lowest price always comes from an earlier day or today itself, so the buy never happens after the sell. Selling on the same day gives a profit of `0`, which is why the result never goes negative.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        lowest = prices[0]
        best = 0
        for price in prices:
            lowest = min(lowest, price)
            best = max(best, price - lowest)
        return best


print(Solution().maxProfit([4, 9, 2, 6, 8]))
print(Solution().maxProfit([7, 1, 5, 3, 6, 4]))
print(Solution().maxProfit([9, 7, 4]))
print(Solution().maxProfit([2, 4, 1]))
print(Solution().maxProfit([5]))
```

**Time** `O(n)`, **space** `O(1)`.

**Brute force.** Try every buy day with every later sell day. It is correct and obvious, but too slow for a long price history.

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        best = 0
        for buy in range(len(prices)):
            for sell in range(buy + 1, len(prices)):
                best = max(best, prices[sell] - prices[buy])
        return best


print(Solution().maxProfit([4, 9, 2, 6, 8]))
print(Solution().maxProfit([7, 1, 5, 3, 6, 4]))
print(Solution().maxProfit([9, 7, 4]))
print(Solution().maxProfit([2, 4, 1]))
print(Solution().maxProfit([5]))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
