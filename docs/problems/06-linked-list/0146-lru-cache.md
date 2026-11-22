---
title: LRU Cache
description: "LRU Cache in Python: combine a dictionary with a doubly linked list so that get and put both run in O(1), plus the OrderedDict version."
---

# LRU Cache

<ProblemMeta />

## Problem

Design a cache that holds at most `capacity` keys.

- `get(key)` returns the value stored for `key`, or `-1` if the key is not in the cache.
- `put(key, value)` stores the value, replacing the old one if the key already exists. If that leaves more than `capacity` keys, remove the least recently used key.

Both reading a key with `get` and writing it with `put` count as using it. Both methods must run in `O(1)` time on average.

For example, with capacity 2: after `put(1, 10)` and `put(2, 20)`, calling `get(1)` returns `10` and makes key 2 the least recently used. Then `put(3, 30)` evicts key 2, so `get(2)` returns `-1`.

## Try it yourself

Fill in the three methods, then press **Check**. The tests cover an eviction after a `get`, an update of an existing key, and a cache of capacity 1.

```python
class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass


cache = LRUCache(2)
cache.put(1, 10)
cache.put(2, 20)
print(cache.get(1))
cache.put(3, 30)
print(cache.get(2))
cache.put(1, 11)
cache.put(4, 40)
print(cache.get(3), cache.get(1), cache.get(4))

single = LRUCache(1)
single.put(5, 50)
single.put(6, 60)
print(single.get(5), single.get(6))
```

::: details Solution
**Idea.** Two things must be fast: finding a key, and keeping the keys ordered by how recently they were used. A dictionary handles the first. For the second, every use moves a key to the "most recent" end of the order, and every eviction removes the key at the other end. A list would need `O(n)` to pull an item out of the middle.

A doubly linked list can remove a node in `O(1)` if you already hold the node, because the node knows both of its neighbours. So store the nodes in the dictionary: `key -> node`. The dictionary finds the node, and the linked list moves it.

The list runs from least recent, just after `head`, to most recent, just before `tail`. `head` and `tail` are placeholder nodes that are never removed, so every real node always has two neighbours and no method needs to check for an empty list. Each node stores its key as well as its value, because evicting the oldest node also requires deleting its key from the dictionary.

```python
class Node:
    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.nodes = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def remove(self, node: Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def add_last(self, node: Node) -> None:
        last = self.tail.prev
        last.next = node
        node.prev = last
        node.next = self.tail
        self.tail.prev = node

    def get(self, key: int) -> int:
        if key not in self.nodes:
            return -1
        node = self.nodes[key]
        self.remove(node)
        self.add_last(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.nodes:
            self.remove(self.nodes[key])
        node = Node(key, value)
        self.nodes[key] = node
        self.add_last(node)
        if len(self.nodes) > self.capacity:
            oldest = self.head.next
            self.remove(oldest)
            del self.nodes[oldest.key]


cache = LRUCache(2)
cache.put(1, 10)
cache.put(2, 20)
print(cache.get(1))
cache.put(3, 30)
print(cache.get(2))
cache.put(1, 11)
cache.put(4, 40)
print(cache.get(3), cache.get(1), cache.get(4))

single = LRUCache(1)
single.put(5, 50)
single.put(6, 60)
print(single.get(5), single.get(6))
```

**Time** `O(1)` per operation, **space** `O(capacity)`.

**With OrderedDict.** Python's `OrderedDict` is this same pairing of a hash table and a doubly linked list. `move_to_end` marks a key as most recent and `popitem(last=False)` removes the oldest one. Use it in real code, and be ready to write the version above when an interviewer asks what happens underneath.

```python
from collections import OrderedDict


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.items = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.items:
            return -1
        self.items.move_to_end(key)
        return self.items[key]

    def put(self, key: int, value: int) -> None:
        self.items[key] = value
        self.items.move_to_end(key)
        if len(self.items) > self.capacity:
            self.items.popitem(last=False)


cache = LRUCache(2)
cache.put(1, 10)
cache.put(2, 20)
print(cache.get(1))
cache.put(3, 30)
print(cache.get(2))
cache.put(1, 11)
cache.put(4, 40)
print(cache.get(3), cache.get(1), cache.get(4))

single = LRUCache(1)
single.put(5, 50)
single.put(6, 60)
print(single.get(5), single.get(6))
```

**Time** `O(1)` per operation, **space** `O(capacity)`.
:::
