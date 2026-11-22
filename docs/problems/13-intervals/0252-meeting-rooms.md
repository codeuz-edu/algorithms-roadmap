---
title: Meeting Rooms
description: "Meeting Rooms in Python: sort the meetings by start time and check that each one starts after the previous one has ended."
---

# Meeting Rooms

<ProblemMeta />

## Problem

You are given a list of meetings, each written as `[start, end]` with `start < end`. Return `True` if a single person can attend all of them, which means no two meetings overlap in time. A meeting may start at the exact moment another one ends. An empty list is `True`.

| Input | Output | Why |
| --- | --- | --- |
| `[[9, 10], [13, 14], [10, 12]]` | `True` | `[9, 10]` and `[10, 12]` only touch |
| `[[8, 11], [10, 12]]` | `False` | both are running between 10 and 11 |
| `[[5, 8], [1, 9]]` | `False` | the first is inside the second |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:
        pass


print(Solution().canAttendMeetings([[9, 10], [13, 14], [10, 12]]))
print(Solution().canAttendMeetings([[8, 11], [10, 12]]))
print(Solution().canAttendMeetings([[5, 8], [1, 9]]))
print(Solution().canAttendMeetings([[7, 9]]))
print(Solution().canAttendMeetings([]))
```

::: details Solution
**Idea.** Sort the meetings by start time. If any two meetings overlap, then some pair of neighbours in the sorted order overlaps too, so checking neighbours is enough.

Here is why. Suppose meeting A starts before meeting B and they overlap, so B starts before A ends. Every meeting between them in sorted order starts no later than B, so it also starts before A ends. In particular the meeting right after A does, and that pair of neighbours overlaps.

So walk the sorted list and compare each start with the previous end. A start that is earlier than the previous end is a clash. Equal times are fine.

```python
class Solution:
    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:
        intervals = sorted(intervals)
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                return False
        return True


print(Solution().canAttendMeetings([[9, 10], [13, 14], [10, 12]]))
print(Solution().canAttendMeetings([[8, 11], [10, 12]]))
print(Solution().canAttendMeetings([[5, 8], [1, 9]]))
print(Solution().canAttendMeetings([[7, 9]]))
print(Solution().canAttendMeetings([]))
```

**Time** `O(n log n)`, **space** `O(n)` for the sorted copy.

**Brute force.** Compare every pair. Two meetings overlap when each one starts before the other ends. This is the definition written out, and it is the test to remember for any interval problem.

```python
class Solution:
    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:
        for i in range(len(intervals)):
            for j in range(i + 1, len(intervals)):
                first, second = intervals[i], intervals[j]
                if first[0] < second[1] and second[0] < first[1]:
                    return False
        return True


print(Solution().canAttendMeetings([[9, 10], [13, 14], [10, 12]]))
print(Solution().canAttendMeetings([[8, 11], [10, 12]]))
print(Solution().canAttendMeetings([[5, 8], [1, 9]]))
print(Solution().canAttendMeetings([[7, 9]]))
print(Solution().canAttendMeetings([]))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
