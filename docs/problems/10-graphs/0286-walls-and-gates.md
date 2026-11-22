---
title: Walls and Gates
description: "Walls and Gates in Python: multi-source breadth-first search that starts from every gate at once and fills in distances."
---

# Walls and Gates

<ProblemMeta />

## Problem

You are given a grid `rooms` where each cell holds one of three values:

- `-1` is a wall, which cannot be entered.
- `0` is a gate.
- `2147483647` (the largest 32-bit signed integer, called `INF` below) is an empty room.

Replace the value of every empty room with the number of steps to its nearest gate. A step moves one cell up, down, left or right, and a path cannot pass through walls. A room that cannot reach any gate keeps the value `INF`. Change the grid in place and return nothing.

```
Before                After
INF  -1   0  INF        2  -1   0   1
INF INF INF  -1        1   2   1  -1
  0  -1 INF INF        0  -1   2   3
```

## Try it yourself

Fill in the method, then press **Check**. `show` prints the grid after your method has changed it, writing `INF` for rooms that are still empty. The tests are the grid above, a room cut off by a wall, a grid with no gate, and a single gate.

```python
INF = 2147483647


class Solution:
    def wallsAndGates(self, rooms: list[list[int]]) -> None:
        pass


def show(rooms):
    Solution().wallsAndGates(rooms)
    print([["INF" if value == INF else value for value in row] for row in rooms])


show([
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [0, -1, INF, INF],
])
show([[0, INF, -1, INF]])
show([[INF, INF], [-1, INF]])
show([[0]])
```

::: details Solution
**Idea.** Searching outwards from every room to find its nearest gate repeats a lot of work. Turn the question around and search outwards from the gates.

Breadth-first search visits cells in order of distance from its starting point: first everything 1 step away, then everything 2 steps away, and so on. If the queue starts with all the gates in it, the search behaves as if the gates were one starting point. It reaches every room at distance 1 from any gate, then every room at distance 2 from any gate, and so on. So the first time the search reaches a room, it has come from that room's nearest gate, and the distance written at that moment is final.

The grid itself records what has been visited. A room that still holds `INF` has not been reached yet. Once a distance is written, the room no longer equals `INF` and is never queued again. Walls and gates never equal `INF`, so they are skipped by the same test.

```python
from collections import deque

INF = 2147483647


class Solution:
    def wallsAndGates(self, rooms: list[list[int]]) -> None:
        if not rooms or not rooms[0]:
            return

        rows, cols = len(rooms), len(rooms[0])
        queue = deque((r, c) for r in range(rows) for c in range(cols) if rooms[r][c] == 0)

        while queue:
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                    rooms[nr][nc] = rooms[r][c] + 1
                    queue.append((nr, nc))


def show(rooms):
    Solution().wallsAndGates(rooms)
    print([["INF" if value == INF else value for value in row] for row in rooms])


show([
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [0, -1, INF, INF],
])
show([[0, INF, -1, INF]])
show([[INF, INF], [-1, INF]])
show([[0]])
```

**Time** `O(m · n)` for an `m × n` grid, because every cell enters the queue at most once however many gates there are. **Space** `O(m · n)` for the queue.
:::
