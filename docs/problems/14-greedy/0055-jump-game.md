---
title: Jump Game
description: "Jump Game in Python: track the farthest reachable index in one greedy pass, compared with the O(n²) reachability DP."
---

# Jump Game

<ProblemMeta />

## Problem

You stand on index 0 of a list `nums`. From index `i` you may jump forward by any number of positions from 0 up to `nums[i]`. Return `True` if the last index can be reached.

| Input | Output | Why |
| --- | --- | --- |
| `[2, 3, 1, 1, 4]` | `True` | `0 → 1 → 4` |
| `[3, 2, 1, 0, 4]` | `False` | every route ends on index 3, which has jump length 0 |
| `[2, 0, 0]` | `True` | one jump of length 2 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        pass


print(Solution().canJump([2, 3, 1, 1, 4]))
print(Solution().canJump([3, 2, 1, 0, 4]))
print(Solution().canJump([2, 0, 0]))
print(Solution().canJump([1, 0, 1]))
print(Solution().canJump([0]))
```

::: details Solution
**Idea.** Because shorter jumps are always allowed, the reachable indices have no holes: if index `r` can be reached, so can every index before it. That means the whole set of reachable indices is described by one number, the farthest index reached so far.

Walk left to right and keep that number in `reach`. Standing on a reachable index `i`, you can get as far as `i + nums[i]`, so `reach` becomes the larger of the two. If the walk arrives at an index beyond `reach`, nothing before it could jump that far, so that index and everything after it is out of range: return `False`. If the loop finishes, every index was reachable, including the last.

The greedy part is that the route itself is never chosen. Only the best possible reach is kept, and that is safe because a larger reach can do everything a smaller one can.

```python
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        reach = 0
        for i, step in enumerate(nums):
            if i > reach:
                return False
            reach = max(reach, i + step)
        return True


print(Solution().canJump([2, 3, 1, 1, 4]))
print(Solution().canJump([3, 2, 1, 0, 4]))
print(Solution().canJump([2, 0, 0]))
print(Solution().canJump([1, 0, 1]))
print(Solution().canJump([0]))
```

**Time** `O(n)`, **space** `O(1)`.

**The DP it replaces.** Let `dp[i]` be `True` when index `i` can be reached. Start with `dp[0]`, and from every reachable index mark each index it can jump to. This is correct without any insight about the shape of the reachable set, but it marks the same indices many times.

```python
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        n = len(nums)
        dp = [False] * n
        dp[0] = True
        for i in range(n):
            if dp[i]:
                for j in range(i + 1, min(i + nums[i], n - 1) + 1):
                    dp[j] = True
        return dp[n - 1]


print(Solution().canJump([2, 3, 1, 1, 4]))
print(Solution().canJump([3, 2, 1, 0, 4]))
print(Solution().canJump([2, 0, 0]))
print(Solution().canJump([1, 0, 1]))
print(Solution().canJump([0]))
```

**Time** `O(n²)`, **space** `O(n)`.
:::
