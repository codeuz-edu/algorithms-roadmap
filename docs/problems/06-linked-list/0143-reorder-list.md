---
title: Reorder List
description: "Reorder List in Python: find the middle, reverse the second half and weave the two halves together in place."
---

# Reorder List

<ProblemMeta />

## Problem

You are given the head of a singly linked list. Rearrange it in place so the nodes alternate between the front and the back: first node, last node, second node, second to last node, and so on. Relink the nodes themselves instead of swapping values. The method returns nothing.

| Input | List afterwards |
| --- | --- |
| `[1, 2, 3, 4]` | `[1, 4, 2, 3]` |
| `[1, 2, 3, 4, 5]` | `[1, 5, 2, 4, 3]` |

## Try it yourself

Fill in the method, then press **Check**. The method changes the list in place, so each test prints the list after the call. `build` turns a Python list into a linked list and `to_list` turns it back, so the tests can print plain lists.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reorderList(self, head: ListNode | None) -> None:
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


for values in ([1, 2, 3, 4], [1, 2, 3, 4, 5], [1, 2], [1], []):
    head = build(values)
    Solution().reorderList(head)
    print(to_list(head))
```

::: details Solution
**Idea.** The answer takes nodes from the front going forwards and from the back going backwards. A singly linked list cannot be walked backwards, but the second half can be reversed, and then walking it forwards visits the last node, the second to last, and so on. That gives three steps:

1. Find the middle with a slow and a fast pointer. The fast one moves two nodes per step, so when it reaches the end the slow one is halfway.
2. Cut the list after the middle and reverse the second half, as in [Reverse Linked List](/problems/reverse-linked-list).
3. Weave: take one node from the first half, then one from the reversed second half, until the second half is used up.

Starting `fast` one node ahead makes the first half the longer one when the length is odd, so the second half always runs out first and the leftover middle node is already in place at the end.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reorderList(self, head: ListNode | None) -> None:
        if not head:
            return

        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        curr = slow.next
        slow.next = None
        prev = None
        while curr:
            following = curr.next
            curr.next = prev
            prev = curr
            curr = following

        first, second = head, prev
        while second:
            first_next, second_next = first.next, second.next
            first.next = second
            second.next = first_next
            first, second = first_next, second_next


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


for values in ([1, 2, 3, 4], [1, 2, 3, 4, 5], [1, 2], [1], []):
    head = build(values)
    Solution().reorderList(head)
    print(to_list(head))
```

**Time** `O(n)`, **space** `O(1)`.

**With a list of nodes.** Put every node in a Python list. Now the back of the linked list can be reached by index, so two indices moving towards each other can relink the nodes directly. It is easier to get right, at the cost of `O(n)` extra memory. The final line ends the list at the node where the indices meet, otherwise that node would still point at its old neighbour and form a cycle.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reorderList(self, head: ListNode | None) -> None:
        if not head:
            return

        nodes = []
        node = head
        while node:
            nodes.append(node)
            node = node.next

        left, right = 0, len(nodes) - 1
        while left < right:
            nodes[left].next = nodes[right]
            left += 1
            if left == right:
                break
            nodes[right].next = nodes[left]
            right -= 1
        nodes[left].next = None


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


for values in ([1, 2, 3, 4], [1, 2, 3, 4, 5], [1, 2], [1], []):
    head = build(values)
    Solution().reorderList(head)
    print(to_list(head))
```

**Time** `O(n)`, **space** `O(n)`.
:::
