---
title: Detect Squares
description: "Detect Squares in Python: count axis-aligned squares by storing point counts in a dictionary and pairing the query with each diagonal corner."
---

# Detect Squares

<ProblemMeta />

## Problem

Design a class that receives points on a grid, one at a time. `add(point)` stores a point, and the same point may be added several times, with each copy counting separately. `count(point)` returns how many ways three stored points can be chosen so that, together with the query point, they are the corners of a square with sides parallel to the axes and a side length greater than zero.

For example, after adding `[1, 1]`, `[1, 4]` and `[4, 1]`, `count([4, 4])` is `1`. After adding `[1, 1]` a second time it becomes `2`, because either copy can be the far corner.

## Try it yourself

Fill in the class, then press **Check**. Your output is compared with the output of the solution below.

```python
class DetectSquares:
    def __init__(self):
        pass

    def add(self, point: list[int]) -> None:
        pass

    def count(self, point: list[int]) -> int:
        pass


squares = DetectSquares()
print(squares.count([4, 4]))
for point in [[1, 1], [1, 4], [4, 1]]:
    squares.add(point)
print(squares.count([4, 4]))
print(squares.count([4, 1]))
squares.add([1, 1])
print(squares.count([4, 4]))
for point in [[7, 1], [7, 4], [4, 7], [7, 7]]:
    squares.add(point)
print(squares.count([4, 4]))
print(squares.count([0, 0]))
```

::: details Solution
**Idea.** An axis-aligned square is fully determined by two opposite corners. If the query is `(px, py)` and the opposite corner is `(x, y)`, the other two corners must be `(x, py)` and `(px, y)`. The pair is a valid diagonal only when the horizontal and vertical distances are equal, `|px - x| == |py - y|`, and not zero.

Store how many times each point was added in a dictionary. For a query, try every distinct stored point as the opposite corner. When it forms a valid diagonal, the number of squares it gives is the product of three counts: copies of the diagonal point, copies of `(x, py)` and copies of `(px, y)`. A missing corner has count 0 and the product vanishes on its own.

The query point itself is not stored by `count`, so it adds nothing unless it was added separately.

```python
class DetectSquares:
    def __init__(self):
        self.counts = {}

    def add(self, point: list[int]) -> None:
        key = (point[0], point[1])
        self.counts[key] = self.counts.get(key, 0) + 1

    def count(self, point: list[int]) -> int:
        px, py = point
        total = 0
        for (x, y), copies in self.counts.items():
            if x == px or abs(x - px) != abs(y - py):
                continue
            total += copies * self.counts.get((x, py), 0) * self.counts.get((px, y), 0)
        return total


squares = DetectSquares()
print(squares.count([4, 4]))
for point in [[1, 1], [1, 4], [4, 1]]:
    squares.add(point)
print(squares.count([4, 4]))
print(squares.count([4, 1]))
squares.add([1, 1])
print(squares.count([4, 4]))
for point in [[7, 1], [7, 4], [4, 7], [7, 7]]:
    squares.add(point)
print(squares.count([4, 4]))
print(squares.count([0, 0]))
```

**Time** `O(1)` for `add` and `O(p)` for `count` with `p` distinct points, **space** `O(p)`.

**Scan one column only.** Most stored points are not on a diagonal with the query, so looking at all of them is wasteful. Group the points by `x`. Any square through the query has a corner directly above or below it, in the same column. For each such point at height `y`, the side length is `|y - py|`, and the square can lie to the left or to the right. Check both and multiply the counts of the two remaining corners.

```python
class DetectSquares:
    def __init__(self):
        self.columns = {}

    def add(self, point: list[int]) -> None:
        x, y = point
        column = self.columns.setdefault(x, {})
        column[y] = column.get(y, 0) + 1

    def count(self, point: list[int]) -> int:
        px, py = point
        total = 0
        for y, copies in self.columns.get(px, {}).items():
            side = y - py
            if side == 0:
                continue
            for x in (px - side, px + side):
                other = self.columns.get(x, {})
                total += copies * other.get(py, 0) * other.get(y, 0)
        return total


squares = DetectSquares()
print(squares.count([4, 4]))
for point in [[1, 1], [1, 4], [4, 1]]:
    squares.add(point)
print(squares.count([4, 4]))
print(squares.count([4, 1]))
squares.add([1, 1])
print(squares.count([4, 4]))
for point in [[7, 1], [7, 4], [4, 7], [7, 7]]:
    squares.add(point)
print(squares.count([4, 4]))
print(squares.count([0, 0]))
```

**Time** `O(1)` for `add` and `O(k)` for `count` with `k` distinct points in the query column, **space** `O(p)`.
:::
