#!/bin/sh
# Bundle editor-src.js → editor.js
# Run from project root: sh pixkit-extension/build.sh
npx esbuild pixkit-extension/editor-src.js \
  --bundle \
  --format=esm \
  --outfile=pixkit-extension/editor.js \
  --platform=browser \
  --target=chrome110
echo "Build complete: pixkit-extension/editor.js"
