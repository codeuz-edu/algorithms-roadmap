---
title: Reverse Bits
description: "Reverse Bits in Python: move the 32 bits one at a time from the low end of the input to the low end of the result."
---

# Reverse Bits

<ProblemMeta />

## Problem

You are given a non-negative integer `n` that fits in 32 bits. Write it as exactly 32 binary digits, including leading zeros, reverse the order of those digits, and return the resulting number.

| Input | As 32 bits | Reversed | Output |
| --- | --- | --- | --- |
| `1` | `00000000000000000000000000000001` | `10000000000000000000000000000000` | `2147483648` |
| `43261596` | `00000010100101000001111010011100` | `00111001011110000010100101000000` | `964176192` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        pass


print(Solution().reverseBits(1))
print(Solution().reverseBits(43261596))
print(Solution().reverseBits(4294967293))
print(Solution().reverseBits(4294967295))
print(Solution().reverseBits(0))
```

::: details Solution
**Idea.** Build the result from the other end. Take the lowest bit of `n` with `n & 1`. Shift the result left by one to make room and put that bit in the new lowest position. Then shift `n` right by one so its next bit is ready.

The first bit taken from `n` is shifted left 31 more times by the later rounds, so it ends up as the highest bit. The last bit taken stays at the bottom. That is the reversed order.

The loop must run exactly 32 times, not until `n` is 0. The leading zeros of `n` are part of the 32 digits and become trailing zeros of the result. Stopping early for `n = 1` would return 1.

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        result = 0
        for _ in range(32):
            result = (result << 1) | (n & 1)
            n >>= 1
        return result


print(Solution().reverseBits(1))
print(Solution().reverseBits(43261596))
print(Solution().reverseBits(4294967293))
print(Solution().reverseBits(4294967295))
print(Solution().reverseBits(0))
```

**Time** `O(1)`, always 32 steps. **Space** `O(1)`.

**Swapping halves.** If the function is called very often, the loop can be replaced by five fixed steps. Swap the two 16-bit halves. Then, inside each half, swap the two 8-bit pieces. Then 4-bit pieces, then pairs, then single neighbours. Reversing a sequence is the same as swapping its halves and reversing each half, and every step does that for all pieces at once.

Each mask picks the pieces that move in one direction: `0xFF00FF00` is the upper byte of each 16-bit half, `0xF0F0F0F0` the upper 4 bits of each byte, and so on. Python integers have no fixed width, so the first step needs `& 0xFFFFFFFF` to cut off the bits that the left shift pushes past position 31. In the later steps the masks already do this.

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        n = (n >> 16) | ((n << 16) & 0xFFFFFFFF)
        n = ((n & 0xFF00FF00) >> 8) | ((n & 0x00FF00FF) << 8)
        n = ((n & 0xF0F0F0F0) >> 4) | ((n & 0x0F0F0F0F) << 4)
        n = ((n & 0xCCCCCCCC) >> 2) | ((n & 0x33333333) << 2)
        n = ((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1)
        return n


print(Solution().reverseBits(1))
print(Solution().reverseBits(43261596))
print(Solution().reverseBits(4294967293))
print(Solution().reverseBits(4294967295))
print(Solution().reverseBits(0))
```

**Time** `O(1)`, **space** `O(1)`.
:::
