---
title: Pacific Atlantic Water Flow
description: "Pacific Atlantic Water Flow in Python: search uphill from each ocean and return the cells reached from both."
---

# Pacific Atlantic Water Flow

<ProblemMeta />

## Problem

You are given a grid `heights` describing an island. The Pacific ocean touches the top and left edges, and the Atlantic ocean touches the bottom and right edges. Rain water on a cell can flow to a neighbouring cell (up, down, left, right) if that neighbour is not higher than the cell, and water on an edge cell can flow into the ocean touching that edge. Return the coordinates `[row, col]` of every cell from which water can reach both oceans.

| Input | Output | Why |
| --- | --- | --- |
| `[[1, 2], [4, 3]]` | `[[0, 1], [1, 0], [1, 1]]` | the top-left cell touches the Pacific, but both of its neighbours are higher, so its water never reaches the Atlantic |
| `[[5]]` | `[[0, 0]]` | a single cell touches both oceans |

## Try it yourself

Fill in the method, then press **Check**. The cells can be returned in any order: `show` sorts them before printing.

```python
class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        pass


def show(result):
    print(sorted(result or []))


show(Solution().pacificAtlantic([[1, 2], [4, 3]]))
show(Solution().pacificAtlantic([[1, 2, 3], [8, 9, 4], [7, 6, 5]]))
show(Solution().pacificAtlantic([[3, 3, 3], [3, 1, 3], [3, 3, 3]]))
show(Solution().pacificAtlantic([[5]]))
show(Solution().pacificAtlantic([[4, 2, 1, 2, 4]]))
```

::: details Solution
**Idea.** Following the water down from every cell would mean one search per cell. It is cheaper to walk the other way. Start at the cells on an ocean's edge and climb: move from a cell to any neighbour that is at least as high. If the search can climb from the ocean to a cell, then water can flow from that cell down the same path into the ocean. So the set of cells reached by climbing from the Pacific edges is exactly the set of cells that drain into the Pacific.

Run the search once for each ocean, each with its own visited set. All the edge cells of one ocean share a set, so each cell is explored at most once per ocean. The answer is the cells that appear in both sets.

```python
class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        rows, cols = len(heights), len(heights[0])
        pacific, atlantic = set(), set()

        def climb(r, c, reached):
            reached.add((r, c))
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if (
                    0 <= nr < rows
                    and 0 <= nc < cols
                    and (nr, nc) not in reached
                    and heights[nr][nc] >= heights[r][c]
                ):
                    climb(nr, nc, reached)

        for r in range(rows):
            climb(r, 0, pacific)
            climb(r, cols - 1, atlantic)
        for c in range(cols):
            climb(0, c, pacific)
            climb(rows - 1, c, atlantic)

        return [[r, c] for r, c in pacific & atlantic]


def show(result):
    print(sorted(result or []))


show(Solution().pacificAtlantic([[1, 2], [4, 3]]))
show(Solution().pacificAtlantic([[1, 2, 3], [8, 9, 4], [7, 6, 5]]))
show(Solution().pacificAtlantic([[3, 3, 3], [3, 1, 3], [3, 3, 3]]))
show(Solution().pacificAtlantic([[5]]))
show(Solution().pacificAtlantic([[4, 2, 1, 2, 4]]))
```

**Time** `O(m · n)` for an `m × n` grid, **space** `O(m · n)` for the two sets and the recursion.

**Breadth-first search.** The climb can also run from a queue that starts with all the edge cells of one ocean. This avoids deep recursion on large grids. The result is the same, because only the set of reachable cells matters, not the order in which they are found.

```python
from collections import deque


class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        rows, cols = len(heights), len(heights[0])

        def climb(starts):
            reached = set(starts)
            queue = deque(reached)
            while queue:
                r, c = queue.popleft()
                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                    if (
                        0 <= nr < rows
                        and 0 <= nc < cols
                        and (nr, nc) not in reached
                        and heights[nr][nc] >= heights[r][c]
                    ):
                        reached.add((nr, nc))
                        queue.append((nr, nc))
            return reached

        pacific = climb([(r, 0) for r in range(rows)] + [(0, c) for c in range(cols)])
        atlantic = climb([(r, cols - 1) for r in range(rows)] + [(rows - 1, c) for c in range(cols)])
        return [[r, c] for r, c in pacific & atlantic]


def show(result):
    print(sorted(result or []))


show(Solution().pacificAtlantic([[1, 2], [4, 3]]))
show(Solution().pacificAtlantic([[1, 2, 3], [8, 9, 4], [7, 6, 5]]))
show(Solution().pacificAtlantic([[3, 3, 3], [3, 1, 3], [3, 3, 3]]))
show(Solution().pacificAtlantic([[5]]))
show(Solution().pacificAtlantic([[4, 2, 1, 2, 4]]))
```

**Time** `O(m · n)`, **space** `O(m · n)`.
:::
