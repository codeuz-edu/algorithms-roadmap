---
title: Combination Sum
description: "Combination Sum in Python: backtracking with a start index so each number can be reused but no combination repeats."
---

# Combination Sum

<ProblemMeta />

## Problem

You are given a list `candidates` of distinct positive integers and a positive integer `target`. Return every combination of candidates that adds up to `target`. A candidate may be used as many times as you like. Two combinations are the same if they use each number the same number of times, so `[2, 2, 3]` and `[3, 2, 2]` count once.

| Input | Output |
| --- | --- |
| `candidates = [2, 3, 5]`, `target = 7` | `[[2, 2, 3], [2, 5]]` |
| `candidates = [4, 6]`, `target = 5` | `[]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts each combination and then the whole list before printing.

```python
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        pass


def show(result):
    print(sorted(sorted(combo) for combo in (result or [])))


show(Solution().combinationSum([2, 3, 5], 7))
show(Solution().combinationSum([5, 3, 2], 8))
show(Solution().combinationSum([4, 6], 5))
show(Solution().combinationSum([1], 3))
```

::: details Solution
**Idea.** Build a combination one number at a time and track how much of the target is still missing. When the remainder reaches zero, the combination is complete.

The risk is producing `[2, 3]` and `[3, 2]` as two answers. To prevent that, only allow combinations whose numbers appear in the same order as in the candidate list. The call receives a `start` index and may only pick candidates from `start` onwards. Picking candidate `i` passes `i` to the next call, not `i + 1`, so the same number can be picked again, but nothing before it can. Each combination then has exactly one way to be built.

Sorting the candidates first allows an early exit: once a candidate is larger than the remainder, all later ones are too, so the loop can stop.

```python
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
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
                combo.append(candidates[i])
                backtrack(i, remaining - candidates[i])
                combo.pop()

        backtrack(0, target)
        return result


def show(result):
    print(sorted(sorted(combo) for combo in (result or [])))


show(Solution().combinationSum([2, 3, 5], 7))
show(Solution().combinationSum([5, 3, 2], 8))
show(Solution().combinationSum([4, 6], 5))
show(Solution().combinationSum([1], 3))
```

**Time** is exponential: at most `O(n^(t/m))` for `n` candidates, target `t` and smallest candidate `m`, because a combination holds at most `t/m` numbers. **Space** `O(t/m)` for the recursion, not counting the output.

**Dynamic programming.** Let `ways[a]` hold every combination that adds up to `a`. Process the candidates one at a time. For the current candidate `num`, every combination for `a - num` becomes a combination for `a` by appending `num`. Going through amounts from small to large lets `num` be appended several times. Because a candidate is only added after all earlier candidates are finished, the numbers in each combination follow the candidate order, which again rules out repeats.

This stores every partial combination, so it uses more memory than backtracking. It is the same table as in [Coin Change II](/problems/coin-change-ii), which counts the combinations instead of listing them.

```python
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        ways = [[] for _ in range(target + 1)]
        ways[0] = [[]]
        for num in candidates:
            for amount in range(num, target + 1):
                for combo in ways[amount - num]:
                    ways[amount].append(combo + [num])
        return ways[target]


def show(result):
    print(sorted(sorted(combo) for combo in (result or [])))


show(Solution().combinationSum([2, 3, 5], 7))
show(Solution().combinationSum([5, 3, 2], 8))
show(Solution().combinationSum([4, 6], 5))
show(Solution().combinationSum([1], 3))
```

**Time** and **space** are both proportional to the total size of all combinations stored for the amounts `0` to `target`, which is exponential in the worst case.
:::
