---
title: Distinct Subsequences
description: "Distinct Subsequences in Python: count the ways to pick one string out of another with a prefix table, then with a single row."
---

# Distinct Subsequences

<ProblemMeta />

## Problem

Given strings `s` and `t`, count the ways to delete characters from `s` so that what remains is exactly `t`. Two ways are different when they keep different positions of `s`, even if the kept letters look the same.

| Input | Output | Why |
| --- | --- | --- |
| `s = "aaa"`, `t = "aa"` | `3` | keep positions 0 and 1, 0 and 2, or 1 and 2 |
| `s = "banana"`, `t = "ban"` | `3` | `b`, then `a`/`n` at positions 1/2, 1/4 or 3/4 |
| `s = "abc"`, `t = ""` | `1` | delete everything |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        pass


print(Solution().numDistinct("aaa", "aa"))
print(Solution().numDistinct("banana", "ban"))
print(Solution().numDistinct("rabbbit", "rabbit"))
print(Solution().numDistinct("abc", ""))
print(Solution().numDistinct("ab", "abc"))
```

::: details Solution
**Idea.** Let `dp[i][j]` be the number of ways to pick the first `j` characters of `t` out of the first `i` characters of `s`.

Look at the last character of the `s` prefix, `s[i - 1]`. Every way of picking either skips it or uses it, and these two groups do not overlap:

- Skip it: the whole of `t[:j]` must come from the first `i - 1` characters, which gives `dp[i - 1][j]`.
- Use it: this is only possible when it equals `t[j - 1]`, and it must be matched with that last character of `t`. The rest is `dp[i - 1][j - 1]`.

The empty `t` can be picked in exactly one way from any prefix, so `dp[i][0] = 1`. A non-empty `t` cannot be picked from an empty `s`, so the rest of row 0 is 0.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = 1
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                dp[i][j] = dp[i - 1][j]
                if s[i - 1] == t[j - 1]:
                    dp[i][j] += dp[i - 1][j - 1]
        return dp[m][n]


print(Solution().numDistinct("aaa", "aa"))
print(Solution().numDistinct("banana", "ban"))
print(Solution().numDistinct("rabbbit", "rabbit"))
print(Solution().numDistinct("abc", ""))
print(Solution().numDistinct("ab", "abc"))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**One row.** Each cell reads the cell above and the cell above-left. Keep one list and go through `j` from right to left, so that `dp[j - 1]` still belongs to the previous row when `dp[j]` reads it. Going left to right would let one character of `s` be used for two characters of `t`.

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n = len(t)
        dp = [0] * (n + 1)
        dp[0] = 1
        for ch in s:
            for j in range(n, 0, -1):
                if ch == t[j - 1]:
                    dp[j] += dp[j - 1]
        return dp[n]


print(Solution().numDistinct("aaa", "aa"))
print(Solution().numDistinct("banana", "ban"))
print(Solution().numDistinct("rabbbit", "rabbit"))
print(Solution().numDistinct("abc", ""))
print(Solution().numDistinct("ab", "abc"))
```

**Time** `O(m · n)`, **space** `O(n)`.
:::
