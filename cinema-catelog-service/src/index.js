import express from 'express';
import { createServer } from 'http';
import servicebus from 'servicebus';
import mongoose from 'mongoose';

import es from './event-sourcing/event-store';
import { grpcServer } from './grpc-communication/server';
grpcServer.start();

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/msb-cinema-catelog");

app.use('/', function(req,res){
  res.json('hello catelog');
})

// let bus = servicebus.bus({
//   url: "amqp://localhost:5672"
// });
//
// bus.publish('broadcast', {
//   command: "heartbeat"
// });
//
// bus.listen('process.manager', {ack: true}, function(msg) {
//   console.log(msg);
// });


const server = createServer(app);
server.listen(4001, function(){
  console.log('Cinema catelog service started on port 4001');
});
