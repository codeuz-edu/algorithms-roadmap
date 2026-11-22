---
title: Regular Expression Matching
description: "Regular Expression Matching in Python: a prefix table where a star either drops its pair or consumes one more character."
---

# Regular Expression Matching

<ProblemMeta />

## Problem

Decide whether the pattern `p` matches the **whole** string `s`. The pattern has two special characters: `.` stands for any one character, and `*` means "zero or more copies of the character just before me". Every `*` in the pattern has a character in front of it.

| Input | Output | Why |
| --- | --- | --- |
| `s = "aab"`, `p = "c*a*b"` | `True` | zero `c`, two `a`, one `b` |
| `s = "xyz"`, `p = ".*"` | `True` | `.*` is any run of characters |
| `s = "aa"`, `p = "a"` | `False` | the second `a` is left over |
| `s = "ab"`, `p = ".*c"` | `False` | nothing can supply the final `c` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        pass


print(Solution().isMatch("aab", "c*a*b"))
print(Solution().isMatch("xyz", ".*"))
print(Solution().isMatch("aa", "a"))
print(Solution().isMatch("ab", ".*c"))
print(Solution().isMatch("aaa", "a*a"))
print(Solution().isMatch("", "a*b*"))
```

::: details Solution
**Idea.** The hard part is that a `*` does not say how many characters it takes. Instead of guessing a count, let the star make one small decision at a time.

Let `dp[i][j]` be `True` when the first `i` characters of `s` are matched by the first `j` characters of `p`. Look at the last pattern character, `p[j - 1]`.

If it is a letter or a `.`, it must match the last string character, and the rest must match too: `dp[i - 1][j - 1]`.

If it is a `*`, it belongs to the character before it, `p[j - 2]`. There are two choices:

- Zero copies: throw away both pattern characters, `dp[i][j - 2]`.
- One more copy: `p[j - 2]` must match `s[i - 1]`. Consume that string character and keep the star in the pattern so it can match again: `dp[i - 1][j]`.

Staying at `j` in the second choice is what lets one star cover any number of characters. Empty matches empty, so `dp[0][0]` is `True`. The empty string can also be matched by patterns like `a*b*`, which the "zero copies" rule fills in along row 0.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True

        for i in range(m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == "*":
                    zero = dp[i][j - 2]
                    more = i > 0 and p[j - 2] in (s[i - 1], ".") and dp[i - 1][j]
                    dp[i][j] = zero or more
                else:
                    dp[i][j] = i > 0 and p[j - 1] in (s[i - 1], ".") and dp[i - 1][j - 1]

        return dp[m][n]


print(Solution().isMatch("aab", "c*a*b"))
print(Solution().isMatch("xyz", ".*"))
print(Solution().isMatch("aa", "a"))
print(Solution().isMatch("ab", ".*c"))
print(Solution().isMatch("aaa", "a*a"))
print(Solution().isMatch("", "a*b*"))
```

**Time** `O(m · n)`, **space** `O(m · n)`.

**Two rows.** Row `i` reads only itself and row `i - 1`, so the table can shrink to the previous row and the current one.

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        prev = [False] * (n + 1)

        for i in range(m + 1):
            cur = [i == 0] + [False] * n
            for j in range(1, n + 1):
                if p[j - 1] == "*":
                    zero = cur[j - 2]
                    more = i > 0 and p[j - 2] in (s[i - 1], ".") and prev[j]
                    cur[j] = zero or more
                else:
                    cur[j] = i > 0 and p[j - 1] in (s[i - 1], ".") and prev[j - 1]
            prev = cur

        return prev[n]


print(Solution().isMatch("aab", "c*a*b"))
print(Solution().isMatch("xyz", ".*"))
print(Solution().isMatch("aa", "a"))
print(Solution().isMatch("ab", ".*c"))
print(Solution().isMatch("aaa", "a*a"))
print(Solution().isMatch("", "a*b*"))
```

**Time** `O(m · n)`, **space** `O(n)`.
:::
