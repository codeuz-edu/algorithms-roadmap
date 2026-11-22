---
title: Hand of Straights
description: "Hand of Straights in Python: count the cards, then greedily start every group at the smallest card that is still unused."
---

# Hand of Straights

<ProblemMeta />

## Problem

`hand` is a list of card values. Decide whether all the cards can be arranged into groups of exactly `groupSize` cards where each group is a run of consecutive values, such as `4, 5, 6`.

| Input | Output | Why |
| --- | --- | --- |
| `hand = [1, 2, 3, 2, 3, 4]`, `groupSize = 3` | `True` | `[1, 2, 3]` and `[2, 3, 4]` |
| `hand = [1, 2, 4, 5]`, `groupSize = 2` | `True` | `[1, 2]` and `[4, 5]` |
| `hand = [1, 1, 2, 2, 3, 3]`, `groupSize = 2` | `False` | after two `[1, 2]` groups, `[3, 3]` is not a run |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:
        pass


print(Solution().isNStraightHand([1, 2, 3, 2, 3, 4], 3))
print(Solution().isNStraightHand([1, 2, 4, 5], 2))
print(Solution().isNStraightHand([1, 1, 2, 2, 3, 3], 2))
print(Solution().isNStraightHand([1, 2, 3, 4, 5], 4))
print(Solution().isNStraightHand([9], 1))
```

::: details Solution
**Idea.** Look at the smallest card that has not been used yet. No smaller card is left, so it cannot sit in the middle or at the end of a run. It has to be the first card of a group. That removes all choice: the group is forced to be that card and the next `groupSize - 1` values. If one of those values has run out, no arrangement exists at all.

Repeat with the smallest card that remains. Because every step is forced, the greedy answer is not just a good arrangement, it is the only possible one.

To do this quickly, count the cards and walk through the distinct values in increasing order. If a value still has `need` copies left when the walk gets to it, all `need` copies must start a group, so take `need` cards from each of the following `groupSize - 1` values in one go.

A hand whose size is not a multiple of `groupSize` can be rejected before any of this.

```python
from collections import Counter


class Solution:
    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand)
        for card in sorted(count):
            need = count[card]
            if need == 0:
                continue
            for value in range(card, card + groupSize):
                if count[value] < need:
                    return False
                count[value] -= need
        return True


print(Solution().isNStraightHand([1, 2, 3, 2, 3, 4], 3))
print(Solution().isNStraightHand([1, 2, 4, 5], 2))
print(Solution().isNStraightHand([1, 1, 2, 2, 3, 3], 2))
print(Solution().isNStraightHand([1, 2, 3, 4, 5], 4))
print(Solution().isNStraightHand([9], 1))
```

**Time** `O(n log n)` for the sort. The inner loop runs once per value that starts a group, and there are at most `n / groupSize` of those, so the rest is `O(n)`. **Space** `O(n)`.
:::
