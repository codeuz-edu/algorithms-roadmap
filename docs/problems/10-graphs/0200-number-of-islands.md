---
title: Number of Islands
description: "Number of Islands in Python: count connected groups of land cells with a depth-first or breadth-first flood fill."
---

# Number of Islands

<ProblemMeta />

## Problem

You are given a grid of characters where `"1"` is land and `"0"` is water. An island is a group of land cells connected through their sides (up, down, left, right, not diagonally). Everything outside the grid is water. Return the number of islands.

The grid below has 4 islands: the three cells at the top left, the single cell at the top right, the pair on the third row, and the single cell at the bottom left.

```
1 1 0 1
0 1 0 0
0 0 1 1
1 0 0 0
```

## Try it yourself

Fill in the method, then press **Check**. The tests are the grid above, a ring of land around one water cell, and two single-cell grids.

```python
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        pass


grids = [
    ["1101", "0100", "0011", "1000"],
    ["111", "101", "111"],
    ["0"],
    ["1"],
]

for rows in grids:
    print(Solution().numIslands([list(row) for row in rows]))
```

::: details Solution
**Idea.** Scan the grid cell by cell. The first time the scan meets a land cell, a new island has been found, so add one to the count. Then that whole island must be removed from consideration, or its other cells would be counted again later.

Removing it is a flood fill: from the found cell, visit every land cell reachable through sides and turn each one into water. Marking a cell before moving on to its neighbours guarantees the fill never returns to it. After the fill, any land the scan meets later belongs to an island that has not been counted yet.

This version changes the input grid. If that is not allowed, keep a set of visited cells instead.

```python
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        rows, cols = len(grid), len(grid[0])

        def sink(r, c):
            if not (0 <= r < rows and 0 <= c < cols) or grid[r][c] != "1":
                return
            grid[r][c] = "0"
            sink(r + 1, c)
            sink(r - 1, c)
            sink(r, c + 1)
            sink(r, c - 1)

        count = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    count += 1
                    sink(r, c)
        return count


grids = [
    ["1101", "0100", "0011", "1000"],
    ["111", "101", "111"],
    ["0"],
    ["1"],
]

for rows in grids:
    print(Solution().numIslands([list(row) for row in rows]))
```

**Time** `O(m · n)` for an `m × n` grid, since each cell is sunk at most once. **Space** `O(m · n)` for the recursion in the worst case, when one island snakes through the whole grid.

**Breadth-first search.** The recursion above can go as deep as the number of cells in an island, which may exceed Python's recursion limit on a large grid. A queue does the same flood fill with no recursion. Mark a cell when it is added to the queue, not when it is taken out, so no cell is queued twice.

```python
from collections import deque


class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        rows, cols = len(grid), len(grid[0])
        count = 0

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] != "1":
                    continue
                count += 1
                grid[r][c] = "0"
                queue = deque([(r, c)])
                while queue:
                    row, col = queue.popleft()
                    for nr, nc in ((row + 1, col), (row - 1, col), (row, col + 1), (row, col - 1)):
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1":
                            grid[nr][nc] = "0"
                            queue.append((nr, nc))
        return count


grids = [
    ["1101", "0100", "0011", "1000"],
    ["111", "101", "111"],
    ["0"],
    ["1"],
]

for rows in grids:
    print(Solution().numIslands([list(row) for row in rows]))
```

**Time** `O(m · n)`, **space** `O(min(m, n))` for the queue.
:::
