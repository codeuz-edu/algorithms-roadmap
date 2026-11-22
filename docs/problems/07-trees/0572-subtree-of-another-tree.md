---
title: Subtree of Another Tree
description: "Subtree of Another Tree in Python: try every node of the big tree as a starting point and compare with a same-tree check."
---

# Subtree of Another Tree

<ProblemMeta />

## Problem

You are given the roots of two binary trees, `root` and `subRoot`. Return `True` if some node of `root`, taken together with everything below it, forms a tree identical to `subRoot`.

The match must reach all the way down to the leaves. A node whose subtree contains extra nodes below the matching part does not count.

Trees on this page are written in level order, with `None` for a missing child.

| `root` | `subRoot` | Output |
| --- | --- | --- |
| `[3, 4, 5, 1, 2]` | `[4, 1, 2]` | `True` |
| `[3, 4, 5, 1, 2, None, None, None, None, 0]` | `[4, 1, 2]` | `False`, because `2` has a child `0` here |

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
    def isSubtree(self, root: TreeNode | None, subRoot: TreeNode | None) -> bool:
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


print(Solution().isSubtree(build([3, 4, 5, 1, 2]), build([4, 1, 2])))
print(Solution().isSubtree(build([3, 4, 5, 1, 2, None, None, None, None, 0]), build([4, 1, 2])))
print(Solution().isSubtree(build([1, 1]), build([1])))
print(Solution().isSubtree(build([1, None, 1, None, 1, None, 2]), build([1, None, 1, None, 2])))
print(Solution().isSubtree(build([1]), build([2])))
```

::: details Solution
**Idea.** If `subRoot` appears inside `root`, it starts at some node. So try every node of `root` as the starting point, and at each one run the comparison from [Same Tree](/problems/same-tree).

The outer function asks three questions: does the match start here, does it start somewhere in the left subtree, or somewhere in the right subtree? Because `same` only returns `True` when both trees run out at the same moment, a partial match with extra nodes below it is rejected, as the second example needs.

Trying a node again after a failed comparison matters. In the fourth test the comparison at the top node fails only at the very bottom, and the real match starts one node lower.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isSubtree(self, root: TreeNode | None, subRoot: TreeNode | None) -> bool:
        def same(a, b):
            if a is None and b is None:
                return True
            if a is None or b is None or a.val != b.val:
                return False
            return same(a.left, b.left) and same(a.right, b.right)

        if subRoot is None:
            return True
        if root is None:
            return False
        if same(root, subRoot):
            return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)


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


print(Solution().isSubtree(build([3, 4, 5, 1, 2]), build([4, 1, 2])))
print(Solution().isSubtree(build([3, 4, 5, 1, 2, None, None, None, None, 0]), build([4, 1, 2])))
print(Solution().isSubtree(build([1, 1]), build([1])))
print(Solution().isSubtree(build([1, None, 1, None, 1, None, 2]), build([1, None, 1, None, 2])))
print(Solution().isSubtree(build([1]), build([2])))
```

**Time** `O(n · m)` for trees of `n` and `m` nodes, because each of the `n` starting points can cost a comparison of up to `m` nodes. **Space** `O(h)` for the recursion stack.
:::
