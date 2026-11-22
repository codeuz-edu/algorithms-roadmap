---
title: Longest Repeating Character Replacement
description: "Longest Repeating Character Replacement in Python: a sliding window that stays valid while everything except its most common letter fits in k changes."
---

# Longest Repeating Character Replacement

<ProblemMeta />

## Problem

You are given a string `s` of uppercase letters and an integer `k`. You may change at most `k` characters, each to any uppercase letter. Return the length of the longest substring that can be made of one repeated letter.

| Input | Output | Why |
| --- | --- | --- |
| `s = "BAAAB"`, `k = 2` | `5` | change both `B`s to `A` |
| `s = "AABABBA"`, `k = 1` | `4` | `"AABA"` or `"ABBA"` with one change |
| `s = "ABCDE"`, `k = 0` | `1` | no changes allowed |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        pass


print(Solution().characterReplacement("BAAAB", 2))
print(Solution().characterReplacement("AABABBA", 1))
print(Solution().characterReplacement("ABAB", 2))
print(Solution().characterReplacement("ABCDE", 0))
print(Solution().characterReplacement("Z", 3))
```

::: details Solution
**Idea.** Take any window. The cheapest way to make it one repeated letter is to keep its most common letter and change everything else. That costs `window length - count of the most common letter`. The window is valid when this cost is at most `k`.

Grow the window to the right one character at a time, counting letters. When the cost goes above `k`, shrink from the left until it fits again. Shrinking never skips a better answer: if a window ending at `right` is too expensive, any window that starts further left and ends at `right` contains it and costs at least as much.

There are only 26 letters, so finding the most common one with `max(counts.values())` is a constant amount of work.

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        counts = {}
        left = 0
        best = 0
        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch, 0) + 1
            while (right - left + 1) - max(counts.values()) > k:
                counts[s[left]] -= 1
                left += 1
            best = max(best, right - left + 1)
        return best


print(Solution().characterReplacement("BAAAB", 2))
print(Solution().characterReplacement("AABABBA", 1))
print(Solution().characterReplacement("ABAB", 2))
print(Solution().characterReplacement("ABCDE", 0))
print(Solution().characterReplacement("Z", 3))
```

**Time** `O(26 · n)`, which is `O(n)`, **space** `O(26)`, which is `O(1)`.

**Without recomputing the maximum.** The answer only improves when some letter count reaches a new record. So keep `max_count` as the highest count any window has had, and never lower it. When the window is too expensive, slide it one step instead of shrinking it: the window keeps the size of the best valid window found so far, and it only grows when a higher `max_count` makes a longer one valid.

`max_count` may be out of date for the current window, but that is harmless. The window length never exceeds `max_count + k`, and at the moment `max_count` was set a real window with that count existed.

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        counts = {}
        left = 0
        max_count = 0
        best = 0
        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch, 0) + 1
            max_count = max(max_count, counts[ch])
            if (right - left + 1) - max_count > k:
                counts[s[left]] -= 1
                left += 1
            best = max(best, right - left + 1)
        return best


print(Solution().characterReplacement("BAAAB", 2))
print(Solution().characterReplacement("AABABBA", 1))
print(Solution().characterReplacement("ABAB", 2))
print(Solution().characterReplacement("ABCDE", 0))
print(Solution().characterReplacement("Z", 3))
```

**Time** `O(n)`, **space** `O(1)`.
:::
