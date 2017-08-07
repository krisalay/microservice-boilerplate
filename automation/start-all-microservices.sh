#!/usr/bin/env node

babel-node ../cinema-catelog-service/src/index.js --presets es2015,stage-2 & babel-node ../movies-service/src/index.js --presets es2015,stage-2
