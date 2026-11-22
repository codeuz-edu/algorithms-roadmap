---
title: Combination Sum II
description: "Combination Sum II in Python: sort, then backtrack using each number at most once and skipping equal values at the same depth."
---

# Combination Sum II

<ProblemMeta />

## Problem

You are given a list `candidates` of positive integers, which may contain repeats, and a positive integer `target`. Return every distinct combination that adds up to `target`. Each list element can be used at most once, so a value can appear in a combination only as many times as it appears in the list.

| Input | Output |
| --- | --- |
| `candidates = [2, 1, 2, 5]`, `target = 5` | `[[1, 2, 2], [5]]` |
| `candidates = [3, 3]`, `target = 3` | `[[3]]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts each combination and then the whole list before printing. A duplicate combination would still show up in the output.

```python
class Solution:
    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:
        pass


def show(result):
    print(sorted(sorted(combo) for combo in (result or [])))


show(Solution().combinationSum2([2, 1, 2, 5], 5))
show(Solution().combinationSum2([4, 1, 1, 3, 2, 1], 6))
show(Solution().combinationSum2([3, 3], 3))
show(Solution().combinationSum2([1, 1, 1], 2))
show(Solution().combinationSum2([7], 4))
```

::: details Solution
**Idea.** This combines two earlier ideas. As in [Combination Sum](/problems/combination-sum), track the remainder and only pick from a `start` index onwards. Here each element is used once, so picking index `i` passes `i + 1` to the next call.

As in [Subsets II](/problems/subsets-ii), equal values would create the same combination several times. Sort the list, and inside one loop skip any value equal to the one just tried. All candidates in one loop compete for the same position of the combination, and two equal values in that position lead to identical results. Equal values can still appear together in one combination, because the second copy is picked one level deeper.

Sorting also gives the early exit: once a candidate is larger than the remainder, the loop can stop.

```python
class Solution:
    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:
        candidates = sorted(candidates)
        result = []
        combo = []

        def backtrack(start, remaining):
            if remaining == 0:
                result.append(combo.copy())
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remaining:
                    break
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                combo.append(candidates[i])
                backtrack(i + 1, remaining - candidates[i])
                combo.pop()

        backtrack(0, target)
        return result


def show(result):
    print(sorted(sorted(combo) for combo in (result or [])))


show(Solution().combinationSum2([2, 1, 2, 5], 5))
show(Solution().combinationSum2([4, 1, 1, 3, 2, 1], 6))
show(Solution().combinationSum2([3, 3], 3))
show(Solution().combinationSum2([1, 1, 1], 2))
show(Solution().combinationSum2([7], 4))
```

**Time** `O(n · 2ⁿ)`, **space** `O(n)` for the recursion and the sorted copy, not counting the output.

**Counting the copies.** Another way to remove duplicates is to stop treating equal values as separate items. Count how often each value occurs. Then decide, for each distinct value in turn, how many copies to use: zero, one, and so on up to its count. Each combination corresponds to exactly one set of decisions, so nothing has to be skipped.

```python
from collections import Counter


class Solution:
    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:
        counts = sorted(Counter(candidates).items())
        result = []
        combo = []

        def backtrack(i, remaining):
            if remaining == 0:
                result.append(combo.copy())
                return
            if i == len(counts) or counts[i][0] > remaining:
                return
            value, available = counts[i]
            backtrack(i + 1, remaining)
            used = 0
            while used < available and value <= remaining:
                combo.append(value)
                used += 1
                remaining -= value
                backtrack(i + 1, remaining)
            del combo[len(combo) - used:]

        backtrack(0, target)
        return result


def show(result):
    print(sorted(sorted(combo) for combo in (result or [])))


show(Solution().combinationSum2([2, 1, 2, 5], 5))
show(Solution().combinationSum2([4, 1, 1, 3, 2, 1], 6))
show(Solution().combinationSum2([3, 3], 3))
show(Solution().combinationSum2([1, 1, 1], 2))
show(Solution().combinationSum2([7], 4))
```

**Time** `O(n · 2ⁿ)` in the worst case, **space** `O(n)`, not counting the output.
:::
