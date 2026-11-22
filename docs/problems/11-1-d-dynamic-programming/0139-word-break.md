---
title: Word Break
description: "Word Break in Python: a one-dimensional DP over prefixes of the string, plus the memoised recursion that fills the same table top-down."
---

# Word Break

<ProblemMeta />

## Problem

Given a string `s` and a list of words `wordDict`, decide whether `s` can be cut into pieces so that every piece is a word from the list. A word may be used as many times as needed.

| Input | Output | Why |
| --- | --- | --- |
| `s = "applepie"`, `wordDict = ["apple", "pie"]` | `True` | `apple` + `pie` |
| `s = "sandsand"`, `wordDict = ["sand"]` | `True` | the same word twice |
| `s = "carsand"`, `wordDict = ["car", "cars", "and"]` | `True` | `cars` + `and`, even though `car` matches first |
| `s = "pineapples"`, `wordDict = ["pine", "apple", "pineapple"]` | `False` | the final `s` is never covered |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        pass


print(Solution().wordBreak("applepie", ["apple", "pie"]))
print(Solution().wordBreak("sandsand", ["sand"]))
print(Solution().wordBreak("carsand", ["car", "cars", "and"]))
print(Solution().wordBreak("pineapples", ["pine", "apple", "pineapple"]))
print(Solution().wordBreak("a", ["b"]))
```

::: details Solution
**Idea.** Committing to the first word that matches is wrong. In `"carsand"` the word `car` matches at the start and leaves `sand`, a dead end, while `cars` leaves `and`. Trying every choice by plain recursion repeats the same suffixes over and over. What matters about a cut position is only whether everything before it can be split, not how.

Let `dp[i]` be `True` when the first `i` characters of `s` can be cut into dictionary words. `dp[0]` is `True`, because the empty prefix needs no words. For a longer prefix, look at its last word: `dp[i]` is `True` when there is a position `j < i` with `dp[j]` true and `s[j:i]` in the dictionary.

Two details keep it fast. The dictionary becomes a set so each lookup is a hash lookup, and `j` never needs to be further back than the length of the longest word.

```python
class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        words = set(wordDict)
        longest = max(len(word) for word in words)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True

        for i in range(1, n + 1):
            for j in range(max(0, i - longest), i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[n]


print(Solution().wordBreak("applepie", ["apple", "pie"]))
print(Solution().wordBreak("sandsand", ["sand"]))
print(Solution().wordBreak("carsand", ["car", "cars", "and"]))
print(Solution().wordBreak("pineapples", ["pine", "apple", "pineapple"]))
print(Solution().wordBreak("a", ["b"]))
```

**Time** `O(n · L²)` where `L` is the longest word length (up to `L` start positions, each slicing and hashing up to `L` characters), **space** `O(n)` besides the set.

**Memoised recursion.** The same idea read from the front: `can_split(start)` answers whether the suffix beginning at `start` can be cut into words. Try each word that matches at `start` and recurse on what is left. The cache makes sure each start position is solved once, which is what turns an exponential search into a polynomial one. The recursion is at most `len(s)` calls deep.

```python
from functools import lru_cache


class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        @lru_cache(maxsize=None)
        def can_split(start: int) -> bool:
            if start == len(s):
                return True
            for word in wordDict:
                if s.startswith(word, start) and can_split(start + len(word)):
                    return True
            return False

        return can_split(0)


print(Solution().wordBreak("applepie", ["apple", "pie"]))
print(Solution().wordBreak("sandsand", ["sand"]))
print(Solution().wordBreak("carsand", ["car", "cars", "and"]))
print(Solution().wordBreak("pineapples", ["pine", "apple", "pineapple"]))
print(Solution().wordBreak("a", ["b"]))
```

**Time** `O(n · m · L)` for `m` words of length up to `L`, **space** `O(n)`.
:::
