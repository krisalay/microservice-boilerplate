import express from 'express';
import { createServer } from 'http';
import nconf from "nconf";
import cors from 'cors';
import servicebus from 'servicebus';
import mongoose from 'mongoose';

//import { router } from "./Auth/routes";
import client from './grpc-communication/client'; // Required
import { grpcServer } from './grpc-communication/server';
grpcServer.start();
nconf.argv().env().file({ file: `../../env/${process.env.NODE_ENV}/config.json` })

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/msb-movies");

setupHandlers();

//app.use(router);
app.get('/', function (req, res) {
  res.json(req.headers);
});


let bus = servicebus.bus({
  url: "amqp://localhost:5672"
});
bus.subscribe('event.addedCinema', function(msg){
  console.log('$#$#$#$#$#$#$#$#$#$#$', msg);
});

const server = createServer(app);

server.listen(4002, function(){
  console.log('Movies service started on port 4002');
});

function setupHandlers() {
  process.on('SIGINT', function(){
    console.log('Gracefully shutting down server on port 4002 from SIGINT (Ctrl+C)');
    process.exit();
  });

  app.on('error', function(err){
    if(process.env.NODE_ENV != 'test') {
      console.log('sent error %s', util.inspect(err));
    }
  });
}
