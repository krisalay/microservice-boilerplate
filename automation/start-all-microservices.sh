#!/usr/bin/env node

babel-node ../movies-service/src/index.js --presets es2015,stage-2 &
babel-node ../cinema-catelog-service/src/index.js --presets es2015,stage-2 &
babel-node ../denormalizer-service/src/index.js --presets es2015,stage-2
