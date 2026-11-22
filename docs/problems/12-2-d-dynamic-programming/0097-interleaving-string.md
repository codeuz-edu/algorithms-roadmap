---
title: Interleaving String
description: "Interleaving String in Python: a prefix table that asks whether the first i and j characters can weave into the first i + j of the target."
---

# Interleaving String

<ProblemMeta />

## Problem

Given three strings, decide whether `s3` can be built by merging `s1` and `s2`: every character of both strings is used exactly once, and the characters of each string keep their original order.

| Input | Output | Why |
| --- | --- | --- |
| `s1 = "abc"`, `s2 = "xyz"`, `s3 = "axbycz"` | `True` | take turns |
| `s1 = "ab"`, `s2 = "cd"`, `s3 = "acdb"` | `True` | `a`, then `cd`, then `b` |
| `s1 = "ab"`, `s2 = "cd"`, `s3 = "adcb"` | `False` | `d` would come before `c` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        pass


print(Solution().isInterleave("abc", "xyz", "axbycz"))
print(Solution().isInterleave("ab", "cd", "acdb"))
print(Solution().isInterleave("ab", "cd", "adcb"))
print(Solution().isInterleave("aab", "axy", "aaxaby"))
print(Solution().isInterleave("", "", ""))
print(Solution().isInterleave("a", "b", "a"))
```

::: details Solution
**Idea.** A greedy merge fails when both strings offer the same next letter, because the wrong pick can dead-end later. Dynamic programming tries both picks without repeating work.

If the lengths do not add up, the answer is `False` straight away. Otherwise let `dp[i][j]` be `True` when the first `i` characters of `s1` and the first `j` characters of `s2` can be merged into the first `i + j` characters of `s3`. Notice that `i` and `j` already fix how much of `s3` is covered, so two indices are enough.

The last character of that `s3` prefix, `s3[i + j - 1]`, came from one of the two strings:

- from `s1`: it must equal `s1[i - 1]`, and the rest must work, `dp[i - 1][j]`.
- from `s2`: it must equal `s2[j - 1]`, and the rest must work, `dp[i][j - 1]`.

`dp[0][0]` is `True`: two empty strings make an empty string.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for i in range(m + 1):
            for j in range(n + 1):
                if i > 0 and dp[i - 1][j] and s1[i - 1] == s3[i + j - 1]:
                    dp[i][j] = True
                if j > 0 and dp[i][j - 1] and s2[j - 1] == s3[i + j - 1]:
                    dp[i][j] = True
        return dp[m][n]


print(Solution().isInterleave("abc", "xyz", "axbycz"))
print(Solution().isInterleave("ab", "cd", "acdb"))
print(Solution().isInterleave("ab", "cd", "adcb"))
print(Solution().isInterleave("aab", "axy", "aaxaby"))
print(Solution().isInterleave("", "", ""))
print(Solution().isInterleave("a", "b", "a"))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**One row.** Each cell reads the cell above and the cell to the left. In a single list, `dp[j]` holds the cell above until it is overwritten, and `dp[j - 1]` is the cell to the left once it has been updated.

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [False] * (n + 1)
        for i in range(m + 1):
            for j in range(n + 1):
                if i == 0 and j == 0:
                    dp[j] = True
                    continue
                from_s1 = i > 0 and dp[j] and s1[i - 1] == s3[i + j - 1]
                from_s2 = j > 0 and dp[j - 1] and s2[j - 1] == s3[i + j - 1]
                dp[j] = from_s1 or from_s2
        return dp[n]


print(Solution().isInterleave("abc", "xyz", "axbycz"))
print(Solution().isInterleave("ab", "cd", "acdb"))
print(Solution().isInterleave("ab", "cd", "adcb"))
print(Solution().isInterleave("aab", "axy", "aaxaby"))
print(Solution().isInterleave("", "", ""))
print(Solution().isInterleave("a", "b", "a"))
```

**Time** `O(m · n)`, **space** `O(n)`.
:::
