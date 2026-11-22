---
title: "Pow(x, n)"
description: "Pow(x, n) in Python: fast exponentiation by squaring, written recursively and then iteratively over the bits of n."
---

# Pow(x, n)

<ProblemMeta />

## Problem

Compute `x` raised to the integer power `n` without using the built-in power operator. `n` can be negative or zero, and it can be very large, so multiplying `x` by itself `n` times is too slow.

| Input | Output |
| --- | --- |
| `x = 2.0`, `n = 10` | `1024.0` |
| `x = 2.0`, `n = -2` | `0.25` |
| `x = 1.5`, `n = 3` | `3.375` |
| `x = 5.0`, `n = 0` | `1.0` |

## Try it yourself

Fill in the method, then press **Check**. Results are rounded to 5 decimal places before printing, so tiny floating point differences do not matter.

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        pass


def show(x, n):
    result = Solution().myPow(x, n)
    print(None if result is None else round(result, 5))


show(2.0, 10)
show(2.0, -2)
show(1.5, 3)
show(-2.0, 5)
show(0.5, 7)
show(5.0, 0)
```

::: details Solution
**Idea.** `xⁿ` can be built from `x` raised to half the power: `x¹⁰ = x⁵ · x⁵`. So compute the half once and square it. When `n` is odd, one extra factor of `x` is left over: `x⁵ = x² · x² · x`. Each call halves the exponent, so only about `log₂ n` multiplications are needed.

A negative exponent means a reciprocal: `x⁻ⁿ = 1 / xⁿ`. Compute the positive power and invert it. Anything to the power 0 is 1, which is the base case.

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def power(exponent: int) -> float:
            if exponent == 0:
                return 1.0
            half = power(exponent // 2)
            if exponent % 2 == 1:
                return half * half * x
            return half * half

        if n < 0:
            return 1 / power(-n)
        return power(n)


def show(x, n):
    result = Solution().myPow(x, n)
    print(None if result is None else round(result, 5))


show(2.0, 10)
show(2.0, -2)
show(1.5, 3)
show(-2.0, 5)
show(0.5, 7)
show(5.0, 0)
```

**Time** `O(log n)`, **space** `O(log n)` for the recursion.

**Iterative, bit by bit.** Write `n` in binary. `x¹⁰` with `10 = 1010₂` is `x⁸ · x²`: one factor for each 1 bit. Keep squaring a running `base` so that it holds `x`, `x²`, `x⁴`, `x⁸` in turn, and multiply it into the result whenever the current lowest bit of `n` is 1.

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n < 0:
            x = 1 / x
            n = -n

        result = 1.0
        base = x
        while n:
            if n & 1:
                result *= base
            base *= base
            n >>= 1
        return result


def show(x, n):
    result = Solution().myPow(x, n)
    print(None if result is None else round(result, 5))


show(2.0, 10)
show(2.0, -2)
show(1.5, 3)
show(-2.0, 5)
show(0.5, 7)
show(5.0, 0)
```

**Time** `O(log n)`, **space** `O(1)`.
:::
