---
title: Count Good Nodes in Binary Tree
description: "Count Good Nodes in Binary Tree in Python: depth-first search that carries the largest value seen on the path from the root."
---

# Count Good Nodes in Binary Tree

<ProblemMeta />

## Problem

You are given the root of a binary tree. A node is good if no node on the path from the root down to it holds a larger value. Return the number of good nodes. The root is always good, and equal values do not spoil a node.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output | Good nodes |
| --- | --- | --- |
| `[3, 1, 4, 3, None, 1, 5]` | `4` | `3` (root), `4`, `5`, and the `3` under `1` |
| `[3, 3, None, 4, 2]` | `3` | every node except `2` |

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
    def goodNodes(self, root: TreeNode) -> int:
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


print(Solution().goodNodes(build([3, 1, 4, 3, None, 1, 5])))
print(Solution().goodNodes(build([3, 3, None, 4, 2])))
print(Solution().goodNodes(build([-1, -2, -3, None, None, -1])))
print(Solution().goodNodes(build([2, 2, 2])))
print(Solution().goodNodes(build([1])))
```

::: details Solution
**Idea.** Whether a node is good depends only on the nodes above it, and only on the largest of them. So walk down from the root and carry one number along: the largest value seen so far on the current path. A node is good when its value is at least that number.

Each child receives the maximum updated with its parent's value. Because the number is passed as an argument, the left and right branches each get their own copy, and what happens in one branch cannot affect the other.

Starting from the root's own value, not from 0, keeps the code correct for negative values.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        def count(node, largest):
            if node is None:
                return 0
            good = 1 if node.val >= largest else 0
            largest = max(largest, node.val)
            return good + count(node.left, largest) + count(node.right, largest)

        return count(root, root.val)


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


print(Solution().goodNodes(build([3, 1, 4, 3, None, 1, 5])))
print(Solution().goodNodes(build([3, 3, None, 4, 2])))
print(Solution().goodNodes(build([-1, -2, -3, None, None, -1])))
print(Solution().goodNodes(build([2, 2, 2])))
print(Solution().goodNodes(build([1])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.

**Iterative version.** Replace the call stack with an explicit stack of `(node, largest so far)` pairs. Each pair holds everything needed to judge that node, so the order in which pairs are taken off does not change the count.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        good = 0
        stack = [(root, root.val)]
        while stack:
            node, largest = stack.pop()
            if node.val >= largest:
                good += 1
            largest = max(largest, node.val)
            if node.left:
                stack.append((node.left, largest))
            if node.right:
                stack.append((node.right, largest))
        return good


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


print(Solution().goodNodes(build([3, 1, 4, 3, None, 1, 5])))
print(Solution().goodNodes(build([3, 3, None, 4, 2])))
print(Solution().goodNodes(build([-1, -2, -3, None, None, -1])))
print(Solution().goodNodes(build([2, 2, 2])))
print(Solution().goodNodes(build([1])))
```

**Time** `O(n)`, **space** `O(h)`.
:::
