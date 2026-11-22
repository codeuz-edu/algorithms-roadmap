---
title: Copy List with Random Pointer
description: "Copy List with Random Pointer in Python: deep copy a linked list with a dictionary from old nodes to new nodes, or in O(1) extra space by interleaving the copies."
---

# Copy List with Random Pointer

<ProblemMeta />

## Problem

Every node of a linked list has a value, a `next` pointer, and a `random` pointer that leads to any node of the list or to nothing. Build a deep copy: a completely new list with the same values, in which each `next` and `random` leads to the matching new node. Nothing in the copy may point back into the original list. Return the head of the copy.

The tests write a list as `[value, random_index]` pairs, where `random_index` is the position of the node the random pointer leads to, or `None`.

| Input | Output |
| --- | --- |
| `[[3, None], [8, 0], [5, 2], [1, 1]]` | a new list that reads `[[3, None], [8, 0], [5, 2], [1, 1]]` |
| `[]` | `None` |

## Try it yourself

Fill in the method, then press **Check**. `show` prints the copy as pairs, then whether the copy shares any node with the original (it must not), then whether the original list is unchanged after the call.

```python
class Node:
    def __init__(self, x: int, next: "Node | None" = None, random: "Node | None" = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: Node | None) -> Node | None:
        pass


def build(pairs):
    nodes = [Node(val) for val, _ in pairs]
    for i, (_, random_index) in enumerate(pairs):
        if i + 1 < len(nodes):
            nodes[i].next = nodes[i + 1]
        if random_index is not None:
            nodes[i].random = nodes[random_index]
    return nodes[0] if nodes else None


def to_list(head):
    position = {}
    node = head
    while node:
        position[node] = len(position)
        node = node.next

    pairs = []
    node = head
    while node:
        random_index = position.get(node.random, "outside") if node.random else None
        pairs.append([node.val, random_index])
        node = node.next
    return pairs


def shares_nodes(first, second):
    seen = set()
    while first:
        seen.add(first)
        first = first.next
    while second:
        if second in seen:
            return True
        second = second.next
    return False


def show(pairs):
    head = build(pairs)
    copy = Solution().copyRandomList(head)
    print(to_list(copy), "shares nodes:", shares_nodes(head, copy), "original intact:", to_list(head) == pairs)


show([[3, None], [8, 0], [5, 2], [1, 1]])
show([[1, 1], [2, 1]])
show([[4, 0]])
show([[6, None], [6, None], [6, 0]])
show([])
```

::: details Solution
**Idea.** Copying values and `next` pointers is easy. The trouble is `random`: it can point forwards to a node whose copy does not exist yet, and given an old node there is no direct way to find its copy.

A dictionary from each old node to its new node solves both. In a first pass, create a copy of every node and store the pair. In a second pass every copy already exists, so each pointer is one lookup: the copy of `node` gets `next = copies[node.next]` and `random = copies[node.random]`.

Storing `None: None` in the dictionary up front lets the end of the list and missing random pointers go through the same lookup.

```python
class Node:
    def __init__(self, x: int, next: "Node | None" = None, random: "Node | None" = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: Node | None) -> Node | None:
        copies = {None: None}

        node = head
        while node:
            copies[node] = Node(node.val)
            node = node.next

        node = head
        while node:
            copies[node].next = copies[node.next]
            copies[node].random = copies[node.random]
            node = node.next

        return copies[head]


def build(pairs):
    nodes = [Node(val) for val, _ in pairs]
    for i, (_, random_index) in enumerate(pairs):
        if i + 1 < len(nodes):
            nodes[i].next = nodes[i + 1]
        if random_index is not None:
            nodes[i].random = nodes[random_index]
    return nodes[0] if nodes else None


def to_list(head):
    position = {}
    node = head
    while node:
        position[node] = len(position)
        node = node.next

    pairs = []
    node = head
    while node:
        random_index = position.get(node.random, "outside") if node.random else None
        pairs.append([node.val, random_index])
        node = node.next
    return pairs


def shares_nodes(first, second):
    seen = set()
    while first:
        seen.add(first)
        first = first.next
    while second:
        if second in seen:
            return True
        second = second.next
    return False


def show(pairs):
    head = build(pairs)
    copy = Solution().copyRandomList(head)
    print(to_list(copy), "shares nodes:", shares_nodes(head, copy), "original intact:", to_list(head) == pairs)


show([[3, None], [8, 0], [5, 2], [1, 1]])
show([[1, 1], [2, 1]])
show([[4, 0]])
show([[6, None], [6, None], [6, 0]])
show([])
```

**Time** `O(n)`, **space** `O(n)` for the dictionary.

**Without a dictionary.** The dictionary only answers one question: where is the copy of this node? The list itself can answer it if every copy is placed directly after its original, giving `A, A', B, B', ...`. Then the copy of any node is `node.next`.

That takes three passes. Insert a copy after each original. Set each copy's random pointer: for an original `node`, its copy is `node.next`, and the copy of its random target is `node.random.next`. Finally unzip the two lists, which also restores the original.

```python
class Node:
    def __init__(self, x: int, next: "Node | None" = None, random: "Node | None" = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: Node | None) -> Node | None:
        if not head:
            return None

        node = head
        while node:
            node.next = Node(node.val, node.next)
            node = node.next.next

        node = head
        while node:
            if node.random:
                node.next.random = node.random.next
            node = node.next.next

        copy_head = head.next
        node = head
        while node:
            copy = node.next
            node.next = copy.next
            copy.next = copy.next.next if copy.next else None
            node = node.next

        return copy_head


def build(pairs):
    nodes = [Node(val) for val, _ in pairs]
    for i, (_, random_index) in enumerate(pairs):
        if i + 1 < len(nodes):
            nodes[i].next = nodes[i + 1]
        if random_index is not None:
            nodes[i].random = nodes[random_index]
    return nodes[0] if nodes else None


def to_list(head):
    position = {}
    node = head
    while node:
        position[node] = len(position)
        node = node.next

    pairs = []
    node = head
    while node:
        random_index = position.get(node.random, "outside") if node.random else None
        pairs.append([node.val, random_index])
        node = node.next
    return pairs


def shares_nodes(first, second):
    seen = set()
    while first:
        seen.add(first)
        first = first.next
    while second:
        if second in seen:
            return True
        second = second.next
    return False


def show(pairs):
    head = build(pairs)
    copy = Solution().copyRandomList(head)
    print(to_list(copy), "shares nodes:", shares_nodes(head, copy), "original intact:", to_list(head) == pairs)


show([[3, None], [8, 0], [5, 2], [1, 1]])
show([[1, 1], [2, 1]])
show([[4, 0]])
show([[6, None], [6, None], [6, 0]])
show([])
```

**Time** `O(n)`, **space** `O(1)` besides the copy itself.
:::
