---
title: Contains Duplicate
description: "Contains Duplicate in Python: detect a repeated value in a list with a set, in O(n) time."
---

# Contains Duplicate

<ProblemMeta />

## Problem

You are given a list of integers `nums`. Return `True` if any value appears at least twice, and `False` if every value is different.

| Input | Output |
| --- | --- |
| `[1, 2, 3, 1]` | `True` |
| `[1, 2, 3, 4]` | `False` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        pass


print(Solution().containsDuplicate([1, 2, 3, 1]))
print(Solution().containsDuplicate([1, 2, 3, 4]))
print(Solution().containsDuplicate([]))
```

::: details Solution
**Idea.** A set remembers the values seen so far and answers "have I seen this one?" in constant time. Walk the list once. The first value that is already in the set is a duplicate.

```python
class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False


print(Solution().containsDuplicate([1, 2, 3, 1]))
print(Solution().containsDuplicate([1, 2, 3, 4]))
print(Solution().containsDuplicate([]))
```

**Time** `O(n)`, **space** `O(n)`. It stops at the first duplicate, so a list that repeats early is answered early.

**Shorter version.** A set drops repeated values, so the list has a duplicate exactly when the set is smaller than the list. This always reads the whole list.

```python
class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        return len(nums) != len(set(nums))


print(Solution().containsDuplicate([1, 2, 3, 1]))
print(Solution().containsDuplicate([1, 2, 3, 4]))
print(Solution().containsDuplicate([]))
```
:::
