#!/usr/bin/env node
// Split a bundled/minified JS file into readable chunks by @license blocks
// Usage: node tools/split-bundle.js path/to/bundle.js

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node tools/split-bundle.js path/to/bundle.js');
  process.exit(2);
}

const bundlePath = process.argv[2];
if (!fs.existsSync(bundlePath)) {
  console.error('File not found:', bundlePath);
  process.exit(3);
}

const text = fs.readFileSync(bundlePath, 'utf8');
const baseName = path.basename(bundlePath, path.extname(bundlePath));
const outDir = path.join(path.dirname(bundlePath), 'src', baseName);
fs.mkdirSync(outDir, { recursive: true });

// Save prefix before first /** (if any)
const firstLicenseIdx = text.indexOf('/**');
if (firstLicenseIdx > 0) {
  const prefix = text.slice(0, firstLicenseIdx).trim();
  if (prefix) {
    fs.writeFileSync(path.join(outDir, '00-prefix.js'), prefix + '\n');
    console.log('Wrote 00-prefix.js');
  }
}

// Regex: capture each /** ... */ plus following code up to next /** or EOF
const re = /\/\*[\s\S]*?\*\/[\s\S]*?(?=\/\*[\s\S]*?\*\/|$)/g;
let m;
let count = 0;
while ((m = re.exec(text)) !== null) {
  const chunk = m[0];
  // try to find a filename inside the comment header (line that ends with .js)
  const commentHeader = chunk.split('\n').slice(0, 8).join('\n');
  const fileLineMatch = commentHeader.match(/^[ \t]*\*\s*([^\r\n]*\.js)\s*$/m);
  let filename;
  if (fileLineMatch && fileLineMatch[1]) {
    filename = fileLineMatch[1].trim();
  } else {
    // fallback name
    count += 1;
    filename = String(count).padStart(2, '0') + '_chunk.js';
  }
  // sanitize
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, chunk + '\n');
  console.log('Wrote', outPath);
}

console.log('Done. Files written to', outDir);
