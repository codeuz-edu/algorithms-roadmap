---
title: Container With Most Water
description: "Container With Most Water in Python: two pointers that always move the shorter line, in O(n) time."
---

# Container With Most Water

<ProblemMeta />

## Problem

You are given a list `height`. Each value is the height of a vertical line standing at that index. Pick two lines. Together with the ground they form a container, and it holds water up to the shorter of the two. Return the largest amount of water any pair can hold.

The amount for lines `i` and `j` is `min(height[i], height[j]) * (j - i)`.

| Input | Output | Pair |
| --- | --- | --- |
| `[1, 8, 6, 2, 5, 4, 8, 3, 7]` | `49` | heights 8 and 7, 7 apart |
| `[1, 1]` | `1` | |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def maxArea(self, height: list[int]) -> int:
        pass


print(Solution().maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
print(Solution().maxArea([1, 1]))
print(Solution().maxArea([4, 3, 2, 1, 4]))
```

::: details Solution
**Idea.** Start with the widest container: one pointer at each end. Every other container is narrower, so it can only hold more if its shorter line is taller.

Moving the taller line inward can never help. The width shrinks, and the water level is still capped by the shorter line that stayed. So always move the pointer at the shorter line, record the best amount seen, and stop when the pointers meet.

```python
class Solution:
    def maxArea(self, height: list[int]) -> int:
        most_water = 0
        left, right = 0, len(height) - 1

        while left < right:
            area = min(height[left], height[right]) * (right - left)
            most_water = max(most_water, area)
            if height[left] > height[right]:
                right -= 1
            else:
                left += 1
        return most_water


print(Solution().maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
print(Solution().maxArea([1, 1]))
print(Solution().maxArea([4, 3, 2, 1, 4]))
```

**Time** `O(n)`, **space** `O(1)`.

**Brute force.** Try every pair of lines. It is correct and easy to trust, which makes it useful for testing the faster version, but it is too slow for long inputs.

```python
class Solution:
    def maxArea(self, height: list[int]) -> int:
        most_water = 0
        for i in range(len(height)):
            for j in range(i + 1, len(height)):
                most_water = max(most_water, min(height[i], height[j]) * (j - i))
        return most_water


print(Solution().maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
print(Solution().maxArea([1, 1]))
print(Solution().maxArea([4, 3, 2, 1, 4]))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
