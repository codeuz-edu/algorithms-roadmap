---
title: Invert Binary Tree
description: "Invert Binary Tree in Python: swap the children of every node, with recursion or with a queue."
---

# Invert Binary Tree

<ProblemMeta />

## Problem

You are given the root of a binary tree. Swap the left and right child of every node, so the tree becomes its own mirror image, and return the root.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output |
| --- | --- |
| `[4, 2, 7, 1, 3, 6, 9]` | `[4, 7, 2, 9, 6, 3, 1]` |
| `[1, 2]` | `[1, None, 2]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def invertTree(self, root: TreeNode | None) -> TreeNode | None:
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


print(to_list(Solution().invertTree(build([4, 2, 7, 1, 3, 6, 9]))))
print(to_list(Solution().invertTree(build([2, 1, 3]))))
print(to_list(Solution().invertTree(build([1, 2]))))
print(to_list(Solution().invertTree(build([]))))
```

::: details Solution
**Idea.** The mirror image of a tree is built from the mirror images of its two subtrees, placed on opposite sides. So invert the left subtree, invert the right subtree, and swap them. An empty tree is its own mirror, which gives the base case.

Every node is visited once and has its children swapped once, so nothing is missed and nothing is swapped back.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def invertTree(self, root: TreeNode | None) -> TreeNode | None:
        if root is None:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
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


print(to_list(Solution().invertTree(build([4, 2, 7, 1, 3, 6, 9]))))
print(to_list(Solution().invertTree(build([2, 1, 3]))))
print(to_list(Solution().invertTree(build([1, 2]))))
print(to_list(Solution().invertTree(build([]))))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree. A tree that is one long chain has `h = n`.

**Iterative version.** The order in which nodes are swapped does not matter, as long as each node is swapped exactly once. A queue of nodes still to process does that without recursion, so a very deep tree cannot overflow the call stack.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def invertTree(self, root: TreeNode | None) -> TreeNode | None:
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if node is None:
                continue
            node.left, node.right = node.right, node.left
            queue.append(node.left)
            queue.append(node.right)
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


print(to_list(Solution().invertTree(build([4, 2, 7, 1, 3, 6, 9]))))
print(to_list(Solution().invertTree(build([2, 1, 3]))))
print(to_list(Solution().invertTree(build([1, 2]))))
print(to_list(Solution().invertTree(build([]))))
```

**Time** `O(n)`, **space** `O(w)`, where `w` is the widest level of the tree.
:::
