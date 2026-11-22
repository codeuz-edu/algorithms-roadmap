---
title: Median of Two Sorted Arrays
description: "Median of Two Sorted Arrays in Python: binary search for the cut in the shorter list that splits both lists into equal halves."
---

# Median of Two Sorted Arrays

<ProblemMeta />

## Problem

You are given two sorted lists of integers, `nums1` and `nums2`. Return the median of all their values taken together, as a float. With an odd number of values the median is the middle one. With an even number it is the average of the two middle ones. One of the lists may be empty, but not both. The target running time is `O(log(m + n))`.

| Input | Output | Why |
| --- | --- | --- |
| `nums1 = [5, 6]`, `nums2 = [1, 2, 3]` | `3.0` | middle of `1 2 3 5 6` |
| `nums1 = [1, 2]`, `nums2 = [3, 4]` | `2.5` | average of 2 and 3 |
| `nums1 = []`, `nums2 = [8]` | `8.0` | |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        pass


print(Solution().findMedianSortedArrays([5, 6], [1, 2, 3]))
print(Solution().findMedianSortedArrays([1, 2], [3, 4]))
print(Solution().findMedianSortedArrays([1, 3], [2]))
print(Solution().findMedianSortedArrays([1, 1], [1, 1]))
print(Solution().findMedianSortedArrays([], [8]))
```

::: details Solution
**Idea.** The median splits the combined values into a left half and a right half, with nothing on the left larger than anything on the right. Call the shorter list `a` and the longer `b`. The left half takes the first `i` values of `a` and the first `j` values of `b`. Its size is fixed at `half = (total + 1) // 2`, so choosing `i` forces `j = half - i`. Only one number is unknown.

Inside each list the order is already right. The cut is correct when it also holds across the lists: the last value taken from `a` is not larger than the first value left in `b`, and the last value taken from `b` is not larger than the first value left in `a`.

That gives a binary search on `i`. If the last value taken from `a` is larger than the first value left in `b`, too much was taken from `a`, so move left. Otherwise too little was taken, so move right. Positions past the end of a list are treated as minus or plus infinity so that an empty side never blocks the comparison.

Once the cut is right, the largest value on the left is the median for an odd total. For an even total, average it with the smallest value on the right. Searching the shorter list keeps `j` from going negative and gives the `O(log(min(m, n)))` bound.

```python
class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        a, b = nums1, nums2
        if len(a) > len(b):
            a, b = b, a
        total = len(a) + len(b)
        half = (total + 1) // 2
        infinity = float("inf")

        low, high = 0, len(a)
        while low <= high:
            i = (low + high) // 2
            j = half - i
            a_left = a[i - 1] if i > 0 else -infinity
            a_right = a[i] if i < len(a) else infinity
            b_left = b[j - 1] if j > 0 else -infinity
            b_right = b[j] if j < len(b) else infinity

            if a_left > b_right:
                high = i - 1
            elif b_left > a_right:
                low = i + 1
            elif total % 2 == 1:
                return float(max(a_left, b_left))
            else:
                return (max(a_left, b_left) + min(a_right, b_right)) / 2


print(Solution().findMedianSortedArrays([5, 6], [1, 2, 3]))
print(Solution().findMedianSortedArrays([1, 2], [3, 4]))
print(Solution().findMedianSortedArrays([1, 3], [2]))
print(Solution().findMedianSortedArrays([1, 1], [1, 1]))
print(Solution().findMedianSortedArrays([], [8]))
```

**Time** `O(log(min(m, n)))`, **space** `O(1)`.

**Merging.** Merge the two lists the way merge sort does, then read the middle. It is linear instead of logarithmic, but it is the answer to give first, and it is a useful reference when testing the binary search.

```python
class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        merged = []
        i = j = 0
        while i < len(nums1) and j < len(nums2):
            if nums1[i] <= nums2[j]:
                merged.append(nums1[i])
                i += 1
            else:
                merged.append(nums2[j])
                j += 1
        merged.extend(nums1[i:])
        merged.extend(nums2[j:])

        mid = len(merged) // 2
        if len(merged) % 2 == 1:
            return float(merged[mid])
        return (merged[mid - 1] + merged[mid]) / 2


print(Solution().findMedianSortedArrays([5, 6], [1, 2, 3]))
print(Solution().findMedianSortedArrays([1, 2], [3, 4]))
print(Solution().findMedianSortedArrays([1, 3], [2]))
print(Solution().findMedianSortedArrays([1, 1], [1, 1]))
print(Solution().findMedianSortedArrays([], [8]))
```

**Time** `O(m + n)`, **space** `O(m + n)`.
:::
