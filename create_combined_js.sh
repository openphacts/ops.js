#!/bin/bash
rm ./src/combined.js
node ./node_modules/browserify/bin/cmd.js ./src/OPS.js > src/combined.js
