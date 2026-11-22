---
title: Largest Rectangle in Histogram
description: "Largest Rectangle in Histogram in Python: a stack of bars with increasing heights finds how far each bar can stretch, in O(n)."
---

# Largest Rectangle in Histogram

<ProblemMeta />

## Problem

You are given a list `heights`. Each value is the height of a bar one unit wide, and the bars stand next to each other on a common baseline. Return the area of the largest rectangle that fits entirely inside the bars.

| Input | Output | Rectangle |
| --- | --- | --- |
| `[1, 2, 3, 4]` | `6` | height 2 across the last three bars, or height 3 across the last two |
| `[4, 0, 4]` | `4` | one bar on its own |
| `[3, 3, 3]` | `9` | all three bars |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        pass


print(Solution().largestRectangleArea([1, 2, 3, 4]))
print(Solution().largestRectangleArea([2, 1, 5, 6, 2, 3]))
print(Solution().largestRectangleArea([4, 0, 4]))
print(Solution().largestRectangleArea([3, 3, 3]))
print(Solution().largestRectangleArea([5]))
```

::: details Solution
**Idea.** The best rectangle has the full height of at least one bar inside it, otherwise it could be made taller. So it is enough to ask, for each bar, how wide a rectangle of exactly that height can be. It stretches left and right until it meets a shorter bar.

Walk left to right and keep a stack of rectangles that are still able to grow to the right, stored as `(start, height)` with heights increasing from bottom to top. When a new bar is shorter than the top entry, that rectangle cannot go any further: it ends just before the new bar, so its area is `height * (i - start)`. Pop it and record the area. Repeat while the top is taller than the new bar.

The new bar can then stretch back over everything that was just popped, because all of those bars were taller. So it is pushed with the `start` of the last entry popped, not with its own index. That is what makes the left boundary correct without a second pass.

Entries left on the stack at the end were never cut off, so they reach the right edge of the histogram.

```python
class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        best = 0
        stack = []
        for i, height in enumerate(heights):
            start = i
            while stack and stack[-1][1] > height:
                start, tall = stack.pop()
                best = max(best, tall * (i - start))
            stack.append((start, height))

        for start, height in stack:
            best = max(best, height * (len(heights) - start))
        return best


print(Solution().largestRectangleArea([1, 2, 3, 4]))
print(Solution().largestRectangleArea([2, 1, 5, 6, 2, 3]))
print(Solution().largestRectangleArea([4, 0, 4]))
print(Solution().largestRectangleArea([3, 3, 3]))
print(Solution().largestRectangleArea([5]))
```

**Time** `O(n)`: each bar is pushed once and popped at most once. **Space** `O(n)`.

**Brute force.** Try every left edge, extend the right edge one bar at a time, and keep the lowest bar seen. The rectangle over that range has the height of its lowest bar.

```python
class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        best = 0
        for left in range(len(heights)):
            lowest = heights[left]
            for right in range(left, len(heights)):
                lowest = min(lowest, heights[right])
                best = max(best, lowest * (right - left + 1))
        return best


print(Solution().largestRectangleArea([1, 2, 3, 4]))
print(Solution().largestRectangleArea([2, 1, 5, 6, 2, 3]))
print(Solution().largestRectangleArea([4, 0, 4]))
print(Solution().largestRectangleArea([3, 3, 3]))
print(Solution().largestRectangleArea([5]))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
