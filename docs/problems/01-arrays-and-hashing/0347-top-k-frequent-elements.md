---
title: Top K Frequent Elements
description: "Top K Frequent Elements in Python: count with a dictionary, then sort by count or use bucket sort for O(n)."
---

# Top K Frequent Elements

<ProblemMeta />

## Problem

You are given a list of integers `nums` and an integer `k`. Return the `k` values that appear most often. The answer is unique, and it can be returned in any order.

| Input | Output |
| --- | --- |
| `nums = [1, 1, 1, 2, 2, 3]`, `k = 2` | `[1, 2]` |
| `nums = [1]`, `k = 1` | `[1]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: the answers are sorted before printing.

```python
class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        pass


print(sorted(Solution().topKFrequent([1, 1, 1, 2, 2, 3], 2)))
print(sorted(Solution().topKFrequent([1], 1)))
print(sorted(Solution().topKFrequent([4, 4, 5, 5, 5, 6, 7, 7, 7, 7], 3)))
```

::: details Solution
**Idea.** Count how often each value appears, sort the values by that count from highest to lowest, and keep the first `k`.

```python
class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        freq = {}
        for num in nums:
            freq[num] = freq.get(num, 0) + 1

        by_count = sorted(freq.items(), key=lambda item: item[1], reverse=True)
        return [num for num, count in by_count[:k]]


print(sorted(Solution().topKFrequent([1, 1, 1, 2, 2, 3], 2)))
print(sorted(Solution().topKFrequent([1], 1)))
print(sorted(Solution().topKFrequent([4, 4, 5, 5, 5, 6, 7, 7, 7, 7], 3)))
```

**Time** `O(n log n)`, **space** `O(n)`.

**Bucket sort.** The follow-up asks for better than `O(n log n)`. A count can never be larger than `len(nums)`, so the counts can index a list of buckets: `buckets[c]` holds every value that appears exactly `c` times. Reading the buckets from the highest count down gives the values in order without sorting.

```python
class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        freq = {}
        for num in nums:
            freq[num] = freq.get(num, 0) + 1

        buckets = [[] for _ in range(len(nums) + 1)]
        for num, count in freq.items():
            buckets[count].append(num)

        result = []
        for count in range(len(nums), 0, -1):
            for num in buckets[count]:
                result.append(num)
                if len(result) == k:
                    return result


print(sorted(Solution().topKFrequent([1, 1, 1, 2, 2, 3], 2)))
print(sorted(Solution().topKFrequent([1], 1)))
print(sorted(Solution().topKFrequent([4, 4, 5, 5, 5, 6, 7, 7, 7, 7], 3)))
```

**Time** `O(n)`, **space** `O(n)`.
:::
