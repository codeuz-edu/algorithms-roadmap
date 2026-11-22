---
title: Jump Game II
description: "Jump Game II in Python: count jumps greedily by treating the indices reachable in k jumps as one window, compared with the O(n²) DP."
---

# Jump Game II

<ProblemMeta />

## Problem

You stand on index 0 of a list `nums`. From index `i` you may jump forward by any number of positions up to `nums[i]`. The last index is guaranteed to be reachable. Return the smallest number of jumps needed to get there.

| Input | Output | Why |
| --- | --- | --- |
| `[2, 3, 1, 1, 4]` | `2` | `0 → 1 → 4` |
| `[3, 1, 1, 1, 4]` | `2` | `0 → 3 → 4` |
| `[1, 1, 1, 1]` | `3` | every jump has length 1 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def jump(self, nums: list[int]) -> int:
        pass


print(Solution().jump([2, 3, 1, 1, 4]))
print(Solution().jump([3, 1, 1, 1, 4]))
print(Solution().jump([1, 1, 1, 1]))
print(Solution().jump([2, 3, 0, 1, 4]))
print(Solution().jump([0]))
```

::: details Solution
**Idea.** Group the indices by how many jumps they need. Zero jumps reach only index 0. One jump reaches everything up to `nums[0]`. As in [Jump Game](/problems/jump-game), shorter jumps are always allowed, so the indices reachable within `k` jumps form one unbroken stretch from 0 to some index `end`.

The indices that need `k + 1` jumps are then everything past `end` up to the farthest point any index inside the current stretch can jump to. So scan the stretch, record that farthest point in `farthest`, and when the scan arrives at `end`, one more jump is unavoidable: count it and move `end` to `farthest`.

This is a breadth-first search where each level is a range, so it needs no queue. It is safe to commit to "the farthest point" without choosing which index to jump from, because being able to reach further never hurts.

The loop stops before the last index. If `end` lands exactly on the last index, no further jump should be counted.

```python
class Solution:
    def jump(self, nums: list[int]) -> int:
        jumps = 0
        end = 0
        farthest = 0
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == end:
                jumps += 1
                end = farthest
        return jumps


print(Solution().jump([2, 3, 1, 1, 4]))
print(Solution().jump([3, 1, 1, 1, 4]))
print(Solution().jump([1, 1, 1, 1]))
print(Solution().jump([2, 3, 0, 1, 4]))
print(Solution().jump([0]))
```

**Time** `O(n)`, **space** `O(1)`.

**The DP it replaces.** Let `dp[i]` be the fewest jumps needed to reach index `i`. `dp[0] = 0`, and every index `j` that `i` can jump to can be reached in `dp[i] + 1` jumps. Process the indices left to right, so `dp[i]` is final before it is used.

```python
class Solution:
    def jump(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [0] + [n] * (n - 1)
        for i in range(n):
            for j in range(i + 1, min(i + nums[i], n - 1) + 1):
                dp[j] = min(dp[j], dp[i] + 1)
        return dp[n - 1]


print(Solution().jump([2, 3, 1, 1, 4]))
print(Solution().jump([3, 1, 1, 1, 4]))
print(Solution().jump([1, 1, 1, 1]))
print(Solution().jump([2, 3, 0, 1, 4]))
print(Solution().jump([0]))
```

**Time** `O(n²)`, **space** `O(n)`.
:::
