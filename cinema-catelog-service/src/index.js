import express from 'express';
import { createServer } from 'http';

import { grpcServer } from './grpc-communication/server';
grpcServer.start();

const app = express();

app.use('/', function(req,res){
  res.json('hello catelog');
})

const server = createServer(app);
server.listen(3000, function(){
  console.log('Cinema catelog service started on port 3000');
});
