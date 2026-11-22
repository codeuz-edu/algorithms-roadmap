---
title: Gas Station
description: "Gas Station in Python: one greedy pass that restarts after every point where the tank would go negative, compared with trying every start."
---

# Gas Station

<ProblemMeta />

## Problem

Petrol stations stand around a circular road. Station `i` gives you `gas[i]` units of fuel, and driving from station `i` to the next one uses `cost[i]` units. You start at a station of your choice with an empty tank. Return the index of the station from which you can drive one full lap in order, or `-1` if no station works. When a lap is possible, the starting station is guaranteed to be unique.

| Input | Output | Why |
| --- | --- | --- |
| `gas = [1, 2, 3, 4, 5]`, `cost = [3, 4, 5, 1, 2]` | `3` | the tank goes `4 → 3`, `8 → 6`, `7 → 4`, `6 → 2`, `5 → 0` |
| `gas = [2, 3, 4]`, `cost = [3, 4, 3]` | `-1` | 9 units of fuel for a lap that costs 10 |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        pass


print(Solution().canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))
print(Solution().canCompleteCircuit([2, 3, 4], [3, 4, 3]))
print(Solution().canCompleteCircuit([1, 1, 6], [3, 3, 1]))
print(Solution().canCompleteCircuit([3, 1, 1], [1, 2, 2]))
print(Solution().canCompleteCircuit([5], [6]))
```

::: details Solution
**Idea.** Two facts carry the whole solution.

First, if the total fuel is less than the total cost, no start can work, because a full lap burns the total cost whatever the starting point. Return `-1`.

Second, suppose you start at station `start` and the tank first goes negative on the leg that leaves station `i`. Then no station from `start` to `i` can be the answer. You arrived at each of those stations with a tank of zero or more, so starting at one of them with an empty tank can only leave you with less fuel at every later point, and you still fail at `i` or earlier. The next station worth trying is `i + 1`.

So make one pass: add `gas[i] - cost[i]` to the tank, and whenever it goes negative, move `start` to `i + 1` and empty the tank.

Why the last candidate is right: when the total fuel covers the total cost, some station always works (start just after the point where the running balance of fuel minus cost is at its lowest, and it never dips below that level again). Every station before the final `start` was ruled out by the second fact. A station after the final `start` cannot be the answer either: `start` arrives there with a tank of zero or more, so if that station could finish a lap, `start` could too, and the answer is unique. That leaves `start` itself, and the wrap around the circle never has to be simulated.

```python
class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        if sum(gas) < sum(cost):
            return -1

        start = 0
        tank = 0
        for i in range(len(gas)):
            tank += gas[i] - cost[i]
            if tank < 0:
                start = i + 1
                tank = 0
        return start


print(Solution().canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))
print(Solution().canCompleteCircuit([2, 3, 4], [3, 4, 3]))
print(Solution().canCompleteCircuit([1, 1, 6], [3, 3, 1]))
print(Solution().canCompleteCircuit([3, 1, 1], [1, 2, 2]))
print(Solution().canCompleteCircuit([5], [6]))
```

**Time** `O(n)`, **space** `O(1)`.

**Brute force.** Try each station as the start and drive the whole lap, using `% n` to wrap around. This is the direct translation of the task and the baseline the greedy pass improves on.

```python
class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        n = len(gas)
        for start in range(n):
            tank = 0
            for step in range(n):
                station = (start + step) % n
                tank += gas[station] - cost[station]
                if tank < 0:
                    break
            else:
                return start
        return -1


print(Solution().canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))
print(Solution().canCompleteCircuit([2, 3, 4], [3, 4, 3]))
print(Solution().canCompleteCircuit([1, 1, 6], [3, 3, 1]))
print(Solution().canCompleteCircuit([3, 1, 1], [1, 2, 2]))
print(Solution().canCompleteCircuit([5], [6]))
```

**Time** `O(n²)`, **space** `O(1)`.
:::
