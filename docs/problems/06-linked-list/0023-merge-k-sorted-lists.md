---
title: Merge k Sorted Lists
description: "Merge k Sorted Lists in Python: use a min-heap holding the front node of every list, or merge the lists in pairs with divide and conquer."
---

# Merge k Sorted Lists

<ProblemMeta />

## Problem

You are given a list containing the heads of `k` linked lists, each sorted from smallest to largest. Merge all of them into one sorted linked list and return its head. Some of the lists may be empty, and `k` may be 0.

| Input | Output |
| --- | --- |
| `[[1, 5, 9], [2, 5], [3, 4, 10]]` | `[1, 2, 3, 4, 5, 5, 9, 10]` |
| `[[], [6]]` | `[6]` |
| `[]` | `[]` |

## Try it yourself

Fill in the method, then press **Check**. `show` builds one linked list per inner list, calls your method and prints the merged result as a Python list.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
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


def show(lists):
    print(to_list(Solution().mergeKLists([build(values) for values in lists])))


show([[1, 5, 9], [2, 5], [3, 4, 10]])
show([[], [6]])
show([[3], [1], [2]])
show([[]])
show([])
```

::: details Solution
**Idea.** As in [Merge Two Sorted Lists](/problems/merge-two-sorted-lists), the next node of the answer is always the smallest front node. With `k` lists, scanning all the fronts costs `O(k)` per node. A min-heap holding one front node per list finds the smallest in `O(log k)`.

Pop the smallest node, attach it to the result, and push the node that follows it in its own list. The heap never holds more than `k` entries, and every node is pushed and popped once.

Heap entries are tuples `(value, list index, node)`. The index is a tie breaker: when two values are equal, Python compares the next tuple item, and without the index it would try to compare two `ListNode` objects and raise an error.

```python
import heapq


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))

        dummy = ListNode()
        tail = dummy
        while heap:
            _, i, node = heapq.heappop(heap)
            tail.next = node
            tail = node
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
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


def show(lists):
    print(to_list(Solution().mergeKLists([build(values) for values in lists])))


show([[1, 5, 9], [2, 5], [3, 4, 10]])
show([[], [6]])
show([[3], [1], [2]])
show([[]])
show([])
```

**Time** `O(N log k)` for `N` nodes in total, **space** `O(k)`.

**Divide and conquer.** Merge the lists in pairs, then merge the results in pairs, until one list is left. Each round halves the number of lists, so there are about `log k` rounds, and each round touches every node once. Merging the lists one after another into a growing result would instead walk the early nodes again and again, up to `O(N · k)`.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        if not lists:
            return None
        while len(lists) > 1:
            merged = []
            for i in range(0, len(lists), 2):
                second = lists[i + 1] if i + 1 < len(lists) else None
                merged.append(self.mergeTwoLists(lists[i], second))
            lists = merged
        return lists[0]

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


def show(lists):
    print(to_list(Solution().mergeKLists([build(values) for values in lists])))


show([[1, 5, 9], [2, 5], [3, 4, 10]])
show([[], [6]])
show([[3], [1], [2]])
show([[]])
show([])
```

**Time** `O(N log k)`, **space** `O(k)` for the lists of heads.
:::
