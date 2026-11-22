---
title: Longest Common Subsequence
description: "Longest Common Subsequence in Python: a prefix table that extends a diagonal on a match and takes the better neighbour on a mismatch."
---

# Longest Common Subsequence

<ProblemMeta />

## Problem

A subsequence of a string is what remains after deleting any characters without reordering the rest. Given two strings `text1` and `text2`, return the length of the longest string that is a subsequence of both. Return `0` if they share nothing.

| Input | Output | Why |
| --- | --- | --- |
| `text1 = "stone"`, `text2 = "longest"` | `3` | `"one"` |
| `text1 = "abcde"`, `text2 = "ace"` | `3` | `"ace"` |
| `text1 = "abc"`, `text2 = "xyz"` | `0` | no shared letter |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        pass


print(Solution().longestCommonSubsequence("stone", "longest"))
print(Solution().longestCommonSubsequence("abcde", "ace"))
print(Solution().longestCommonSubsequence("abc", "xyz"))
print(Solution().longestCommonSubsequence("a", "a"))
```

::: details Solution
**Idea.** Let `dp[i][j]` be the length of the longest common subsequence of the first `i` characters of `text1` and the first `j` characters of `text2`. Row 0 and column 0 are all zeros, because an empty prefix shares nothing.

Look at the last character of each prefix. If they are equal, some best answer pairs them together, so `dp[i][j] = dp[i - 1][j - 1] + 1`. If they differ, they cannot both be the end of the common subsequence, so at least one of them is unused. Drop one or the other and keep the better result: `max(dp[i - 1][j], dp[i][j - 1])`.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]


print(Solution().longestCommonSubsequence("stone", "longest"))
print(Solution().longestCommonSubsequence("abcde", "ace"))
print(Solution().longestCommonSubsequence("abc", "xyz"))
print(Solution().longestCommonSubsequence("a", "a"))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**Two rows.** Row `i` only reads row `i - 1` and itself. Keep the previous row and the row being built, and swap them after each character of `text1`.

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n = len(text2)
        prev = [0] * (n + 1)
        for ch in text1:
            cur = [0] * (n + 1)
            for j in range(1, n + 1):
                if ch == text2[j - 1]:
                    cur[j] = prev[j - 1] + 1
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur
        return prev[n]


print(Solution().longestCommonSubsequence("stone", "longest"))
print(Solution().longestCommonSubsequence("abcde", "ace"))
print(Solution().longestCommonSubsequence("abc", "xyz"))
print(Solution().longestCommonSubsequence("a", "a"))
```

**Time** `O(m · n)`, **space** `O(n)`.
:::
