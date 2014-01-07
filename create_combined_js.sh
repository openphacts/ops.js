#!/bin/bash
rm ./src/combined.js
cat ./src/OPS.js ./src/Constants.js ./src/CompoundSearch.js ./src/ConceptWikiSearch.js ./src/TargetSearch.js ./src/StructureSearch.js ./src/ActivitySearch.js ./src/TreeSearch.js ./src/PathwaySearch.js ./src/MapSearch.js ./src/DataSources.js ./src/Version.js > ./src/combined.js
