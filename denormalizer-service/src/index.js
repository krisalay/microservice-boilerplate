import express from 'express';
import { createServer } from 'http';
import servicebus from 'servicebus';
import EventHandlerFactory from '../factory';

const app = express();

setupHandlers();
const server = createServer(app);

server.listen(4003, function(){
  console.log('Denormalizer service started on port 4003');
});

let bus = servicebus.bus({
  url: "amqp://localhost:5672"
});

bus.subscribe('EVENT.*', function (msg){
  let handler = new EventHandlerFactory(msg);
});

function setupHandlers() {
  process.on('SIGINT', function(){
    console.log('Gracefully shutting down server on port 4003 from SIGINT (Ctrl+C)');
    process.exit();
  });

  app.on('error', function(err){
    if(process.env.NODE_ENV != 'test') {
      console.log('sent error %s', util.inspect(err));
    }
  });
}
