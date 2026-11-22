---
title: Car Fleet
description: "Car Fleet in Python: sort the cars by position, compute each arrival time and count the times that are not absorbed by a car ahead."
---

# Car Fleet

<ProblemMeta />

## Problem

Cars drive along a one-lane road toward a finish line at `target`. Car `i` starts at `position[i]` and drives at `speed[i]`. No car can overtake. A faster car that catches a slower one stays right behind it at the slower speed, and from then on they travel as one fleet. Catching up exactly at the finish line still counts as joining. Return how many fleets cross the line. A car that is never caught and catches nobody is a fleet of one.

| Input | Output | Why |
| --- | --- | --- |
| `target = 10`, `position = [0, 4]`, `speed = [2, 1]` | `1` | the rear car needs 5 hours alone, the front car 6, so it catches up |
| `target = 10`, `position = [6, 8]`, `speed = [3, 2]` | `2` | the front car arrives after 1 hour, before the rear car can reach it |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        pass


print(Solution().carFleet(10, [0, 4], [2, 1]))
print(Solution().carFleet(10, [6, 8], [3, 2]))
print(Solution().carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
print(Solution().carFleet(20, [0, 10], [2, 1]))
print(Solution().carFleet(10, [3], [3]))
```

::: details Solution
**Idea.** Ignore the other cars for a moment and give each car its free arrival time, `(target - position) / speed`. Now look at the cars from the one nearest the finish line backwards.

The front car is never blocked, so it arrives at its free time and leads a fleet. Take the next car behind it. If its free time is less than or equal to the arrival time of the fleet ahead, it would get there first or at the same moment, which is impossible without overtaking, so it catches up and joins. If its free time is larger, it never reaches the fleet ahead and becomes the leader of a new fleet.

A car that joins takes on the arrival time of its fleet, not its own. That is why each car is compared with the top of the stack, which holds the arrival time of the nearest fleet ahead, and why a joining car pushes nothing. The stack ends up with one entry per fleet.

```python
class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        cars = sorted(zip(position, speed), reverse=True)
        fleets = []
        for start, pace in cars:
            time = (target - start) / pace
            if not fleets or time > fleets[-1]:
                fleets.append(time)
        return len(fleets)


print(Solution().carFleet(10, [0, 4], [2, 1]))
print(Solution().carFleet(10, [6, 8], [3, 2]))
print(Solution().carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
print(Solution().carFleet(20, [0, 10], [2, 1]))
print(Solution().carFleet(10, [3], [3]))
```

**Time** `O(n log n)` for the sort, **space** `O(n)`.

**Without the stack.** Nothing is ever popped, and only the top of the stack is read. So one variable for the arrival time of the latest fleet and a counter do the same job.

```python
class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        fleets = 0
        slowest = 0.0
        for start, pace in sorted(zip(position, speed), reverse=True):
            time = (target - start) / pace
            if time > slowest:
                slowest = time
                fleets += 1
        return fleets


print(Solution().carFleet(10, [0, 4], [2, 1]))
print(Solution().carFleet(10, [6, 8], [3, 2]))
print(Solution().carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))
print(Solution().carFleet(20, [0, 10], [2, 1]))
print(Solution().carFleet(10, [3], [3]))
```

**Time** `O(n log n)`, **space** `O(n)` for the sorted list.
:::
