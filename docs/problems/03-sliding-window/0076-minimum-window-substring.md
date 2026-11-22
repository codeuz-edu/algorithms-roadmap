---
title: Minimum Window Substring
description: "Minimum Window Substring in Python: grow a sliding window until it covers every needed character, then shrink it from the left."
---

# Minimum Window Substring

<ProblemMeta />

## Problem

You are given two strings `s` and `t`. Return the shortest substring of `s` that contains every character of `t`, counting repeats: if `t` has two `a`s, the substring needs at least two. Return `""` if no substring qualifies. The tests are built so the shortest substring is unique.

| Input | Output |
| --- | --- |
| `s = "abbbca"`, `t = "abc"` | `"bca"` |
| `s = "aa"`, `t = "aa"` | `"aa"` |
| `s = "a"`, `t = "aa"` | `""` |

## Try it yourself

Fill in the method, then press **Check**. The results are printed with `repr` so an empty string is visible.

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        pass


print(repr(Solution().minWindow("abbbca", "abc")))
print(repr(Solution().minWindow("ADOBECODEBANC", "ABC")))
print(repr(Solution().minWindow("aa", "aa")))
print(repr(Solution().minWindow("a", "aa")))
print(repr(Solution().minWindow("xyz", "y")))
```

::: details Solution
**Idea.** Move `right` through `s` to grow a window. As soon as the window covers `t`, it is a candidate, and the only way to improve it for this `right` is to drop characters from the left. So shrink from the left while the window still covers `t`, recording every candidate, and stop when a needed character is lost. Then keep growing. Every shortest window is seen this way, because for each `right` the loop reaches the latest `left` that still works.

The bookkeeping is one dictionary and one number. `need[ch]` is how many more copies of `ch` the window requires. It goes negative when the window holds spare copies. `missing` is the total number of required characters not yet in the window. A character entering the window lowers `missing` only if `need[ch]` was positive, and a character leaving raises it only if `need[ch]` becomes positive again. The window covers `t` exactly when `missing` is `0`, so there is no need to compare whole dictionaries.

```python
from collections import Counter


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t)
        missing = len(t)
        best_start, best_length = 0, len(s) + 1
        left = 0
        for right, ch in enumerate(s):
            if need[ch] > 0:
                missing -= 1
            need[ch] -= 1
            while missing == 0:
                if right - left + 1 < best_length:
                    best_start, best_length = left, right - left + 1
                need[s[left]] += 1
                if need[s[left]] > 0:
                    missing += 1
                left += 1
        if best_length > len(s):
            return ""
        return s[best_start:best_start + best_length]


print(repr(Solution().minWindow("abbbca", "abc")))
print(repr(Solution().minWindow("ADOBECODEBANC", "ABC")))
print(repr(Solution().minWindow("aa", "aa")))
print(repr(Solution().minWindow("a", "aa")))
print(repr(Solution().minWindow("xyz", "y")))
```

**Time** `O(n + m)` for `n = len(s)` and `m = len(t)`, because each pointer only moves forward. **Space** `O(k)`, where `k` is the number of distinct characters.

**Brute force.** Try every length from `len(t)` upwards, and every start for that length. The first substring that covers `t` is the shortest. Counting each substring from scratch makes this far too slow for long inputs, but it is a clear statement of what the window version computes.

```python
from collections import Counter


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t)
        for length in range(len(t), len(s) + 1):
            for start in range(len(s) - length + 1):
                window = Counter(s[start:start + length])
                if all(window[ch] >= count for ch, count in need.items()):
                    return s[start:start + length]
        return ""


print(repr(Solution().minWindow("abbbca", "abc")))
print(repr(Solution().minWindow("ADOBECODEBANC", "ABC")))
print(repr(Solution().minWindow("aa", "aa")))
print(repr(Solution().minWindow("a", "aa")))
print(repr(Solution().minWindow("xyz", "y")))
```

**Time** `O(n³)`, **space** `O(n)`.
:::
