import { MongoClient } from 'mongodb';
import servicebus from 'servicebus';

import { EVT_ADDED_CINEMA } from '../event-sourcing/events/names';
import Events from '../event-sourcing/events';
import state from '../event-sourcing/state';

async function addCinema(req,res,next) {
  let eventResult;
  try {
    eventResult = await Events[EVT_ADDED_CINEMA](state.cinemaSession, req.body);
  } catch(err) {
    res.status = 400;
    res.json(err);
    return;
  }
  let db, events;
  try {
    let url = 'mongodb://127.0.0.1:27017/eventorder-dev';
    db = await MongoClient.connect(url);
    events = db.collection('events');
    await events.insert(eventResult);
  } catch(err) {
    res.status = 500;
    res.json(err);
    return;
  } finally {
    if(db) db.close();
  }
  
  let bus = servicebus.bus({
    url: "amqp://localhost:5672"
  });

  bus.publish('event.addedCinema', eventResult);

  //state.cinemaSession = await reduce(state.cinemaSession, eventResult);

  res.json(eventResult);
}

module.exports = addCinema;
