---
title: Letter Combinations of a Phone Number
description: "Letter Combinations of a Phone Number in Python: backtracking that picks one letter per digit from the keypad mapping."
---

# Letter Combinations of a Phone Number

<ProblemMeta />

## Problem

On an old phone keypad each digit from 2 to 9 stands for a few letters. You are given a string `digits` made of those digits. Return every string that can be spelled by replacing each digit with one of its letters. If `digits` is empty, return an empty list.

| Digit | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Letters | abc | def | ghi | jkl | mno | pqrs | tuv | wxyz |

| Input | Output |
| --- | --- |
| `"26"` | `["am", "an", "ao", "bm", "bn", "bo", "cm", "cn", "co"]` |
| `""` | `[]` |

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts the strings before printing.

```python
class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        pass


def show(result):
    print(sorted(result or []))


show(Solution().letterCombinations("26"))
show(Solution().letterCombinations("9"))
show(Solution().letterCombinations(""))
show(Solution().letterCombinations("787"))
```

::: details Solution
**Idea.** The result has one letter per digit, and the choice for one digit does not affect the choices for the others. Go through the digits from left to right. For the current digit, try each of its letters, add it to the string being built, and recurse on the next digit. When all digits are handled, the string is complete.

The empty input needs its own check. Without it the search would finish at once and return one empty string, but the expected answer is an empty list.

```python
class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []

        letters = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
        }
        result = []
        path = []

        def backtrack(i):
            if i == len(digits):
                result.append("".join(path))
                return
            for letter in letters[digits[i]]:
                path.append(letter)
                backtrack(i + 1)
                path.pop()

        backtrack(0)
        return result


def show(result):
    print(sorted(result or []))


show(Solution().letterCombinations("26"))
show(Solution().letterCombinations("9"))
show(Solution().letterCombinations(""))
show(Solution().letterCombinations("787"))
```

**Time** `O(n · 4ⁿ)` for `n` digits, since a digit has at most four letters. **Space** `O(n)` for the recursion, not counting the output.

**Without recursion.** Keep the list of all strings for the digits handled so far, starting with one empty string. Each new digit replaces the list with every old string extended by every letter of that digit.

```python
class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []

        letters = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
        }
        result = [""]
        for digit in digits:
            result = [prefix + letter for prefix in result for letter in letters[digit]]
        return result


def show(result):
    print(sorted(result or []))


show(Solution().letterCombinations("26"))
show(Solution().letterCombinations("9"))
show(Solution().letterCombinations(""))
show(Solution().letterCombinations("787"))
```

**Time** `O(n · 4ⁿ)`, **space** `O(1)` besides the output.
:::
