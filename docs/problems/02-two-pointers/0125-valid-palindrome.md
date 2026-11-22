---
title: Valid Palindrome
description: "Valid Palindrome in Python: compare characters from both ends with two pointers, skipping punctuation and case."
---

# Valid Palindrome

<ProblemMeta />

## Problem

You are given a string `s`. Return `True` if it reads the same forward and backward once you ignore upper and lower case and drop every character that is not a letter or a digit.

| Input | Output |
| --- | --- |
| `"A man, a plan, a canal: Panama"` | `True` |
| `"race a car"` | `False` |
| `" "` | `True` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass


print(Solution().isPalindrome("A man, a plan, a canal: Panama"))
print(Solution().isPalindrome("race a car"))
print(Solution().isPalindrome(" "))
```

::: details Solution
**Idea.** Build a cleaned copy that keeps only letters and digits, in lower case. The string is a palindrome when that copy equals its own reverse.

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        cleaned = ""
        for ch in s:
            if ch.isalnum():
                cleaned += ch.lower()
        return cleaned == cleaned[::-1]


print(Solution().isPalindrome("A man, a plan, a canal: Panama"))
print(Solution().isPalindrome("race a car"))
print(Solution().isPalindrome(" "))
```

**Time** `O(n)`, **space** `O(n)` for the copy.

**Two pointers.** The copy is not needed. Put one pointer at each end and move them toward each other. Each pointer skips characters that are not letters or digits, then the two characters are compared. A mismatch means the answer is `False`. If the pointers meet, every pair matched.

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            if not s[left].isalnum():
                left += 1
            elif not s[right].isalnum():
                right -= 1
            elif s[left].lower() != s[right].lower():
                return False
            else:
                left += 1
                right -= 1
        return True


print(Solution().isPalindrome("A man, a plan, a canal: Panama"))
print(Solution().isPalindrome("race a car"))
print(Solution().isPalindrome(" "))
```

**Time** `O(n)`, **space** `O(1)`.
:::
