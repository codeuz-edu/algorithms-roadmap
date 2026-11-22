"""Run the code on every problem page and check the page against the roadmap.

For each page in docs/problems this checks that:
  - the file name matches a problem in docs/.vitepress/roadmap.json, in the right topic folder
  - the page has a starter block followed by a "Solution" block
  - every Python block runs without an error
  - every block inside "Solution" prints the same output, so all approaches agree

Run it from the repository root: python scripts/check.py
To check some topics only, name their folders: python scripts/check.py 02-two-pointers
"""

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROBLEMS = ROOT / 'docs' / 'problems'
BLOCK = re.compile(r'```python\n(.*?)```', re.DOTALL)


def folder_of(topic: dict) -> str:
    name = re.sub(r'[^a-z0-9]+', '-', topic['name'].lower().replace('&', 'and')).strip('-')
    return f'{topic["id"]}-{name}'


def run(code: str) -> tuple[bool, str]:
    result = subprocess.run([sys.executable, '-c', code], capture_output=True, text=True, timeout=15)
    return result.returncode == 0, result.stdout if result.returncode == 0 else result.stderr


def check(page: Path, expected: set[str]) -> list[str]:
    name = str(page.relative_to(PROBLEMS))
    if name not in expected:
        return ['no problem in roadmap.json has this topic folder, number and slug']

    text = page.read_text()
    parts = text.split('::: details Solution\n')
    if len(parts) != 2:
        return ['expected exactly one "::: details Solution" block']
    if len(BLOCK.findall(parts[0])) != 1:
        return ['expected exactly one starter block before the solution']
    solutions = BLOCK.findall(parts[1])
    if not solutions:
        return ['the solution has no Python block']

    errors, outputs = [], []
    for number, code in enumerate(solutions, start=1):
        ok, output = run(code)
        if not ok:
            errors.append(f'solution block {number} failed:\n{output}')
        outputs.append(output)
    if not errors and len(set(outputs)) > 1:
        errors.append('the solution blocks print different output')
    return errors


def main() -> int:
    roadmap = json.loads((ROOT / 'docs' / '.vitepress' / 'roadmap.json').read_text())
    expected = {
        f'{folder_of(topic)}/{problem["number"]:04d}-{problem["slug"]}.md'
        for topic in roadmap
        for problem in topic['problems']
        if 'number' in problem
    }
    only = set(sys.argv[1:])
    pages = sorted(page for page in PROBLEMS.glob('*/*.md') if not only or page.parent.name in only)
    failed = 0
    for page in pages:
        errors = check(page, expected)
        failed += bool(errors)
        print(f'{"FAIL" if errors else "ok  "} {page.relative_to(PROBLEMS)}')
        for error in errors:
            print(f'     {error}')
    print(f'\n{len(pages) - failed} of {len(pages)} pages passed')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
