---
title: Implement Trie (Prefix Tree)
description: "Implement Trie (Prefix Tree) in Python: build a prefix tree from nodes that hold a dictionary of children and an end-of-word flag."
---

# Implement Trie (Prefix Tree)

<ProblemMeta />

## Problem

Build a class that stores a set of lowercase words and answers two kinds of question.

- `insert(word)` adds a word.
- `search(word)` returns `True` if exactly this word was inserted.
- `startsWith(prefix)` returns `True` if at least one inserted word begins with `prefix`. A word counts as a prefix of itself.

For example, after `insert("card")`, `search("card")` is `True` and `startsWith("car")` is `True`, but `search("car")` is `False` because `"car"` itself was never inserted.

## Try it yourself

Fill in the methods, then press **Check**. The last line asks an empty trie, which must answer `False` to everything.

```python
class Trie:
    def __init__(self):
        pass

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass


trie = Trie()
trie.insert("card")
print(trie.search("card"), trie.search("car"), trie.startsWith("car"))
trie.insert("car")
print(trie.search("car"), trie.search("care"), trie.startsWith("care"))
print(trie.search("cat"), trie.startsWith("ca"), trie.startsWith("d"))
print(Trie().search("a"), Trie().startsWith("a"))
```

::: details Solution
**Idea.** A trie is a tree in which every edge is labelled with a letter. Walking down from the root and reading the letters along the way spells a prefix, so each node stands for one prefix, and words that share a prefix share the path for it. `"car"` and `"card"` use the same three nodes, and `"card"` adds one more.

Each node needs two things: a dictionary from a letter to the child node for that letter, and a flag saying whether a word ends here. The flag is what separates `search` from `startsWith`. After inserting only `"card"`, the path for `"car"` exists, so it is a prefix, but its last node is not marked, so it is not a word.

All three methods walk the same path one letter at a time. `insert` creates the nodes that are missing and marks the last one. The other two stop with `False` as soon as a letter has no child, so they share a helper that returns the node where the walk ends, or `None`.

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True

    def find(self, prefix: str) -> TrieNode | None:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word: str) -> bool:
        node = self.find(word)
        return node is not None and node.is_word

    def startsWith(self, prefix: str) -> bool:
        return self.find(prefix) is not None


trie = Trie()
trie.insert("card")
print(trie.search("card"), trie.search("car"), trie.startsWith("car"))
trie.insert("car")
print(trie.search("car"), trie.search("care"), trie.startsWith("care"))
print(trie.search("cat"), trie.startsWith("ca"), trie.startsWith("d"))
print(Trie().search("a"), Trie().startsWith("a"))
```

**Time** `O(L)` per call for a string of length `L`, **space** `O(total letters inserted)` in the worst case.

**Without a trie.** Two sets give the same answers: one with the words and one with every prefix of every word. It shows what the trie saves. A word of length `L` has `L` prefixes with `O(L²)` letters between them, and each is stored separately, while the trie stores one node per letter and shares common prefixes between words.

```python
class Trie:
    def __init__(self):
        self.words = set()
        self.prefixes = set()

    def insert(self, word: str) -> None:
        self.words.add(word)
        for end in range(1, len(word) + 1):
            self.prefixes.add(word[:end])

    def search(self, word: str) -> bool:
        return word in self.words

    def startsWith(self, prefix: str) -> bool:
        return prefix in self.prefixes


trie = Trie()
trie.insert("card")
print(trie.search("card"), trie.search("car"), trie.startsWith("car"))
trie.insert("car")
print(trie.search("car"), trie.search("care"), trie.startsWith("care"))
print(trie.search("cat"), trie.startsWith("ca"), trie.startsWith("d"))
print(Trie().search("a"), Trie().startsWith("a"))
```

**Time** `O(L²)` for `insert` and `O(L)` for the lookups, **space** `O(L²)` per inserted word.
:::
