---
title: Kth Smallest Element in a BST
description: "Kth Smallest Element in a BST in Python: an inorder walk visits values in sorted order, so stop at the kth node."
---

# Kth Smallest Element in a BST

<ProblemMeta />

## Problem

You are given the root of a binary search tree and an integer `k`. Return the `k`th smallest value in the tree, counting from 1. `k` is never larger than the number of nodes.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output |
| --- | --- |
| `root = [3, 1, 4, None, 2]`, `k = 1` | `1` |
| `root = [5, 3, 6, 2, 4, None, None, 1]`, `k = 3` | `3` |

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
    def kthSmallest(self, root: TreeNode | None, k: int) -> int:
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


print(Solution().kthSmallest(build([3, 1, 4, None, 2]), 1))
print(Solution().kthSmallest(build([5, 3, 6, 2, 4, None, None, 1]), 3))
print(Solution().kthSmallest(build([5, 3, 6, 2, 4, None, None, 1]), 6))
print(Solution().kthSmallest(build([-2, -5, 0]), 2))
print(Solution().kthSmallest(build([1]), 1))
```

::: details Solution
**Idea.** In a binary search tree, everything to the left of a node is smaller and everything to the right is larger. An inorder walk (left subtree, node, right subtree) therefore visits the values in sorted order. The `k`th node the walk visits holds the `k`th smallest value.

Doing the walk with an explicit stack makes it easy to stop early. Go left as far as possible, pushing nodes on the way. The node taken off the stack is the next smallest value. Count it, and if it is the `k`th, return. Otherwise continue with its right subtree.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def kthSmallest(self, root: TreeNode | None, k: int) -> int:
        stack = []
        node = root
        while stack or node:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            k -= 1
            if k == 0:
                return node.val
            node = node.right


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


print(Solution().kthSmallest(build([3, 1, 4, None, 2]), 1))
print(Solution().kthSmallest(build([5, 3, 6, 2, 4, None, None, 1]), 3))
print(Solution().kthSmallest(build([5, 3, 6, 2, 4, None, None, 1]), 6))
print(Solution().kthSmallest(build([-2, -5, 0]), 2))
print(Solution().kthSmallest(build([1]), 1))
```

**Time** `O(h + k)`, where `h` is the height of the tree, **space** `O(h)`.

**Collect everything.** The recursive inorder walk is shorter to write. It lists every value in sorted order and then picks position `k - 1`. It always visits the whole tree, even when `k` is 1.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def kthSmallest(self, root: TreeNode | None, k: int) -> int:
        values = []

        def inorder(node):
            if node is None:
                return
            inorder(node.left)
            values.append(node.val)
            inorder(node.right)

        inorder(root)
        return values[k - 1]


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


print(Solution().kthSmallest(build([3, 1, 4, None, 2]), 1))
print(Solution().kthSmallest(build([5, 3, 6, 2, 4, None, None, 1]), 3))
print(Solution().kthSmallest(build([5, 3, 6, 2, 4, None, None, 1]), 6))
print(Solution().kthSmallest(build([-2, -5, 0]), 2))
print(Solution().kthSmallest(build([1]), 1))
```

**Time** `O(n)`, **space** `O(n)`.
:::
