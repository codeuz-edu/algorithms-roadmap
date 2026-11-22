---
title: Diameter of Binary Tree
description: "Diameter of Binary Tree in Python: compute subtree heights bottom-up and track the best left plus right height."
---

# Diameter of Binary Tree

<ProblemMeta />

## Problem

You are given the root of a binary tree. Return its diameter: the number of edges on the longest path between any two nodes. The path does not have to go through the root.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output | Longest path |
| --- | --- | --- |
| `[1, 2, 3, 4, 5]` | `3` | `4, 2, 1, 3` |
| `[1, 2, None, 3, 4, 5, None, None, 6]` | `4` | `5, 3, 2, 4, 6`, which skips the root |

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
    def diameterOfBinaryTree(self, root: TreeNode | None) -> int:
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


print(Solution().diameterOfBinaryTree(build([1, 2, 3, 4, 5])))
print(Solution().diameterOfBinaryTree(build([1, 2, None, 3, 4, 5, None, None, 6])))
print(Solution().diameterOfBinaryTree(build([1, 2])))
print(Solution().diameterOfBinaryTree(build([1])))
```

::: details Solution
**Idea.** Every path in a tree has one highest node. From there it runs down into the left subtree on one side and down into the right subtree on the other. The longest path with a given highest node therefore uses the deepest leaf on each side, and its length in edges is `height(left) + height(right)`, where height counts nodes and an empty subtree has height 0.

So the answer is the largest `height(left) + height(right)` over all nodes. A helper that returns the height of a subtree already knows both child heights, so it can update the best value on the way back up. That makes one pass enough.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def diameterOfBinaryTree(self, root: TreeNode | None) -> int:
        best = 0

        def height(node):
            nonlocal best
            if node is None:
                return 0
            left = height(node.left)
            right = height(node.right)
            best = max(best, left + right)
            return 1 + max(left, right)

        height(root)
        return best


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


print(Solution().diameterOfBinaryTree(build([1, 2, 3, 4, 5])))
print(Solution().diameterOfBinaryTree(build([1, 2, None, 3, 4, 5, None, None, 6])))
print(Solution().diameterOfBinaryTree(build([1, 2])))
print(Solution().diameterOfBinaryTree(build([1])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.

**Brute force.** Compute the two heights from scratch at every node. It is the same formula, but `height` walks the whole subtree each time it is called, so nodes deep in the tree are counted again and again.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def diameterOfBinaryTree(self, root: TreeNode | None) -> int:
        def height(node):
            if node is None:
                return 0
            return 1 + max(height(node.left), height(node.right))

        if root is None:
            return 0
        through_root = height(root.left) + height(root.right)
        return max(through_root, self.diameterOfBinaryTree(root.left), self.diameterOfBinaryTree(root.right))


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


print(Solution().diameterOfBinaryTree(build([1, 2, 3, 4, 5])))
print(Solution().diameterOfBinaryTree(build([1, 2, None, 3, 4, 5, None, None, 6])))
print(Solution().diameterOfBinaryTree(build([1, 2])))
print(Solution().diameterOfBinaryTree(build([1])))
```

**Time** `O(n²)` for a tree that is one long chain, **space** `O(h)`.
:::
