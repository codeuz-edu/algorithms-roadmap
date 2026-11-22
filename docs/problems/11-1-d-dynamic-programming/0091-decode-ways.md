---
title: Decode Ways
description: "Decode Ways in Python: count decodings with a one-dimensional DP over prefixes, handling zeros, then with two variables."
---

# Decode Ways

<ProblemMeta />

## Problem

Letters are encoded as numbers: `A` is `1`, `B` is `2`, up to `Z`, which is `26`. A message was encoded by writing those numbers one after another with no separators. Given the resulting string of digits `s`, return how many different messages it could stand for. A code never has a leading zero, so `"06"` is not a way to write `F`.

| Input | Output | Why |
| --- | --- | --- |
| `"12"` | `2` | `1 2` (AB) or `12` (L) |
| `"226"` | `3` | `2 2 6`, `22 6`, `2 26` |
| `"06"` | `0` | nothing can start with `0` |
| `"2101"` | `1` | only `2 10 1` |

## Try it yourself

Fill in the method, then press **Check**. Your output is compared with the output of the solution below.

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        pass


print(Solution().numDecodings("12"))
print(Solution().numDecodings("226"))
print(Solution().numDecodings("06"))
print(Solution().numDecodings("2101"))
print(Solution().numDecodings("100"))
```

::: details Solution
**Idea.** Look at how a decoding can end. Its last letter came from either the last digit alone or the last two digits together. This is [Climbing Stairs](/problems/climbing-stairs) with conditions on each move.

Let `dp[i]` be the number of ways to decode the first `i` characters of `s`. For each `i`:

- If the last digit `s[i - 1]` is not `0`, it is a letter on its own, and every decoding of the first `i - 1` characters can be extended with it. Add `dp[i - 1]`.
- If the last two digits `s[i - 2:i]` form a number from `10` to `26`, they are a letter together. Add `dp[i - 2]`.

The lower bound of `10` is what rejects pairs with a leading zero such as `"06"`. A `0` therefore only survives as the second digit of `10` or `20`, and anything else makes the count drop to 0 and stay there.

`dp[0] = 1`: the empty prefix has one decoding, the empty message. That value is what makes a valid first pair count once.

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        n = len(s)
        dp = [0] * (n + 1)
        dp[0] = 1

        for i in range(1, n + 1):
            if s[i - 1] != "0":
                dp[i] += dp[i - 1]
            if i >= 2 and 10 <= int(s[i - 2:i]) <= 26:
                dp[i] += dp[i - 2]
        return dp[n]


print(Solution().numDecodings("12"))
print(Solution().numDecodings("226"))
print(Solution().numDecodings("06"))
print(Solution().numDecodings("2101"))
print(Solution().numDecodings("100"))
```

**Time** `O(n)`, **space** `O(n)`.

**Constant space.** Only the previous two entries are read. Here `cur` plays the part of `dp[i - 1]` and `prev` the part of `dp[i - 2]`.

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        prev, cur = 0, 1
        for i in range(len(s)):
            ways = 0
            if s[i] != "0":
                ways += cur
            if i >= 1 and 10 <= int(s[i - 1:i + 1]) <= 26:
                ways += prev
            prev, cur = cur, ways
        return cur


print(Solution().numDecodings("12"))
print(Solution().numDecodings("226"))
print(Solution().numDecodings("06"))
print(Solution().numDecodings("2101"))
print(Solution().numDecodings("100"))
```

**Time** `O(n)`, **space** `O(1)`.
:::
