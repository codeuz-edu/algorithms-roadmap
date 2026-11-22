---
title: Redundant Connection
description: "Redundant Connection in Python: use union-find to spot the first edge whose two ends are already connected."
---

# Redundant Connection

<ProblemMeta />

## Problem

A tree with `n` nodes, numbered `1` to `n`, had one extra edge added to it. You are given the resulting list of `n` edges, where each `[a, b]` is an undirected edge. Return an edge that can be removed so that the graph is a tree again. If several edges qualify, return the one that comes last in the input.

| Input | Output | Why |
| --- | --- | --- |
| `[[1, 2], [2, 3], [1, 3]]` | `[1, 3]` | all three edges lie on the cycle, and `[1, 3]` comes last |
| `[[1, 4], [2, 3], [3, 4], [1, 2], [4, 5]]` | `[1, 2]` | the cycle is 1, 4, 3, 2, and `[4, 5]` is not on it |

## Try it yourself

Fill in the method, then press **Check**.

```python
class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        pass


print(Solution().findRedundantConnection([[1, 2], [2, 3], [1, 3]]))
print(Solution().findRedundantConnection([[1, 4], [2, 3], [3, 4], [1, 2], [4, 5]]))
print(Solution().findRedundantConnection([[3, 4], [1, 2], [2, 4], [3, 5], [2, 5]]))
print(Solution().findRedundantConnection([[2, 3], [1, 2], [3, 1], [3, 4]]))
```

::: details Solution
**Idea.** Add the edges one at a time, in input order, and watch for the moment a cycle appears. An edge `[a, b]` closes a cycle exactly when `a` and `b` are already connected by earlier edges. Then there are two routes between them: the old path and the new edge.

The graph is a tree plus one edge, so it contains exactly one cycle. Removing any edge of that cycle leaves a tree, and removing any other edge does not. The edge that closes the cycle is, by definition, the last edge of the cycle in the input. So the first edge whose ends are already connected is the answer.

Union-find answers "are these two already connected?" quickly. Every node starts in its own group. `find` returns the representative of a node's group, shortening the path as it goes. `union` merges two groups, attaching the smaller under the larger, and returns `False` when both nodes were already in the same group.

```python
class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        n = len(edges)
        parent = list(range(n + 1))
        size = [1] * (n + 1)

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            a, b = find(a), find(b)
            if a == b:
                return False
            if size[a] < size[b]:
                a, b = b, a
            parent[b] = a
            size[a] += size[b]
            return True

        for a, b in edges:
            if not union(a, b):
                return [a, b]
        return []


print(Solution().findRedundantConnection([[1, 2], [2, 3], [1, 3]]))
print(Solution().findRedundantConnection([[1, 4], [2, 3], [3, 4], [1, 2], [4, 5]]))
print(Solution().findRedundantConnection([[3, 4], [1, 2], [2, 4], [3, 5], [2, 5]]))
print(Solution().findRedundantConnection([[2, 3], [1, 2], [3, 1], [3, 4]]))
```

**Time** `O(n · α(n))`, where `α` is the inverse Ackermann function and is at most 4 for any realistic input. **Space** `O(n)`.

**Search for a path.** The same test can be done without union-find. Before adding an edge `[a, b]`, search the graph built so far for a path from `a` to `b`. If one exists, this edge is the redundant one. Each search can touch every node, so this is slower, but it uses nothing beyond a plain graph search.

```python
class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        neighbors = [[] for _ in range(len(edges) + 1)]

        def connected(start, goal):
            seen = {start}
            stack = [start]
            while stack:
                node = stack.pop()
                if node == goal:
                    return True
                for nxt in neighbors[node]:
                    if nxt not in seen:
                        seen.add(nxt)
                        stack.append(nxt)
            return False

        for a, b in edges:
            if connected(a, b):
                return [a, b]
            neighbors[a].append(b)
            neighbors[b].append(a)
        return []


print(Solution().findRedundantConnection([[1, 2], [2, 3], [1, 3]]))
print(Solution().findRedundantConnection([[1, 4], [2, 3], [3, 4], [1, 2], [4, 5]]))
print(Solution().findRedundantConnection([[3, 4], [1, 2], [2, 4], [3, 5], [2, 5]]))
print(Solution().findRedundantConnection([[2, 3], [1, 2], [3, 1], [3, 4]]))
```

**Time** `O(n²)`, **space** `O(n)`.
:::
