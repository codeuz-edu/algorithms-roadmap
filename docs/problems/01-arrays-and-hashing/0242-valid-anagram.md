---
title: Valid Anagram
description: "Valid Anagram in Python: compare letter counts with a dictionary in O(n) time, or sort both strings."
---

# Valid Anagram

<ProblemMeta />

## Problem

You are given two strings `s` and `t`. Return `True` if `t` is an anagram of `s`: the same letters, each used the same number of times, in any order.

| Input | Output |
| --- | --- |
| `s = "anagram"`, `t = "nagaram"` | `True` |
| `s = "rat"`, `t = "car"` | `False` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        pass


print(Solution().isAnagram("anagram", "nagaram"))
print(Solution().isAnagram("rat", "car"))
print(Solution().isAnagram("aab", "ab"))
```

::: details Solution
**Idea.** Two strings are anagrams when every letter has the same count in both. Count the letters of `s` in a dictionary, then take one away for each letter of `t`. A letter that is missing, or whose count has already reached zero, means `t` uses it more often than `s` does.

Strings of different lengths can never be anagrams, and checking that first means the counts must all end at zero when the loop finishes.

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        freq = {}
        for ch in s:
            freq[ch] = freq.get(ch, 0) + 1

        for ch in t:
            if freq.get(ch, 0) == 0:
                return False
            freq[ch] -= 1
        return True


print(Solution().isAnagram("anagram", "nagaram"))
print(Solution().isAnagram("rat", "car"))
print(Solution().isAnagram("aab", "ab"))
```

**Time** `O(n)`, **space** `O(k)`, where `k` is the number of different letters.

**Sorting.** Anagrams become the same string once their letters are sorted. This is one line, at the cost of the sort.

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)


print(Solution().isAnagram("anagram", "nagaram"))
print(Solution().isAnagram("rat", "car"))
print(Solution().isAnagram("aab", "ab"))
```

**Time** `O(n log n)`, **space** `O(n)`.
:::
