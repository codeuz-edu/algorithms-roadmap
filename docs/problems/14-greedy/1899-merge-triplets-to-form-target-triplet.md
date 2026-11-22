---
title: Merge Triplets to Form Target Triplet
description: "Merge Triplets to Form Target Triplet in Python: discard every triplet that overshoots the target, then check that each target value is covered."
---

# Merge Triplets to Form Target Triplet

<ProblemMeta />

## Problem

Each entry of `triplets` is a list of three integers. Merging two triplets produces a triplet that holds, in each position, the larger of the two values. You may merge as many triplets as you like, in any order. Return `True` if `target` can be produced this way, or is already in the list.

| Input | Output | Why |
| --- | --- | --- |
| `triplets = [[1, 2, 9], [4, 1, 1], [1, 6, 2]]`, `target = [4, 6, 2]` | `True` | merge the second and third |
| `triplets = [[3, 4, 5], [4, 5, 6]]`, `target = [3, 2, 5]` | `False` | both triplets have a middle value above 2 |
| `triplets = [[1, 3, 1], [9, 3, 2]]`, `target = [1, 3, 2]` | `False` | the only triplet with a 2 in the last position also brings a 9 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def mergeTriplets(self, triplets: list[list[int]], target: list[int]) -> bool:
        pass


print(Solution().mergeTriplets([[1, 2, 9], [4, 1, 1], [1, 6, 2]], [4, 6, 2]))
print(Solution().mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]))
print(Solution().mergeTriplets([[1, 3, 1], [9, 3, 2]], [1, 3, 2]))
print(Solution().mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]))
print(Solution().mergeTriplets([[1, 1, 1]], [1, 1, 1]))
```

::: details Solution
**Idea.** A merge takes maximums, so values only ever go up. Once a position holds something larger than the target, nothing can bring it back down. A triplet that exceeds the target in any position is therefore poison: it can never be part of a successful merge. Throw those away.

Every triplet that is left is at most the target in all three positions. Merging any number of them can never overshoot, so there is no reason to be selective: use all of them. This is the greedy step, and it is safe because adding a harmless triplet can only raise a position towards its target value, never past it.

The merge of all the safe triplets equals the target exactly when, for each position, at least one safe triplet has the target value there. So there is no need to build the merge. Keep three flags and set a flag when a safe triplet matches the target in that position.

```python
class Solution:
    def mergeTriplets(self, triplets: list[list[int]], target: list[int]) -> bool:
        matched = [False, False, False]
        for triplet in triplets:
            if all(triplet[i] <= target[i] for i in range(3)):
                for i in range(3):
                    if triplet[i] == target[i]:
                        matched[i] = True
        return all(matched)


print(Solution().mergeTriplets([[1, 2, 9], [4, 1, 1], [1, 6, 2]], [4, 6, 2]))
print(Solution().mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]))
print(Solution().mergeTriplets([[1, 3, 1], [9, 3, 2]], [1, 3, 2]))
print(Solution().mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]))
print(Solution().mergeTriplets([[1, 1, 1]], [1, 1, 1]))
```

**Time** `O(n)`, **space** `O(1)`.
:::
