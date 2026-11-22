---
title: Binary Tree Maximum Path Sum
description: "Binary Tree Maximum Path Sum in Python: each node returns its best downward path and tests the path that bends at it."
---

# Binary Tree Maximum Path Sum

<ProblemMeta />

## Problem

You are given the root of a non-empty binary tree. A path is a chain of nodes joined by edges that uses no node twice. It can start and end anywhere and does not have to include the root, but it must contain at least one node. Return the largest possible sum of the values on a path.

Trees on this page are written in level order, with `None` for a missing child.

| Input | Output | Best path |
| --- | --- | --- |
| `[1, 2, 3]` | `6` | `2, 1, 3` |
| `[-10, 9, 20, None, None, 15, 7]` | `42` | `15, 20, 7`, leaving out the root |
| `[-3]` | `-3` | the single node |

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
    def maxPathSum(self, root: TreeNode | None) -> int:
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


print(Solution().maxPathSum(build([1, 2, 3])))
print(Solution().maxPathSum(build([-10, 9, 20, None, None, 15, 7])))
print(Solution().maxPathSum(build([2, -1])))
print(Solution().maxPathSum(build([-2, -1, -3])))
print(Solution().maxPathSum(build([5, 4, 8, 11, None, 13, 4, 7, 2])))
print(Solution().maxPathSum(build([-3])))
```

::: details Solution
**Idea.** Every path has one highest node. At that node the path may come up from the left subtree, pass through the node, and go down into the right subtree. So for each node, the best path that bends there is the node's value plus the best downward path on each side.

That needs one number from each child: the largest sum of a path that starts at the child and only goes down. Call it the child's gain. If a gain is negative, the path is better off not going that way at all, so it is replaced by 0. This is also what lets a path stop early or consist of a single node.

A node does two different things with those gains:

- It tests `node.val + left + right` against the best answer so far. This path uses both sides and bends here.
- It returns `node.val + max(left, right)` to its parent. A path that continues upward can only use one side, because using both would visit the node twice on the way back.

Keeping those two apart is the whole problem. The answer starts at minus infinity, not 0, so that a tree of only negative values returns its largest single value.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxPathSum(self, root: TreeNode | None) -> int:
        best = float("-inf")

        def gain(node):
            nonlocal best
            if node is None:
                return 0
            left = max(gain(node.left), 0)
            right = max(gain(node.right), 0)
            best = max(best, node.val + left + right)
            return node.val + max(left, right)

        gain(root)
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


print(Solution().maxPathSum(build([1, 2, 3])))
print(Solution().maxPathSum(build([-10, 9, 20, None, None, 15, 7])))
print(Solution().maxPathSum(build([2, -1])))
print(Solution().maxPathSum(build([-2, -1, -3])))
print(Solution().maxPathSum(build([5, 4, 8, 11, None, 13, 4, 7, 2])))
print(Solution().maxPathSum(build([-3])))
```

**Time** `O(n)`, **space** `O(h)` for the recursion stack, where `h` is the height of the tree.
:::
