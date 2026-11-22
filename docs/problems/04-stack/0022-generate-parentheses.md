---
title: Generate Parentheses
description: "Generate Parentheses in Python: backtracking that adds an opening bracket while any remain and a closing bracket only when one is open."
---

# Generate Parentheses

<ProblemMeta />

## Problem

You are given an integer `n`. Return every string made of `n` pairs of round brackets in which the brackets are correctly matched. The strings can be returned in any order.

| Input | Output |
| --- | --- |
| `n = 1` | `["()"]` |
| `n = 2` | `["(())", "()()"]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts the strings before printing.

```python
class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        pass


def show(strings):
    print(sorted(strings or []))


show(Solution().generateParenthesis(1))
show(Solution().generateParenthesis(2))
show(Solution().generateParenthesis(3))
print(len(Solution().generateParenthesis(5) or []))
```

::: details Solution
**Idea.** Build the string one character at a time and never make a move that cannot lead to a valid result. Two rules are enough:

- `(` may be added while fewer than `n` have been used.
- `)` may be added only while fewer `)` than `(` have been used, so there is an open bracket for it to close.

A string of length `2n` built under these rules is always valid: it has `n` of each bracket, and no prefix ever closes more than it opened. Every valid string also follows the rules at every step, so all of them are produced, each exactly once.

The list `current` works as a stack. Each call pushes a character, explores everything that can follow it, then pops it so the next choice starts from the same state.

```python
class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        result = []
        current = []

        def build(opened: int, closed: int) -> None:
            if len(current) == 2 * n:
                result.append("".join(current))
                return
            if opened < n:
                current.append("(")
                build(opened + 1, closed)
                current.pop()
            if closed < opened:
                current.append(")")
                build(opened, closed + 1)
                current.pop()

        build(0, 0)
        return result


def show(strings):
    print(sorted(strings or []))


show(Solution().generateParenthesis(1))
show(Solution().generateParenthesis(2))
show(Solution().generateParenthesis(3))
print(len(Solution().generateParenthesis(5) or []))
```

**Time** `O(4ⁿ / √n)`: that is how fast the number of valid strings grows, and each one takes `O(n)` to build. **Space** `O(n)` for the recursion, not counting the output.

**Building from smaller answers.** Every valid string starts with `(`. Find the `)` that closes it. What lies between them is a valid string with some number of pairs, and what follows is a valid string with the rest. So every answer for `size` pairs has the form `"(" + a + ")" + b`, where `a` uses `inside` pairs and `b` uses `size - 1 - inside`. Going through every split and every combination of smaller answers gives each string exactly once, with no recursion.

```python
class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        table = [[""]]
        for size in range(1, n + 1):
            current = []
            for inside in range(size):
                for a in table[inside]:
                    for b in table[size - 1 - inside]:
                        current.append("(" + a + ")" + b)
            table.append(current)
        return table[n]


def show(strings):
    print(sorted(strings or []))


show(Solution().generateParenthesis(1))
show(Solution().generateParenthesis(2))
show(Solution().generateParenthesis(3))
print(len(Solution().generateParenthesis(5) or []))
```

**Time** `O(4ⁿ / √n)` strings of length `O(n)`, **space** the same, because all smaller answers are kept.
:::
