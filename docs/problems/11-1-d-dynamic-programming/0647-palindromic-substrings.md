---
title: Palindromic Substrings
description: "Palindromic Substrings in Python: count palindromes with a DP table over substrings, then by expanding around each centre."
---

# Palindromic Substrings

<ProblemMeta />

## Problem

Given a string `s`, count the substrings that read the same forwards and backwards. Substrings that start or end at different positions count separately, even when they contain the same letters.

| Input | Output | Why |
| --- | --- | --- |
| `"abc"` | `3` | `a`, `b`, `c` |
| `"aaa"` | `6` | three `a`, two `aa`, one `aaa` |
| `"abba"` | `6` | four single letters, `bb`, `abba` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def countSubstrings(self, s: str) -> int:
        pass


print(Solution().countSubstrings("abc"))
print(Solution().countSubstrings("aaa"))
print(Solution().countSubstrings("abba"))
print(Solution().countSubstrings("z"))
print(Solution().countSubstrings("level"))
```

::: details Solution
**Idea.** This is [Longest Palindromic Substring](/problems/longest-palindromic-substring) with a counter instead of a maximum.

Let `pal[i][j]` be `True` when the substring from index `i` to index `j` inclusive is a palindrome. That holds exactly when `s[i] == s[j]` and the inside, `s[i+1..j-1]`, is a palindrome. A substring of length 1 or 2 has no inside to check.

`pal[i][j]` reads `pal[i + 1][j - 1]`, which is one row below, so fill the rows from the last one upwards. Each `True` entry is one palindromic substring.

```python
class Solution:
    def countSubstrings(self, s: str) -> int:
        n = len(s)
        pal = [[False] * n for _ in range(n)]
        count = 0

        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i < 2 or pal[i + 1][j - 1]):
                    pal[i][j] = True
                    count += 1
        return count


print(Solution().countSubstrings("abc"))
print(Solution().countSubstrings("aaa"))
print(Solution().countSubstrings("abba"))
print(Solution().countSubstrings("z"))
print(Solution().countSubstrings("level"))
```

**Time** `O(n²)`, **space** `O(n²)`.

**Expand around the centre.** Group the palindromes by their centre: a character for odd lengths, a gap between two characters for even lengths. Start at a centre and widen one character on each side while the ends match. Every successful step is one more palindrome, and the first mismatch ends that centre for good, because nothing wider can be a palindrome around it.

```python
class Solution:
    def countSubstrings(self, s: str) -> int:
        count = 0
        for centre in range(len(s)):
            for left, right in ((centre, centre), (centre, centre + 1)):
                while left >= 0 and right < len(s) and s[left] == s[right]:
                    count += 1
                    left -= 1
                    right += 1
        return count


print(Solution().countSubstrings("abc"))
print(Solution().countSubstrings("aaa"))
print(Solution().countSubstrings("abba"))
print(Solution().countSubstrings("z"))
print(Solution().countSubstrings("level"))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
