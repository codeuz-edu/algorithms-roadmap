---
title: Valid Sudoku
description: "Valid Sudoku in Python: check rows, columns and 3x3 boxes for repeated digits with sets, in one pass."
---

# Valid Sudoku

<ProblemMeta />

## Problem

You are given a 9 × 9 Sudoku board. Filled cells hold a digit `"1"` to `"9"`, and empty cells hold `"."`. Return `True` if the filled cells break no rule: no digit repeats in a row, in a column, or in any of the nine 3 × 3 boxes.

The board does not have to be solvable. Only the cells that are already filled are checked.

## Try it yourself

Fill in the method, then press **Check**. The first board is valid. The second repeats an `8` in the first column, and the third repeats a `9` inside the top-left box.

```python
class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        pass


valid = [
    "53..7....",
    "6..195...",
    ".98....6.",
    "8...6...3",
    "4..8.3..1",
    "7...2...6",
    ".6....28.",
    "...419..5",
    "....8..79",
]
same_column = ["8" + valid[0][1:]] + valid[1:]
same_box = [valid[0], "69.195...", ".98....6."] + valid[3:]

for rows in (valid, same_column, same_box):
    print(Solution().isValidSudoku([list(row) for row in rows]))
```

::: details Solution
**Idea.** Keep one set of seen digits for each row, each column and each box. Visit every cell once. A digit that is already in its row's set, its column's set or its box's set breaks a rule.

The cell at row `r`, column `c` belongs to box `(r // 3, c // 3)`. Integer division by 3 maps rows 0 to 2 to box row 0, rows 3 to 5 to box row 1, and rows 6 to 8 to box row 2.

```python
class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = {}

        for r in range(9):
            for c in range(9):
                digit = board[r][c]
                if digit == ".":
                    continue
                box = boxes.setdefault((r // 3, c // 3), set())
                if digit in rows[r] or digit in cols[c] or digit in box:
                    return False
                rows[r].add(digit)
                cols[c].add(digit)
                box.add(digit)
        return True


valid = [
    "53..7....",
    "6..195...",
    ".98....6.",
    "8...6...3",
    "4..8.3..1",
    "7...2...6",
    ".6....28.",
    "...419..5",
    "....8..79",
]
same_column = ["8" + valid[0][1:]] + valid[1:]
same_box = [valid[0], "69.195...", ".98....6."] + valid[3:]

for rows in (valid, same_column, same_box):
    print(Solution().isValidSudoku([list(row) for row in rows]))
```

**Time** `O(1)` and **space** `O(1)`, because the board is always 9 × 9. For an `n × n` board both would be `O(n²)`.

**Three separate checks.** The rules can also be checked one at a time: all rows, then all columns, then all boxes. It reads the board three times and is longer, but each helper does one thing.

```python
class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        def no_repeats(cells):
            digits = [cell for cell in cells if cell != "."]
            return len(digits) == len(set(digits))

        for i in range(9):
            if not no_repeats(board[i]):
                return False
            if not no_repeats([board[r][i] for r in range(9)]):
                return False

        for row_start in (0, 3, 6):
            for col_start in (0, 3, 6):
                box = [board[row_start + i][col_start + j] for i in range(3) for j in range(3)]
                if not no_repeats(box):
                    return False
        return True


valid = [
    "53..7....",
    "6..195...",
    ".98....6.",
    "8...6...3",
    "4..8.3..1",
    "7...2...6",
    ".6....28.",
    "...419..5",
    "....8..79",
]
same_column = ["8" + valid[0][1:]] + valid[1:]
same_box = [valid[0], "69.195...", ".98....6."] + valid[3:]

for rows in (valid, same_column, same_box):
    print(Solution().isValidSudoku([list(row) for row in rows]))
```
:::
