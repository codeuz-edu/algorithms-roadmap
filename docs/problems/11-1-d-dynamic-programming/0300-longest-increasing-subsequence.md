---
title: Longest Increasing Subsequence
description: "Longest Increasing Subsequence in Python: the O(n²) DP over subsequence endings, then the O(n log n) method with binary search."
---

# Longest Increasing Subsequence

<ProblemMeta />

## Problem

Given a list of integers `nums`, return the length of the longest subsequence whose values strictly increase. A subsequence keeps the original order but may skip elements. Equal values do not count as increasing.

| Input | Output | Why |
| --- | --- | --- |
| `[10, 9, 2, 5, 3, 7, 101, 18]` | `4` | for example `2, 3, 7, 18` |
| `[3, 1, 4, 1, 5, 9, 2, 6]` | `4` | for example `1, 4, 5, 9` |
| `[7, 7, 7]` | `1` | no two equal values can be chained |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        pass


print(Solution().lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
print(Solution().lengthOfLIS([3, 1, 4, 1, 5, 9, 2, 6]))
print(Solution().lengthOfLIS([7, 7, 7]))
print(Solution().lengthOfLIS([5]))
print(Solution().lengthOfLIS([1, 2, 3, 4]))
```

::: details Solution
**Idea.** "Longest subsequence among the first `i` elements" is not enough to build on, because it does not say what value the subsequence ends with, and that value decides whether the next element can be appended. Fix the ending instead.

Let `dp[i]` be the length of the longest increasing subsequence that ends exactly at `nums[i]`. Such a subsequence is `nums[i]` alone, or `nums[i]` appended to a subsequence that ends at an earlier, smaller element `nums[j]`. So

`dp[i] = 1 + max(dp[j])` over all `j < i` with `nums[j] < nums[i]`, or `1` when there is no such `j`.

The overall longest subsequence has to end somewhere, so the answer is the largest entry of `dp`, not the last one.

```python
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        dp = [1] * len(nums)
        for i in range(len(nums)):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)


print(Solution().lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
print(Solution().lengthOfLIS([3, 1, 4, 1, 5, 9, 2, 6]))
print(Solution().lengthOfLIS([7, 7, 7]))
print(Solution().lengthOfLIS([5]))
print(Solution().lengthOfLIS([1, 2, 3, 4]))
```

**Time** `O(n²)`, **space** `O(n)`.

**Binary search.** Among all increasing subsequences of the same length, the one with the smallest last value is the most useful, because anything that extends another one extends it too. Keep only that: `tails[k]` is the smallest value that can end an increasing subsequence of length `k + 1`.

`tails` is always strictly increasing, so it can be binary searched. For each number, find the first entry that is greater than or equal to it:

- No such entry: the number is larger than every tail, so it extends the longest subsequence. Append it.
- Otherwise: the number can end a subsequence of that length with a smaller or equal value than the current tail. Overwrite the entry.

`bisect_left` is the right search because the subsequence must be strictly increasing: a number equal to a tail replaces it and does not extend it. `tails` is usually not a real subsequence of the input, but its length is always the length of the longest one.

```python
from bisect import bisect_left


class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for num in nums:
            position = bisect_left(tails, num)
            if position == len(tails):
                tails.append(num)
            else:
                tails[position] = num
        return len(tails)


print(Solution().lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
print(Solution().lengthOfLIS([3, 1, 4, 1, 5, 9, 2, 6]))
print(Solution().lengthOfLIS([7, 7, 7]))
print(Solution().lengthOfLIS([5]))
print(Solution().lengthOfLIS([1, 2, 3, 4]))
```

**Time** `O(n log n)`, **space** `O(n)`.
:::
