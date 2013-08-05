#!/bin/bash
rm ./src/combined.js
cat ./src/OPS.js ./src/CompoundSearch.js ./src/ConceptWikiSearch.js ./src/TargetSearch.js ./src/StructureSearch.js ./src/ActivitySearch.js ./src/ChebiSearch.js ./src/EnzymeSearch.js ./src/PathwaySearch.js > ./src/combined.js
