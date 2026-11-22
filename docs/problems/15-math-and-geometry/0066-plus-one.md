---
title: Plus One
description: "Plus One in Python: add one to a number stored as a list of digits by carrying from the right."
---

# Plus One

<ProblemMeta />

## Problem

A non-negative integer is stored as a list of its decimal digits, most significant digit first, with no leading zeros. Add one to the number and return the result in the same form.

| Input | Output |
| --- | --- |
| `[4, 0, 7]` | `[4, 0, 8]` |
| `[1, 9, 9]` | `[2, 0, 0]` |
| `[9, 9]` | `[1, 0, 0]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def plusOne(self, digits: list[int]) -> list[int]:
        pass


print(Solution().plusOne([4, 0, 7]))
print(Solution().plusOne([1, 9, 9]))
print(Solution().plusOne([9, 9]))
print(Solution().plusOne([0]))
```

::: details Solution
**Idea.** Do it the way you would on paper, starting from the last digit. A digit below 9 just goes up by one, and nothing to its left changes, so the answer is ready. A 9 becomes 0 and passes a carry of one to the digit on its left, which is the same problem again one position over.

If the loop runs off the left end, every digit was a 9 and all of them are now 0. The answer is a 1 followed by those zeros.

```python
class Solution:
    def plusOne(self, digits: list[int]) -> list[int]:
        digits = digits[:]
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits


print(Solution().plusOne([4, 0, 7]))
print(Solution().plusOne([1, 9, 9]))
print(Solution().plusOne([9, 9]))
print(Solution().plusOne([0]))
```

**Time** `O(n)`, **space** `O(n)` for the returned list.
:::
