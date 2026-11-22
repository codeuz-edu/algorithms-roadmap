---
title: Time Based Key-Value Store
description: "Time Based Key-Value Store in Python: keep the history of each key in a list ordered by timestamp and binary search it on every lookup."
---

# Time Based Key-Value Store

<ProblemMeta />

## Problem

Build a key-value store that remembers every value a key has had. `set(key, value, timestamp)` records that `key` took `value` at `timestamp`. `get(key, timestamp)` returns the value the key had at that moment: the one stored with the largest timestamp that is not after the requested one. If the key had no value yet at that time, or was never set, `get` returns `""`.

Calls to `set` always arrive with strictly increasing timestamps.

| Calls | Result |
| --- | --- |
| `set("city", "Seoul", 1)`, `set("city", "Busan", 4)` | |
| `get("city", 3)` | `"Seoul"` |
| `get("city", 9)` | `"Busan"` |
| `get("city", 0)` | `""` |

## Try it yourself

Fill in the methods, then press **Check**. The results are printed with `repr` so an empty string is visible.

```python
class TimeMap:
    def __init__(self):
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        pass

    def get(self, key: str, timestamp: int) -> str:
        pass


store = TimeMap()
store.set("city", "Seoul", 1)
store.set("mood", "calm", 2)
store.set("city", "Busan", 4)
print(repr(store.get("city", 1)))
print(repr(store.get("city", 3)))
print(repr(store.get("city", 9)))
print(repr(store.get("city", 0)))
print(repr(store.get("mood", 4)))
print(repr(store.get("name", 5)))
```

::: details Solution
**Idea.** Give each key its own list of `(timestamp, value)` pairs in a dictionary. Timestamps only go up, so appending keeps every list sorted with no extra work, and `set` is constant time.

`get` then asks a sorted list for the last entry whose timestamp is at most the requested one. That is a binary search for a boundary, not for an exact match. When the middle entry is not too late, it is a valid answer, so remember its value and look to the right for a later one. When it is too late, look to the left. The last value remembered is the latest valid one. If nothing was ever valid, the result stays `""`.

```python
class TimeMap:
    def __init__(self):
        self.history = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.history.setdefault(key, []).append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        entries = self.history.get(key, [])
        result = ""
        left, right = 0, len(entries) - 1
        while left <= right:
            mid = (left + right) // 2
            if entries[mid][0] <= timestamp:
                result = entries[mid][1]
                left = mid + 1
            else:
                right = mid - 1
        return result


store = TimeMap()
store.set("city", "Seoul", 1)
store.set("mood", "calm", 2)
store.set("city", "Busan", 4)
print(repr(store.get("city", 1)))
print(repr(store.get("city", 3)))
print(repr(store.get("city", 9)))
print(repr(store.get("city", 0)))
print(repr(store.get("mood", 4)))
print(repr(store.get("name", 5)))
```

**Time** `O(1)` for `set` and `O(log n)` for `get`, where `n` is the number of values stored for the key. **Space** `O(n)` in total.

**With the standard library.** `bisect_right(times, timestamp)` returns how many stored timestamps are less than or equal to `timestamp`. If that count is `i`, the wanted entry is at index `i - 1`, and a count of `0` means the key had no value yet. Keeping timestamps and values in two parallel lists lets `bisect` compare plain integers.

```python
from bisect import bisect_right


class TimeMap:
    def __init__(self):
        self.times = {}
        self.values = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.times.setdefault(key, []).append(timestamp)
        self.values.setdefault(key, []).append(value)

    def get(self, key: str, timestamp: int) -> str:
        i = bisect_right(self.times.get(key, []), timestamp)
        if i == 0:
            return ""
        return self.values[key][i - 1]


store = TimeMap()
store.set("city", "Seoul", 1)
store.set("mood", "calm", 2)
store.set("city", "Busan", 4)
print(repr(store.get("city", 1)))
print(repr(store.get("city", 3)))
print(repr(store.get("city", 9)))
print(repr(store.get("city", 0)))
print(repr(store.get("mood", 4)))
print(repr(store.get("name", 5)))
```

**Time** `O(1)` for `set` and `O(log n)` for `get`, **space** `O(n)`.
:::
