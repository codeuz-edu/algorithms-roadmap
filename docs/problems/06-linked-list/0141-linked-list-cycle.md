---
title: Linked List Cycle
description: "Linked List Cycle in Python: detect a loop with Floyd's slow and fast pointers in O(1) space, or with a set of visited nodes."
---

# Linked List Cycle

<ProblemMeta />

## Problem

You are given the head of a linked list. Return `True` if following `next` pointers from the head eventually comes back to a node that was already visited, and `False` if the list ends.

In the tests, `build_cycle(values, pos)` builds a list from `values` and then links the last node back to the node at index `pos`. A `pos` of `-1` leaves the list without a cycle.

| `values` | `pos` | Output |
| --- | --- | --- |
| `[5, 1, 8, 3]` | `1` | `True`: the `3` points back to the `1` |
| `[5, 1, 8, 3]` | `-1` | `False` |
| `[7]` | `0` | `True`: the node points to itself |

## Try it yourself

Fill in the method, then press **Check**.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def hasCycle(self, head: ListNode | None) -> bool:
        pass


def build_cycle(values, pos):
    nodes = [ListNode(val) for val in values]
    for node, following in zip(nodes, nodes[1:]):
        node.next = following
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None


print(Solution().hasCycle(build_cycle([5, 1, 8, 3], 1)))
print(Solution().hasCycle(build_cycle([5, 1, 8, 3], -1)))
print(Solution().hasCycle(build_cycle([1, 2], 0)))
print(Solution().hasCycle(build_cycle([7], 0)))
print(Solution().hasCycle(build_cycle([7], -1)))
print(Solution().hasCycle(build_cycle([], -1)))
```

::: details Solution
**Idea.** Send two pointers down the list, a slow one that moves one node per step and a fast one that moves two.

If the list has an end, the fast pointer reaches it and the answer is `False`.

If there is a cycle, both pointers end up inside it and can never leave. From then on the fast pointer gains exactly one node on the slow pointer per step, so the distance between them around the loop shrinks by one each time. It cannot skip from 1 to a negative number, so it must hit 0: the two pointers land on the same node. Two pointers meeting is therefore proof of a cycle.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def hasCycle(self, head: ListNode | None) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False


def build_cycle(values, pos):
    nodes = [ListNode(val) for val in values]
    for node, following in zip(nodes, nodes[1:]):
        node.next = following
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None


print(Solution().hasCycle(build_cycle([5, 1, 8, 3], 1)))
print(Solution().hasCycle(build_cycle([5, 1, 8, 3], -1)))
print(Solution().hasCycle(build_cycle([1, 2], 0)))
print(Solution().hasCycle(build_cycle([7], 0)))
print(Solution().hasCycle(build_cycle([7], -1)))
print(Solution().hasCycle(build_cycle([], -1)))
```

**Time** `O(n)`, **space** `O(1)`.

**With a set.** Remember every node visited. Seeing a node for the second time means the path came back on itself. The set stores the node objects, not their values, because two different nodes may hold the same value.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def hasCycle(self, head: ListNode | None) -> bool:
        seen = set()
        node = head
        while node:
            if node in seen:
                return True
            seen.add(node)
            node = node.next
        return False


def build_cycle(values, pos):
    nodes = [ListNode(val) for val in values]
    for node, following in zip(nodes, nodes[1:]):
        node.next = following
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None


print(Solution().hasCycle(build_cycle([5, 1, 8, 3], 1)))
print(Solution().hasCycle(build_cycle([5, 1, 8, 3], -1)))
print(Solution().hasCycle(build_cycle([1, 2], 0)))
print(Solution().hasCycle(build_cycle([7], 0)))
print(Solution().hasCycle(build_cycle([7], -1)))
print(Solution().hasCycle(build_cycle([], -1)))
```

**Time** `O(n)`, **space** `O(n)`.
:::
