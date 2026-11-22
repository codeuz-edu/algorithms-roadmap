---
title: Binary Tree Level Order Traversal
description: "Binary Tree Level Order Traversal in Python: breadth-first search with a queue, one level per round."
---

# Binary Tree Level Order Traversal

<ProblemMeta />

## Problem

You are given the root of a binary tree. Return its values grouped by level: one list per level, from the top down, with each level read from left to right.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output |
| --- | --- |
| `[3, 9, 20, None, None, 15, 7]` | `[[3], [9, 20], [15, 7]]` |
| `[1, 2, None, 3]` | `[[1], [2], [3]]` |
| `[]` | `[]` |

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
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
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


print(Solution().levelOrder(build([3, 9, 20, None, None, 15, 7])))
print(Solution().levelOrder(build([1, 2, 3, 4, None, None, 5])))
print(Solution().levelOrder(build([1, 2, None, 3])))
print(Solution().levelOrder(build([1])))
print(Solution().levelOrder(build([])))
```

::: details Solution
**Idea.** A queue hands nodes back in the order they were added. Put the root in, and whenever a node comes out, add its left child and then its right child. Nodes then come out level by level, left to right, because all of one level is added before any of the next.

The only extra step is knowing where one level ends. At the start of a round the queue holds exactly the nodes of one level and nothing else. Record that count, remove that many nodes, and everything added in the meantime belongs to the next level.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if root is None:
            return []
        levels = []
        queue = deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            levels.append(level)
        return levels


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


print(Solution().levelOrder(build([3, 9, 20, None, None, 15, 7])))
print(Solution().levelOrder(build([1, 2, 3, 4, None, None, 5])))
print(Solution().levelOrder(build([1, 2, None, 3])))
print(Solution().levelOrder(build([1])))
print(Solution().levelOrder(build([])))
```

**Time** `O(n)`, **space** `O(n)` for the output, with a queue of at most one level.

**Depth-first version.** Carry the depth along in a recursive walk and append each value to the list for its depth. Visiting the left child before the right child means that, within any one depth, values arrive from left to right. A new list is opened the first time a depth is reached.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        levels = []

        def walk(node, depth):
            if node is None:
                return
            if depth == len(levels):
                levels.append([])
            levels[depth].append(node.val)
            walk(node.left, depth + 1)
            walk(node.right, depth + 1)

        walk(root, 0)
        return levels


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


print(Solution().levelOrder(build([3, 9, 20, None, None, 15, 7])))
print(Solution().levelOrder(build([1, 2, 3, 4, None, None, 5])))
print(Solution().levelOrder(build([1, 2, None, 3])))
print(Solution().levelOrder(build([1])))
print(Solution().levelOrder(build([])))
```

**Time** `O(n)`, **space** `O(n)` for the output, plus `O(h)` for the recursion stack.
:::
