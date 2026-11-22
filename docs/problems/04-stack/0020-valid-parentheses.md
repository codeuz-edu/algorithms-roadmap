---
title: Valid Parentheses
description: "Valid Parentheses in Python: push opening brackets on a stack and match each closing bracket against the top."
---

# Valid Parentheses

<ProblemMeta />

## Problem

You are given a string `s` made only of the six bracket characters `(`, `)`, `[`, `]`, `{` and `}`. Return `True` if every bracket is closed by the same kind of bracket and in the right order, so that pairs nest cleanly and never cross.

| Input | Output | Why |
| --- | --- | --- |
| `"([{}])"` | `True` | |
| `"([)]"` | `False` | the pairs cross |
| `"(("` | `False` | never closed |
| `"]"` | `False` | nothing to close |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        pass


print(Solution().isValid("([{}])"))
print(Solution().isValid("()[]{}"))
print(Solution().isValid("([)]"))
print(Solution().isValid("(("))
print(Solution().isValid("]"))
```

::: details Solution
**Idea.** A closing bracket must match the most recent opening bracket that is still open. "Most recent first" is what a stack gives you. Push every opening bracket. For a closing bracket, the top of the stack must be its partner: pop it if so, and fail otherwise.

Two more failures are easy to miss. A closing bracket that arrives when the stack is empty has nothing to close. And if anything is left on the stack at the end, some bracket was never closed, so the final answer is whether the stack is empty.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        partner = {")": "(", "]": "[", "}": "{"}
        stack = []
        for ch in s:
            if ch in partner:
                if not stack or stack[-1] != partner[ch]:
                    return False
                stack.pop()
            else:
                stack.append(ch)
        return not stack


print(Solution().isValid("([{}])"))
print(Solution().isValid("()[]{}"))
print(Solution().isValid("([)]"))
print(Solution().isValid("(("))
print(Solution().isValid("]"))
```

**Time** `O(n)`, **space** `O(n)`.

**Removing pairs.** A valid string always contains an adjacent pair `()`, `[]` or `{}` somewhere: the innermost one. Delete all such pairs and repeat. A valid string shrinks to nothing, and an invalid one gets stuck. It is short, but each round copies the string, so it is slow on deep nesting.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        while "()" in s or "[]" in s or "{}" in s:
            s = s.replace("()", "").replace("[]", "").replace("{}", "")
        return s == ""


print(Solution().isValid("([{}])"))
print(Solution().isValid("()[]{}"))
print(Solution().isValid("([)]"))
print(Solution().isValid("(("))
print(Solution().isValid("]"))
```

**Time** `O(n²)`, **space** `O(n)`.
:::
