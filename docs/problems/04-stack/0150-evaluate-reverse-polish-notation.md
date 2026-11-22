---
title: Evaluate Reverse Polish Notation
description: "Evaluate Reverse Polish Notation in Python: push numbers on a stack and apply each operator to the top two values."
---

# Evaluate Reverse Polish Notation

<ProblemMeta />

## Problem

You are given a list of string `tokens` that spells an arithmetic expression in postfix form: each operator comes after the two values it applies to. The operators are `+`, `-`, `*` and `/`. Division of two integers drops the fractional part, rounding toward zero. Return the value of the expression, which is always well formed.

| Tokens | Meaning | Output |
| --- | --- | --- |
| `["2", "1", "+", "3", "*"]` | `(2 + 1) * 3` | `9` |
| `["3", "4", "-"]` | `3 - 4` | `-1` |
| `["7", "-2", "/"]` | `7 / -2` | `-3` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        pass


print(Solution().evalRPN(["2", "1", "+", "3", "*"]))
print(Solution().evalRPN(["5", "1", "2", "+", "4", "*", "+", "3", "-"]))
print(Solution().evalRPN(["3", "4", "-"]))
print(Solution().evalRPN(["7", "-2", "/"]))
print(Solution().evalRPN(["42"]))
```

::: details Solution
**Idea.** In postfix form an operator always applies to the two most recent values that have not been used yet. Those values may themselves be results of earlier operators. A stack holds exactly that: push each number, and when an operator arrives, pop two values, combine them, and push the result. At the end one value remains, and it is the answer.

Two details decide whether the code is correct. The first value popped is the right operand, and the second is the left one, which matters for `-` and `/`. And Python's `//` rounds down, not toward zero, so `7 // -2` is `-4`. Dividing the absolute values and putting the sign back gives the required `-3` and stays in exact integer arithmetic.

Checking `token in "+-*/"` instead of `token.isdigit()` is deliberate: `"-2"` is a number, but `isdigit` says no.

```python
class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        stack = []
        for token in tokens:
            if token not in ("+", "-", "*", "/"):
                stack.append(int(token))
                continue
            right = stack.pop()
            left = stack.pop()
            if token == "+":
                stack.append(left + right)
            elif token == "-":
                stack.append(left - right)
            elif token == "*":
                stack.append(left * right)
            else:
                quotient = abs(left) // abs(right)
                if (left < 0) != (right < 0):
                    quotient = -quotient
                stack.append(quotient)
        return stack[-1]


print(Solution().evalRPN(["2", "1", "+", "3", "*"]))
print(Solution().evalRPN(["5", "1", "2", "+", "4", "*", "+", "3", "-"]))
print(Solution().evalRPN(["3", "4", "-"]))
print(Solution().evalRPN(["7", "-2", "/"]))
print(Solution().evalRPN(["42"]))
```

**Time** `O(n)`, **space** `O(n)`.
:::
