---
title: N-Queens
description: "N-Queens in Python: place one queen per row with backtracking, tracking attacked columns and diagonals in sets."
---

# N-Queens

<ProblemMeta />

## Problem

Place `n` chess queens on an `n × n` board so that no two of them share a row, a column or a diagonal. Return every such placement. A placement is a list of `n` strings, one per row from top to bottom, where `"Q"` is a queen and `"."` is an empty square.

For `n = 4` there are two placements:

```
. Q . .      . . Q .
. . . Q      Q . . .
Q . . .      . . . Q
. . Q .      . Q . .
```

## Try it yourself

Fill in the method, then press **Check**. The placements can come in any order: `show` sorts them before printing. The last two tests print only how many placements there are.

```python
class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        pass


def show(result):
    print(sorted(result or []))


show(Solution().solveNQueens(4))
show(Solution().solveNQueens(1))
show(Solution().solveNQueens(3))
print(len(Solution().solveNQueens(5) or []))
print(len(Solution().solveNQueens(6) or []))
```

::: details Solution
**Idea.** Every row must hold exactly one queen, so place them row by row. In the current row, try each column. If the square is not attacked by a queen placed earlier, put a queen there and move on to the next row. If the row has no safe square, return and move the previous queen. Reaching row `n` means all queens are placed.

Checking a square has to be fast. Rows are safe by construction. For the rest, three sets are enough: the used columns and the two kinds of used diagonals. All squares on one diagonal running down to the right share the same value of `row - col`. All squares on one diagonal running down to the left share the same value of `row + col`. A square is safe when its column and both of its diagonal values are absent from the sets.

After the recursive call, remove the queen from all three sets so the next column starts from a clean state.

```python
class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        result = []
        queens = []
        cols, diagonals, anti_diagonals = set(), set(), set()

        def backtrack(row):
            if row == n:
                result.append(["." * col + "Q" + "." * (n - col - 1) for col in queens])
                return
            for col in range(n):
                if col in cols or row - col in diagonals or row + col in anti_diagonals:
                    continue
                queens.append(col)
                cols.add(col)
                diagonals.add(row - col)
                anti_diagonals.add(row + col)
                backtrack(row + 1)
                queens.pop()
                cols.remove(col)
                diagonals.remove(row - col)
                anti_diagonals.remove(row + col)

        backtrack(0)
        return result


def show(result):
    print(sorted(result or []))


show(Solution().solveNQueens(4))
show(Solution().solveNQueens(1))
show(Solution().solveNQueens(3))
print(len(Solution().solveNQueens(5) or []))
print(len(Solution().solveNQueens(6) or []))
```

**Time** `O(n!)`: the first row has `n` columns to try, the next at most `n - 1`, and so on. **Space** `O(n)` for the recursion and the sets, not counting the output.

**With bitmasks.** The three sets can be three integers, with bit `c` set when column `c` is attacked in the current row. Moving down one row shifts every diagonal attack one column sideways, so the two diagonal masks are shifted by one bit in opposite directions on each call. The free squares of a row are the zero bits of the three masks combined, and `free & -free` picks the lowest of them. Nothing has to be undone, because each call gets its own masks.

```python
class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        result = []
        queens = []
        full = (1 << n) - 1

        def backtrack(row, cols, left, right):
            if row == n:
                result.append(["." * col + "Q" + "." * (n - col - 1) for col in queens])
                return
            free = full & ~(cols | left | right)
            while free:
                bit = free & -free
                free ^= bit
                queens.append(bit.bit_length() - 1)
                backtrack(row + 1, cols | bit, ((left | bit) << 1) & full, (right | bit) >> 1)
                queens.pop()

        backtrack(0, 0, 0, 0)
        return result


def show(result):
    print(sorted(result or []))


show(Solution().solveNQueens(4))
show(Solution().solveNQueens(1))
show(Solution().solveNQueens(3))
print(len(Solution().solveNQueens(5) or []))
print(len(Solution().solveNQueens(6) or []))
```

**Time** `O(n!)`, **space** `O(n)`, not counting the output.
:::
