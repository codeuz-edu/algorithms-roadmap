---
title: Partition Labels
description: "Partition Labels in Python: record the last position of every letter, then close a part as soon as no letter in it appears later."
---

# Partition Labels

<ProblemMeta />

## Problem

Cut the string `s` into as many consecutive parts as possible so that no letter appears in more than one part. Return the lengths of the parts, from left to right.

| Input | Output | Why |
| --- | --- | --- |
| `"abaccdd"` | `[3, 2, 2]` | `aba`, `cc`, `dd` |
| `"abcabc"` | `[6]` | every letter comes back later, so no cut is possible |
| `"xyz"` | `[1, 1, 1]` | no letter repeats |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def partitionLabels(self, s: str) -> list[int]:
        pass


print(Solution().partitionLabels("abaccdd"))
print(Solution().partitionLabels("abcabc"))
print(Solution().partitionLabels("xyz"))
print(Solution().partitionLabels("ababcbacadefegdehijhklij"))
print(Solution().partitionLabels("q"))
```

::: details Solution
**Idea.** A part that contains a letter must contain every copy of it, so it has to stretch at least to that letter's last position. First record the last index of every letter.

Then scan from the left with `end`, the furthest last position among the letters seen in the current part. Each new letter may push `end` further right. When the scan index reaches `end`, every letter in the part has had its final copy, so a cut right here is legal.

Cutting at the first legal point is the greedy choice, and it is safe. The part cannot end any earlier, because some letter in it still appears later. Ending it later than necessary would only glue two valid parts together and lower the count. So the earliest cut gives the most parts, and the rest of the string is an independent problem of the same kind.

```python
class Solution:
    def partitionLabels(self, s: str) -> list[int]:
        last = {ch: i for i, ch in enumerate(s)}

        sizes = []
        start = 0
        end = 0
        for i, ch in enumerate(s):
            end = max(end, last[ch])
            if i == end:
                sizes.append(end - start + 1)
                start = i + 1
        return sizes


print(Solution().partitionLabels("abaccdd"))
print(Solution().partitionLabels("abcabc"))
print(Solution().partitionLabels("xyz"))
print(Solution().partitionLabels("ababcbacadefegdehijhklij"))
print(Solution().partitionLabels("q"))
```

**Time** `O(n)`, **space** `O(1)` besides the answer, since the dictionary holds at most 26 letters.
:::
