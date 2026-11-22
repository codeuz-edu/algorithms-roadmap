---
title: Daily Temperatures
description: "Daily Temperatures in Python: a stack of days still waiting for a warmer day, resolved as soon as one arrives."
---

# Daily Temperatures

<ProblemMeta />

## Problem

You are given a list `temperatures` with one reading per day. For each day, work out how many days pass until a strictly warmer day comes. If no later day is warmer, the answer for that day is `0`.

| Input | Output |
| --- | --- |
| `[55, 48, 52, 47, 60]` | `[4, 1, 2, 1, 0]` |
| `[50, 50, 51]` | `[2, 1, 0]` |
| `[60, 50, 40]` | `[0, 0, 0]` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        pass


print(Solution().dailyTemperatures([55, 48, 52, 47, 60]))
print(Solution().dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
print(Solution().dailyTemperatures([50, 50, 51]))
print(Solution().dailyTemperatures([60, 50, 40]))
print(Solution().dailyTemperatures([42]))
```

::: details Solution
**Idea.** Walk through the days and keep a stack of the days that have not met a warmer day yet. When a new day arrives, compare it with the day on top of the stack. If the new day is warmer, the top day has its answer: the difference of the two indices. Pop it and compare again, because the same new day may also be the answer for the days underneath.

Stopping at the first day that is not colder is safe. The temperatures on the stack never increase from bottom to top: a day is only pushed after every colder day above has been popped. So if the top is not beaten by today, nothing below it is beaten either.

Days still on the stack at the end never saw a warmer day and keep their initial `0`.

```python
class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        result = [0] * len(temperatures)
        waiting = []
        for day, temperature in enumerate(temperatures):
            while waiting and temperatures[waiting[-1]] < temperature:
                earlier = waiting.pop()
                result[earlier] = day - earlier
            waiting.append(day)
        return result


print(Solution().dailyTemperatures([55, 48, 52, 47, 60]))
print(Solution().dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
print(Solution().dailyTemperatures([50, 50, 51]))
print(Solution().dailyTemperatures([60, 50, 40]))
print(Solution().dailyTemperatures([42]))
```

**Time** `O(n)`: every day is pushed once and popped at most once. **Space** `O(n)`.

**Brute force.** For each day, scan forward until a warmer day shows up. A long falling run of temperatures makes every scan go to the end of the list.

```python
class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        result = [0] * len(temperatures)
        for day in range(len(temperatures)):
            for later in range(day + 1, len(temperatures)):
                if temperatures[later] > temperatures[day]:
                    result[day] = later - day
                    break
        return result


print(Solution().dailyTemperatures([55, 48, 52, 47, 60]))
print(Solution().dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
print(Solution().dailyTemperatures([50, 50, 51]))
print(Solution().dailyTemperatures([60, 50, 40]))
print(Solution().dailyTemperatures([42]))
```

**Time** `O(n²)`, **space** `O(1)` besides the output.
:::
