---
title: Subsets II
description: "Subsets II in Python: sort the numbers, then backtrack and skip equal values at the same depth to avoid duplicate subsets."
---

# Subsets II

<ProblemMeta />

## Problem

You are given a list `nums` that may contain the same integer more than once. Return every distinct subset. Two subsets are the same if they hold the same numbers the same number of times, whatever the order.

| Input | Output |
| --- | --- |
| `[1, 2, 2]` | `[[], [1], [2], [1, 2], [2, 2], [1, 2, 2]]` |
| `[3, 3]` | `[[], [3], [3, 3]]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts each subset and then the whole list before printing. A duplicate subset would still show up in the output.

```python
class Solution:
    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:
        pass


def show(result):
    print(sorted(sorted(subset) for subset in (result or [])))


show(Solution().subsetsWithDup([1, 2, 2]))
show(Solution().subsetsWithDup([3, 3, 3]))
show(Solution().subsetsWithDup([2, 1, 2, 1]))
show(Solution().subsetsWithDup([0]))
```

::: details Solution
**Idea.** The method from [Subsets](/problems/subsets) fails here because two equal numbers are interchangeable. With `[1, 2, 2]`, taking the first `2` alone and taking the second `2` alone both give `[2]`.

Sort the list so equal numbers sit next to each other. Then write the search as: the current picks are a subset, and each later number is a candidate for the next pick. Inside one call, all candidates compete for the same position. If two candidates have the same value, choosing either leads to the same subsets, so only the first of them is tried. That is the `i > start` test: it skips a value equal to the one just tried in this loop.

The test does not stop a value from being used twice in one subset. `[2, 2]` is still built, because the second `2` is picked one level deeper, where it is the first candidate of its own loop.

```python
class Solution:
    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:
        nums = sorted(nums)
        result = []
        subset = []

        def backtrack(start):
            result.append(subset.copy())
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                subset.append(nums[i])
                backtrack(i + 1)
                subset.pop()

        backtrack(0)
        return result


def show(result):
    print(sorted(sorted(subset) for subset in (result or [])))


show(Solution().subsetsWithDup([1, 2, 2]))
show(Solution().subsetsWithDup([3, 3, 3]))
show(Solution().subsetsWithDup([2, 1, 2, 1]))
show(Solution().subsetsWithDup([0]))
```

**Time** `O(n · 2ⁿ)`, **space** `O(n)` for the recursion and the sorted copy, not counting the output.

**Without recursion.** The doubling method also works with one change. Normally each new number is appended to every subset built so far. When the number equals the previous one, appending it to the older subsets would repeat what the previous number already produced. So append it only to the subsets that the previous step created.

```python
class Solution:
    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:
        nums = sorted(nums)
        result = [[]]
        previous_size = 0
        for i, num in enumerate(nums):
            start = previous_size if i > 0 and num == nums[i - 1] else 0
            previous_size = len(result)
            result += [subset + [num] for subset in result[start:]]
        return result


def show(result):
    print(sorted(sorted(subset) for subset in (result or [])))


show(Solution().subsetsWithDup([1, 2, 2]))
show(Solution().subsetsWithDup([3, 3, 3]))
show(Solution().subsetsWithDup([2, 1, 2, 1]))
show(Solution().subsetsWithDup([0]))
```

**Time** `O(n · 2ⁿ)`, **space** `O(n)` for the sorted copy, not counting the output.
:::
