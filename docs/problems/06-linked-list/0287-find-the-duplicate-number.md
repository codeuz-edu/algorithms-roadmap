---
title: Find the Duplicate Number
description: "Find the Duplicate Number in Python: read the array as a linked list and find the start of its cycle with Floyd's algorithm, in O(1) space without modifying the input."
---

# Find the Duplicate Number

<ProblemMeta />

## Problem

A list `nums` holds `n + 1` integers, and every one of them is between `1` and `n`. Exactly one value occurs more than once, and it may occur many times. Return that value without changing `nums` and using only constant extra memory.

| Input | Output |
| --- | --- |
| `[2, 4, 1, 4, 3]` | `4` |
| `[1, 1]` | `1` |
| `[3, 3, 3, 3]` | `3` |

## Try it yourself

Fill in the method, then press **Check**.

```python
class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        pass


print(Solution().findDuplicate([2, 4, 1, 4, 3]))
print(Solution().findDuplicate([1, 1]))
print(Solution().findDuplicate([3, 3, 3, 3]))
print(Solution().findDuplicate([1, 3, 4, 2, 1]))
print(Solution().findDuplicate([5, 2, 6, 2, 1, 3, 4]))
```

::: details Solution
**Idea.** A set or sorting would find the duplicate, but both break the rules. The trick is to read the list as a linked list: index `i` points to index `nums[i]`.

Start at index 0 and keep following pointers. Every value is between `1` and `n`, so every pointer leads to a valid index and the walk never ends. With finitely many indices it must loop, as in [Linked List Cycle](/problems/linked-list-cycle). No value is 0, so nothing points back to index 0, which means index 0 is outside the loop and the walk has a tail before it enters the loop.

The index where the tail joins the loop has two different indices pointing to it: one on the tail and one inside the loop. Two indices pointing to the same place means two positions holding the same value. So the loop's entry point is the duplicate.

Finding the entry point takes two phases. First run a slow and a fast pointer until they meet inside the loop. Say the tail has `a` steps and they meet `b` steps into the loop. The slow pointer walked `a + b` steps and the fast one twice that, so the extra `a + b` steps are a whole number of laps. That means walking `a` more steps from the meeting point lands exactly on the entry point. Walking `a` steps from index 0 lands there too. So restart one pointer from 0, move both one step at a time, and they meet at the entry.

```python
class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        slow = fast = 0
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        finder = 0
        while finder != slow:
            finder = nums[finder]
            slow = nums[slow]
        return slow


print(Solution().findDuplicate([2, 4, 1, 4, 3]))
print(Solution().findDuplicate([1, 1]))
print(Solution().findDuplicate([3, 3, 3, 3]))
print(Solution().findDuplicate([1, 3, 4, 2, 1]))
print(Solution().findDuplicate([5, 2, 6, 2, 1, 3, 4]))
```

**Time** `O(n)`, **space** `O(1)`.

**Binary search on the value.** This version is slower but easier to come up with. Pick a value `mid` and count how many numbers are `mid` or smaller. Without a duplicate in the range `1` to `mid`, each of those values appears at most once, so the count is at most `mid`. If the count is larger, the duplicate is `mid` or smaller. Otherwise it is larger than `mid`. Halve the range of candidate values until one is left.

```python
class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        low, high = 1, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            count = sum(1 for num in nums if num <= mid)
            if count > mid:
                high = mid
            else:
                low = mid + 1
        return low


print(Solution().findDuplicate([2, 4, 1, 4, 3]))
print(Solution().findDuplicate([1, 1]))
print(Solution().findDuplicate([3, 3, 3, 3]))
print(Solution().findDuplicate([1, 3, 4, 2, 1]))
print(Solution().findDuplicate([5, 2, 6, 2, 1, 3, 4]))
```

**Time** `O(n log n)`, **space** `O(1)`.
:::
