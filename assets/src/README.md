This folder is created by tools/split-bundle.js to contain human-readable chunks
extracted from a bundled JavaScript file.

Usage:
  node ../..\tools\split-bundle.js ..\index-_JiktdHg.js

The script looks for `/** ... */` license/comment blocks and creates files named
by the `.js` filename found in the header (or numbered chunk files as fallback).

It does not modify your HTML; the original bundle remains unchanged. Review and
rename chunks as needed, and update your HTML to load the split files if you
intend to replace the bundle.
