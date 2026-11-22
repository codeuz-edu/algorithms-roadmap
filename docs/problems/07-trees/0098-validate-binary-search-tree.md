---
title: Validate Binary Search Tree
description: "Validate Binary Search Tree in Python: pass an allowed range down the tree, or check that the inorder walk is strictly increasing."
---

# Validate Binary Search Tree

<ProblemMeta />

## Problem

You are given the root of a binary tree. Return `True` if it is a valid binary search tree: for every node, all values in its left subtree are strictly smaller than the node, and all values in its right subtree are strictly larger. Duplicates are not allowed.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output | Why |
| --- | --- | --- |
| `[2, 1, 3]` | `True` | |
| `[5, 1, 4, None, None, 3, 6]` | `False` | `4` is the right child of `5` |
| `[5, 4, 6, None, None, 3, 7]` | `False` | `3` is in the right subtree of `5`, although it is fine next to its parent `6` |

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
    def isValidBST(self, root: TreeNode | None) -> bool:
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


print(Solution().isValidBST(build([2, 1, 3])))
print(Solution().isValidBST(build([5, 1, 4, None, None, 3, 6])))
print(Solution().isValidBST(build([5, 4, 6, None, None, 3, 7])))
print(Solution().isValidBST(build([1, 1])))
print(Solution().isValidBST(build([-5, -10, 0, None, -7])))
print(Solution().isValidBST(build([7])))
```

::: details Solution
**Idea.** Comparing each node with its two children is not enough. In the third example every parent and child pair is in order, yet `3` sits in the right subtree of `5`. The rule is about whole subtrees, so each node is limited by all of its ancestors.

Those limits collapse into one open range. The root may hold anything. Going left from a node with value `v` adds the limit "smaller than `v`", so `v` becomes the upper bound. Going right makes `v` the lower bound. A node is valid if its value lies strictly inside the range it was given and both subtrees are valid inside their narrower ranges.

The bounds start at minus and plus infinity so that the root passes for any value.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isValidBST(self, root: TreeNode | None) -> bool:
        def valid(node, low, high):
            if node is None:
                return True
            if not low < node.val < high:
                return False
            return valid(node.left, low, node.val) and valid(node.right, node.val, high)

        return valid(root, float("-inf"), float("inf"))


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


print(Solution().isValidBST(build([2, 1, 3])))
print(Solution().isValidBST(build([5, 1, 4, None, None, 3, 6])))
print(Solution().isValidBST(build([5, 4, 6, None, None, 3, 7])))
print(Solution().isValidBST(build([1, 1])))
print(Solution().isValidBST(build([-5, -10, 0, None, -7])))
print(Solution().isValidBST(build([7])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.

**Inorder version.** An inorder walk (left subtree, node, right subtree) of a binary search tree visits the values from smallest to largest. The reverse also holds: if the inorder walk is strictly increasing, the tree is a valid binary search tree. So walk the tree in order and compare each value with the one before it.

The stack holds the nodes whose left side is being explored. Go left as far as possible, take a node off, check it, then move to its right child.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isValidBST(self, root: TreeNode | None) -> bool:
        stack = []
        node = root
        previous = None
        while stack or node:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            if previous is not None and node.val <= previous:
                return False
            previous = node.val
            node = node.right
        return True


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


print(Solution().isValidBST(build([2, 1, 3])))
print(Solution().isValidBST(build([5, 1, 4, None, None, 3, 6])))
print(Solution().isValidBST(build([5, 4, 6, None, None, 3, 7])))
print(Solution().isValidBST(build([1, 1])))
print(Solution().isValidBST(build([-5, -10, 0, None, -7])))
print(Solution().isValidBST(build([7])))
```

**Time** `O(n)`, **space** `O(h)`.
:::
