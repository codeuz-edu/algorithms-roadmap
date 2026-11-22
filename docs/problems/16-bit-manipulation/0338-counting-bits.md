---
title: Counting Bits
description: "Counting Bits in Python: reuse the answer for i >> 1 to get the number of 1 bits of every number from 0 to n in O(n)."
---

# Counting Bits

<ProblemMeta />

## Problem

You are given an integer `n`. Return a list of length `n + 1` where position `i` holds the number of 1 bits in the binary form of `i`.

| Input | Output | Binary forms |
| --- | --- | --- |
| `2` | `[0, 1, 1]` | `0`, `1`, `10` |
| `5` | `[0, 1, 1, 2, 1, 2]` | `0`, `1`, `10`, `11`, `100`, `101` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def countBits(self, n: int) -> list[int]:
        pass


print(Solution().countBits(2))
print(Solution().countBits(5))
print(Solution().countBits(16))
print(Solution().countBits(0))
```

::: details Solution
**Idea.** Counting the bits of each number separately works, but it ignores that the answers are related. Shifting `i` right by one drops its last bit and leaves the rest unchanged. So the number of 1 bits in `i` is the number of 1 bits in `i >> 1`, plus 1 if the dropped bit was a 1.

`i >> 1` is smaller than `i` for every `i` above 0, so its answer is already in the list when `i` is reached. Each entry then costs one lookup and one addition:

`bits[i] = bits[i >> 1] + (i & 1)`

```python
class Solution:
    def countBits(self, n: int) -> list[int]:
        bits = [0] * (n + 1)
        for i in range(1, n + 1):
            bits[i] = bits[i >> 1] + (i & 1)
        return bits


print(Solution().countBits(2))
print(Solution().countBits(5))
print(Solution().countBits(16))
print(Solution().countBits(0))
```

**Time** `O(n)`, **space** `O(n)` for the output.

**Dropping the lowest 1 bit.** A second relation works just as well. `i & (i - 1)` is `i` with its lowest 1 bit removed, as explained in [Number of 1 Bits](/problems/number-of-1-bits). That number is smaller than `i` and has exactly one 1 bit fewer.

```python
class Solution:
    def countBits(self, n: int) -> list[int]:
        bits = [0] * (n + 1)
        for i in range(1, n + 1):
            bits[i] = bits[i & (i - 1)] + 1
        return bits


print(Solution().countBits(2))
print(Solution().countBits(5))
print(Solution().countBits(16))
print(Solution().countBits(0))
```

**Time** `O(n)`, **space** `O(n)` for the output.
:::
