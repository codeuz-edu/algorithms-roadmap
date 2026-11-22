---
title: Subsets
description: "Subsets in Python: build every subset with backtracking by choosing to take or skip each number."
---

# Subsets

<ProblemMeta />

## Problem

You are given a list `nums` of distinct integers. Return every subset of it, including the empty one and the full list. No subset may appear twice, and the order of the subsets does not matter.

| Input | Output |
| --- | --- |
| `[1, 2, 3]` | `[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]` |
| `[5]` | `[[], [5]]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts each subset and then the whole list before printing.

```python
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        pass


def show(result):
    print(sorted(sorted(subset) for subset in (result or [])))


show(Solution().subsets([1, 2, 3]))
show(Solution().subsets([5]))
show(Solution().subsets([]))
show(Solution().subsets([4, -1]))
```

::: details Solution
**Idea.** A subset is fully described by one yes or no answer per number: is it in or out? Walk through the numbers in order and make that decision for each one. First take the number and continue, then undo that choice and continue without it. When every number has been decided, the current picks form one finished subset.

Every sequence of answers is different from every other, so no subset is produced twice. With `n` numbers there are `2ⁿ` sequences, which is exactly the number of subsets.

The `subset.copy()` matters. The same list is reused for the whole search, so storing it without copying would leave the result full of references to one list that ends up empty.

```python
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        result = []
        subset = []

        def backtrack(i):
            if i == len(nums):
                result.append(subset.copy())
                return
            subset.append(nums[i])
            backtrack(i + 1)
            subset.pop()
            backtrack(i + 1)

        backtrack(0)
        return result


def show(result):
    print(sorted(sorted(subset) for subset in (result or [])))


show(Solution().subsets([1, 2, 3]))
show(Solution().subsets([5]))
show(Solution().subsets([]))
show(Solution().subsets([4, -1]))
```

**Time** `O(n · 2ⁿ)`, **space** `O(n)` for the recursion, not counting the output.

**Without recursion.** Start with only the empty subset. For each number, every subset built so far gives one new subset: itself plus that number. The list doubles with each number, and after the last one it holds all `2ⁿ` subsets.

```python
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        result = [[]]
        for num in nums:
            result += [subset + [num] for subset in result]
        return result


def show(result):
    print(sorted(sorted(subset) for subset in (result or [])))


show(Solution().subsets([1, 2, 3]))
show(Solution().subsets([5]))
show(Solution().subsets([]))
show(Solution().subsets([4, -1]))
```

**Time** `O(n · 2ⁿ)`, **space** `O(1)` besides the output.
:::
