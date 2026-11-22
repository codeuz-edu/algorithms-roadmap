---
title: Same Tree
description: "Same Tree in Python: compare two binary trees node by node, with recursion or with a stack of pairs."
---

# Same Tree

<ProblemMeta />

## Problem

You are given the roots of two binary trees, `p` and `q`. Return `True` if the trees are identical: the same shape, with the same value at every position.

Trees on this page are written in level order, with `None` for a missing child.

| `p` | `q` | Output |
| --- | --- | --- |
| `[1, 2, 3]` | `[1, 2, 3]` | `True` |
| `[1, 2]` | `[1, None, 2]` | `False` |
| `[1, 2, 1]` | `[1, 1, 2]` | `False` |

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
    def isSameTree(self, p: TreeNode | None, q: TreeNode | None) -> bool:
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


print(Solution().isSameTree(build([1, 2, 3]), build([1, 2, 3])))
print(Solution().isSameTree(build([1, 2]), build([1, None, 2])))
print(Solution().isSameTree(build([1, 2, 1]), build([1, 1, 2])))
print(Solution().isSameTree(build([]), build([])))
print(Solution().isSameTree(build([1]), build([])))
```

::: details Solution
**Idea.** Two trees are the same when their roots match and their left subtrees are the same and their right subtrees are the same. That definition is already a recursive function. Only the base cases need care:

- both nodes are missing: this position matches
- exactly one is missing: the shapes differ
- both exist but hold different values: the values differ

Checking the missing cases first means `p.val` and `q.val` are only read when both nodes exist.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isSameTree(self, p: TreeNode | None, q: TreeNode | None) -> bool:
        if p is None and q is None:
            return True
        if p is None or q is None or p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)


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


print(Solution().isSameTree(build([1, 2, 3]), build([1, 2, 3])))
print(Solution().isSameTree(build([1, 2]), build([1, None, 2])))
print(Solution().isSameTree(build([1, 2, 1]), build([1, 1, 2])))
print(Solution().isSameTree(build([]), build([])))
print(Solution().isSameTree(build([1]), build([])))
```

**Time** `O(n)`, where `n` is the size of the smaller tree, **space** `O(h)` for the recursion stack.

**Iterative version.** Keep a stack of pairs of nodes that must match. Take a pair off, run the same three checks, and push the two pairs of children. If the stack empties without a mismatch, the trees are the same.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isSameTree(self, p: TreeNode | None, q: TreeNode | None) -> bool:
        stack = [(p, q)]
        while stack:
            a, b = stack.pop()
            if a is None and b is None:
                continue
            if a is None or b is None or a.val != b.val:
                return False
            stack.append((a.left, b.left))
            stack.append((a.right, b.right))
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


print(Solution().isSameTree(build([1, 2, 3]), build([1, 2, 3])))
print(Solution().isSameTree(build([1, 2]), build([1, None, 2])))
print(Solution().isSameTree(build([1, 2, 1]), build([1, 1, 2])))
print(Solution().isSameTree(build([]), build([])))
print(Solution().isSameTree(build([1]), build([])))
```

**Time** `O(n)`, **space** `O(h)`.
:::
