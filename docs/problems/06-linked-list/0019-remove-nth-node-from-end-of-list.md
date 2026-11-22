---
title: Remove Nth Node From End of List
description: "Remove Nth Node From End of List in Python: keep two pointers n nodes apart and delete the target in a single pass."
---

# Remove Nth Node From End of List

<ProblemMeta />

## Problem

You are given the head of a linked list and an integer `n`. Delete the node that is `n` places from the end, where `n = 1` means the last node, and return the head of the list. `n` is never larger than the length of the list.

| Input | Output |
| --- | --- |
| `head = [1, 2, 3, 4, 5]`, `n = 2` | `[1, 2, 3, 5]` |
| `head = [1, 2]`, `n = 2` | `[2]` |
| `head = [1]`, `n = 1` | `[]` |

## Try it yourself

Fill in the method, then press **Check**. `build` turns a Python list into a linked list and `to_list` turns it back, so the tests can print plain lists.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: ListNode | None, n: int) -> ListNode | None:
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


print(to_list(Solution().removeNthFromEnd(build([1, 2, 3, 4, 5]), 2)))
print(to_list(Solution().removeNthFromEnd(build([1, 2]), 2)))
print(to_list(Solution().removeNthFromEnd(build([1, 2]), 1)))
print(to_list(Solution().removeNthFromEnd(build([1]), 1)))
```

::: details Solution
**Idea.** To delete a node you need the node just before it, so its `next` can skip over the target. The difficulty is that positions are counted from the end, and the length is not known in advance.

Use two pointers with a fixed gap. Move `fast` ahead by `n` nodes, then move both pointers together until `fast` is on the last node. The gap is still `n`, so `slow` is `n` nodes before the last one, which is exactly the node before the target.

Both pointers start on a dummy node placed before the head. When the target is the head itself, the node before it is the dummy, and the same code handles it without a special case.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: ListNode | None, n: int) -> ListNode | None:
        dummy = ListNode(0, head)
        slow = fast = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            slow = slow.next
            fast = fast.next
        slow.next = slow.next.next
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


print(to_list(Solution().removeNthFromEnd(build([1, 2, 3, 4, 5]), 2)))
print(to_list(Solution().removeNthFromEnd(build([1, 2]), 2)))
print(to_list(Solution().removeNthFromEnd(build([1, 2]), 1)))
print(to_list(Solution().removeNthFromEnd(build([1]), 1)))
```

**Time** `O(n)` in the length of the list, **space** `O(1)`.

**Two passes.** Count the nodes first. With the length known, the node before the target is `length - n` steps after the dummy. It walks the list twice instead of once, which is the same complexity and often easier to explain.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: ListNode | None, n: int) -> ListNode | None:
        length = 0
        node = head
        while node:
            length += 1
            node = node.next

        dummy = ListNode(0, head)
        before = dummy
        for _ in range(length - n):
            before = before.next
        before.next = before.next.next
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


print(to_list(Solution().removeNthFromEnd(build([1, 2, 3, 4, 5]), 2)))
print(to_list(Solution().removeNthFromEnd(build([1, 2]), 2)))
print(to_list(Solution().removeNthFromEnd(build([1, 2]), 1)))
print(to_list(Solution().removeNthFromEnd(build([1]), 1)))
```

**Time** `O(n)` in the length of the list, **space** `O(1)`.
:::
