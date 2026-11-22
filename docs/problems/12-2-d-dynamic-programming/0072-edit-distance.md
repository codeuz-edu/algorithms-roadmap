---
title: Edit Distance
description: "Edit Distance in Python: the Levenshtein table over prefixes, where each cell picks the cheapest of insert, delete and replace."
---

# Edit Distance

<ProblemMeta />

## Problem

Given two strings, return the smallest number of single-character edits that turn `word1` into `word2`. An edit inserts one character, deletes one character, or replaces one character with another.

| Input | Output | Why |
| --- | --- | --- |
| `word1 = "flaw"`, `word2 = "lawn"` | `2` | delete `f`, insert `n` |
| `word1 = "kitten"`, `word2 = "sitting"` | `3` | `k→s`, `e→i`, insert `g` |
| `word1 = ""`, `word2 = "abc"` | `3` | three inserts |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        pass


print(Solution().minDistance("flaw", "lawn"))
print(Solution().minDistance("kitten", "sitting"))
print(Solution().minDistance("horse", "ros"))
print(Solution().minDistance("", "abc"))
print(Solution().minDistance("same", "same"))
```

::: details Solution
**Idea.** Let `dp[i][j]` be the fewest edits that turn the first `i` characters of `word1` into the first `j` characters of `word2`.

Turning a prefix into the empty string takes one delete per character, so `dp[i][0] = i`. Building a prefix from nothing takes one insert per character, so `dp[0][j] = j`.

For the other cells, compare the last characters of the two prefixes. If they are equal, they need no edit and the cost is `dp[i - 1][j - 1]`. If they differ, the last edit is one of three, each costing 1:

- Replace the last character of the `word1` prefix: `dp[i - 1][j - 1]`.
- Delete it: `dp[i - 1][j]`.
- Insert the last character of the `word2` prefix after it: `dp[i][j - 1]`.

Take the cheapest. Each option leaves a smaller pair of prefixes, which is why filling the table row by row works.

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]


print(Solution().minDistance("flaw", "lawn"))
print(Solution().minDistance("kitten", "sitting"))
print(Solution().minDistance("horse", "ros"))
print(Solution().minDistance("", "abc"))
print(Solution().minDistance("same", "same"))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**Two rows.** A cell reads the row above and the cell to its left, so two rows are enough. The new row starts with `i`, the cost of deleting `i` characters.

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n = len(word2)
        prev = list(range(n + 1))
        for i, ch in enumerate(word1, start=1):
            cur = [i] + [0] * n
            for j in range(1, n + 1):
                if ch == word2[j - 1]:
                    cur[j] = prev[j - 1]
                else:
                    cur[j] = 1 + min(prev[j - 1], prev[j], cur[j - 1])
            prev = cur
        return prev[n]


print(Solution().minDistance("flaw", "lawn"))
print(Solution().minDistance("kitten", "sitting"))
print(Solution().minDistance("horse", "ros"))
print(Solution().minDistance("", "abc"))
print(Solution().minDistance("same", "same"))
```

**Time** `O(m · n)`, **space** `O(n)`.
:::
