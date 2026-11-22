---
title: Longest Substring Without Repeating Characters
description: "Longest Substring Without Repeating Characters in Python: a sliding window that jumps past the previous copy of a repeated character."
---

# Longest Substring Without Repeating Characters

<ProblemMeta />

## Problem

You are given a string `s`. Return the length of the longest run of consecutive characters in which no character appears twice.

| Input | Output | Longest run |
| --- | --- | --- |
| `"window"` | `5` | `"indow"` |
| `"abba"` | `2` | `"ab"` or `"ba"` |
| `"zzzz"` | `1` | `"z"` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass


print(Solution().lengthOfLongestSubstring("window"))
print(Solution().lengthOfLongestSubstring("abba"))
print(Solution().lengthOfLongestSubstring("zzzz"))
print(Solution().lengthOfLongestSubstring("pwwkew"))
print(Solution().lengthOfLongestSubstring(""))
```

::: details Solution
**Idea.** Keep a window `s[left..right]` that never contains a repeat. Move `right` one character at a time. If the new character is already inside the window, the window is no longer valid, and the only way to fix it is to move `left` just past the earlier copy.

A dictionary from each character to the index where it was last seen makes that jump a single step. The check `last[ch] >= left` matters: a copy that lies before `left` is already outside the window and must be ignored. Without it, `"abba"` would move `left` backwards when it reaches the second `a`.

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last = {}
        left = 0
        best = 0
        for right, ch in enumerate(s):
            if ch in last and last[ch] >= left:
                left = last[ch] + 1
            last[ch] = right
            best = max(best, right - left + 1)
        return best


print(Solution().lengthOfLongestSubstring("window"))
print(Solution().lengthOfLongestSubstring("abba"))
print(Solution().lengthOfLongestSubstring("zzzz"))
print(Solution().lengthOfLongestSubstring("pwwkew"))
print(Solution().lengthOfLongestSubstring(""))
```

**Time** `O(n)`, **space** `O(k)`, where `k` is the number of distinct characters.

**With a set.** The same window can be kept with a set of the characters inside it. When the new character is already in the set, remove characters from the left one by one until it is gone. Each character is added once and removed at most once, so this is still linear.

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        window = set()
        left = 0
        best = 0
        for right, ch in enumerate(s):
            while ch in window:
                window.remove(s[left])
                left += 1
            window.add(ch)
            best = max(best, right - left + 1)
        return best


print(Solution().lengthOfLongestSubstring("window"))
print(Solution().lengthOfLongestSubstring("abba"))
print(Solution().lengthOfLongestSubstring("zzzz"))
print(Solution().lengthOfLongestSubstring("pwwkew"))
print(Solution().lengthOfLongestSubstring(""))
```

**Time** `O(n)`, **space** `O(k)`.
:::
