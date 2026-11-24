// One Word From Grandma — make.fun entry.
// Writes the single word a grandma would text about AI to entry.txt.
//
// The word: "robut" — her typo for "robot". Warm, a little baffled, tied to
// machines, and fresh: a typo she would actually make, not the obvious word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "robut";
const MAX_CHARS = 30;

function checkWord(word: string): void {
  if (word.length === 0 || word.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${word.length}`);
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word, no whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
checkWord(WORD);
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, WORD, "utf8");
// Read it back: the file the judge sees must be exactly the word, byte for byte.
if (readFileSync(target, "utf8") !== WORD) {
  throw new Error("entry.txt does not match the word");
}
