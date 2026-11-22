---
title: House Robber
description: "House Robber in Python: a take-or-skip DP over the houses, first as a table and then with two variables."
---

# House Robber

<ProblemMeta />

## Problem

`nums[i]` is the amount of money in house `i` on a street. You may take the money from any set of houses as long as no two of them are next to each other. Return the largest total you can collect.

| Input | Output | Why |
| --- | --- | --- |
| `[1, 2, 3, 1]` | `4` | houses 0 and 2 |
| `[2, 7, 9, 3, 1]` | `12` | houses 0, 2 and 4 |
| `[2, 1, 1, 2]` | `4` | houses 0 and 3, skipping two in a row |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def rob(self, nums: list[int]) -> int:
        pass


print(Solution().rob([1, 2, 3, 1]))
print(Solution().rob([2, 7, 9, 3, 1]))
print(Solution().rob([2, 1, 1, 2]))
print(Solution().rob([5]))
```

::: details Solution
**Idea.** Picking every other house is not always best, as `[2, 1, 1, 2]` shows. What is always true is that the last house is either taken or skipped.

Let `dp[i]` be the most money you can collect from the first `i` houses. For the house with index `i - 1` there are two choices. Skip it, and the best is whatever the first `i - 1` houses give: `dp[i - 1]`. Take it, and the house before it is off limits, so you add its money to the best of the first `i - 2` houses: `dp[i - 2] + nums[i - 1]`. The larger of the two is `dp[i]`.

`dp[0] = 0` because there is nothing to take, and `dp[1] = nums[0]`.

```python
class Solution:
    def rob(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [0] * (n + 1)
        dp[1] = nums[0]
        for i in range(2, n + 1):
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])
        return dp[n]


print(Solution().rob([1, 2, 3, 1]))
print(Solution().rob([2, 7, 9, 3, 1]))
print(Solution().rob([2, 1, 1, 2]))
print(Solution().rob([5]))
```

**Time** `O(n)`, **space** `O(n)`.

**Constant space.** `dp[i]` reads only `dp[i - 1]` and `dp[i - 2]`. Keep them as `best` and `prev` and update both for each house.

```python
class Solution:
    def rob(self, nums: list[int]) -> int:
        prev, best = 0, 0
        for money in nums:
            prev, best = best, max(best, prev + money)
        return best


print(Solution().rob([1, 2, 3, 1]))
print(Solution().rob([2, 7, 9, 3, 1]))
print(Solution().rob([2, 1, 1, 2]))
print(Solution().rob([5]))
```

**Time** `O(n)`, **space** `O(1)`.
:::
