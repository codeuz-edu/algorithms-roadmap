---
title: Balanced Binary Tree
description: "Balanced Binary Tree in Python: return heights bottom-up and stop at the first node whose subtrees differ by more than one."
---

# Balanced Binary Tree

<ProblemMeta />

## Problem

You are given the root of a binary tree. Return `True` if the tree is height-balanced: at every node, the heights of the left and right subtrees differ by at most 1.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output | Why |
| --- | --- | --- |
| `[3, 9, 20, None, None, 15, 7]` | `True` | no node has subtrees more than 1 apart |
| `[1, 2, 2, 3, 3, None, None, 4, 4]` | `False` | the root has heights 3 and 1 |
| `[1, 2, 3, 4, None, None, 5, 6, None, None, 7]` | `False` | the root is even, but node `2` has heights 2 and 0 |

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
    def isBalanced(self, root: TreeNode | None) -> bool:
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


print(Solution().isBalanced(build([3, 9, 20, None, None, 15, 7])))
print(Solution().isBalanced(build([1, 2, 2, 3, 3, None, None, 4, 4])))
print(Solution().isBalanced(build([1, 2, 3, 4, None, None, 5, 6, None, None, 7])))
print(Solution().isBalanced(build([1, None, 2])))
print(Solution().isBalanced(build([])))
```

::: details Solution
**Idea.** The rule must hold at every node, not only at the root, as the third example shows. Checking a node needs the heights of both subtrees, and a subtree's height is known once its own check is finished. So work bottom-up: one helper returns the height of a subtree, or `-1` if that subtree is already unbalanced.

A node is unbalanced if either child reported `-1` or the two heights differ by more than 1. In that case it passes `-1` up, so the bad news reaches the root without any subtree being measured twice.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isBalanced(self, root: TreeNode | None) -> bool:
        def height(node):
            if node is None:
                return 0
            left = height(node.left)
            if left == -1:
                return -1
            right = height(node.right)
            if right == -1 or abs(left - right) > 1:
                return -1
            return 1 + max(left, right)

        return height(root) != -1


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


print(Solution().isBalanced(build([3, 9, 20, None, None, 15, 7])))
print(Solution().isBalanced(build([1, 2, 2, 3, 3, None, None, 4, 4])))
print(Solution().isBalanced(build([1, 2, 3, 4, None, None, 5, 6, None, None, 7])))
print(Solution().isBalanced(build([1, None, 2])))
print(Solution().isBalanced(build([])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.

**Top-down version.** Follow the definition directly: measure both subtrees of the root, compare, then ask the same question of each child. It is easier to write, but each call to `height` walks a whole subtree, so the same nodes are measured once for every ancestor.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isBalanced(self, root: TreeNode | None) -> bool:
        def height(node):
            if node is None:
                return 0
            return 1 + max(height(node.left), height(node.right))

        if root is None:
            return True
        if abs(height(root.left) - height(root.right)) > 1:
            return False
        return self.isBalanced(root.left) and self.isBalanced(root.right)


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


print(Solution().isBalanced(build([3, 9, 20, None, None, 15, 7])))
print(Solution().isBalanced(build([1, 2, 2, 3, 3, None, None, 4, 4])))
print(Solution().isBalanced(build([1, 2, 3, 4, None, None, 5, 6, None, None, 7])))
print(Solution().isBalanced(build([1, None, 2])))
print(Solution().isBalanced(build([])))
```

**Time** `O(n²)` in the worst case, **space** `O(h)`.
:::
