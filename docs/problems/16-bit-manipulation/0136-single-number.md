---
title: Single Number
description: "Single Number in Python: XOR every value together so the pairs cancel and the lone value remains."
---

# Single Number

<ProblemMeta />

## Problem

You are given a non-empty list of integers `nums`. Every value appears exactly twice, except for one value that appears once. Return that value. Aim for linear time and constant extra space.

| Input | Output |
| --- | --- |
| `[2, 2, 1]` | `1` |
| `[4, 1, 2, 1, 2]` | `4` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        pass


print(Solution().singleNumber([2, 2, 1]))
print(Solution().singleNumber([4, 1, 2, 1, 2]))
print(Solution().singleNumber([-3, 7, -3]))
print(Solution().singleNumber([0, 5, 5]))
print(Solution().singleNumber([1]))
```

::: details Solution
**Idea.** XOR (`^`) compares two numbers bit by bit and gives 1 where the bits differ. Three facts about it solve the problem:

- `a ^ a == 0`: a number cancels itself, because no bits differ
- `a ^ 0 == a`: XOR with zero changes nothing
- the order does not matter: `a ^ b ^ a` equals `a ^ a ^ b`

XOR all the numbers together. Since order does not matter, picture the equal values next to each other. Each pair cancels to 0, and the one value without a partner is all that is left.

```python
class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        result = 0
        for num in nums:
            result ^= num
        return result


print(Solution().singleNumber([2, 2, 1]))
print(Solution().singleNumber([4, 1, 2, 1, 2]))
print(Solution().singleNumber([-3, 7, -3]))
print(Solution().singleNumber([0, 5, 5]))
print(Solution().singleNumber([1]))
```

**Time** `O(n)`, **space** `O(1)`.

**With a set.** Without the XOR trick, keep a set of values that are still waiting for their partner. Add a value the first time it is seen and remove it the second time. One value stays behind. This is the version to reach for first, and it shows what the XOR version saves: the extra memory.

```python
class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        waiting = set()
        for num in nums:
            if num in waiting:
                waiting.remove(num)
            else:
                waiting.add(num)
        return waiting.pop()


print(Solution().singleNumber([2, 2, 1]))
print(Solution().singleNumber([4, 1, 2, 1, 2]))
print(Solution().singleNumber([-3, 7, -3]))
print(Solution().singleNumber([0, 5, 5]))
print(Solution().singleNumber([1]))
```

**Time** `O(n)`, **space** `O(n)`.
:::
