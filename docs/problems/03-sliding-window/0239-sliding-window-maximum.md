---
title: Sliding Window Maximum
description: "Sliding Window Maximum in Python: a deque of indices kept in decreasing order of value gives each window maximum in O(1)."
---

# Sliding Window Maximum

<ProblemMeta />

## Problem

You are given a list of integers `nums` and a window size `k`. The window starts over the first `k` numbers and moves right one position at a time until it reaches the end. Return the largest value in the window at each position.

| Input | Output |
| --- | --- |
| `nums = [9, 8, 7, 6]`, `k = 2` | `[9, 8, 7]` |
| `nums = [2, 5, 1, 1, 4]`, `k = 3` | `[5, 5, 4]` |
| `nums = [4, -2]`, `k = 1` | `[4, -2]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        pass


print(Solution().maxSlidingWindow([2, 5, 1, 1, 4], 3))
print(Solution().maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
print(Solution().maxSlidingWindow([9, 8, 7, 6], 2))
print(Solution().maxSlidingWindow([1, 2, 3, 4], 4))
print(Solution().maxSlidingWindow([4, -2], 1))
```

::: details Solution
**Idea.** When a new number enters the window, every number before it that is smaller or equal can be forgotten. Such a number leaves the window earlier than the new one and is never larger, so it can never be a maximum again.

Keep a deque of indices and apply that rule on every step: pop indices from the back while their values are not larger than the new value, then append the new index. What remains is in increasing order of index and strictly decreasing order of value, so the front is always the largest value still worth remembering.

The front can also grow too old. If its index has fallen out of the window, pop it from the front. Indices are stored instead of values precisely so that this check is possible. Once the first full window is reached, the front of the deque is the answer for each position.

```python
from collections import deque


class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        window = deque()
        result = []
        for i, num in enumerate(nums):
            while window and nums[window[-1]] <= num:
                window.pop()
            window.append(i)
            if window[0] <= i - k:
                window.popleft()
            if i >= k - 1:
                result.append(nums[window[0]])
        return result


print(Solution().maxSlidingWindow([2, 5, 1, 1, 4], 3))
print(Solution().maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
print(Solution().maxSlidingWindow([9, 8, 7, 6], 2))
print(Solution().maxSlidingWindow([1, 2, 3, 4], 4))
print(Solution().maxSlidingWindow([4, -2], 1))
```

**Time** `O(n)`: each index is appended once and popped at most once. **Space** `O(k)`.

**Brute force.** Take the maximum of every window directly. Each window costs `k` steps, which is too slow when both `n` and `k` are large.

```python
class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        result = []
        for start in range(len(nums) - k + 1):
            result.append(max(nums[start:start + k]))
        return result


print(Solution().maxSlidingWindow([2, 5, 1, 1, 4], 3))
print(Solution().maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
print(Solution().maxSlidingWindow([9, 8, 7, 6], 2))
print(Solution().maxSlidingWindow([1, 2, 3, 4], 4))
print(Solution().maxSlidingWindow([4, -2], 1))
```

**Time** `O(n · k)`, **space** `O(k)` for the slice.
:::
