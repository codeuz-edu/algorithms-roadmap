---
title: Add Two Numbers
description: "Add Two Numbers in Python: add two numbers stored as reversed linked lists digit by digit while carrying, the way column addition works on paper."
---

# Add Two Numbers

<ProblemMeta />

## Problem

Two non-negative integers are stored as linked lists with one digit per node and the ones digit first, so `[4, 1, 6]` is the number 614. Add the two numbers and return the sum as a linked list in the same reversed format. Neither number has leading zeros, except the number 0 itself.

| Input | Output | As numbers |
| --- | --- | --- |
| `l1 = [4, 1, 6]`, `l2 = [8, 3, 2]` | `[2, 5, 8]` | 614 + 238 = 852 |
| `l1 = [9, 9]`, `l2 = [1]` | `[0, 0, 1]` | 99 + 1 = 100 |

## Try it yourself

Fill in the method, then press **Check**. `build` turns a Python list into a linked list and `to_list` turns it back, so the tests can print plain lists.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
        pass


def build(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def to_list(node):
    values = []
    while node:
        values.append(node.val)
        node = node.next
    return values


print(to_list(Solution().addTwoNumbers(build([4, 1, 6]), build([8, 3, 2]))))
print(to_list(Solution().addTwoNumbers(build([9, 9]), build([1]))))
print(to_list(Solution().addTwoNumbers(build([5]), build([5]))))
print(to_list(Solution().addTwoNumbers(build([0]), build([0]))))
print(to_list(Solution().addTwoNumbers(build([1]), build([9, 9, 9, 9]))))
```

::: details Solution
**Idea.** Adding on paper starts at the ones digit and moves left, carrying a 1 whenever a column reaches 10. The lists store the ones digit first, so walking them from the head visits the columns in exactly that order.

For each column, add the two digits and the carry. The digit to write is the total modulo 10, and the new carry is the total divided by 10. A list that has run out contributes 0.

The loop continues while either list has digits left or a carry remains. The carry condition is what produces the extra leading digit in a sum such as 99 + 1 = 100. A dummy node gives the first digit something to attach to.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
        dummy = ListNode()
        tail = dummy
        carry = 0
        while l1 or l2 or carry:
            total = carry
            if l1:
                total += l1.val
                l1 = l1.next
            if l2:
                total += l2.val
                l2 = l2.next
            carry = total // 10
            tail.next = ListNode(total % 10)
            tail = tail.next
        return dummy.next


def build(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def to_list(node):
    values = []
    while node:
        values.append(node.val)
        node = node.next
    return values


print(to_list(Solution().addTwoNumbers(build([4, 1, 6]), build([8, 3, 2]))))
print(to_list(Solution().addTwoNumbers(build([9, 9]), build([1]))))
print(to_list(Solution().addTwoNumbers(build([5]), build([5]))))
print(to_list(Solution().addTwoNumbers(build([0]), build([0]))))
print(to_list(Solution().addTwoNumbers(build([1]), build([9, 9, 9, 9]))))
```

**Time** `O(max(n, m))`, **space** `O(1)` besides the output list.
:::
