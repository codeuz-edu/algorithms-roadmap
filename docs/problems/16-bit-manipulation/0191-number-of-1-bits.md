---
title: Number of 1 Bits
description: "Number of 1 Bits in Python: clear the lowest set bit with n & (n - 1) and count how many times that takes."
---

# Number of 1 Bits

<ProblemMeta />

## Problem

You are given a non-negative integer `n`. Return how many 1 bits its binary form contains.

| Input | Binary | Output |
| --- | --- | --- |
| `11` | `1011` | `3` |
| `128` | `10000000` | `1` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        pass


print(Solution().hammingWeight(11))
print(Solution().hammingWeight(128))
print(Solution().hammingWeight(2147483645))
print(Solution().hammingWeight(4294967295))
print(Solution().hammingWeight(0))
```

::: details Solution
**Idea.** Subtracting 1 from a number flips its lowest 1 bit to 0 and turns every 0 below it into 1. The bits above stay as they were. For example `12` is `1100` and `11` is `1011`.

So `n & (n - 1)` keeps the upper bits, which are equal in both numbers, and wipes out the lowest 1 bit together with everything below it, where the two numbers disagree. In short, it removes exactly one 1 bit. Count how many times that can be done before `n` reaches 0.

The loop runs once per 1 bit, not once per bit position.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= n - 1
            count += 1
        return count


print(Solution().hammingWeight(11))
print(Solution().hammingWeight(128))
print(Solution().hammingWeight(2147483645))
print(Solution().hammingWeight(4294967295))
print(Solution().hammingWeight(0))
```

**Time** `O(k)`, where `k` is the number of 1 bits, at most 32 for a 32-bit input. **Space** `O(1)`.

**Bit by bit.** The direct way: look at the last bit with `n & 1`, add it to the count, and shift `n` right by one to bring the next bit into place. This always walks over every bit position up to the highest 1 bit.

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            count += n & 1
            n >>= 1
        return count


print(Solution().hammingWeight(11))
print(Solution().hammingWeight(128))
print(Solution().hammingWeight(2147483645))
print(Solution().hammingWeight(4294967295))
print(Solution().hammingWeight(0))
```

**Time** `O(log n)`, which is at most 32 steps for a 32-bit input. **Space** `O(1)`.
:::
