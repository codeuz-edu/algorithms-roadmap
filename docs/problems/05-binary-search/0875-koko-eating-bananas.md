---
title: Koko Eating Bananas
description: "Koko Eating Bananas in Python: binary search on the eating speed, checking each candidate by adding up the hours it needs."
---

# Koko Eating Bananas

<ProblemMeta />

## Problem

There are several piles of bananas, with `piles[i]` bananas in pile `i`, and `h` hours to eat them all. Koko picks one speed `k`, in bananas per hour. Each hour she works on a single pile and eats `k` bananas from it. If the pile has fewer than `k` left, she finishes it and waits for the next hour. Return the smallest whole number `k` that lets her finish within `h` hours. There are never more piles than hours.

| Input | Output | Why |
| --- | --- | --- |
| `piles = [5, 9, 2]`, `h = 6` | `3` | 2 + 3 + 1 hours |
| `piles = [5, 9, 2]`, `h = 3` | `9` | one hour per pile, so the biggest pile sets the speed |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        pass


print(Solution().minEatingSpeed([5, 9, 2], 6))
print(Solution().minEatingSpeed([5, 9, 2], 3))
print(Solution().minEatingSpeed([3, 6, 7, 11], 8))
print(Solution().minEatingSpeed([4, 4, 4], 100))
print(Solution().minEatingSpeed([8], 3))
```

::: details Solution
**Idea.** There is no sorted list here, but there is a sorted question. Ask "is speed `k` fast enough?" for `k = 1, 2, 3, ...`. Eating faster never takes more hours, so the answers read no, no, ..., no, yes, yes, ..., yes. Binary search finds the first yes.

Checking one speed is simple: a pile of `p` bananas takes `p / k` hours rounded up, and the total must be at most `h`. In integers, rounding up is `(p + k - 1) // k`.

The search range is `1` to `max(piles)`. At the top speed every pile takes one hour, and there are at most `h` piles, so the top of the range always works. The loop keeps `right` on a speed known to work and moves `left` past speeds known to fail. When they meet, that speed is the smallest that works.

```python
class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        left, right = 1, max(piles)
        while left < right:
            speed = (left + right) // 2
            hours = sum((pile + speed - 1) // speed for pile in piles)
            if hours <= h:
                right = speed
            else:
                left = speed + 1
        return left


print(Solution().minEatingSpeed([5, 9, 2], 6))
print(Solution().minEatingSpeed([5, 9, 2], 3))
print(Solution().minEatingSpeed([3, 6, 7, 11], 8))
print(Solution().minEatingSpeed([4, 4, 4], 100))
print(Solution().minEatingSpeed([8], 3))
```

**Time** `O(n log m)` for `n` piles and a largest pile of `m`, **space** `O(1)`.

**Brute force.** Try the speeds in order and return the first one that is fast enough. It uses the same check, but may run it `m` times instead of `log m` times.

```python
class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        for speed in range(1, max(piles) + 1):
            hours = sum((pile + speed - 1) // speed for pile in piles)
            if hours <= h:
                return speed


print(Solution().minEatingSpeed([5, 9, 2], 6))
print(Solution().minEatingSpeed([5, 9, 2], 3))
print(Solution().minEatingSpeed([3, 6, 7, 11], 8))
print(Solution().minEatingSpeed([4, 4, 4], 100))
print(Solution().minEatingSpeed([8], 3))
```

**Time** `O(n · m)`, **space** `O(1)`.
:::
