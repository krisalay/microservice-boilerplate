import express from 'express';
import { createServer } from 'http';
import nconf from "nconf";
import cors from 'cors';
import servicebus from 'servicebus';
import mongoose from 'mongoose';

//import { router } from "./Auth/routes";
import client from './grpc-communication/client'; // Required

nconf.argv().env().file({ file: `../../env/${process.env.NODE_ENV}/config.json` })

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/msb-movies");

//app.use(router);
app.get('/', function (req, res) {
  res.json(req.headers);
});


let bus = servicebus.bus({
  url: "amqp://localhost:5672"
});
bus.subscribe('broadcast', function(msg){
  console.log(msg);
  if(msg.command == 'heartbeat') {
    bus.send('process.manager', {
        id: 'process2',
        status: 'online'
    });
  }
});

const server = createServer(app);

server.listen(4002, function(){
  console.log('Movies service started on port 4002');
});
