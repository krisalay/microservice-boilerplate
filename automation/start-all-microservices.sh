#!/usr/bin/env node

MONGODB_URI=mongodb://127.0.0.1:27017/MSB-user-base node ../oidc-auth-server/index.js &
babel-node ../movies-service/src/index.js --presets es2015,stage-2 &
babel-node ../cinema-catelog-service/src/index.js --presets es2015,stage-2 &
babel-node ../denormalizer-service/src/index.js --presets es2015,stage-2
