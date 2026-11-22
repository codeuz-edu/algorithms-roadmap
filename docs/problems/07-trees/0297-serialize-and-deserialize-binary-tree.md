---
title: Serialize and Deserialize Binary Tree
description: "Serialize and Deserialize Binary Tree in Python: write a preorder walk with markers for missing children, then read it back the same way."
---

# Serialize and Deserialize Binary Tree

<ProblemMeta />

## Problem

Design a class with two methods. `serialize` turns a binary tree into a string, and `deserialize` turns that string back into a tree with the same shape and values. The format of the string is up to you. The only requirement is that the round trip gives back the original tree.

Trees on this page are written in level order, with `None` for a missing child. Values can be negative and can repeat.

| Tree | After `deserialize(serialize(tree))` |
| --- | --- |
| `[1, 2, 3, None, None, 4, 5]` | `[1, 2, 3, None, None, 4, 5]` |
| `[]` | `[]` |

## Try it yourself

Fill in both methods, then press **Check**. Any string format is accepted: `round_trip` prints whether `serialize` returned a string, followed by the tree that `deserialize` rebuilt from it, so only the round trip is compared.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Codec:
    def serialize(self, root: TreeNode | None) -> str:
        pass

    def deserialize(self, data: str) -> TreeNode | None:
        pass


def build(values):
    if not values:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while i < len(values):
        node = queue.popleft()
        if values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


def to_list(root):
    values = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            values.append(None)
            continue
        values.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while values and values[-1] is None:
        values.pop()
    return values


def round_trip(values):
    codec = Codec()
    data = codec.serialize(build(values))
    print(isinstance(data, str), to_list(codec.deserialize(data)))


round_trip([1, 2, 3, None, None, 4, 5])
round_trip([1, None, 2, None, 3])
round_trip([-7, -7, 12, None, 105])
round_trip([5])
round_trip([])
```

::: details Solution
**Idea.** A plain list of values does not pin down a tree: `[1, 2]` could have `2` on the left or on the right. What is missing is where the tree stops. Write a marker, here `N`, for every missing child and the shape is fully recorded.

`serialize` does a preorder walk: the node, then its left subtree, then its right subtree, with `N` wherever a child is missing. The tree `[1, 2, 3]` becomes `1,2,N,N,3,N,N`.

`deserialize` reads the tokens in the same order with the same recursion. Read one token. If it is `N`, this position is empty. Otherwise it is a node, and the tokens that follow are its left subtree and then its right subtree. Each recursive call consumes exactly the tokens of one subtree, because the markers tell it where that subtree ends. So when the left call returns, the next unread token is the start of the right subtree.

The commas matter. Without a separator, `12` and `1` followed by `2` would look the same, and so would a minus sign in the middle of the string.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Codec:
    def serialize(self, root: TreeNode | None) -> str:
        parts = []

        def walk(node):
            if node is None:
                parts.append("N")
                return
            parts.append(str(node.val))
            walk(node.left)
            walk(node.right)

        walk(root)
        return ",".join(parts)

    def deserialize(self, data: str) -> TreeNode | None:
        tokens = iter(data.split(","))

        def read():
            token = next(tokens)
            if token == "N":
                return None
            node = TreeNode(int(token))
            node.left = read()
            node.right = read()
            return node

        return read()


def build(values):
    if not values:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while i < len(values):
        node = queue.popleft()
        if values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


def to_list(root):
    values = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            values.append(None)
            continue
        values.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while values and values[-1] is None:
        values.pop()
    return values


def round_trip(values):
    codec = Codec()
    data = codec.serialize(build(values))
    print(isinstance(data, str), to_list(codec.deserialize(data)))


round_trip([1, 2, 3, None, None, 4, 5])
round_trip([1, None, 2, None, 3])
round_trip([-7, -7, 12, None, 105])
round_trip([5])
round_trip([])
```

**Time** `O(n)` for each method, **space** `O(n)`.

**Level-order version.** The same markers work with a breadth-first walk, which gives a string close to the level-order lists used on this page. `serialize` writes each node taken off the queue, or `N` for a missing one. `deserialize` keeps a queue of nodes that are still waiting for children: each node taken off claims the next two tokens as its left and right child. It uses no recursion, so a very deep tree is not a problem.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Codec:
    def serialize(self, root: TreeNode | None) -> str:
        parts = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if node is None:
                parts.append("N")
                continue
            parts.append(str(node.val))
            queue.append(node.left)
            queue.append(node.right)
        return ",".join(parts)

    def deserialize(self, data: str) -> TreeNode | None:
        tokens = data.split(",")
        if tokens[0] == "N":
            return None
        root = TreeNode(int(tokens[0]))
        queue = deque([root])
        i = 1
        while queue:
            node = queue.popleft()
            if tokens[i] != "N":
                node.left = TreeNode(int(tokens[i]))
                queue.append(node.left)
            if tokens[i + 1] != "N":
                node.right = TreeNode(int(tokens[i + 1]))
                queue.append(node.right)
            i += 2
        return root


def build(values):
    if not values:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while i < len(values):
        node = queue.popleft()
        if values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


def to_list(root):
    values = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            values.append(None)
            continue
        values.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while values and values[-1] is None:
        values.pop()
    return values


def round_trip(values):
    codec = Codec()
    data = codec.serialize(build(values))
    print(isinstance(data, str), to_list(codec.deserialize(data)))


round_trip([1, 2, 3, None, None, 4, 5])
round_trip([1, None, 2, None, 3])
round_trip([-7, -7, 12, None, 105])
round_trip([5])
round_trip([])
```

**Time** `O(n)` for each method, **space** `O(n)`.
:::
