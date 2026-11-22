---
title: Design Add and Search Words Data Structure
description: "Design Add and Search Words Data Structure in Python: store words in a trie and search with a depth-first walk that tries every child when the pattern has a dot."
---

# Design Add and Search Words Data Structure

<ProblemMeta />

## Problem

Build a class that stores lowercase words and supports pattern search.

- `addWord(word)` stores a word.
- `search(word)` returns `True` if some stored word matches `word` letter for letter and has the same length. In the search string, a dot `.` matches any single letter.

| Stored words | Search | Output |
| --- | --- | --- |
| `"pin"`, `"pan"`, `"pint"`, `"tin"` | `"p.n"` | `True` |
| same | `"..t"` | `False`: no three-letter word ends in `t` |
| same | `"...."` | `True`: matches `"pint"` |

## Try it yourself

Fill in the methods, then press **Check**. The last line searches an empty dictionary.

```python
class WordDictionary:
    def __init__(self):
        pass

    def addWord(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass


words = WordDictionary()
for word in ("pin", "pan", "pint", "tin"):
    words.addWord(word)

print(words.search("pin"), words.search("pun"), words.search("pi"))
print(words.search("p.n"), words.search(".in"), words.search("..."))
print(words.search("pin."), words.search("...."), words.search("....."))
print(words.search(".a."), words.search("t.."), words.search("..t"))
print(WordDictionary().search("."))
```

::: details Solution
**Idea.** Store the words in a trie, as in [Implement Trie (Prefix Tree)](/problems/implement-trie-prefix-tree). A search without dots is a single walk down the tree, one child per letter.

A dot means the letter is unknown, so the walk cannot pick one child. It has to try all of them: the pattern matches if the rest of it matches below any child. That is a depth-first search, written here as a recursive function that takes a node and the position in the pattern.

A match needs the walk to use up the whole pattern and stop on a node where a word ends. This is why `"pi"` fails after adding `"pin"`: the path exists, but no word ends there. The recursion is at most as deep as the pattern is long.

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False


class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True

    def search(self, word: str) -> bool:
        def matches(node: TrieNode, i: int) -> bool:
            if i == len(word):
                return node.is_word
            ch = word[i]
            if ch == ".":
                return any(matches(child, i + 1) for child in node.children.values())
            if ch not in node.children:
                return False
            return matches(node.children[ch], i + 1)

        return matches(self.root, 0)


words = WordDictionary()
for word in ("pin", "pan", "pint", "tin"):
    words.addWord(word)

print(words.search("pin"), words.search("pun"), words.search("pi"))
print(words.search("p.n"), words.search(".in"), words.search("..."))
print(words.search("pin."), words.search("...."), words.search("....."))
print(words.search(".a."), words.search("t.."), words.search("..t"))
print(WordDictionary().search("."))
```

**Time** `O(L)` for `addWord` and for a search without dots. A search made of dots can visit every node of the trie, `O(26^L)` in the worst case. **Space** `O(total letters added)`.

**Grouping by length.** A pattern can only match words of its own length, so keep one set of words per length. A search without dots is a set lookup. A search with dots compares the pattern with each word of that length, letter by letter. It is much less code and fine for small inputs, but a search costs time proportional to the number of stored words, while the trie stops exploring a branch at the first letter that does not fit.

```python
class WordDictionary:
    def __init__(self):
        self.by_length = {}

    def addWord(self, word: str) -> None:
        self.by_length.setdefault(len(word), set()).add(word)

    def search(self, word: str) -> bool:
        candidates = self.by_length.get(len(word), set())
        if "." not in word:
            return word in candidates
        for candidate in candidates:
            if all(p == "." or p == ch for p, ch in zip(word, candidate)):
                return True
        return False


words = WordDictionary()
for word in ("pin", "pan", "pint", "tin"):
    words.addWord(word)

print(words.search("pin"), words.search("pun"), words.search("pi"))
print(words.search("p.n"), words.search(".in"), words.search("..."))
print(words.search("pin."), words.search("...."), words.search("....."))
print(words.search(".a."), words.search("t.."), words.search("..t"))
print(WordDictionary().search("."))
```

**Time** `O(L)` for `addWord`, `O(n · L)` for a search with dots over `n` stored words. **Space** `O(total letters added)`.
:::
