---
title: Graph Valid Tree
description: "Graph Valid Tree in Python: a graph is a tree when it has n - 1 edges and is connected, checked with a search or union-find."
---

# Graph Valid Tree

<ProblemMeta />

## Problem

You are given `n` nodes numbered `0` to `n - 1` and a list `edges`, where each `[a, b]` is an undirected edge between nodes `a` and `b`. No edge appears twice and no edge joins a node to itself. Return `True` if the graph is a tree: every node can be reached from every other node, and there is no cycle.

| Input | Output | Why |
| --- | --- | --- |
| `n = 4`, `edges = [[0, 1], [1, 2], [1, 3]]` | `True` | connected, no cycle |
| `n = 4`, `edges = [[0, 1], [1, 2], [2, 0]]` | `False` | 0, 1, 2 form a cycle and node 3 is cut off |
| `n = 3`, `edges = [[0, 1]]` | `False` | node 2 is cut off |

## Try it yourself

Fill in the method, then press **Check**.

```python
class Solution:
    def validTree(self, n: int, edges: list[list[int]]) -> bool:
        pass


print(Solution().validTree(5, [[0, 1], [1, 2], [1, 3], [3, 4]]))
print(Solution().validTree(5, [[0, 1], [1, 2], [2, 0], [3, 4]]))
print(Solution().validTree(4, [[0, 1], [1, 2], [2, 3], [3, 0]]))
print(Solution().validTree(4, [[0, 1], [2, 3]]))
print(Solution().validTree(1, []))
```

::: details Solution
**Idea.** A tree on `n` nodes always has exactly `n - 1` edges. With fewer edges the graph cannot be connected. With more, some edge must close a cycle. So any other edge count is an immediate `False`.

The count alone is not enough. Five nodes with four edges can be a triangle plus a separate pair, which is the second test. But once the count is `n - 1`, the two tree conditions become one: a connected graph with `n - 1` edges has no spare edge to form a cycle. So after the count check, it only remains to test that the graph is connected.

For that, search from node 0 and count the nodes reached. The search uses a list as a stack, so a long chain of nodes cannot overflow the recursion limit.

```python
class Solution:
    def validTree(self, n: int, edges: list[list[int]]) -> bool:
        if len(edges) != n - 1:
            return False

        neighbors = [[] for _ in range(n)]
        for a, b in edges:
            neighbors[a].append(b)
            neighbors[b].append(a)

        seen = {0}
        stack = [0]
        while stack:
            node = stack.pop()
            for nxt in neighbors[node]:
                if nxt not in seen:
                    seen.add(nxt)
                    stack.append(nxt)
        return len(seen) == n


print(Solution().validTree(5, [[0, 1], [1, 2], [1, 3], [3, 4]]))
print(Solution().validTree(5, [[0, 1], [1, 2], [2, 0], [3, 4]]))
print(Solution().validTree(4, [[0, 1], [1, 2], [2, 3], [3, 0]]))
print(Solution().validTree(4, [[0, 1], [2, 3]]))
print(Solution().validTree(1, []))
```

**Time** `O(n)`, because the search only runs when there are `n - 1` edges. **Space** `O(n)`.

**Union-find.** Keep the nodes in groups, where two nodes share a group if the edges seen so far connect them. Each edge merges the groups of its two ends. If the two ends are already in the same group, there was a path between them before this edge, so the edge closes a cycle and the graph is not a tree. If no edge closes a cycle, the graph is a forest, and a forest with `n - 1` edges is a single tree.

`find` follows parent links to the representative of a group and shortens the path as it goes. `union` attaches the smaller group under the larger one. Together these keep both operations close to constant time.

```python
class Solution:
    def validTree(self, n: int, edges: list[list[int]]) -> bool:
        parent = list(range(n))
        size = [1] * n

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
                return False
        return len(edges) == n - 1


print(Solution().validTree(5, [[0, 1], [1, 2], [1, 3], [3, 4]]))
print(Solution().validTree(5, [[0, 1], [1, 2], [2, 0], [3, 4]]))
print(Solution().validTree(4, [[0, 1], [1, 2], [2, 3], [3, 0]]))
print(Solution().validTree(4, [[0, 1], [2, 3]]))
print(Solution().validTree(1, []))
```

**Time** `O(n · α(n))`, where `α` is the inverse Ackermann function and is at most 4 for any realistic input. **Space** `O(n)`.
:::
