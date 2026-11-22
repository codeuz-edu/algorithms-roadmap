---
title: House Robber II
description: "House Robber II in Python: break the circle into two straight streets and run the House Robber DP on each."
---

# House Robber II

<ProblemMeta />

## Problem

The houses now stand in a circle, so the first and the last house are neighbours. `nums[i]` is the money in house `i`. Return the largest total you can collect without taking from two neighbouring houses.

| Input | Output | Why |
| --- | --- | --- |
| `[2, 3, 2]` | `3` | houses 0 and 2 are neighbours, so take the middle one |
| `[1, 2, 3, 1]` | `4` | houses 0 and 2 |
| `[2, 9, 3, 4, 8]` | `17` | houses 1 and 4 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def rob(self, nums: list[int]) -> int:
        pass


print(Solution().rob([2, 3, 2]))
print(Solution().rob([1, 2, 3, 1]))
print(Solution().rob([2, 9, 3, 4, 8]))
print(Solution().rob([7]))
print(Solution().rob([1, 2]))
```

::: details Solution
**Idea.** The only new rule is that the first and last house cannot both be taken. So every valid plan leaves out at least one of them, and that splits the problem into two cases:

- The last house is left out. The rest, houses `0` to `n - 2`, is a straight street.
- The first house is left out. The rest, houses `1` to `n - 1`, is a straight street.

Each case is plain [House Robber](/problems/house-robber), and the answer is the better of the two. A plan that uses neither end house is counted in both cases, which is harmless when taking a maximum.

A single house needs its own check, because both ranges would be empty and the answer would come out as 0.

```python
class Solution:
    def rob(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]
        return max(self.rob_street(nums, 0, n - 1), self.rob_street(nums, 1, n))

    def rob_street(self, nums: list[int], start: int, end: int) -> int:
        prev, best = 0, 0
        for i in range(start, end):
            prev, best = best, max(best, prev + nums[i])
        return best


print(Solution().rob([2, 3, 2]))
print(Solution().rob([1, 2, 3, 1]))
print(Solution().rob([2, 9, 3, 4, 8]))
print(Solution().rob([7]))
print(Solution().rob([1, 2]))
```

**Time** `O(n)`, **space** `O(1)`. Passing a start and end index avoids copying the list with slices.
:::
