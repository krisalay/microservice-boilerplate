import express from 'express';
import { createServer } from 'http';
import nconf from "nconf";

import { router } from "./Auth/routes";
import client from './grpc-communication/client'; // Required

nconf.argv().env().file({ file: `../../env/${process.env.NODE_ENV}/config.json` })

const app = express();

app.use(router);

app.get('/', function (req, res) {
  res.json('hello Movies');
});

const server = createServer(app);

server.listen(4002, function(){
  console.log('Movies service started on port 4002');
});
