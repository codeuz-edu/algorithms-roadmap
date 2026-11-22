---
title: Maximum Depth of Binary Tree
description: "Maximum Depth of Binary Tree in Python: one plus the deeper subtree with recursion, or count levels with a queue."
---

# Maximum Depth of Binary Tree

<ProblemMeta />

## Problem

You are given the root of a binary tree. Return its depth: the number of nodes on the longest path from the root down to a leaf. An empty tree has depth 0.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output |
| --- | --- |
| `[3, 9, 20, None, None, 15, 7]` | `3` |
| `[1, None, 2]` | `2` |

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
    def maxDepth(self, root: TreeNode | None) -> int:
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


print(Solution().maxDepth(build([3, 9, 20, None, None, 15, 7])))
print(Solution().maxDepth(build([1, None, 2])))
print(Solution().maxDepth(build([1, 2, None, 3, None, 4])))
print(Solution().maxDepth(build([5])))
print(Solution().maxDepth(build([])))
```

::: details Solution
**Idea.** The longest path from a node goes through the node itself and then continues down whichever child has the longer path. So the depth of a tree is 1 plus the larger of the depths of its two subtrees. An empty tree has depth 0, and that is the base case.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: TreeNode | None) -> int:
        if root is None:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))


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


print(Solution().maxDepth(build([3, 9, 20, None, None, 15, 7])))
print(Solution().maxDepth(build([1, None, 2])))
print(Solution().maxDepth(build([1, 2, None, 3, None, 4])))
print(Solution().maxDepth(build([5])))
print(Solution().maxDepth(build([])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.

**Level by level.** The depth is also the number of levels. Process the tree one level at a time with a queue: at the start of each round the queue holds exactly one full level, so remove that many nodes, add their children, and count the round.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: TreeNode | None) -> int:
        if root is None:
            return 0
        depth = 0
        queue = deque([root])
        while queue:
            depth += 1
            for _ in range(len(queue)):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return depth


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


print(Solution().maxDepth(build([3, 9, 20, None, None, 15, 7])))
print(Solution().maxDepth(build([1, None, 2])))
print(Solution().maxDepth(build([1, 2, None, 3, None, 4])))
print(Solution().maxDepth(build([5])))
print(Solution().maxDepth(build([])))
```

**Time** `O(n)`, **space** `O(w)`, where `w` is the widest level of the tree.
:::
