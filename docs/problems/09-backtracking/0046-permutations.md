---
title: Permutations
description: "Permutations in Python: backtracking that fills one position at a time with a number that is not used yet."
---

# Permutations

<ProblemMeta />

## Problem

You are given a list `nums` of distinct integers. Return every possible ordering of the list. The orderings can be returned in any order.

| Input | Output |
| --- | --- |
| `[1, 2, 3]` | `[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]` |
| `[7]` | `[[7]]` |

## Try it yourself

Fill in the method, then press **Check**. The permutations can come in any order: `show` sorts the list before printing.

```python
class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        pass


def show(result):
    print(sorted(result or []))


show(Solution().permute([1, 2, 3]))
show(Solution().permute([0, -1]))
show(Solution().permute([7]))
print(len(Solution().permute([1, 2, 3, 4, 5]) or []))
```

::: details Solution
**Idea.** Fill the permutation from left to right. For the next position, try every number that has not been used yet, place it, and recurse to fill the rest. After the recursive call returns, take the number back out so the next candidate can use the position.

A `used` list remembers which numbers are in the current permutation. Two different paths through the recursion differ at the first position where they chose different numbers, so every permutation is produced exactly once. The first position has `n` choices, the second `n - 1`, and so on, which gives `n!` results.

```python
class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        result = []
        perm = []
        used = [False] * len(nums)

        def backtrack():
            if len(perm) == len(nums):
                result.append(perm.copy())
                return
            for i, num in enumerate(nums):
                if used[i]:
                    continue
                used[i] = True
                perm.append(num)
                backtrack()
                perm.pop()
                used[i] = False

        backtrack()
        return result


def show(result):
    print(sorted(result or []))


show(Solution().permute([1, 2, 3]))
show(Solution().permute([0, -1]))
show(Solution().permute([7]))
print(len(Solution().permute([1, 2, 3, 4, 5]) or []))
```

**Time** `O(n · n!)`, **space** `O(n)` for the recursion, not counting the output.

**By insertion.** Start with one empty permutation. Take the numbers one at a time and insert the new number into every gap of every permutation built so far. A permutation of length `k` has `k + 1` gaps, so the count grows as `1 · 2 · 3 · ... · n`.

```python
class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        result = [[]]
        for num in nums:
            result = [perm[:i] + [num] + perm[i:] for perm in result for i in range(len(perm) + 1)]
        return result


def show(result):
    print(sorted(result or []))


show(Solution().permute([1, 2, 3]))
show(Solution().permute([0, -1]))
show(Solution().permute([7]))
print(len(Solution().permute([1, 2, 3, 4, 5]) or []))
```

**Time** `O(n · n!)`, **space** `O(1)` besides the output.
:::
