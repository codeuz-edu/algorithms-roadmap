---
title: Palindrome Partitioning
description: "Palindrome Partitioning in Python: backtracking that cuts off one palindromic prefix at a time, with an optional palindrome table."
---

# Palindrome Partitioning

<ProblemMeta />

## Problem

You are given a string `s`. Cut it into pieces so that every piece reads the same forwards and backwards. Return every way of doing this. Each way is the list of pieces from left to right, and a single character counts as a palindrome.

| Input | Output |
| --- | --- |
| `"noon"` | `[["n", "o", "o", "n"], ["n", "oo", "n"], ["noon"]]` |
| `"ab"` | `[["a", "b"]]` |

## Try it yourself

Fill in the method, then press **Check**. The partitions can come in any order: `show` sorts the list before printing. The pieces inside one partition must stay in left to right order.

```python
class Solution:
    def partition(self, s: str) -> list[list[str]]:
        pass


def show(result):
    print(sorted(result or []))


show(Solution().partition("noon"))
show(Solution().partition("ab"))
show(Solution().partition("aaa"))
show(Solution().partition("x"))
show(Solution().partition("level"))
```

::: details Solution
**Idea.** Any valid partition starts with some first piece, and that piece must be a palindrome. So try every prefix of the remaining string as the first piece. If the prefix is a palindrome, keep it and solve the same problem for what is left. When nothing is left, the pieces collected so far form one complete partition.

A prefix that is not a palindrome is dropped at once, which prunes every partition that would start with it. Two partitions differ in the position of at least one cut, so the search reaches each of them along a different path and none is repeated.

```python
class Solution:
    def partition(self, s: str) -> list[list[str]]:
        result = []
        pieces = []

        def backtrack(start):
            if start == len(s):
                result.append(pieces.copy())
                return
            for end in range(start + 1, len(s) + 1):
                piece = s[start:end]
                if piece == piece[::-1]:
                    pieces.append(piece)
                    backtrack(end)
                    pieces.pop()

        backtrack(0)
        return result


def show(result):
    print(sorted(result or []))


show(Solution().partition("noon"))
show(Solution().partition("ab"))
show(Solution().partition("aaa"))
show(Solution().partition("x"))
show(Solution().partition("level"))
```

**Time** `O(n · 2ⁿ)`: a string of `n` equal letters has `2ⁿ⁻¹` partitions, and each costs `O(n)` to check and copy. **Space** `O(n)` for the recursion, not counting the output.

**With a palindrome table.** The search above reverses the same substrings again and again. A table can answer "is `s[i..j]` a palindrome?" in constant time. A substring is a palindrome when its two end letters match and the part between them is a palindrome too (or has fewer than two letters). The inner part starts at `i + 1`, so fill the table with `i` going from the end of the string to the start.

```python
class Solution:
    def partition(self, s: str) -> list[list[str]]:
        n = len(s)
        is_pal = [[False] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                is_pal[i][j] = s[i] == s[j] and (j - i < 2 or is_pal[i + 1][j - 1])

        result = []
        pieces = []

        def backtrack(start):
            if start == n:
                result.append(pieces.copy())
                return
            for end in range(start, n):
                if is_pal[start][end]:
                    pieces.append(s[start:end + 1])
                    backtrack(end + 1)
                    pieces.pop()

        backtrack(0)
        return result


def show(result):
    print(sorted(result or []))


show(Solution().partition("noon"))
show(Solution().partition("ab"))
show(Solution().partition("aaa"))
show(Solution().partition("x"))
show(Solution().partition("level"))
```

**Time** `O(n · 2ⁿ)` in the worst case, since the output alone can be that large. **Space** `O(n²)` for the table.
:::
