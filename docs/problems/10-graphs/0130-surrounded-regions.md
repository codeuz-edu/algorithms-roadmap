---
title: Surrounded Regions
description: "Surrounded Regions in Python: mark every O connected to the border as safe, then flip all the remaining O cells to X."
---

# Surrounded Regions

<ProblemMeta />

## Problem

You are given a grid `board` of `"X"` and `"O"` characters. A region is a group of `"O"` cells connected through their sides. A region is captured when none of its cells lies on the edge of the board, which means it is completely enclosed by `"X"` cells. Turn every cell of every captured region into `"X"`. Change the board in place and return nothing.

Below, the region on the left is enclosed and gets captured. The region on the right reaches the right edge, so it stays.

```
Before       After
X X X X X    X X X X X
X O X O X    X X X O X
X O X O O    X X X O O
X X X X X    X X X X X
```

## Try it yourself

Fill in the method, then press **Check**. `show` prints the board after your method has changed it, one string per row.

```python
class Solution:
    def solve(self, board: list[list[str]]) -> None:
        pass


def show(rows):
    board = [list(row) for row in rows]
    Solution().solve(board)
    print(["".join(row) for row in board])


show(["XXXXX", "XOXOX", "XOXOO", "XXXXX"])
show(["OXXO", "XOOX", "XOXX", "XXOX"])
show(["OOO", "OOO", "OOO"])
show(["XXX", "XOX", "XXX"])
show(["O"])
```

::: details Solution
**Idea.** Deciding directly whether a region is enclosed is awkward: you only know after exploring all of it. The opposite question is easy. A region survives exactly when it contains a border cell. So every surviving `"O"` can be reached from some `"O"` on the border by moving through `"O"` cells.

That gives three steps. First, start a flood fill from every `"O"` on the four edges and mark each cell it reaches with a temporary letter, here `"S"` for safe. Second, every `"O"` still left on the board was not reached from the border, so it belongs to a captured region: turn it into `"X"`. Third, turn each `"S"` back into `"O"`. The second and third steps fit in one pass over the board.

```python
class Solution:
    def solve(self, board: list[list[str]]) -> None:
        rows, cols = len(board), len(board[0])

        def mark_safe(r, c):
            if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != "O":
                return
            board[r][c] = "S"
            mark_safe(r + 1, c)
            mark_safe(r - 1, c)
            mark_safe(r, c + 1)
            mark_safe(r, c - 1)

        for r in range(rows):
            mark_safe(r, 0)
            mark_safe(r, cols - 1)
        for c in range(cols):
            mark_safe(0, c)
            mark_safe(rows - 1, c)

        for r in range(rows):
            for c in range(cols):
                board[r][c] = "O" if board[r][c] == "S" else "X"


def show(rows):
    board = [list(row) for row in rows]
    Solution().solve(board)
    print(["".join(row) for row in board])


show(["XXXXX", "XOXOX", "XOXOO", "XXXXX"])
show(["OXXO", "XOOX", "XOXX", "XXOX"])
show(["OOO", "OOO", "OOO"])
show(["XXX", "XOX", "XXX"])
show(["O"])
```

**Time** `O(m · n)` for an `m × n` board, **space** `O(m · n)` for the recursion in the worst case.

**Breadth-first search.** The marking step can use a queue filled with all the border `"O"` cells at once, which avoids deep recursion on a large board. The final pass is unchanged.

```python
from collections import deque


class Solution:
    def solve(self, board: list[list[str]]) -> None:
        rows, cols = len(board), len(board[0])

        queue = deque()
        for r in range(rows):
            for c in range(cols):
                on_border = r in (0, rows - 1) or c in (0, cols - 1)
                if on_border and board[r][c] == "O":
                    board[r][c] = "S"
                    queue.append((r, c))

        while queue:
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] == "O":
                    board[nr][nc] = "S"
                    queue.append((nr, nc))

        for r in range(rows):
            for c in range(cols):
                board[r][c] = "O" if board[r][c] == "S" else "X"


def show(rows):
    board = [list(row) for row in rows]
    Solution().solve(board)
    print(["".join(row) for row in board])


show(["XXXXX", "XOXOX", "XOXOO", "XXXXX"])
show(["OXXO", "XOOX", "XOXX", "XXOX"])
show(["OOO", "OOO", "OOO"])
show(["XXX", "XOX", "XXX"])
show(["O"])
```

**Time** `O(m · n)`, **space** `O(m · n)` for the queue in the worst case.
:::
