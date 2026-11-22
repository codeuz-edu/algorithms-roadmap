---
title: Word Search
description: "Word Search in Python: depth-first search with backtracking from every cell, marking cells on the current path."
---

# Word Search

<ProblemMeta />

## Problem

You are given a grid of letters `board` and a string `word`. Return `True` if the word can be traced on the grid by starting at any cell and stepping to a neighbour above, below, left or right for each next letter. A cell cannot be used twice in the same path.

On the grid below, `"TAOIL"` can be traced (start at the `T`, go down, left, down, right). `"CAR"` cannot, because no `A` next to the `C` touches an `R`. `"TAT"` cannot either, because it would need the single `T` twice.

```
C A T S
R O A D
M I L K
```

## Try it yourself

Fill in the method, then press **Check**. The tests use the grid above, then a grid with a single cell.

```python
class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        pass


rows = ["CATS", "ROAD", "MILK"]

for word in ("TAOIL", "ROAD", "CAR", "TAT"):
    print(Solution().exist([list(row) for row in rows], word))
print(Solution().exist([["A"]], "A"))
print(Solution().exist([["A"]], "AA"))
```

::: details Solution
**Idea.** Try every cell as the starting point. From a cell that matches letter `i` of the word, the rest of the word must continue through one of its four neighbours, starting at letter `i + 1`. That is a depth-first search where the position in the word is part of the state.

To stop a path from reusing a cell, overwrite the cell with `"#"` while it is on the current path. No word letter matches `"#"`, so the search cannot step back onto it. When the search returns from that cell, put the letter back. Restoring is what makes this backtracking: the cell is only blocked for paths that go through it, and stays available for every other attempt.

A visited set that is never cleared would be wrong here. A cell that failed on one path can still be part of a different, successful path.

```python
class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])

        def dfs(r, c, i):
            if i == len(word):
                return True
            if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[i]:
                return False
            board[r][c] = "#"
            found = dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1)
            board[r][c] = word[i]
            return found

        return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))


rows = ["CATS", "ROAD", "MILK"]

for word in ("TAOIL", "ROAD", "CAR", "TAT"):
    print(Solution().exist([list(row) for row in rows], word))
print(Solution().exist([["A"]], "A"))
print(Solution().exist([["A"]], "AA"))
```

**Time** `O(m · n · 3^L)` for an `m × n` board and a word of length `L`: each step after the first has at most three directions, because one neighbour is the cell it came from. **Space** `O(L)` for the recursion.

**With pruning.** Two cheap checks remove most of the hopeless work. First, if the word needs more copies of some letter than the board holds, the answer is `False` without any search. Second, the search branches most near its start, so it pays to start from the rarer end of the word. If the first letter is more common on the board than the last, search for the reversed word instead. A path for the reversed word is the same path walked backwards.

```python
from collections import Counter


class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])

        available = Counter(letter for row in board for letter in row)
        needed = Counter(word)
        if any(needed[letter] > available[letter] for letter in needed):
            return False
        if available[word[0]] > available[word[-1]]:
            word = word[::-1]

        def dfs(r, c, i):
            if i == len(word):
                return True
            if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[i]:
                return False
            board[r][c] = "#"
            found = dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1)
            board[r][c] = word[i]
            return found

        return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))


rows = ["CATS", "ROAD", "MILK"]

for word in ("TAOIL", "ROAD", "CAR", "TAT"):
    print(Solution().exist([list(row) for row in rows], word))
print(Solution().exist([["A"]], "A"))
print(Solution().exist([["A"]], "AA"))
```

**Time** `O(m · n · 3^L)` in the worst case, **space** `O(L)` plus the letter counts.
:::
