---
title: Reverse Integer
description: "Reverse Integer in Python: pop digits off the end and check the signed 32-bit limit before every push."
---

# Reverse Integer

<ProblemMeta />

## Problem

You are given a signed 32-bit integer `x`. Return the number formed by writing its digits in reverse order, keeping the sign. If the reversed number does not fit in a signed 32-bit integer, that is, it falls outside `-2³¹` to `2³¹ - 1`, return `0`.

| Input | Output | Note |
| --- | --- | --- |
| `123` | `321` | |
| `-123` | `-321` | the sign stays in front |
| `120` | `21` | the leading zero disappears |
| `1534236469` | `0` | `9646324351` is too large |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def reverse(self, x: int) -> int:
        pass


print(Solution().reverse(123))
print(Solution().reverse(-123))
print(Solution().reverse(120))
print(Solution().reverse(1534236469))
print(Solution().reverse(-2147483648))
print(Solution().reverse(1463847412))
print(Solution().reverse(0))
```

::: details Solution
**Idea.** Take the digits off the end of `x` one at a time and append each one to the result: `digit = x % 10` reads the last digit, `x //= 10` removes it, and `result = result * 10 + digit` pushes it onto the result. The last digit of `x` is pushed first, so it ends up in front.

Work on the absolute value and put the sign back at the end. Python's `%` and `//` round toward minus infinity, so `-123 % 10` is `7`, not `-3`, and using them on a negative number directly gives wrong digits.

**The 32-bit limit.** Python integers never overflow, so nothing goes wrong by itself when the result gets too large. The check has to be written out. The original problem also assumes the machine cannot hold anything wider than 32 bits, so the honest way is to test before each push, not after the number is built.

A positive result may be at most `2³¹ - 1 = 2147483647`. A negative one may reach `-2³¹`, so its absolute value may be at most `2147483648`. Call that bound `limit`. The push `result * 10 + digit` stays within `limit` exactly when `result <= (limit - digit) // 10`, and that test only uses numbers that already fit.

```python
class Solution:
    def reverse(self, x: int) -> int:
        sign = -1 if x < 0 else 1
        limit = 2**31 if x < 0 else 2**31 - 1
        x = abs(x)

        result = 0
        while x:
            digit = x % 10
            x //= 10
            if result > (limit - digit) // 10:
                return 0
            result = result * 10 + digit
        return sign * result


print(Solution().reverse(123))
print(Solution().reverse(-123))
print(Solution().reverse(120))
print(Solution().reverse(1534236469))
print(Solution().reverse(-2147483648))
print(Solution().reverse(1463847412))
print(Solution().reverse(0))
```

**Time** `O(d)`, where `d` is the number of digits, at most 10. **Space** `O(1)`.

**With a string.** In Python the shortest route is to reverse the digits as text and check the range once at the end. It builds the full reversed number before checking, which is fine in Python but would not be possible on the 32-bit machine the problem describes.

```python
class Solution:
    def reverse(self, x: int) -> int:
        sign = -1 if x < 0 else 1
        result = sign * int(str(abs(x))[::-1])
        if result < -(2**31) or result > 2**31 - 1:
            return 0
        return result


print(Solution().reverse(123))
print(Solution().reverse(-123))
print(Solution().reverse(120))
print(Solution().reverse(1534236469))
print(Solution().reverse(-2147483648))
print(Solution().reverse(1463847412))
print(Solution().reverse(0))
```

**Time** `O(d)`, **space** `O(d)` for the string.
:::
