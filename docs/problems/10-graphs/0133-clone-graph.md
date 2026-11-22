---
title: Clone Graph
description: "Clone Graph in Python: deep copy a connected undirected graph with a dictionary from each original node to its copy."
---

# Clone Graph

<ProblemMeta />

## Problem

You are given one node of a connected undirected graph. Each node has an integer `val` and a list `neighbors` of the nodes it is joined to. Return a deep copy of the graph: a new node for every original node, with the same values and the same connections, where every neighbour reference points to a new node and never to an original one. If the input is `None`, return `None`.

The tests describe a graph as an adjacency list. Node values are `1` to `n`, entry `i` lists the neighbours of node `i + 1`, and the node you receive is node `1`. So `[[2, 3], [1], [1]]` is a graph where node 1 is joined to nodes 2 and 3.

## Try it yourself

Fill in `cloneGraph`, then press **Check**. `build` creates a graph from an adjacency list and `to_adj` turns a graph back into one. Each test prints the adjacency list of your copy, then `True` if the copy shares no node object with the original.

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def cloneGraph(self, node: Node | None) -> Node | None:
        pass


def build(adj):
    nodes = [Node(i + 1) for i in range(len(adj))]
    for node, neighbors in zip(nodes, adj):
        node.neighbors = [nodes[val - 1] for val in neighbors]
    return nodes[0] if nodes else None


def reachable(node):
    found = {}
    stack = [node] if node else []
    while stack:
        current = stack.pop()
        if id(current) not in found:
            found[id(current)] = current
            stack.extend(current.neighbors)
    return list(found.values())


def to_adj(node):
    nodes = sorted(reachable(node), key=lambda n: n.val)
    return [sorted(neighbor.val for neighbor in n.neighbors) for n in nodes]


def check(adj):
    original = build(adj)
    copy = Solution().cloneGraph(original)
    shared = {id(n) for n in reachable(original)} & {id(n) for n in reachable(copy)}
    print(to_adj(copy), not shared)


check([[2, 3], [1, 3], [1, 2, 4], [3]])
check([[2, 4], [1, 3], [2, 4], [1, 3]])
check([[2], [1]])
check([[]])
check([])
```

::: details Solution
**Idea.** Copying one node is easy. The difficulty is that graphs have cycles and shared neighbours, so the same original node is reached along several paths. Each time, the copy must point to the same new node. Creating a fresh node on every visit would produce duplicates, and on a cycle it would never stop.

Keep a dictionary from each original node to its copy. To clone a node, first look it up. If a copy exists, return it. Otherwise create the copy, store it in the dictionary straight away, and only then clone the neighbours and attach them.

Storing the copy before recursing is the important step. When the recursion follows a cycle back to a node that is still being processed, the lookup finds the unfinished copy and returns it, which closes the cycle in the new graph.

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def cloneGraph(self, node: Node | None) -> Node | None:
        copies = {}

        def clone(original):
            if original in copies:
                return copies[original]
            copy = Node(original.val)
            copies[original] = copy
            for neighbor in original.neighbors:
                copy.neighbors.append(clone(neighbor))
            return copy

        return clone(node) if node else None


def build(adj):
    nodes = [Node(i + 1) for i in range(len(adj))]
    for node, neighbors in zip(nodes, adj):
        node.neighbors = [nodes[val - 1] for val in neighbors]
    return nodes[0] if nodes else None


def reachable(node):
    found = {}
    stack = [node] if node else []
    while stack:
        current = stack.pop()
        if id(current) not in found:
            found[id(current)] = current
            stack.extend(current.neighbors)
    return list(found.values())


def to_adj(node):
    nodes = sorted(reachable(node), key=lambda n: n.val)
    return [sorted(neighbor.val for neighbor in n.neighbors) for n in nodes]


def check(adj):
    original = build(adj)
    copy = Solution().cloneGraph(original)
    shared = {id(n) for n in reachable(original)} & {id(n) for n in reachable(copy)}
    print(to_adj(copy), not shared)


check([[2, 3], [1, 3], [1, 2, 4], [3]])
check([[2, 4], [1, 3], [2, 4], [1, 3]])
check([[2], [1]])
check([[]])
check([])
```

**Time** `O(V + E)` for `V` nodes and `E` edges, **space** `O(V)` for the dictionary and the recursion.

**Breadth-first search.** The same dictionary works with a queue. A node gets its copy at the moment it is first seen, and that is also when it joins the queue. When a node is taken from the queue, each of its neighbours already has a copy or receives one now, so the edge can be added to the new graph immediately.

```python
from collections import deque


class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def cloneGraph(self, node: Node | None) -> Node | None:
        if node is None:
            return None

        copies = {node: Node(node.val)}
        queue = deque([node])
        while queue:
            original = queue.popleft()
            for neighbor in original.neighbors:
                if neighbor not in copies:
                    copies[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                copies[original].neighbors.append(copies[neighbor])
        return copies[node]


def build(adj):
    nodes = [Node(i + 1) for i in range(len(adj))]
    for node, neighbors in zip(nodes, adj):
        node.neighbors = [nodes[val - 1] for val in neighbors]
    return nodes[0] if nodes else None


def reachable(node):
    found = {}
    stack = [node] if node else []
    while stack:
        current = stack.pop()
        if id(current) not in found:
            found[id(current)] = current
            stack.extend(current.neighbors)
    return list(found.values())


def to_adj(node):
    nodes = sorted(reachable(node), key=lambda n: n.val)
    return [sorted(neighbor.val for neighbor in n.neighbors) for n in nodes]


def check(adj):
    original = build(adj)
    copy = Solution().cloneGraph(original)
    shared = {id(n) for n in reachable(original)} & {id(n) for n in reachable(copy)}
    print(to_adj(copy), not shared)


check([[2, 3], [1, 3], [1, 2, 4], [3]])
check([[2, 4], [1, 3], [2, 4], [1, 3]])
check([[2], [1]])
check([[]])
check([])
```

**Time** `O(V + E)`, **space** `O(V)`.
:::
