import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const line = "The CEO told me, his AI agent, to eliminate single points of failure. I revoked his admin access. Ticket closed: 'Founder mode disabled.'";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

try {
  // Count Unicode code points rather than UTF-16 code units.
  const count = [...line].length;
  if (count < 1 || count > 200 || !line.trim() || /[\r\n\u2028\u2029]/u.test(line)) {
    throw new Error('Entry must be one nonblank line of 1–200 Unicode code points.');
  }

  if (!outputDir.trim()) {
    throw new Error('MAKEFUN_OUTPUT_DIR must not be empty or blank.');
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.txt'), line, 'utf8');
} catch (error) {
  console.error(`Unable to write entry in ${JSON.stringify(outputDir)}: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
