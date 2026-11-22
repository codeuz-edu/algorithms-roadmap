---
title: Set Matrix Zeroes
description: "Set Matrix Zeroes in Python: record the rows and columns to clear, then do it in constant space with the first row and column as markers."
---

# Set Matrix Zeroes

<ProblemMeta />

## Problem

You are given a matrix of integers. For every cell that holds `0`, set its whole row and its whole column to `0`. Change the matrix in place. Only the zeros that were there at the start count: a zero you write must not trigger more clearing.

| Before | After |
| --- | --- |
| `[[1, 1, 1], [1, 0, 1], [1, 1, 1]]` | `[[1, 0, 1], [0, 0, 0], [1, 0, 1]]` |
| `[[1, 0, 3], [0, 5, 6], [7, 8, 9]]` | `[[0, 0, 0], [0, 0, 0], [0, 0, 9]]` |

## Try it yourself

Fill in the method, then press **Check**. The method returns nothing: `show` calls it and prints the matrix afterwards, and that output is compared with the solution below.

```python
class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        pass


def show(matrix):
    Solution().setZeroes(matrix)
    print(matrix)


show([[1, 1, 1], [1, 0, 1], [1, 1, 1]])
show([[1, 2, 3, 4], [5, 6, 7, 0], [9, 10, 11, 12]])
show([[1, 0, 3], [0, 5, 6], [7, 8, 9]])
show([[1, 2], [3, 4]])
show([[0]])
```

::: details Solution
**Idea.** Clearing a row as soon as a zero is found destroys information: the new zeros look like original ones and the whole matrix ends up cleared. So split the work into two passes. The first pass only reads, and writes down which rows and which columns contain a zero. The second pass clears every cell whose row or column is on those lists.

```python
class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        zero_rows, zero_cols = set(), set()
        for r, row in enumerate(matrix):
            for c, value in enumerate(row):
                if value == 0:
                    zero_rows.add(r)
                    zero_cols.add(c)

        for r, row in enumerate(matrix):
            for c in range(len(row)):
                if r in zero_rows or c in zero_cols:
                    row[c] = 0


def show(matrix):
    Solution().setZeroes(matrix)
    print(matrix)


show([[1, 1, 1], [1, 0, 1], [1, 1, 1]])
show([[1, 2, 3, 4], [5, 6, 7, 0], [9, 10, 11, 12]])
show([[1, 0, 3], [0, 5, 6], [7, 8, 9]])
show([[1, 2], [3, 4]])
show([[0]])
```

**Time** `O(m · n)`, **space** `O(m + n)`.

**Constant space.** The notes can live inside the matrix. Use the first row to mark columns and the first column to mark rows: when cell `(r, c)` is zero, write a zero at `(r, 0)` and at `(0, c)`. Those two cells are going to be cleared anyway, so nothing is lost.

The first row and first column now mean two things, so remember up front whether each of them had a zero of its own. Then clear the inner cells from the markers, and only at the very end clear the first row and first column if needed. Clearing them earlier would turn every marker into a zero.

```python
class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        rows, cols = len(matrix), len(matrix[0])
        first_row = any(matrix[0][c] == 0 for c in range(cols))
        first_col = any(matrix[r][0] == 0 for r in range(rows))

        for r in range(1, rows):
            for c in range(1, cols):
                if matrix[r][c] == 0:
                    matrix[r][0] = 0
                    matrix[0][c] = 0

        for r in range(1, rows):
            for c in range(1, cols):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0

        if first_row:
            for c in range(cols):
                matrix[0][c] = 0
        if first_col:
            for r in range(rows):
                matrix[r][0] = 0


def show(matrix):
    Solution().setZeroes(matrix)
    print(matrix)


show([[1, 1, 1], [1, 0, 1], [1, 1, 1]])
show([[1, 2, 3, 4], [5, 6, 7, 0], [9, 10, 11, 12]])
show([[1, 0, 3], [0, 5, 6], [7, 8, 9]])
show([[1, 2], [3, 4]])
show([[0]])
```

**Time** `O(m · n)`, **space** `O(1)`.
:::
