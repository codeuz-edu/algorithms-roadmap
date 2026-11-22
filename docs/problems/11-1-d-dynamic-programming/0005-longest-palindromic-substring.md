---
title: Longest Palindromic Substring
description: "Longest Palindromic Substring in Python: a DP table over substrings, then expanding around each centre in O(1) space."
---

# Longest Palindromic Substring

<ProblemMeta />

## Problem

Given a string `s`, return the longest piece of consecutive characters that reads the same forwards and backwards. If several pieces share the longest length, any one of them is accepted.

| Input | Output |
| --- | --- |
| `"cbbd"` | `"bb"` |
| `"racecars"` | `"racecar"` |
| `"xabbay"` | `"abba"` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below. Each test here has a single longest palindrome, so there is only one right answer.

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        pass


print(Solution().longestPalindrome("cbbd"))
print(Solution().longestPalindrome("racecars"))
print(Solution().longestPalindrome("xabbay"))
print(Solution().longestPalindrome("a"))
print(Solution().longestPalindrome("forgeeksskeegfor"))
```

::: details Solution
**Idea.** Checking every substring with a fresh scan costs `O(n³)`. The waste is that a long palindrome contains shorter ones that were already checked: `s[i..j]` is a palindrome exactly when its two end characters match and the part between them, `s[i+1..j-1]`, is a palindrome too.

Let `pal[i][j]` be `True` when the substring from index `i` to index `j` inclusive is a palindrome. Substrings of length 1 or 2 have nothing between their ends, so they only need the ends to match. Longer ones also look up `pal[i + 1][j - 1]`.

That entry sits one row down, so fill the rows from the bottom: `i` goes from `n - 1` to `0`, and `j` goes from `i` to the right. Track the longest `True` entry on the way.

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        pal = [[False] * n for _ in range(n)]
        start, length = 0, 0

        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i < 2 or pal[i + 1][j - 1]):
                    pal[i][j] = True
                    if j - i + 1 > length:
                        start, length = i, j - i + 1
        return s[start:start + length]


print(Solution().longestPalindrome("cbbd"))
print(Solution().longestPalindrome("racecars"))
print(Solution().longestPalindrome("xabbay"))
print(Solution().longestPalindrome("a"))
print(Solution().longestPalindrome("forgeeksskeegfor"))
```

**Time** `O(n²)`, **space** `O(n²)`.

**Expand around the centre.** The same rule can be run outwards instead of being stored. Every palindrome has a centre: one character for odd lengths, the gap between two characters for even lengths. From each of the `2n - 1` centres, step left and right while the two characters match. The walk stops at the widest palindrome for that centre, and no table is needed.

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        start, length = 0, 0
        for centre in range(len(s)):
            for left, right in ((centre, centre), (centre, centre + 1)):
                while left >= 0 and right < len(s) and s[left] == s[right]:
                    left -= 1
                    right += 1
                # The loop overshoots by one on each side.
                if right - left - 1 > length:
                    start, length = left + 1, right - left - 1
        return s[start:start + length]


print(Solution().longestPalindrome("cbbd"))
print(Solution().longestPalindrome("racecars"))
print(Solution().longestPalindrome("xabbay"))
print(Solution().longestPalindrome("a"))
print(Solution().longestPalindrome("forgeeksskeegfor"))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
