---
title: Longest Increasing Path in a Matrix
description: "Longest Increasing Path in a Matrix in Python: memoised depth-first search, then a recursion-free pass over the cells in sorted order."
---

# Longest Increasing Path in a Matrix

<ProblemMeta />

## Problem

You are given a grid of integers. A path moves between cells that share a side, and every step must land on a strictly larger value. Return the number of cells on the longest such path.

| Input | Output | Why |
| --- | --- | --- |
| `[[9, 9, 4], [6, 6, 8], [2, 1, 1]]` | `4` | `1 → 2 → 6 → 9` |
| `[[1, 2, 3], [6, 5, 4], [7, 8, 9]]` | `9` | the values snake through every cell |
| `[[1, 1], [1, 1]]` | `1` | equal values are not an increase |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        pass


print(Solution().longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))
print(Solution().longestIncreasingPath([[1, 2, 3], [6, 5, 4], [7, 8, 9]]))
print(Solution().longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]))
print(Solution().longestIncreasingPath([[1, 1], [1, 1]]))
print(Solution().longestIncreasingPath([[7]]))
```

::: details Solution
**Idea.** Let `best[r][c]` be the length of the longest increasing path that starts at cell `(r, c)`. From a cell you may step to any neighbour with a larger value, so `best[r][c]` is 1 plus the largest `best` among those neighbours, or just 1 if there are none.

Two things make this easy. A path can never return to a cell, because values only go up, so no visited set is needed. And the answer for a cell does not depend on how you got there, so it can be computed once and cached. Each cell is solved one time and looks at four neighbours.

```python
from functools import cache


class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        rows, cols = len(matrix), len(matrix[0])

        @cache
        def longest(r: int, c: int) -> int:
            best = 1
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + longest(nr, nc))
            return best

        return max(longest(r, c) for r in range(rows) for c in range(cols))


print(Solution().longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))
print(Solution().longestIncreasingPath([[1, 2, 3], [6, 5, 4], [7, 8, 9]]))
print(Solution().longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]))
print(Solution().longestIncreasingPath([[1, 1], [1, 1]]))
print(Solution().longestIncreasingPath([[7]]))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**Without recursion.** On a large grid the recursion can go as deep as the number of cells. To avoid that, fill the table in an order where every answer a cell needs is already known. Visit the cells from the largest value to the smallest. When a cell is processed, all of its larger neighbours have been processed before it.

```python
class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        rows, cols = len(matrix), len(matrix[0])
        best = [[1] * cols for _ in range(rows)]
        cells = sorted(((matrix[r][c], r, c) for r in range(rows) for c in range(cols)), reverse=True)

        for value, r, c in cells:
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > value:
                    best[r][c] = max(best[r][c], 1 + best[nr][nc])

        return max(max(row) for row in best)


print(Solution().longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))
print(Solution().longestIncreasingPath([[1, 2, 3], [6, 5, 4], [7, 8, 9]]))
print(Solution().longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]))
print(Solution().longestIncreasingPath([[1, 1], [1, 1]]))
print(Solution().longestIncreasingPath([[7]]))
```

**Time** `O(m · n · log(m · n))` for the sort, **space** `O(m · n)`.
:::
