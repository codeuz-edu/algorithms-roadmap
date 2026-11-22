---
title: Max Area of Island
description: "Max Area of Island in Python: flood fill each island with depth-first search and keep the largest cell count."
---

# Max Area of Island

<ProblemMeta />

## Problem

You are given a grid of integers where `1` is land and `0` is water. An island is a group of land cells connected through their sides (not diagonally), and its area is the number of cells in it. Return the area of the largest island, or `0` if there is no land.

In the grid below the largest island is the L shape on the left, with area 4.

```
1 0 0 1 1
1 0 0 0 1
1 1 0 0 0
0 0 0 1 0
```

## Try it yourself

Fill in the method, then press **Check**. The tests are the grid above, a grid where two islands touch only at a corner, and two single-cell grids.

```python
class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        pass


grids = [
    ["10011", "10001", "11000", "00010"],
    ["110", "110", "001"],
    ["0"],
    ["1"],
]

for rows in grids:
    print(Solution().maxAreaOfIsland([[int(cell) for cell in row] for row in rows]))
```

::: details Solution
**Idea.** This is [Number of Islands](/problems/number-of-islands) with one change: the flood fill reports how many cells it covered. Define the area reachable from a cell as 0 if the cell is water or outside the grid, and otherwise 1 for the cell itself plus the areas reachable through its four neighbours.

For that sum to be correct, no cell may be counted twice. Setting the cell to `0` before visiting its neighbours ensures that: once counted, a cell looks like water to every later call. The answer is the largest value returned over all starting cells.

```python
class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        rows, cols = len(grid), len(grid[0])

        def area(r, c):
            if not (0 <= r < rows and 0 <= c < cols) or grid[r][c] != 1:
                return 0
            grid[r][c] = 0
            return 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)

        return max(area(r, c) for r in range(rows) for c in range(cols))


grids = [
    ["10011", "10001", "11000", "00010"],
    ["110", "110", "001"],
    ["0"],
    ["1"],
]

for rows in grids:
    print(Solution().maxAreaOfIsland([[int(cell) for cell in row] for row in rows]))
```

**Time** `O(m · n)` for an `m × n` grid, **space** `O(m · n)` for the recursion in the worst case.

**With an explicit stack.** The same search without recursion. Cells waiting to be explored sit on a list used as a stack. A cell is marked when it is pushed, so it is pushed only once, and the area is the number of cells popped.

```python
class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        best = 0

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] != 1:
                    continue
                grid[r][c] = 0
                stack = [(r, c)]
                area = 0
                while stack:
                    row, col = stack.pop()
                    area += 1
                    for nr, nc in ((row + 1, col), (row - 1, col), (row, col + 1), (row, col - 1)):
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                            grid[nr][nc] = 0
                            stack.append((nr, nc))
                best = max(best, area)
        return best


grids = [
    ["10011", "10001", "11000", "00010"],
    ["110", "110", "001"],
    ["0"],
    ["1"],
]

for rows in grids:
    print(Solution().maxAreaOfIsland([[int(cell) for cell in row] for row in rows]))
```

**Time** `O(m · n)`, **space** `O(m · n)` for the stack in the worst case.
:::
