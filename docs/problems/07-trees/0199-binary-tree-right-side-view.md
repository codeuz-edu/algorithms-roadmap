---
title: Binary Tree Right Side View
description: "Binary Tree Right Side View in Python: take the last node of every level with breadth-first search, or go right-first with depth-first search."
---

# Binary Tree Right Side View

<ProblemMeta />

## Problem

You are given the root of a binary tree. Imagine looking at it from the right: on each level you see only the rightmost node. Return the values you see, from top to bottom.

The visible node is not always on the right-hand branch. Where the right side stops early, a deeper node from the left side shows through.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output |
| --- | --- |
| `[1, 2, 3, None, 5, None, 4]` | `[1, 3, 4]` |
| `[1, 2, 3, 4]` | `[1, 3, 4]`, where `4` sits under `2` |

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
    def rightSideView(self, root: TreeNode | None) -> list[int]:
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


print(Solution().rightSideView(build([1, 2, 3, None, 5, None, 4])))
print(Solution().rightSideView(build([1, 2, 3, 4])))
print(Solution().rightSideView(build([1, None, 3])))
print(Solution().rightSideView(build([1, 2, None, 3])))
print(Solution().rightSideView(build([])))
```

::: details Solution
**Idea.** The answer has one value per level: the last node of that level when read from left to right. So run the level-by-level traversal from [Binary Tree Level Order Traversal](/problems/binary-tree-level-order-traversal) and keep only the last node of each round.

Following only right children would be wrong. In `[1, 2, 3, 4]` the right branch ends at `3`, but the third level still has a node, `4`, and it is visible.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rightSideView(self, root: TreeNode | None) -> list[int]:
        if root is None:
            return []
        view = []
        queue = deque([root])
        while queue:
            size = len(queue)
            for i in range(size):
                node = queue.popleft()
                if i == size - 1:
                    view.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return view


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


print(Solution().rightSideView(build([1, 2, 3, None, 5, None, 4])))
print(Solution().rightSideView(build([1, 2, 3, 4])))
print(Solution().rightSideView(build([1, None, 3])))
print(Solution().rightSideView(build([1, 2, None, 3])))
print(Solution().rightSideView(build([])))
```

**Time** `O(n)`, **space** `O(w)`, where `w` is the widest level of the tree.

**Depth-first version.** Walk the tree visiting the right child before the left child. Then the first node reached at any depth is the rightmost node of that depth. The answer list has one entry per depth already seen, so a node is new exactly when its depth equals the length of the list.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rightSideView(self, root: TreeNode | None) -> list[int]:
        view = []

        def walk(node, depth):
            if node is None:
                return
            if depth == len(view):
                view.append(node.val)
            walk(node.right, depth + 1)
            walk(node.left, depth + 1)

        walk(root, 0)
        return view


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


print(Solution().rightSideView(build([1, 2, 3, None, 5, None, 4])))
print(Solution().rightSideView(build([1, 2, 3, 4])))
print(Solution().rightSideView(build([1, None, 3])))
print(Solution().rightSideView(build([1, 2, None, 3])))
print(Solution().rightSideView(build([])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.
:::
