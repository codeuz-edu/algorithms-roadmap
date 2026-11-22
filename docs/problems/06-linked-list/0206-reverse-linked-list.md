---
title: Reverse Linked List
description: "Reverse Linked List in Python: flip every next pointer in one pass with two variables, plus the recursive version."
---

# Reverse Linked List

<ProblemMeta />

## Problem

You are given the head of a singly linked list. Flip the direction of the list so that the last node becomes the first, and return the new head. An empty list stays empty.

| Input | Output |
| --- | --- |
| `[1, 2, 3, 4, 5]` | `[5, 4, 3, 2, 1]` |
| `[1, 2]` | `[2, 1]` |
| `[]` | `[]` |

## Try it yourself

Fill in the method, then press **Check**. `build` turns a Python list into a linked list and `to_list` turns it back, so the tests can print plain lists.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseList(self, head: ListNode | None) -> ListNode | None:
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


print(to_list(Solution().reverseList(build([1, 2, 3, 4, 5]))))
print(to_list(Solution().reverseList(build([1, 2]))))
print(to_list(Solution().reverseList(build([7]))))
print(to_list(Solution().reverseList(build([]))))
```

::: details Solution
**Idea.** Reversing a list means every node should point to the node that used to be before it. Walk the list once and keep two variables: `prev`, the part that is already reversed, and `curr`, the node being handled.

At each node, the order of the steps matters. Overwriting `curr.next` destroys the only link to the rest of the list, so save that link first. Then point `curr` back at `prev` and move both variables one step forward. When `curr` runs off the end, `prev` is the old last node, which is the new head.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseList(self, head: ListNode | None) -> ListNode | None:
        prev = None
        curr = head
        while curr:
            following = curr.next
            curr.next = prev
            prev = curr
            curr = following
        return prev


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


print(to_list(Solution().reverseList(build([1, 2, 3, 4, 5]))))
print(to_list(Solution().reverseList(build([1, 2]))))
print(to_list(Solution().reverseList(build([7]))))
print(to_list(Solution().reverseList(build([]))))
```

**Time** `O(n)`, **space** `O(1)`.

**Recursive version.** Trust the recursion to reverse everything after `head`. That reversed part ends with the node that was `head.next`, so hang `head` after it and cut `head`'s old link. The head of the reversed rest is the head of the whole answer. Each call waits on the next one, so the call stack grows with the list.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseList(self, head: ListNode | None) -> ListNode | None:
        if not head or not head.next:
            return head
        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head


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


print(to_list(Solution().reverseList(build([1, 2, 3, 4, 5]))))
print(to_list(Solution().reverseList(build([1, 2]))))
print(to_list(Solution().reverseList(build([7]))))
print(to_list(Solution().reverseList(build([]))))
```

**Time** `O(n)`, **space** `O(n)` for the call stack.
:::
