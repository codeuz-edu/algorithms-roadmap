---
title: Min Stack
description: "Min Stack in Python: store the running minimum next to every value so push, pop, top and getMin are all O(1)."
---

# Min Stack

<ProblemMeta />

## Problem

Build a stack of integers with one extra operation. Besides `push(val)`, `pop()` and `top()`, it must offer `getMin()`, which returns the smallest value currently on the stack. All four operations must run in constant time. `pop`, `top` and `getMin` are only called when the stack is not empty.

| Operations | Stack afterwards | `getMin()` |
| --- | --- | --- |
| `push(5)`, `push(2)`, `push(7)` | `[5, 2, 7]` | `2` |
| `pop()`, `pop()` | `[5]` | `5` |

## Try it yourself

Fill in the methods, then press **Check**. Your output is compared with the output of the solution below.

```python
class MinStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass


stack = MinStack()
stack.push(5)
stack.push(2)
stack.push(7)
stack.push(2)
print(stack.top(), stack.getMin())
stack.pop()
print(stack.top(), stack.getMin())
stack.pop()
stack.pop()
print(stack.top(), stack.getMin())
stack.push(-3)
print(stack.top(), stack.getMin())
```

::: details Solution
**Idea.** A single variable for the minimum is not enough. When the minimum is popped, the stack needs to know the second smallest value, and scanning for it is not constant time.

The fix comes from how a stack changes. Whatever sits below an element stays exactly the same for as long as that element is on the stack. So the minimum of "this element and everything below it" can be computed once, at push time, and stored next to the value. `getMin` reads it from the top entry. When the top is popped, the entry below already holds the correct minimum for the smaller stack.

```python
class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        smallest = val
        if self.stack and self.stack[-1][1] < val:
            smallest = self.stack[-1][1]
        self.stack.append((val, smallest))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]


stack = MinStack()
stack.push(5)
stack.push(2)
stack.push(7)
stack.push(2)
print(stack.top(), stack.getMin())
stack.pop()
print(stack.top(), stack.getMin())
stack.pop()
stack.pop()
print(stack.top(), stack.getMin())
stack.push(-3)
print(stack.top(), stack.getMin())
```

**Time** `O(1)` per operation, **space** `O(n)`.

**Two stacks.** The minimums can also live on a second stack that only grows when a new minimum arrives. Push to it when the value is less than or equal to its top, and pop from it when the value being removed equals its top. The "or equal" matters: with two copies of the minimum on the stack, popping one must leave the other recorded. This uses less memory when new minimums are rare.

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.minimums = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.minimums or val <= self.minimums[-1]:
            self.minimums.append(val)

    def pop(self) -> None:
        if self.stack.pop() == self.minimums[-1]:
            self.minimums.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.minimums[-1]


stack = MinStack()
stack.push(5)
stack.push(2)
stack.push(7)
stack.push(2)
print(stack.top(), stack.getMin())
stack.pop()
print(stack.top(), stack.getMin())
stack.pop()
stack.pop()
print(stack.top(), stack.getMin())
stack.push(-3)
print(stack.top(), stack.getMin())
```

**Time** `O(1)` per operation, **space** `O(n)`.
:::
