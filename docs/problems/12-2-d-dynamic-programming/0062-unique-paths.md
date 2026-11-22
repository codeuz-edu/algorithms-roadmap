---
title: Unique Paths
description: "Unique Paths in Python: count grid paths with a table where each cell is the sum of the cell above and the cell to the left."
---

# Unique Paths

<ProblemMeta />

## Problem

A robot stands in the top-left cell of a grid with `m` rows and `n` columns. It can only step right or down. Count the different routes that end in the bottom-right cell.

| Input | Output |
| --- | --- |
| `m = 3`, `n = 3` | `6` |
| `m = 3`, `n = 7` | `28` |
| `m = 1`, `n = 1` | `1` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        pass


print(Solution().uniquePaths(3, 3))
print(Solution().uniquePaths(3, 7))
print(Solution().uniquePaths(2, 5))
print(Solution().uniquePaths(1, 1))
```

::: details Solution
**Idea.** Let `dp[i][j]` be the number of routes from the start to the cell in row `i`, column `j`. The robot can only arrive from the cell above or from the cell on the left, and those two groups of routes never overlap, because they differ in their last step. So `dp[i][j] = dp[i - 1][j] + dp[i][j - 1]`.

Every cell in the first row and the first column has exactly one route: a straight line. Start the whole table at 1 and fill the rest row by row, so both neighbours are ready when a cell needs them.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n for _ in range(m)]
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        return dp[m - 1][n - 1]


print(Solution().uniquePaths(3, 3))
print(Solution().uniquePaths(3, 7))
print(Solution().uniquePaths(2, 5))
print(Solution().uniquePaths(1, 1))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**One row.** A cell only reads the row above it and the cell to its left. Keep a single list. Before it is updated, `row[j]` still holds the value from the row above. After the update of `row[j - 1]`, that entry holds the value to the left. Adding the two in place gives the new row.

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                row[j] += row[j - 1]
        return row[n - 1]


print(Solution().uniquePaths(3, 3))
print(Solution().uniquePaths(3, 7))
print(Solution().uniquePaths(2, 5))
print(Solution().uniquePaths(1, 1))
```

**Time** `O(m · n)`, **space** `O(n)`.
:::
