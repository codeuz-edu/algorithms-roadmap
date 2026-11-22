---
title: Lowest Common Ancestor of a Binary Search Tree
description: "Lowest Common Ancestor of a Binary Search Tree in Python: walk down from the root until the two values split to different sides."
---

# Lowest Common Ancestor of a Binary Search Tree

<ProblemMeta />

## Problem

You are given the root of a binary search tree and two of its nodes, `p` and `q`. Return their lowest common ancestor: the deepest node that has both `p` and `q` in its subtree. A node counts as being in its own subtree, so the answer can be `p` or `q` itself.

Trees on this page are written in level order, with `None` for a missing child. All examples use the tree `[6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]`.

| `p` | `q` | Output | Why |
| --- | --- | --- | --- |
| `2` | `8` | `6` | they sit on opposite sides of the root |
| `3` | `5` | `4` | both are children of `4` |
| `2` | `4` | `2` | `4` is below `2` |

## Try it yourself

Fill in the method, then press **Check**. The method returns a node, and `show` prints that node's value so your output can be compared with the solution's.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
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


def find(root, val):
    while root.val != val:
        root = root.left if val < root.val else root.right
    return root


def show(values, p, q):
    root = build(values)
    node = Solution().lowestCommonAncestor(root, find(root, p), find(root, q))
    print(node.val if node else None)


tree = [6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]
show(tree, 2, 8)
show(tree, 3, 5)
show(tree, 2, 4)
show(tree, 9, 7)
show([2, 1], 2, 1)
```

::: details Solution
**Idea.** In a binary search tree, everything in a node's left subtree is smaller than the node and everything in its right subtree is larger. So comparing values tells you where `p` and `q` are without searching for them.

Start at the root. If both values are smaller than the current node, both nodes are in the left subtree, and so is their lowest common ancestor: go left. If both are larger, go right. Otherwise the two values fall on different sides, or one of them equals the current node. Either way the current node has both in its subtree, and no node further down can, because moving to a child would leave one of them behind. That node is the answer.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        node = root
        while node:
            if p.val < node.val and q.val < node.val:
                node = node.left
            elif p.val > node.val and q.val > node.val:
                node = node.right
            else:
                return node


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


def find(root, val):
    while root.val != val:
        root = root.left if val < root.val else root.right
    return root


def show(values, p, q):
    root = build(values)
    node = Solution().lowestCommonAncestor(root, find(root, p), find(root, q))
    print(node.val if node else None)


tree = [6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]
show(tree, 2, 8)
show(tree, 3, 5)
show(tree, 2, 4)
show(tree, 9, 7)
show([2, 1], 2, 1)
```

**Time** `O(h)`, where `h` is the height of the tree, **space** `O(1)`.

**Recursive version.** The same three cases, written as a function that calls itself on the side where both nodes are. It reads closer to the reasoning, at the cost of one stack frame per level.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)
        if p.val > root.val and q.val > root.val:
            return self.lowestCommonAncestor(root.right, p, q)
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


def find(root, val):
    while root.val != val:
        root = root.left if val < root.val else root.right
    return root


def show(values, p, q):
    root = build(values)
    node = Solution().lowestCommonAncestor(root, find(root, p), find(root, q))
    print(node.val if node else None)


tree = [6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]
show(tree, 2, 8)
show(tree, 3, 5)
show(tree, 2, 4)
show(tree, 9, 7)
show([2, 1], 2, 1)
```

**Time** `O(h)`, **space** `O(h)` for the recursion stack.
:::
