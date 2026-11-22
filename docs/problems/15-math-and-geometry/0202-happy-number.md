---
title: Happy Number
description: "Happy Number in Python: detect the loop in the digit-square sequence with a set, or with slow and fast pointers in constant space."
---

# Happy Number

<ProblemMeta />

## Problem

Take a positive integer and replace it with the sum of the squares of its digits. Keep doing that. The number is happy if this process reaches `1`. If it gets stuck repeating other values forever, it is not. Return `True` for a happy number and `False` otherwise.

| Input | Output | Why |
| --- | --- | --- |
| `19` | `True` | `19 → 82 → 68 → 100 → 1` |
| `2` | `False` | `2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4`, a loop |
| `1` | `True` | already there |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        pass


print(Solution().isHappy(19))
print(Solution().isHappy(2))
print(Solution().isHappy(7))
print(Solution().isHappy(1))
print(Solution().isHappy(4))
```

::: details Solution
**Idea.** The sequence cannot grow forever. A number with three digits maps to at most `81 · 3 = 243`, and anything larger shrinks quickly, so the values soon stay inside a small range. A sequence trapped in a finite range must repeat a value, and from that point it loops. So there are only two endings: the loop is the fixed point `1`, or it is some other cycle.

Remember every value seen. Stop when the value is `1` or when a value comes up a second time.

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            n = sum(int(digit) ** 2 for digit in str(n))
        return n == 1


print(Solution().isHappy(19))
print(Solution().isHappy(2))
print(Solution().isHappy(7))
print(Solution().isHappy(1))
print(Solution().isHappy(4))
```

**Time** `O(log n)`, **space** `O(log n)`.

**Slow and fast pointers.** Each number points to exactly one next number, like nodes in a linked list, so this is the cycle question from [Linked List Cycle](/problems/linked-list-cycle). Move one value a single step at a time and another two steps at a time. They must meet inside the loop. If the loop is the one at `1`, they meet at `1`. No set is needed.

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        def step(value: int) -> int:
            total = 0
            while value:
                value, digit = divmod(value, 10)
                total += digit * digit
            return total

        slow, fast = n, step(n)
        while fast != 1 and slow != fast:
            slow = step(slow)
            fast = step(step(fast))
        return fast == 1


print(Solution().isHappy(19))
print(Solution().isHappy(2))
print(Solution().isHappy(7))
print(Solution().isHappy(1))
print(Solution().isHappy(4))
```

**Time** `O(log n)`, **space** `O(1)`.
:::
