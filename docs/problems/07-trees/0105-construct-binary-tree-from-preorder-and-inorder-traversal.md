---
title: Construct Binary Tree from Preorder and Inorder Traversal
description: "Construct Binary Tree from Preorder and Inorder Traversal in Python: preorder names each root, inorder splits the rest into left and right."
---

# Construct Binary Tree from Preorder and Inorder Traversal

<ProblemMeta />

## Problem

You are given two lists that describe the same binary tree, whose values are all different. `preorder` lists each node before its subtrees (node, left, right). `inorder` lists each node between its subtrees (left, node, right). Rebuild the tree and return its root.

The outputs below show the rebuilt tree in level order, with `None` for a missing child.

| `preorder` | `inorder` | Output |
| --- | --- | --- |
| `[3, 9, 20, 15, 7]` | `[9, 3, 15, 20, 7]` | `[3, 9, 20, None, None, 15, 7]` |
| `[1, 2, 3]` | `[3, 2, 1]` | `[1, 2, None, 3]` |

## Try it yourself

Fill in the method, then press **Check**. `to_list` turns the tree you return back into a level-order list, so your output can be compared with the solution's.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def buildTree(self, preorder: list[int], inorder: list[int]) -> TreeNode | None:
        pass


def to_list(root):
    values = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            values.append(None)
            continue
        values.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while values and values[-1] is None:
        values.pop()
    return values


print(to_list(Solution().buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])))
print(to_list(Solution().buildTree([1, 2, 3], [3, 2, 1])))
print(to_list(Solution().buildTree([1, 2, 3], [1, 2, 3])))
print(to_list(Solution().buildTree([4, 2, 1, 3, 6, 5], [1, 2, 3, 4, 5, 6])))
print(to_list(Solution().buildTree([-1], [-1])))
```

::: details Solution
**Idea.** Each list answers a different question. The first value of `preorder` is the root. Find that value in `inorder`: everything before it belongs to the left subtree, and everything after it belongs to the right subtree. Neither list could do this alone. Preorder knows the root but not where the left subtree ends, and inorder knows the split but not the root.

The same step then rebuilds each subtree. There is no need to cut `preorder` into pieces. Preorder lists the root, then the whole left subtree, then the whole right subtree. So if the left subtree is always built before the right one, the roots are needed in exactly the order `preorder` gives them, and a single pointer moving through `preorder` is enough.

The recursion works on a range `left` to `right` of `inorder`. An empty range means there is no node here. A dictionary from value to inorder position makes each lookup `O(1)`, which is why the values must be different.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def buildTree(self, preorder: list[int], inorder: list[int]) -> TreeNode | None:
        position = {val: i for i, val in enumerate(inorder)}
        next_root = 0

        def helper(left, right):
            nonlocal next_root
            if left > right:
                return None
            node = TreeNode(preorder[next_root])
            next_root += 1
            mid = position[node.val]
            node.left = helper(left, mid - 1)
            node.right = helper(mid + 1, right)
            return node

        return helper(0, len(inorder) - 1)


def to_list(root):
    values = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            values.append(None)
            continue
        values.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while values and values[-1] is None:
        values.pop()
    return values


print(to_list(Solution().buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])))
print(to_list(Solution().buildTree([1, 2, 3], [3, 2, 1])))
print(to_list(Solution().buildTree([1, 2, 3], [1, 2, 3])))
print(to_list(Solution().buildTree([4, 2, 1, 3, 6, 5], [1, 2, 3, 4, 5, 6])))
print(to_list(Solution().buildTree([-1], [-1])))
```

**Time** `O(n)`, **space** `O(n)` for the dictionary and the recursion stack.

**Slicing version.** The same idea written with list slices, which is easier to follow the first time. If the root sits at position `mid` of `inorder`, the left subtree has `mid` nodes, so it takes the next `mid` values of `preorder` and the right subtree takes the rest. Each call searches `inorder` and copies both lists, which costs `O(n)` per node.

```python
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def buildTree(self, preorder: list[int], inorder: list[int]) -> TreeNode | None:
        if not preorder:
            return None
        root = TreeNode(preorder[0])
        mid = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1 : mid + 1], inorder[:mid])
        root.right = self.buildTree(preorder[mid + 1 :], inorder[mid + 1 :])
        return root


def to_list(root):
    values = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            values.append(None)
            continue
        values.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while values and values[-1] is None:
        values.pop()
    return values


print(to_list(Solution().buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])))
print(to_list(Solution().buildTree([1, 2, 3], [3, 2, 1])))
print(to_list(Solution().buildTree([1, 2, 3], [1, 2, 3])))
print(to_list(Solution().buildTree([4, 2, 1, 3, 6, 5], [1, 2, 3, 4, 5, 6])))
print(to_list(Solution().buildTree([-1], [-1])))
```

**Time** `O(n²)` in the worst case, **space** `O(n²)` in the worst case for the copied slices.
:::
