---
title: Reverse Nodes in k-Group
description: "Reverse Nodes in k-Group in Python: check that a full group of k nodes exists, reverse it in place and reconnect it, using O(1) extra space."
---

# Reverse Nodes in k-Group

<ProblemMeta />

## Problem

You are given the head of a linked list and a positive integer `k`. Split the list into consecutive groups of `k` nodes and reverse the order of the nodes inside each group. If fewer than `k` nodes remain at the end, leave them as they are. Relink the nodes instead of changing their values, and return the new head.

| Input | Output |
| --- | --- |
| `head = [1, 2, 3, 4, 5]`, `k = 2` | `[2, 1, 4, 3, 5]` |
| `head = [1, 2, 3, 4, 5]`, `k = 3` | `[3, 2, 1, 4, 5]` |
| `head = [1, 2, 3, 4]`, `k = 4` | `[4, 3, 2, 1]` |

## Try it yourself

Fill in the method, then press **Check**. `build` turns a Python list into a linked list and `to_list` turns it back, so the tests can print plain lists.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseKGroup(self, head: ListNode | None, k: int) -> ListNode | None:
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


print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4, 5]), 2)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4, 5]), 3)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4]), 4)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3]), 1)))
print(to_list(Solution().reverseKGroup(build([1, 2]), 3)))
```

::: details Solution
**Idea.** Handle one group at a time. For each group, keep `group_prev`, the node just before it. Three things have to happen:

1. Walk `k` nodes forward from `group_prev` to find the last node of the group. If the list ends first, the group is incomplete and the work is done. Checking before reversing is what leaves a short final group untouched.
2. Reverse the `k` nodes as in [Reverse Linked List](/problems/reverse-linked-list), with one change: `prev` starts as the node after the group instead of `None`. The first node of the group becomes its last, and this way it already points at the rest of the list.
3. Reconnect the front. `group_prev` must now point at the old last node, which is the group's new first node. The old first node is the new last node, so it becomes `group_prev` for the next group.

A dummy node before the head gives the first group a `group_prev` like every other group.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseKGroup(self, head: ListNode | None, k: int) -> ListNode | None:
        dummy = ListNode(0, head)
        group_prev = dummy

        while True:
            kth = group_prev
            for _ in range(k):
                kth = kth.next
                if not kth:
                    return dummy.next
            group_next = kth.next

            prev, curr = group_next, group_prev.next
            while curr is not group_next:
                following = curr.next
                curr.next = prev
                prev = curr
                curr = following

            new_tail = group_prev.next
            group_prev.next = kth
            group_prev = new_tail


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


print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4, 5]), 2)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4, 5]), 3)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4]), 4)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3]), 1)))
print(to_list(Solution().reverseKGroup(build([1, 2]), 3)))
```

**Time** `O(n)`, **space** `O(1)`.

**Recursive version.** Check that `k` nodes exist. If so, let the recursion deal with everything after them, then reverse these `k` nodes onto the front of that result. It avoids the reconnecting step, but uses one stack frame per group, so it does not meet the constant space follow-up.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseKGroup(self, head: ListNode | None, k: int) -> ListNode | None:
        node = head
        for _ in range(k):
            if not node:
                return head
            node = node.next

        prev = self.reverseKGroup(node, k)
        curr = head
        for _ in range(k):
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


print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4, 5]), 2)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4, 5]), 3)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3, 4]), 4)))
print(to_list(Solution().reverseKGroup(build([1, 2, 3]), 1)))
print(to_list(Solution().reverseKGroup(build([1, 2]), 3)))
```

**Time** `O(n)`, **space** `O(n / k)` for the call stack.
:::
