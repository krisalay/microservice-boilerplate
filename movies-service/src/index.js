import express from 'express';
import { createServer } from 'http';
import client from './grpc-communication/client';

const app = express();

app.get('/', function(req,res){
  res.json('hello Movies');
})

const server = createServer(app);
server.listen(3001, function(){
  console.log('Movies service started on port 3001');
});
