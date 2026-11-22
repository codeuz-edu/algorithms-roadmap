---
title: Trapping Rain Water
description: "Trapping Rain Water in Python: two pointers that track the tallest wall seen from each side, in O(n) time and O(1) space."
---

# Trapping Rain Water

<ProblemMeta />

## Problem

You are given a list `height`. Each value is the height of a wall one unit wide, and the walls stand side by side. After rain, water stays in the dips between taller walls. Return how many units of water are held in total.

| Input | Output | Why |
| --- | --- | --- |
| `[3, 0, 2, 0, 4]` | `7` | 3 + 1 + 3 above the three inner positions |
| `[2, 0, 2]` | `2` | |
| `[1, 2, 3]` | `0` | water runs off the low side |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def trap(self, height: list[int]) -> int:
        pass


print(Solution().trap([3, 0, 2, 0, 4]))
print(Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
print(Solution().trap([4, 2, 0, 3, 2, 5]))
print(Solution().trap([1, 2, 3]))
print(Solution().trap([5]))
```

::: details Solution
**Idea.** Look at one position on its own. Water above it rises until it can escape, and it escapes over the lower of two walls: the tallest wall anywhere to its left and the tallest wall anywhere to its right. So the water above position `i` is `min(tallest on the left, tallest on the right) - height[i]`, counting the position itself in both maximums so the result is never negative.

Two pointers get both maximums without extra lists. Keep `left_max` for everything the left pointer has passed and `right_max` for everything the right pointer has passed. When `height[left] < height[right]`, the wall at `right` is at least as tall as `left_max` (otherwise the left pointer would not have got this far while the right one waited), so the right side is not the limit for position `left`. Its water level is `left_max`, and it can be settled now. The other case is the mirror image.

```python
class Solution:
    def trap(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        left_max = right_max = 0
        water = 0
        while left < right:
            if height[left] < height[right]:
                left_max = max(left_max, height[left])
                water += left_max - height[left]
                left += 1
            else:
                right_max = max(right_max, height[right])
                water += right_max - height[right]
                right -= 1
        return water


print(Solution().trap([3, 0, 2, 0, 4]))
print(Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
print(Solution().trap([4, 2, 0, 3, 2, 5]))
print(Solution().trap([1, 2, 3]))
print(Solution().trap([5]))
```

**Time** `O(n)`, **space** `O(1)`.

**With two helper lists.** The formula can be applied directly. Build one list with the tallest wall up to each position from the left, another from the right, then add up `min(left, right) - height` for every position. This is easier to get right and is a good first answer before the two pointer version.

```python
class Solution:
    def trap(self, height: list[int]) -> int:
        n = len(height)
        tallest_left = [0] * n
        tallest_right = [0] * n

        tallest = 0
        for i in range(n):
            tallest = max(tallest, height[i])
            tallest_left[i] = tallest

        tallest = 0
        for i in range(n - 1, -1, -1):
            tallest = max(tallest, height[i])
            tallest_right[i] = tallest

        water = 0
        for i in range(n):
            water += min(tallest_left[i], tallest_right[i]) - height[i]
        return water


print(Solution().trap([3, 0, 2, 0, 4]))
print(Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
print(Solution().trap([4, 2, 0, 3, 2, 5]))
print(Solution().trap([1, 2, 3]))
print(Solution().trap([5]))
```

**Time** `O(n)`, **space** `O(n)`.
:::
