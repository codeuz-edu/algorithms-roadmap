import { computed } from 'vue'

// The site is English only. The text lives here, in one place, so that a second language
// can be added later the way python-tutorials does it.
const messages = {
 defaultCode: 'print("Hello, world!")',
 idle: 'Press Run or Ctrl + Enter. The output appears here.', close: 'Close', outputLabel: 'Output', loading: 'Loading Python… The first run needs an internet connection.',
 running: 'Running…', packages: 'Loading packages… this can take a few seconds the first time.', noOutput: 'Code ran without errors (no output).', chartAlt: 'Chart', stopped: 'Stopped. The Python session will restart.', loadFailed: 'Python failed to load. Check your connection and try again.',
 editorLabel: 'Interactive Python editor', codeLabel: 'Python code',
 keyHints: 'Ctrl/Cmd + Enter runs the code. Esc, then Tab moves focus out of the editor.',
 runTitle: 'Run (Ctrl + Enter)', answerLabel: 'Your answer',
 reset: 'Reset', stop: 'Stop', run: '▶ Run', copy: 'Copy', copied: 'Copied',
 starterCode: '# Write your solution here\n', exerciseIdle: 'Write your solution, then press Check to compare your output with the expected output (Ctrl + Enter).', exerciseTitle: 'Your solution', check: 'Check', showExpected: 'Show expected output', solveHere: 'Solve in the browser', closeEditor: 'Close editor', runBlock: '▶ Run in editor',
 verdict: { pass: 'Correct: your output matches the expected output.', fail: 'Not yet: your output is different from the expected output.', error: 'Your code raised an error. Read the message below.', unknown: 'This problem cannot be checked automatically. Compare with the solution.' }
}

export function useT() {
 return computed(() => messages)
}
