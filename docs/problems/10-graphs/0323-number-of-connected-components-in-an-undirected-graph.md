---
title: Number of Connected Components in an Undirected Graph
description: "Number of Connected Components in an Undirected Graph in Python: count the groups with a graph search or with union-find."
---

# Number of Connected Components in an Undirected Graph

<ProblemMeta />

## Problem

You are given `n` nodes numbered `0` to `n - 1` and a list `edges`, where each `[a, b]` is an undirected edge between nodes `a` and `b`. A connected component is a group of nodes that can all reach each other, with no edge leaving the group. A node without edges is a component by itself. Return the number of connected components.

| Input | Output | Why |
| --- | --- | --- |
| `n = 5`, `edges = [[0, 1], [1, 2], [3, 4]]` | `2` | the groups are {0, 1, 2} and {3, 4} |
| `n = 3`, `edges = []` | `3` | every node is alone |

## Try it yourself

Fill in the method, then press **Check**.

```python
class Solution:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
        pass


print(Solution().countComponents(5, [[0, 1], [1, 2], [3, 4]]))
print(Solution().countComponents(6, [[0, 5], [2, 4], [4, 3]]))
print(Solution().countComponents(4, [[0, 1], [1, 2], [2, 3], [3, 0]]))
print(Solution().countComponents(3, []))
print(Solution().countComponents(1, []))
```

::: details Solution
**Idea.** This is [Number of Islands](/problems/number-of-islands) on a general graph. Go through the nodes in order. A node that has not been seen yet belongs to a component nobody has counted, so add one to the count. Then search from it and mark every node it can reach. Those nodes are exactly its component, and marking them stops them from being counted again.

The search needs to find a node's neighbours quickly, so first turn the edge list into an adjacency list. Each undirected edge goes into both lists.

```python
class Solution:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
        neighbors = [[] for _ in range(n)]
        for a, b in edges:
            neighbors[a].append(b)
            neighbors[b].append(a)

        seen = set()
        count = 0
        for start in range(n):
            if start in seen:
                continue
            count += 1
            seen.add(start)
            stack = [start]
            while stack:
                node = stack.pop()
                for nxt in neighbors[node]:
                    if nxt not in seen:
                        seen.add(nxt)
                        stack.append(nxt)
        return count


print(Solution().countComponents(5, [[0, 1], [1, 2], [3, 4]]))
print(Solution().countComponents(6, [[0, 5], [2, 4], [4, 3]]))
print(Solution().countComponents(4, [[0, 1], [1, 2], [2, 3], [3, 0]]))
print(Solution().countComponents(3, []))
print(Solution().countComponents(1, []))
```

**Time** `O(V + E)` for `V` nodes and `E` edges, **space** `O(V + E)`.

**Union-find.** Start with every node as its own component, so the count is `n`. Process the edges one at a time. An edge between two different components merges them, which lowers the count by one. An edge inside one component changes nothing.

`find` returns the representative of a node's group and shortens the path it walked. `union` attaches the smaller group under the larger one and reports whether a merge happened. This approach needs no adjacency list, and it also works when edges arrive one by one.

```python
class Solution:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
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

        count = n
        for a, b in edges:
            if union(a, b):
                count -= 1
        return count


print(Solution().countComponents(5, [[0, 1], [1, 2], [3, 4]]))
print(Solution().countComponents(6, [[0, 5], [2, 4], [4, 3]]))
print(Solution().countComponents(4, [[0, 1], [1, 2], [2, 3], [3, 0]]))
print(Solution().countComponents(3, []))
print(Solution().countComponents(1, []))
```

**Time** `O(V + E · α(V))`, where `α` is the inverse Ackermann function and is at most 4 for any realistic input. **Space** `O(V)`.
:::
