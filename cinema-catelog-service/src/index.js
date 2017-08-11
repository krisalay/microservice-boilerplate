import express from 'express';
import { createServer } from 'http';
import servicebus from 'servicebus';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import util from 'util';

import { addCinema } from './routes';

import { grpcServer } from './grpc-communication/server';
grpcServer.start();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/msb-cinema-catelog");

setupHandlers();

// app.use('/', function(req,res){
//   res.json('hello catelog');
// });

app.post('/add-cinema',addCinema);


const server = createServer(app);
server.listen(4001, function(){
  console.log('Cinema catelog service started on port 4001');
});


function setupHandlers() {
  process.on('SIGINT', function(){
    console.log('Gracefully shutting down server on port 4001 from SIGINT (Ctrl+C)');
    process.exit();
  });

  app.on('error', function(err){
    if(process.env.NODE_ENV != 'test') {
      console.log('sent error %s', util.inspect(err));
    }
  });
}
