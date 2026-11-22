---
title: Permutation in String
description: "Permutation in String in Python: slide a fixed-size window over the second string and compare letter counts."
---

# Permutation in String

<ProblemMeta />

## Problem

You are given two strings of lowercase letters, `s1` and `s2`. Return `True` if some substring of `s2` is a rearrangement of `s1`, and `False` otherwise.

| Input | Output | Why |
| --- | --- | --- |
| `s1 = "adc"`, `s2 = "dcda"` | `True` | `"cda"` uses the same letters |
| `s1 = "ab"`, `s2 = "eidboaoo"` | `False` | `a` and `b` are never adjacent |
| `s1 = "abc"`, `s2 = "ab"` | `False` | `s2` is too short |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        pass


print(Solution().checkInclusion("adc", "dcda"))
print(Solution().checkInclusion("ab", "eidbaooo"))
print(Solution().checkInclusion("ab", "eidboaoo"))
print(Solution().checkInclusion("abc", "ab"))
print(Solution().checkInclusion("a", "a"))
```

::: details Solution
**Idea.** A rearrangement of `s1` has the same length and the same letter counts as `s1`, in any order. So the question becomes: does any window of length `len(s1)` in `s2` have the same letter counts as `s1`? This is the test from [Valid Anagram](/problems/valid-anagram), applied to every window.

Counting each window from scratch would be wasteful. Neighbouring windows differ by one letter entering on the right and one leaving on the left, so update two counters and compare. The counts are lists of 26 numbers, which makes each comparison a constant amount of work.

Before the window is full it holds fewer letters than `s1`, so the lists cannot be equal and no separate check is needed.

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False

        need = [0] * 26
        window = [0] * 26
        for ch in s1:
            need[ord(ch) - ord("a")] += 1

        for i, ch in enumerate(s2):
            window[ord(ch) - ord("a")] += 1
            if i >= len(s1):
                window[ord(s2[i - len(s1)]) - ord("a")] -= 1
            if window == need:
                return True
        return False


print(Solution().checkInclusion("adc", "dcda"))
print(Solution().checkInclusion("ab", "eidbaooo"))
print(Solution().checkInclusion("ab", "eidboaoo"))
print(Solution().checkInclusion("abc", "ab"))
print(Solution().checkInclusion("a", "a"))
```

**Time** `O(26 · n)`, which is `O(n)` for `n = len(s2)`, **space** `O(1)`.

**Brute force.** Sort `s1` once, then sort every window of `s2` and compare. It states the idea in the fewest lines, at the cost of sorting `n` windows.

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        size = len(s1)
        target = sorted(s1)
        for start in range(len(s2) - size + 1):
            if sorted(s2[start:start + size]) == target:
                return True
        return False


print(Solution().checkInclusion("adc", "dcda"))
print(Solution().checkInclusion("ab", "eidbaooo"))
print(Solution().checkInclusion("ab", "eidboaoo"))
print(Solution().checkInclusion("abc", "ab"))
print(Solution().checkInclusion("a", "a"))
```

**Time** `O(n · m log m)` for `m = len(s1)`, **space** `O(m)`.
:::
