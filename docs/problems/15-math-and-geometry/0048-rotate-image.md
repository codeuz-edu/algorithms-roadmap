---
title: Rotate Image
description: "Rotate Image in Python: rotate a square matrix 90 degrees in place by transposing and reversing rows, or by cycling four cells at a time."
---

# Rotate Image

<ProblemMeta />

## Problem

You are given a square `n x n` matrix. Turn it 90 degrees clockwise by changing the matrix itself. Do not build a second matrix.

| Before | After |
| --- | --- |
| `[[1, 2, 3], [4, 5, 6], [7, 8, 9]]` | `[[7, 4, 1], [8, 5, 2], [9, 6, 3]]` |
| `[[1, 2], [3, 4]]` | `[[3, 1], [4, 2]]` |

## Try it yourself

Fill in the method, then press **Check**. The method returns nothing: `show` calls it and prints the matrix afterwards, and that output is compared with the solution below.

```python
class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        pass


def show(matrix):
    Solution().rotate(matrix)
    print(matrix)


show([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
show([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
show([[1, 2], [3, 4]])
show([[1]])
```

::: details Solution
**Idea.** In a clockwise quarter turn, the cell at row `r`, column `c` moves to row `c`, column `n - 1 - r`. That move can be done in two simple steps:

1. Transpose: swap `(r, c)` with `(c, r)`. The cell is now at row `c`, column `r`.
2. Reverse every row: column `r` becomes column `n - 1 - r`.

Both steps only swap pairs of cells, so no second matrix is needed. In the transpose, the inner loop starts at `r + 1`. Looping over every cell would swap each pair twice and undo the work.

```python
class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        n = len(matrix)
        for r in range(n):
            for c in range(r + 1, n):
                matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
        for row in matrix:
            row.reverse()


def show(matrix):
    Solution().rotate(matrix)
    print(matrix)


show([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
show([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
show([[1, 2], [3, 4]])
show([[1]])
```

**Time** `O(n²)`, **space** `O(1)`.

**Four cells at a time.** A quarter turn sends each cell to a position whose own value moves on, and after four moves the chain is back where it began. So the matrix is made of groups of four cells that trade places. Work ring by ring from the outside in. For each cell on the top edge of a ring, save it, then pull the left value up to the top, the bottom value to the left, the right value to the bottom, and put the saved value on the right. Each cell is written once.

```python
class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        n = len(matrix)
        for i in range(n // 2):
            last = n - 1 - i
            for j in range(i, last):
                k = n - 1 - j
                saved = matrix[i][j]
                matrix[i][j] = matrix[k][i]
                matrix[k][i] = matrix[last][k]
                matrix[last][k] = matrix[j][last]
                matrix[j][last] = saved


def show(matrix):
    Solution().rotate(matrix)
    print(matrix)


show([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
show([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
show([[1, 2], [3, 4]])
show([[1]])
```

**Time** `O(n²)`, **space** `O(1)`.
:::
