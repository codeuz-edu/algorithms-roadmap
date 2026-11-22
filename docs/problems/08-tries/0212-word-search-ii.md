---
title: Word Search II
description: "Word Search II in Python: put all the words in a trie and run one backtracking search over the board that follows the trie and prunes dead branches."
---

# Word Search II

<ProblemMeta />

## Problem

You are given a grid of lowercase letters and a list of distinct words. A word is on the board if it can be spelled by a path that moves between cells sharing an edge (up, down, left, right) and does not use any cell twice. Return every word from the list that is on the board, each once, in any order.

Take this board:

```text
t r e e
o a k s
p i n e
```

| Words | Output |
| --- | --- |
| `["tree", "rain", "seek", "eke", "tart"]` | `["tree", "rain", "seek"]` |

`"eke"` fails because it would need the same `e` twice, and `"tart"` fails because the board has only one `t`.

## Try it yourself

Fill in the method, then press **Check**. Any order is accepted: `show` sorts the words before printing. It also turns each row string into a list of letters, so `board` is a `list[list[str]]`.

```python
class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        pass


def show(rows, words):
    board = [list(row) for row in rows]
    print(sorted(Solution().findWords(board, words)))


show(["tree", "oaks", "pine"], ["tree", "oak", "pine", "top", "rain", "seek", "pink", "eke", "tart"])
show(["ab", "cd"], ["ab", "abd", "abdc", "acdb", "abcd"])
show(["aa"], ["a", "aa", "aaa"])
show(["x"], ["x", "y"])
```

::: details Solution
**Idea.** Searching for the words one at a time, as in [Word Search](/problems/word-search), repeats the same walks over the board for every word. Turn it around: walk the board once and let the walk check all the words together.

Put the words in a trie. A path on the board spells a string, and that string is worth extending only if it is a prefix of some word, which means only if the trie has a matching path. So the search carries a trie node along with the board position. Stepping to a neighbouring cell is allowed only when the current node has a child for that cell's letter. A path that leaves the trie is cut off at once, whatever the number of words.

Three details make it work:

- Each end-of-word node stores the whole word, so finding a word needs no string building. Removing that marker when the word is found stops the same word from being reported twice.
- A cell on the current path is overwritten with `"#"`, which is never a trie key, so the path cannot reuse it. The letter is put back when the search backs out of the cell.
- After a branch has been explored, a trie node with nothing left under it is deleted. Words that were already found stop costing time on the rest of the board.

The trie here is made of plain nested dictionaries, with the key `"$"` holding the finished word. The recursion goes as deep as the longest word.

```python
class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        root = {}
        for word in words:
            node = root
            for ch in word:
                node = node.setdefault(ch, {})
            node["$"] = word

        rows, cols = len(board), len(board[0])
        found = []

        def explore(r: int, c: int, parent: dict) -> None:
            ch = board[r][c]
            node = parent[ch]
            if "$" in node:
                found.append(node.pop("$"))

            board[r][c] = "#"
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] in node:
                    explore(nr, nc, node)
            board[r][c] = ch

            if not node:
                del parent[ch]

        for r in range(rows):
            for c in range(cols):
                if board[r][c] in root:
                    explore(r, c, root)
        return found


def show(rows, words):
    board = [list(row) for row in rows]
    print(sorted(Solution().findWords(board, words)))


show(["tree", "oaks", "pine"], ["tree", "oak", "pine", "top", "rain", "seek", "pink", "eke", "tart"])
show(["ab", "cd"], ["ab", "abd", "abdc", "acdb", "abcd"])
show(["aa"], ["a", "aa", "aaa"])
show(["x"], ["x", "y"])
```

**Time** `O(m · n · 3^L)` in the worst case for an `m × n` board and words up to length `L`, since each step after the first has at most three unused neighbours. **Space** `O(total letters in words)` for the trie.

**One search per word.** The direct approach runs a separate backtracking search for each word, starting from every cell. It is correct and worth writing first, but the work is multiplied by the number of words, and words with a common prefix repeat the same steps.

```python
class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        rows, cols = len(board), len(board[0])

        def spell(word: str, i: int, r: int, c: int) -> bool:
            if board[r][c] != word[i]:
                return False
            if i == len(word) - 1:
                return True
            board[r][c] = "#"
            found = False
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and spell(word, i + 1, nr, nc):
                    found = True
                    break
            board[r][c] = word[i]
            return found

        return [word for word in words if any(spell(word, 0, r, c) for r in range(rows) for c in range(cols))]


def show(rows, words):
    board = [list(row) for row in rows]
    print(sorted(Solution().findWords(board, words)))


show(["tree", "oaks", "pine"], ["tree", "oak", "pine", "top", "rain", "seek", "pink", "eke", "tart"])
show(["ab", "cd"], ["ab", "abd", "abdc", "acdb", "abcd"])
show(["aa"], ["a", "aa", "aaa"])
show(["x"], ["x", "y"])
```

**Time** `O(w · m · n · 3^L)` for `w` words, **space** `O(L)` for the recursion.
:::
