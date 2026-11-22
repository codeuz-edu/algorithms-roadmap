---
title: Search a 2D Matrix
description: "Search a 2D Matrix in Python: treat the sorted matrix as one long sorted list and binary search it in O(log(m · n))."
---

# Search a 2D Matrix

<ProblemMeta />

## Problem

You are given a grid of integers `matrix` and an integer `target`. Every row is sorted from left to right, and each row starts with a number larger than the last number of the row above. Return `True` if `target` appears in the grid. The search must take `O(log(m · n))` time for `m` rows and `n` columns.

For the grid below, `12` gives `True` and `13` gives `False`.

```text
 2   4   6
 9  12  15
20  21  30
```

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        pass


grid = [[2, 4, 6], [9, 12, 15], [20, 21, 30]]
print(Solution().searchMatrix(grid, 12))
print(Solution().searchMatrix(grid, 13))
print(Solution().searchMatrix(grid, 30))
print(Solution().searchMatrix(grid, 1))
print(Solution().searchMatrix([[7]], 7))
```

::: details Solution
**Idea.** Read the rows one after another and you get a single sorted list of `m · n` numbers. That is all the two rules about the grid say. So run an ordinary [Binary Search](/problems/binary-search) over positions `0` to `m · n - 1` and translate each position into a cell when you need its value.

With `n` columns, position `p` is in row `p // n` and column `p % n`: every full row before it uses up `n` positions, and the remainder is the offset inside its own row. No list is actually built, so the extra memory is constant.

```python
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        rows, cols = len(matrix), len(matrix[0])
        left, right = 0, rows * cols - 1
        while left <= right:
            mid = (left + right) // 2
            value = matrix[mid // cols][mid % cols]
            if value == target:
                return True
            if value < target:
                left = mid + 1
            else:
                right = mid - 1
        return False


grid = [[2, 4, 6], [9, 12, 15], [20, 21, 30]]
print(Solution().searchMatrix(grid, 12))
print(Solution().searchMatrix(grid, 13))
print(Solution().searchMatrix(grid, 30))
print(Solution().searchMatrix(grid, 1))
print(Solution().searchMatrix([[7]], 7))
```

**Time** `O(log(m · n))`, **space** `O(1)`.

**Staircase walk.** Start in the top-right corner. If the value there is larger than the target, the target cannot be in this column, since everything below is larger still, so step left. If it is smaller, the target cannot be in this row, so step down. Each step removes a row or a column. This is slower than the required bound, but it needs only that rows and columns are each sorted, so it also solves the harder variant where rows do not continue one another.

```python
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        row, col = 0, len(matrix[0]) - 1
        while row < len(matrix) and col >= 0:
            value = matrix[row][col]
            if value == target:
                return True
            if value > target:
                col -= 1
            else:
                row += 1
        return False


grid = [[2, 4, 6], [9, 12, 15], [20, 21, 30]]
print(Solution().searchMatrix(grid, 12))
print(Solution().searchMatrix(grid, 13))
print(Solution().searchMatrix(grid, 30))
print(Solution().searchMatrix(grid, 1))
print(Solution().searchMatrix([[7]], 7))
```

**Time** `O(m + n)`, **space** `O(1)`.
:::
