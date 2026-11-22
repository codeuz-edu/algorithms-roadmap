---
title: Valid Parenthesis String
description: "Valid Parenthesis String in Python: track the lowest and highest possible number of open brackets, the two ends of the set a brute force would keep."
---

# Valid Parenthesis String

<ProblemMeta />

## Problem

The string `s` contains only `(`, `)` and `*`. Each `*` can stand for `(`, for `)`, or for nothing. Return `True` if the stars can be chosen so that the brackets are balanced: every `(` is closed by a later `)`, and every `)` closes an earlier `(`.

| Input | Output | Why |
| --- | --- | --- |
| `"(*)"` | `True` | the star stands for nothing |
| `"(*))"` | `True` | the star stands for `(` |
| `"*("` | `False` | the last `(` can never be closed |
| `"(((**"` | `False` | two stars cannot close three brackets |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        pass


print(Solution().checkValidString("(*)"))
print(Solution().checkValidString("(*))"))
print(Solution().checkValidString("*("))
print(Solution().checkValidString("(((**"))
print(Solution().checkValidString(")*"))
```

::: details Solution
**Idea.** Without stars, one counter is enough: add 1 for `(`, subtract 1 for `)`, fail if it ever goes negative, and require 0 at the end. A star makes the count uncertain, so track every value it could have.

The key fact is that those possible values always form an unbroken range. It starts as just 0. A `(` shifts the whole range up by one, a `)` shifts it down by one, and a `*` widens it by one on both sides. Dropping the values below zero, which stand for a `)` with nothing to close, cuts the range off at 0 and leaves it unbroken. A range is fully described by its two ends, so keep only `low` and `high`:

- `(`: both go up by 1.
- `)`: both go down by 1.
- `*`: `low` goes down by 1, `high` goes up by 1.

If `high` drops below 0, even treating every star as `(` leaves too many `)`: return `False`. If `low` drops below 0, clamp it to 0, because a negative count is not a real option. At the end the string is valid when 0 is in the range, which means `low == 0`.

This is greedy in the sense that no star is ever assigned a meaning. The decision is postponed, and the two ends are enough to know whether some assignment works.

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        low = 0
        high = 0
        for ch in s:
            if ch == "(":
                low += 1
                high += 1
            elif ch == ")":
                low -= 1
                high -= 1
            else:
                low -= 1
                high += 1

            if high < 0:
                return False
            low = max(low, 0)
        return low == 0


print(Solution().checkValidString("(*)"))
print(Solution().checkValidString("(*))"))
print(Solution().checkValidString("*("))
print(Solution().checkValidString("(((**"))
print(Solution().checkValidString(")*"))
```

**Time** `O(n)`, **space** `O(1)`.

**Tracking the whole set.** This is the version the two counters replace. Keep the actual set of possible open counts and update every member for each character. It follows the definition directly, and printing the set on a few inputs is a good way to see that it is always a range.

```python
class Solution:
    def checkValidString(self, s: str) -> bool:
        counts = {0}
        for ch in s:
            if ch == "(":
                moves = (1,)
            elif ch == ")":
                moves = (-1,)
            else:
                moves = (-1, 0, 1)
            counts = {count + move for count in counts for move in moves if count + move >= 0}
        return 0 in counts


print(Solution().checkValidString("(*)"))
print(Solution().checkValidString("(*))"))
print(Solution().checkValidString("*("))
print(Solution().checkValidString("(((**"))
print(Solution().checkValidString(")*"))
```

**Time** `O(n²)`, **space** `O(n)`.
:::
