---
title: Sum of Two Integers
description: "Sum of Two Integers in Python: add with XOR and carry with AND, using a 32-bit mask because Python integers never overflow."
---

# Sum of Two Integers

<ProblemMeta />

## Problem

You are given two integers `a` and `b`, each small enough to fit in a signed 32-bit integer, and so does their sum. Return `a + b` without using the `+` or `-` operators.

| Input | Output |
| --- | --- |
| `a = 1`, `b = 2` | `3` |
| `a = -2`, `b = 3` | `1` |
| `a = -5`, `b = -7` | `-12` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        pass


print(Solution().getSum(1, 2))
print(Solution().getSum(-2, 3))
print(Solution().getSum(-5, -7))
print(Solution().getSum(-1, 1))
print(Solution().getSum(1000, -1000))
print(Solution().getSum(0, 0))
```

::: details Solution
**Idea.** Add two bits by hand: `0 + 0 = 0`, `0 + 1 = 1`, `1 + 1 = 0` with a carry of 1. Two operators give those two parts for every position at once:

- `a ^ b` is the sum of each position without the carries, because XOR gives 1 exactly when one of the two bits is 1.
- `(a & b) << 1` is the carries, because a carry appears only where both bits are 1, and it belongs one position to the left.

The real sum is those two numbers added together, which is the same problem again with new inputs. Repeat until the carry is 0. Each round pushes the carries at least one position to the left, so in a 32-bit machine the loop ends after at most 32 rounds: the carries either vanish or fall off the left end.

**Why Python needs a mask.** Python integers have no left end. A negative number behaves as if it had an endless run of 1 bits on the left, so with a negative input the carry can keep moving left forever and the loop never ends. The fix is to imitate a 32-bit machine. `& 0xFFFFFFFF` keeps only the low 32 bits, which turns a negative number into its 32-bit two's complement pattern and throws away any carry past position 31.

After the loop, `a` holds the 32-bit pattern of the answer as a non-negative Python integer. If bit 31 is 0, the answer is positive and `a` is already correct. If bit 31 is 1, the pattern stands for a negative number. `a ^ MASK` flips the low 32 bits, and `~` then flips every bit including the endless ones on the left. The low 32 bits end up unchanged and all higher bits become 1, which is how Python stores that negative number.

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        MASK = 0xFFFFFFFF
        MAX_INT = 0x7FFFFFFF

        a &= MASK
        b &= MASK
        while b:
            carry = (a & b) << 1
            a = (a ^ b) & MASK
            b = carry & MASK

        return a if a <= MAX_INT else ~(a ^ MASK)


print(Solution().getSum(1, 2))
print(Solution().getSum(-2, 3))
print(Solution().getSum(-5, -7))
print(Solution().getSum(-1, 1))
print(Solution().getSum(1000, -1000))
print(Solution().getSum(0, 0))
```

**Time** `O(1)`, at most 32 rounds. **Space** `O(1)`.
:::
