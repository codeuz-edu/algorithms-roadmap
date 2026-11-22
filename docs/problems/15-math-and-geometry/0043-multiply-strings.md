---
title: Multiply Strings
description: "Multiply Strings in Python: long multiplication on digit strings, where digit i times digit j lands at position i + j + 1."
---

# Multiply Strings

<ProblemMeta />

## Problem

Two non-negative integers are given as strings of digits. Return their product, also as a string. The numbers can be far longer than a normal integer type holds, so do the arithmetic digit by digit instead of converting the whole strings to integers.

| Input | Output |
| --- | --- |
| `num1 = "12"`, `num2 = "34"` | `"408"` |
| `num1 = "999"`, `num2 = "999"` | `"998001"` |
| `num1 = "0"`, `num2 = "5281"` | `"0"` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        pass


print(Solution().multiply("12", "34"))
print(Solution().multiply("999", "999"))
print(Solution().multiply("123456789", "987654321"))
print(Solution().multiply("0", "5281"))
print(Solution().multiply("7", "8"))
```

::: details Solution
**Idea.** This is long multiplication from school. Two facts make it tidy.

First, a number with `m` digits times a number with `n` digits has at most `m + n` digits, so a list of `m + n` zeros has room for the whole answer.

Second, the digit at index `i` of `num1` and the digit at index `j` of `num2` have place values `10^(m - 1 - i)` and `10^(n - 1 - j)`. Their product therefore has its ones digit at index `i + j + 1` of the result and its tens digit at index `i + j`.

Go through both numbers from the right. Add each small product to what is already at index `i + j + 1`, keep the last digit there, and push the carry to index `i + j`. Because the loops move right to left, the carry cell is always handled by a later step. At the end, drop the leading zeros. If nothing is left, the product was zero.

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        m, n = len(num1), len(num2)
        result = [0] * (m + n)

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                product = (ord(num1[i]) - ord("0")) * (ord(num2[j]) - ord("0"))
                total = product + result[i + j + 1]
                result[i + j + 1] = total % 10
                result[i + j] += total // 10

        digits = "".join(str(digit) for digit in result).lstrip("0")
        return digits or "0"


print(Solution().multiply("12", "34"))
print(Solution().multiply("999", "999"))
print(Solution().multiply("123456789", "987654321"))
print(Solution().multiply("0", "5281"))
print(Solution().multiply("7", "8"))
```

**Time** `O(m · n)`, **space** `O(m + n)`.
:::
