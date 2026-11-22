---
title: Rotting Oranges
description: "Rotting Oranges in Python: multi-source breadth-first search from all rotten oranges, one level per minute."
---

# Rotting Oranges

<ProblemMeta />

## Problem

You are given a grid where `0` is an empty cell, `1` is a fresh orange and `2` is a rotten orange. Every minute, each fresh orange that sits directly above, below, left or right of a rotten one becomes rotten. Return the number of minutes until no fresh orange is left, or `-1` if some fresh orange can never rot.

| Input | Output | Why |
| --- | --- | --- |
| `[[2, 1, 1], [0, 1, 0]]` | `2` | the middle orange rots first, then the two next to it |
| `[[2, 0, 1]]` | `-1` | the empty cell shields the fresh orange |
| `[[0, 2]]` | `0` | nothing is fresh at the start |

## Try it yourself

Fill in the method, then press **Check**. The grids are written as strings of digits and converted to lists of integers.

```python
class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        pass


grids = [
    ["211", "010"],
    ["2110", "0110", "0012"],
    ["201"],
    ["02"],
    ["0"],
]

for rows in grids:
    print(Solution().orangesRotting([[int(cell) for cell in row] for row in rows]))
```

::: details Solution
**Idea.** Rot spreads one cell per minute from every rotten orange at the same time. That is exactly how breadth-first search expands when its queue starts with several cells: level by level, where each level is one more step from the nearest source. So put all the rotten oranges in the queue, and let one level of the search be one minute.

To process a level, note the queue's length first and pop exactly that many cells. Everything appended during those pops belongs to the next minute. A fresh orange is turned into `2` when it is queued, so it cannot be queued a second time.

Count the fresh oranges before starting and decrease the count each time one rots. The loop stops when the queue is empty or nothing fresh remains. Stopping on the fresh count avoids counting a final minute in which the last rotten oranges have nothing left to infect. If fresh oranges remain when the queue runs dry, they are unreachable and the answer is `-1`.

```python
from collections import deque


class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1

        minutes = 0
        while queue and fresh:
            minutes += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        queue.append((nr, nc))

        return minutes if fresh == 0 else -1


grids = [
    ["211", "010"],
    ["2110", "0110", "0012"],
    ["201"],
    ["02"],
    ["0"],
]

for rows in grids:
    print(Solution().orangesRotting([[int(cell) for cell in row] for row in rows]))
```

**Time** `O(m · n)` for an `m × n` grid, **space** `O(m · n)` for the queue.
:::
