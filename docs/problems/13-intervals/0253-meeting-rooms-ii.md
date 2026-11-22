---
title: Meeting Rooms II
description: "Meeting Rooms II in Python: sort meetings by start and keep a min-heap of end times to find the minimum number of rooms, plus the sweep line version."
---

# Meeting Rooms II

<ProblemMeta />

## Problem

You are given a list of meetings, each written as `[start, end]` with `start < end`. Every meeting needs a room for its whole duration, and a room can hold one meeting at a time. A room becomes free at the moment its meeting ends, so a meeting starting at that same moment can use it. Return the smallest number of rooms that is enough for all the meetings. An empty list needs 0 rooms.

| Input | Output | Why |
| --- | --- | --- |
| `[[9, 12], [10, 11], [11, 13]]` | `2` | the third meeting reuses the room freed at 11 |
| `[[1, 2], [2, 3], [3, 4]]` | `1` | each starts as the previous ends |
| `[[1, 5], [2, 6], [3, 7]]` | `3` | all three are running between 3 and 5 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def minMeetingRooms(self, intervals: list[list[int]]) -> int:
        pass


print(Solution().minMeetingRooms([[9, 12], [10, 11], [11, 13]]))
print(Solution().minMeetingRooms([[1, 2], [2, 3], [3, 4]]))
print(Solution().minMeetingRooms([[1, 5], [2, 6], [3, 7]]))
print(Solution().minMeetingRooms([[1, 10], [2, 3], [4, 5], [6, 7]]))
print(Solution().minMeetingRooms([]))
```

::: details Solution
**Idea.** Hand out rooms in the order the meetings start. When a meeting begins, the only question is whether some room has already been freed. The room that frees up first is the best one to ask about: if even that one is still busy, every room is busy.

A min-heap of end times, one entry per room in use, answers that in `O(log n)`. For each meeting in start order, look at the smallest end time. If it is at or before the meeting's start, that room is free, so replace its end time with the new one. Otherwise push a new entry, which opens a new room.

Rooms are never closed, so the size of the heap at the end is the number of rooms opened. A new room is opened only when all the open ones are busy at the same moment, so no smaller number could work.

```python
import heapq


class Solution:
    def minMeetingRooms(self, intervals: list[list[int]]) -> int:
        end_times = []
        for start, end in sorted(intervals):
            if end_times and end_times[0] <= start:
                heapq.heapreplace(end_times, end)
            else:
                heapq.heappush(end_times, end)
        return len(end_times)


print(Solution().minMeetingRooms([[9, 12], [10, 11], [11, 13]]))
print(Solution().minMeetingRooms([[1, 2], [2, 3], [3, 4]]))
print(Solution().minMeetingRooms([[1, 5], [2, 6], [3, 7]]))
print(Solution().minMeetingRooms([[1, 10], [2, 3], [4, 5], [6, 7]]))
print(Solution().minMeetingRooms([]))
```

**Time** `O(n log n)`, **space** `O(n)`.

**Sweep line.** The answer is the largest number of meetings running at the same time. Turn each meeting into two events: `+1` at its start and `-1` at its end. Sort the events by time and add them up in order. The running total is the number of meetings in progress, and its peak is the answer.

Events are `(time, change)` tuples, so at equal times a `-1` sorts before a `+1`. The room is released before the next meeting claims it, which matches the rule that touching meetings can share a room.

```python
class Solution:
    def minMeetingRooms(self, intervals: list[list[int]]) -> int:
        events = []
        for start, end in intervals:
            events.append((start, 1))
            events.append((end, -1))

        running = most = 0
        for _, change in sorted(events):
            running += change
            most = max(most, running)
        return most


print(Solution().minMeetingRooms([[9, 12], [10, 11], [11, 13]]))
print(Solution().minMeetingRooms([[1, 2], [2, 3], [3, 4]]))
print(Solution().minMeetingRooms([[1, 5], [2, 6], [3, 7]]))
print(Solution().minMeetingRooms([[1, 10], [2, 3], [4, 5], [6, 7]]))
print(Solution().minMeetingRooms([]))
```

**Time** `O(n log n)`, **space** `O(n)`.
:::
