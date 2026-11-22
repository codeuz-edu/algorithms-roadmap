---
title: Merge Two Sorted Lists
description: "Merge Two Sorted Lists in Python: splice two sorted linked lists together with a dummy head and a tail pointer."
---

# Merge Two Sorted Lists

<ProblemMeta />

## Problem

You are given the heads of two linked lists, each sorted from smallest to largest. Join them into one sorted list by relinking the existing nodes, and return its head. Either list may be empty.

| Input | Output |
| --- | --- |
| `list1 = [1, 4, 6]`, `list2 = [2, 4, 9]` | `[1, 2, 4, 4, 6, 9]` |
| `list1 = []`, `list2 = [3]` | `[3]` |

## Try it yourself

Fill in the method, then press **Check**. `build` turns a Python list into a linked list and `to_list` turns it back, so the tests can print plain lists.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeTwoLists(self, list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
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


print(to_list(Solution().mergeTwoLists(build([1, 4, 6]), build([2, 4, 9]))))
print(to_list(Solution().mergeTwoLists(build([]), build([3]))))
print(to_list(Solution().mergeTwoLists(build([5, 6]), build([1, 2, 3]))))
print(to_list(Solution().mergeTwoLists(build([]), build([]))))
```

::: details Solution
**Idea.** Both lists are sorted, so the smallest node that has not been used yet is always at the front of one of them. Compare the two fronts, attach the smaller one to the end of the result, and step forward in the list it came from.

When one list runs out, everything left in the other is already sorted and no smaller than what was attached, so link it on in one step.

A dummy node in front of the result removes the special case for the first node: there is always a `tail` to attach to, and the real head is `dummy.next`.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeTwoLists(self, list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
        dummy = ListNode()
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 or list2
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


print(to_list(Solution().mergeTwoLists(build([1, 4, 6]), build([2, 4, 9]))))
print(to_list(Solution().mergeTwoLists(build([]), build([3]))))
print(to_list(Solution().mergeTwoLists(build([5, 6]), build([1, 2, 3]))))
print(to_list(Solution().mergeTwoLists(build([]), build([]))))
```

**Time** `O(n + m)`, **space** `O(1)`.

**Recursive version.** The smaller front node is the head of the answer. Its `next` is the merge of everything that remains, which is the same problem on a shorter input. The code is shorter, but the call stack grows by one frame per node.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeTwoLists(self, list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
        if not list1 or not list2:
            return list1 or list2
        if list1.val <= list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        list2.next = self.mergeTwoLists(list1, list2.next)
        return list2


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


print(to_list(Solution().mergeTwoLists(build([1, 4, 6]), build([2, 4, 9]))))
print(to_list(Solution().mergeTwoLists(build([]), build([3]))))
print(to_list(Solution().mergeTwoLists(build([5, 6]), build([1, 2, 3]))))
print(to_list(Solution().mergeTwoLists(build([]), build([]))))
```

**Time** `O(n + m)`, **space** `O(n + m)` for the call stack.
:::
