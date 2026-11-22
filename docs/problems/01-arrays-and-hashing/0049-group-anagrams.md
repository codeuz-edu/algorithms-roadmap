---
title: Group Anagrams
description: "Group Anagrams in Python: bucket words in a dictionary keyed by their sorted letters or by their letter counts."
---

# Group Anagrams

<ProblemMeta />

## Problem

You are given a list of strings `strs`. Group the words that are anagrams of each other. The groups can be returned in any order.

| Input | Output |
| --- | --- |
| `["eat", "tea", "tan", "ate", "nat", "bat"]` | `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]` |
| `[""]` | `[[""]]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts the groups before printing, so your output can be compared with the solution's.

```python
class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        pass


def show(groups):
    print(sorted(sorted(group) for group in groups))


show(Solution().groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
show(Solution().groupAnagrams([""]))
show(Solution().groupAnagrams(["a"]))
```

::: details Solution
**Idea.** Anagrams need a label they all share. Sorting the letters gives one: `"eat"`, `"tea"` and `"ate"` all become `"aet"`. Use that label as a dictionary key and append each word to its key's list. The dictionary's values are the groups.

```python
class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = {}
        for word in strs:
            key = "".join(sorted(word))
            if key in groups:
                groups[key].append(word)
            else:
                groups[key] = [word]
        return list(groups.values())


def show(groups):
    print(sorted(sorted(group) for group in groups))


show(Solution().groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
show(Solution().groupAnagrams([""]))
show(Solution().groupAnagrams(["a"]))
```

**Time** `O(n · k log k)` for `n` words of length up to `k`, **space** `O(n · k)`.

**Without sorting.** The label can also be the letter counts: a tuple of 26 numbers, one per lowercase letter. Building it takes one pass over the word, which removes the `log k`.

```python
class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = {}
        for word in strs:
            counts = [0] * 26
            for ch in word:
                counts[ord(ch) - ord("a")] += 1
            groups.setdefault(tuple(counts), []).append(word)
        return list(groups.values())


def show(groups):
    print(sorted(sorted(group) for group in groups))


show(Solution().groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
show(Solution().groupAnagrams([""]))
show(Solution().groupAnagrams(["a"]))
```

**Time** `O(n · k)`, **space** `O(n · k)`.
:::
