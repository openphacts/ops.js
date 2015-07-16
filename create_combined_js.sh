#!/bin/bash
rm ./src/combined.js
./node_modules/.bin/browserify ./src/OPS.js > src/combined.js
