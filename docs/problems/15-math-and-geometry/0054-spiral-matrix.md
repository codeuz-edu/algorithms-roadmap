---
title: Spiral Matrix
description: "Spiral Matrix in Python: read a matrix in spiral order by shrinking four boundaries, or by walking and turning when blocked."
---

# Spiral Matrix

<ProblemMeta />

## Problem

Given a matrix with `m` rows and `n` columns, return all of its values in clockwise spiral order: start at the top-left, go right along the top row, down the right column, left along the bottom row, up the left column, and keep circling inwards.

| Input | Output |
| --- | --- |
| `[[1, 2, 3], [4, 5, 6], [7, 8, 9]]` | `[1, 2, 3, 6, 9, 8, 7, 4, 5]` |
| `[[1, 2, 3, 4], [5, 6, 7, 8]]` | `[1, 2, 3, 4, 8, 7, 6, 5]` |
| `[[1], [2], [3]]` | `[1, 2, 3]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        pass


print(Solution().spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
print(Solution().spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
print(Solution().spiralOrder([[1, 2, 3]]))
print(Solution().spiralOrder([[1], [2], [3]]))
print(Solution().spiralOrder([[5]]))
```

::: details Solution
**Idea.** Keep four boundaries around the part of the matrix that has not been read yet: `top`, `bottom`, `left` and `right`. One lap reads the top row, the right column, the bottom row and the left column. After each side is read, move its boundary one step inwards, so that side is never read again.

The only trap is a region that is a single row or a single column. After the top row is read and `top` moves down, there may be no rows left, and reading the "bottom row" would repeat the row just read. The same goes for the left column. So the last two sides each check that something remains before they read.

```python
class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        result = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            for c in range(left, right + 1):
                result.append(matrix[top][c])
            top += 1

            for r in range(top, bottom + 1):
                result.append(matrix[r][right])
            right -= 1

            if top <= bottom:
                for c in range(right, left - 1, -1):
                    result.append(matrix[bottom][c])
                bottom -= 1

            if left <= right:
                for r in range(bottom, top - 1, -1):
                    result.append(matrix[r][left])
                left += 1

        return result


print(Solution().spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
print(Solution().spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
print(Solution().spiralOrder([[1, 2, 3]]))
print(Solution().spiralOrder([[1], [2], [3]]))
print(Solution().spiralOrder([[5]]))
```

**Time** `O(m · n)`, **space** `O(1)` besides the answer.

**Walk and turn.** Simulate the walk one cell at a time. Keep a direction, and before each step check the next cell. If it is outside the matrix or already visited, turn right. The directions are stored in clockwise order, so a turn is just the next entry. This is easier to get right, at the cost of a visited grid.

```python
class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        rows, cols = len(matrix), len(matrix[0])
        seen = [[False] * cols for _ in range(rows)]
        moves = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        result = []
        r = c = d = 0

        for _ in range(rows * cols):
            result.append(matrix[r][c])
            seen[r][c] = True
            nr, nc = r + moves[d][0], c + moves[d][1]
            if not (0 <= nr < rows and 0 <= nc < cols) or seen[nr][nc]:
                d = (d + 1) % 4
                nr, nc = r + moves[d][0], c + moves[d][1]
            r, c = nr, nc

        return result


print(Solution().spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
print(Solution().spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))
print(Solution().spiralOrder([[1, 2, 3]]))
print(Solution().spiralOrder([[1], [2], [3]]))
print(Solution().spiralOrder([[5]]))
```

**Time** `O(m · n)`, **space** `O(m · n)`.
:::
