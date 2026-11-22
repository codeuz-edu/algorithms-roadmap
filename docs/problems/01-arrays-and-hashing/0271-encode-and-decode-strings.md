---
title: Encode and Decode Strings
description: "Encode and Decode Strings in Python: join a list of strings into one string with length prefixes so it can be split back exactly."
---

# Encode and Decode Strings

<ProblemMeta />

## Problem

Write two methods. `encode` turns a list of strings into one single string. `decode` takes that string and returns the original list. The strings can contain any character at all, so no character is safe to use as a plain separator.

| List | `decode(encode(list))` |
| --- | --- |
| `["hello", "world"]` | `["hello", "world"]` |
| `["a#b", "5#", ""]` | `["a#b", "5#", ""]` |
| `[]` | `[]` |

## Try it yourself

Fill in both methods, then press **Check**. Each test encodes a list and decodes it again, so the format of the encoded string is up to you. Note that `[""]` and `[]` are different lists and must stay different.

```python
class Codec:
    def encode(self, strs: list[str]) -> str:
        pass

    def decode(self, s: str) -> list[str]:
        pass


codec = Codec()
print(codec.decode(codec.encode(["hello", "world"])))
print(codec.decode(codec.encode(["a#b", "5#", ""])))
print(codec.decode(codec.encode(["12#34", "#", "##"])))
print(codec.decode(codec.encode([""])))
print(codec.decode(codec.encode([])))
```

::: details Solution
**Idea.** Joining with a separator such as `","` breaks as soon as a string contains that separator. Instead, write the length of each string in front of it: `"hello"` becomes `"5#hello"`.

The decoder never has to guess. It reads digits up to the first `#`, which gives a length `n`, then takes exactly the next `n` characters as the string, whatever they are. A `#` or a digit inside the string is skipped over as part of those `n` characters, so it is never mistaken for a marker. The decoder then stands at the start of the next length and repeats.

```python
class Codec:
    def encode(self, strs: list[str]) -> str:
        parts = []
        for word in strs:
            parts.append(str(len(word)) + "#" + word)
        return "".join(parts)

    def decode(self, s: str) -> list[str]:
        result = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != "#":
                j += 1
            length = int(s[i:j])
            start = j + 1
            result.append(s[start:start + length])
            i = start + length
        return result


codec = Codec()
print(codec.decode(codec.encode(["hello", "world"])))
print(codec.decode(codec.encode(["a#b", "5#", ""])))
print(codec.decode(codec.encode(["12#34", "#", "##"])))
print(codec.decode(codec.encode([""])))
print(codec.decode(codec.encode([])))
```

**Time** `O(n)` for both methods, where `n` is the total number of characters, **space** `O(n)` for the output.

**Escaping the separator.** The other standard fix is to keep a separator and escape it. Here `/` is the escape character: every `/` inside a string is written as `//`, and every string is closed with `/:`. While decoding, a `/` is always followed by either another `/` (a real slash) or a `:` (end of the string), so the two cases cannot be confused.

It works, but the decoder has to look at every character one by one, and the rules are easier to get wrong than a length prefix.

```python
class Codec:
    def encode(self, strs: list[str]) -> str:
        parts = []
        for word in strs:
            parts.append(word.replace("/", "//") + "/:")
        return "".join(parts)

    def decode(self, s: str) -> list[str]:
        result = []
        current = []
        i = 0
        while i < len(s):
            if s[i] == "/":
                if s[i + 1] == "/":
                    current.append("/")
                else:
                    result.append("".join(current))
                    current = []
                i += 2
            else:
                current.append(s[i])
                i += 1
        return result


codec = Codec()
print(codec.decode(codec.encode(["hello", "world"])))
print(codec.decode(codec.encode(["a#b", "5#", ""])))
print(codec.decode(codec.encode(["12#34", "#", "##"])))
print(codec.decode(codec.encode([""])))
print(codec.decode(codec.encode([])))
```

**Time** `O(n)`, **space** `O(n)`.
:::
